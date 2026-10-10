/* APTIS V4.1 – Vietnamese meanings of every visible answer choice.
   SOURCE answers are never modified. Existing manually curated Vietnamese takes priority.
   Unknown choices get online machine translation asynchronously, cached for later use.
   Works for Listening L1/L2/L3/L4 and supplements existing Reading bilingual options. */
(()=>{
'use strict';
const manual={
 'Help you make decisions':'Giúp bạn đưa ra quyết định',
 'Prevent you from considering different possibilities.':'Ngăn bạn cân nhắc những khả năng khác nhau.',
 'Make you avoid making difficult choices.':'Khiến bạn né tránh những lựa chọn khó khăn.',
 'Man':'Nam', 'Woman':'Nữ', 'Both':'Cả hai',
 'Monday':'Thứ Hai','Tuesday':'Thứ Ba','Wednesday':'Thứ Tư','Thursday':'Thứ Năm','Friday':'Thứ Sáu','Saturday':'Thứ Bảy','Sunday':'Chủ nhật',
 'morning':'buổi sáng','afternoon':'buổi chiều','evening':'buổi tối','night':'ban đêm',
 'computer':'máy tính','Management':'quản lý','Computer':'máy tính','Leadership':'khả năng lãnh đạo',
 'listen to music':'nghe nhạc','go for a walk':'đi dạo','go to the coffee shop':'đến quán cà phê',
 'She walks':'Cô ấy đi bộ','She drives':'Cô ấy lái xe','She goes by bus.':'Cô ấy đi xe buýt',
 'at the university':'ở trường đại học','at the station':'ở nhà ga','at the park':'ở công viên',
 'goes with their friends':'đi cùng bạn bè','goes bowling':'đi chơi bowling','goes for a walk':'đi dạo',
 'to work in business':'làm việc trong lĩnh vực kinh doanh','to be a teacher':'trở thành giáo viên','to keep studying':'tiếp tục học',
 'at a local market':'tại chợ địa phương','at a convenient store':'ở cửa hàng tiện lợi','at a new shopping centre':'tại trung tâm mua sắm mới',
 'Using less electricity':'Sử dụng ít điện hơn','Not driving to work':'Không lái xe đi làm',
 'Shopping online':'Mua sắm trực tuyến','Using less water':'Sử dụng ít nước hơn',
 'Using more electricity at home':'Dùng nhiều điện hơn ở nhà','Driving alone more often':'Thường xuyên tự lái xe một mình hơn',
 'The products are delivered':'Sản phẩm được giao tận nơi','It is cheaper':'Rẻ hơn','It saves time':'Tiết kiệm thời gian',
 'There are more choices':'Có nhiều lựa chọn hơn','Speaking directly to shop assistants':'Nói chuyện trực tiếp với nhân viên bán hàng',
 'Paying only with cash':'Chỉ thanh toán bằng tiền mặt',
 'At various places':'Ở nhiều địa điểm khác nhau','In a quiet place':'Ở nơi yên tĩnh','With music':'Cùng với âm nhạc'
};
const dictionary=new Map();
const norm=s=>String(s??'').trim().replace(/\s+/g,' ').replace(/[.!?]+$/,'').toLowerCase();
function add(en,vi,override=false){
  const e=String(en||'').trim(),v=String(vi||'').trim();if(!e||!v||e===v||!/[àáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i.test(v))return;
  const k=norm(e);if(!dictionary.has(k)||override)dictionary.set(k,v);
}
const staticVi=window.APTIS_LISTENING_TRANSLATE;
function seed(){
  Object.entries(window.READING_VI_BANK?.glosses||{}).forEach(([en,vi])=>add(en,vi));
  for(const set of (window.DEFAULT_APTIS_DATA?.sets||[])){
    for(const x of (set.parts?.L2?.speakers||[]))add(x.answer,x.key_vi?.answer);
    for(const x of (set.parts?.L4?.questions||[]))add(x.options?.[x.answer_index],x.key_vi?.answer);
  }
  for(const [en,vi] of Object.entries(manual))add(en,vi,true);
}
seed();
function moneyTime(en){
  const v=en.trim();
  const m=v.match(/^(\d{1,2})(?::|\.)(\d\d)\s*(am|pm)?\.?$/i);
  if(m)return `${Number(m[1])} giờ ${m[2]}${m[3]?m[3].toLowerCase()==='pm'?' chiều':' sáng':''}`;
  const n=v.match(/^(\d{1,2})\s*(am|pm)\.?$/i);
  if(n)return `${Number(n[1])} giờ ${n[2].toLowerCase()==='pm'?'chiều':'sáng'}`;
  const pounds=v.match(/^(\d+(?:\.\d+)?)\s*pounds?\.?$/i);
  if(pounds)return `${pounds[1]} bảng Anh`;
  return '';
}
function punctuateOptionVi(en,vi){
  const english=String(en??'').trim(),translated=String(vi??'').trim();
  if(!translated || /[.!?…]$/.test(translated))return translated;
  if(/\?$/.test(english))return translated+'?';
  return /\.$/.test(english)?translated+'.':translated;
}
function known(en){
 const value=String(en??'').trim();
 return punctuateOptionVi(value,dictionary.get(norm(value))||staticVi?.cached(value)||moneyTime(value)||'');
}
const enEsc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let generation=0,queue=[],working=false,stopped=false;
const inflight=new Set();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function renderStatus(nodes,en){
 const vi=known(en);
 for(const el of nodes){
  if(!el.isConnected)continue;
  el.textContent=vi||'Đang lấy nghĩa tiếng Việt…';
  el.dataset.viState=vi?'ready':'pending';
 }
 return !!vi;
}
function markMissing(en,status){
  document.querySelectorAll('.option-vi[data-vi-en],.vi-select-inline[data-vi-en]').forEach(node=>{
    if(node.dataset.viEn!==en)return;
    node.textContent=status;
    node.dataset.viState='error';
  });
}
function emitChoice(parent,en,seedVi,cls='option-vi vi-meaning'){
 add(en,seedVi);
 const e=document.createElement('span');e.className=cls;e.dataset.viEn=en;
 const vi=known(en);
 e.textContent=vi||'Đang lấy nghĩa tiếng Việt…';e.dataset.viState=vi?'ready':'pending';
 parent.appendChild(e);return e;
}
function enhanceLabels(app){
 for(const label of app.querySelectorAll('label.option')){
   if(label.dataset.viEnhanced==='true')continue;
   label.dataset.viEnhanced='true';
   const input=label.querySelector('input');if(!input)continue;
   // Reading already has its own bilingual choices; only fill missing Vietnamese.
   if(label.querySelector('.option-en')){
     const english=label.querySelector('.option-en')?.textContent?.trim()||'';
     let vi=label.querySelector('.option-vi');
     if(!vi){vi=emitChoice(label.querySelector('span')||label,english,'');}
     else if(vi.textContent.trim()){vi.textContent=punctuateOptionVi(english,vi.textContent)}
     else if(!vi.textContent.trim()){
       vi.dataset.viEn=english;
       vi.textContent=known(english)||'Đang lấy nghĩa tiếng Việt…';
       vi.dataset.viState=known(english)?'ready':'pending';
     }
     continue;
   }
   const directText=Array.from(label.childNodes).filter(x=>x.nodeType===3).map(x=>x.textContent).join(' ').trim();
   if(!directText)continue;
   for(const node of Array.from(label.childNodes))if(node.nodeType===3)node.remove();
   const pair=document.createElement('span');pair.className='option-text-stack';
   const english=document.createElement('span');english.className='option-en';english.textContent=directText;
   pair.appendChild(english);
   emitChoice(pair,directText,'');
   label.appendChild(pair);label.classList.add('bilingual-option');
 }
}
function enhanceL2(app){
 for(const article of app.querySelectorAll('article.question[data-q]')){
   const select=article.querySelector('select.ans');if(!select)continue;
   const entries=[...select.options].filter(o=>o.value);
   if(!entries.length)continue;
   for(const o of entries){
      const en=o.value,vi=known(en);
      o.textContent=vi?`${en} — ${vi}`:en;
   }
   const list=document.createElement('div');list.className='l2-option-meanings vi-meaning';
   const title=document.createElement('div');title.className='l2-option-hint';title.textContent='Nghĩa tiếng Việt của các lựa chọn:';list.appendChild(title);
   for(const o of entries){
     const row=document.createElement('div');row.className='l2-option-row';
     const en=document.createElement('span');en.className='option-en';en.textContent=o.value;row.appendChild(en);
     emitChoice(row,o.value,'','option-vi vi-meaning');list.appendChild(row);
   }
   select.insertAdjacentElement('afterend',list);
 }
}
function collectPending(app){
  const seen=new Set(),q=[];
  for(const node of app.querySelectorAll('.option-vi[data-vi-en]')){
    const en=node.dataset.viEn;
    if(!en||known(en)||seen.has(en))continue;
    seen.add(en);q.push(en);
  }
  return q;
}
function reflect(en,vi){
  vi=punctuateOptionVi(en,vi);
  document.querySelectorAll('.option-vi[data-vi-en],.vi-select-inline[data-vi-en]').forEach(node=>{
    if(node.dataset.viEn!==en||!node.isConnected)return;
    node.textContent=vi;node.dataset.viState='ready';
  });
  document.querySelectorAll('article.question select.ans option').forEach(o=>{
    if(o.value===en)o.textContent=`${en} — ${vi}`;
  });
}
async function process(){
 if(working)return;
 working=true;
 try{
   while(queue.length){
     const job=queue.shift();if(job.generation!==generation)continue;
     const en=job.en;
     const before=known(en);if(before){reflect(en,before);continue}
     if(!staticVi?.translateText){markMissing(en,'Chưa có bản dịch (cần kết nối Internet)');continue}
     try{
       const tr=await staticVi.translateText(en,null,()=>{});
       // Reject responses that failed to translate and never claim verified translations.
       if(tr&&norm(tr)!==norm(en)){
         add(en,tr,true);reflect(en,tr);
       }else{markMissing(en,'Chưa có bản dịch tiếng Việt');}
     }catch(e){markMissing(en,'Chưa thể dịch · hãy thử lại khi có mạng');
       if(/429|limit|quota|403/i.test(String(e?.message||''))){
         for(const rest of queue.splice(0))markMissing(rest.en,'Dịch trực tuyến đã hết hạn mức');
       }
     }
     if(queue.length)await sleep(550);
   }
 }finally{working=false}
}
function enhance(app,ctx){
 generation++;queue=[];
 if(ctx?.state?.skill==='listening'){
   enhanceLabels(app);
   if(ctx.state.lpart==='L2')enhanceL2(app);
 }else enhanceLabels(app);
 queue=collectPending(app).map(en=>({en,generation}));
 // Do not send text to third-party service when user has turned Vietnamese OFF.
 if(ctx?.state?.showVi!==false)process();
}
function retry(app){
 if(!app)return;
 generation++;queue=collectPending(app).map(en=>({en,generation}));
 for(const el of app.querySelectorAll('.option-vi[data-vi-en]')){
   if(!known(el.dataset.viEn)) {el.textContent='Đang lấy nghĩa tiếng Việt…';el.dataset.viState='pending'}
 }
 process();
}
window.APTIS_ANSWER_VI={enhance,retry,known};
})();
