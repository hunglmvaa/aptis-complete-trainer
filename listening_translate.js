/* APTIS V4.0: Listening translation layer. Does not modify SOURCE questions or answer keys.
   Preferred engine: Chrome's built-in en->vi Translator API (if supported).
   Fallback: MyMemory public translation API (requires Internet, usage limits apply).
   Translations are stored separately in localStorage for subsequent offline viewing. */
(()=>{
'use strict';
const STORE_KEY='aptis_listening_vi_cache_v40';
const translationCache=(()=>{try{const o=JSON.parse(localStorage.getItem(STORE_KEY)||'{}');return o&&typeof o==='object'?o:{}}catch{return {}}})();
const entries=new Map();let nextId=0;let browserInstance=null;let browserRejected=false;
const encode=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const textBytes=s=>new TextEncoder().encode(s).length;
function keyOf(text){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return (h>>>0).toString(36)+'-'+text.length;}
function cached(text){const k=keyOf(text),item=translationCache[k]||window.APTIS_STATIC_LISTENING_VI?.[k];return item?.en===text?item.vi:null;}
function saveTranslation(text,vi){
  translationCache[keyOf(text)]={en:text,vi:String(vi)};
  try{const keys=Object.keys(translationCache);if(keys.length>4000)keys.slice(0,keys.length-4000).forEach(k=>delete translationCache[k]);localStorage.setItem(STORE_KEY,JSON.stringify(translationCache))}catch(e){console.warn('Translation cache could not be persisted',e)}
}
function getTranslationGroup(part,ctx){
  const d=ctx.cset()?.parts?.[part]; if(!d)return [];
  const base=ctx.cset()?.set_id||'set';
  const combinedQuestions=(d.questions||[]).map((x,i)=>`Câu ${i+1}: ${(x.options||[]).map((a,j)=>`${String.fromCharCode(65+j)}. ${a}`).join(' | ')}`).join('\n');
  if(part==='L3')return [{key:`${base}:L3`,label:'Hội thoại Man / Woman',en:(d.script_segments||[]).map(z=>`${z.speaker==='M'?'Man':'Woman'}: ${z.text}`).join('\n')},{key:`${base}:L3-questions`,label:'Các phát biểu / Statements',en:(d.statements||[]).map((x,i)=>`${i+1}. ${x.text}`).join('\n')}];
  if(part==='L4')return [{key:`${base}:L4`,label:'Bài nghe / Monologue',en:d.script_text||''},{key:`${base}:L4-options`,label:'Các phương án / Options',en:combinedQuestions}];
  return [];
}
function chunkText(text,max=400){
  const result=[];
  // Preserve word boundaries. Each remote request must stay below the 500-byte API cap.
  let rest=String(text||'').trim();
  while(rest){
    if(textBytes(rest)<=max){result.push(rest);break}
    let cut=Math.min(rest.length,max);
    while(cut>1&&textBytes(rest.slice(0,cut))>max)cut--;
    const head=rest.slice(0,cut);
    let at=Math.max(head.lastIndexOf('. ')+1,head.lastIndexOf('? ')+1,head.lastIndexOf('! ')+1,head.lastIndexOf('\n')+1);
    if(at<Math.floor(cut*.45))at=head.lastIndexOf(' ')+1;
    if(at<Math.floor(cut*.3))at=cut;
    result.push(rest.slice(0,at).trim());rest=rest.slice(at).trim();
  }
  return result.filter(Boolean);
}
async function nativeTranslator(report){
  if(browserInstance)return browserInstance;
  if(browserRejected||typeof window.Translator==='undefined'||typeof window.Translator.create!=='function')return null;
  // IMPORTANT: create() is invoked synchronously inside the click path (before any await).
  try{
    report('Chrome đang chuẩn bị bộ dịch Anh–Việt (có thể tải gói ngôn ngữ lần đầu)…');
    const instance=await window.Translator.create({sourceLanguage:'en',targetLanguage:'vi',monitor(m){m.addEventListener('downloadprogress',e=>report(`Chrome đang tải ngôn ngữ: ${Math.round((e.loaded||0)*100)}%`))}});
    browserInstance=instance;return instance;
  }catch(e){browserRejected=true;console.info('Chrome translator unavailable, falling back:',e);return null}
}
async function remoteTranslate(text){
  const link='https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=en%7Cvi';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try{
    const res=await fetch(link,{signal:controller.signal,headers:{Accept:'application/json'}});
    if(!res.ok)throw Error('HTTP '+res.status);
    const body=await res.json();
    if(Number(body.responseStatus)!==200||!body.responseData?.translatedText)throw Error(body.responseDetails||'Dịch máy không trả về kết quả.');
    const el=document.createElement('textarea');el.innerHTML=body.responseData.translatedText;
    const value=el.value.trim();
    if(!value||/^(MYMEMORY WARNING|QUERY LENGTH LIMIT)/i.test(value))throw Error(value||'Giới hạn dịch đã hết.');
    return value;
  }finally{clearTimeout(timeout)}
}
async function translateText(text,model,report){
  const original=String(text||'').trim();if(!original)return '';
  const hit=cached(original);if(hit!==null)return hit;
  let vi;
  if(model){
    try{vi=await model.translate(original)}catch(e){report('Bộ dịch Chrome gặp lỗi, chuyển sang dịch trực tuyến…');vi=null}
  }
  if(!vi){const chunks=chunkText(original);const result=[];for(const chunk of chunks){const already=cached(chunk);const tr=already!==null?already:await remoteTranslate(chunk);if(already===null)saveTranslation(chunk,tr);result.push(tr)}vi=result.join('\n')}
  saveTranslation(original,vi);return vi;
}
function renderCached(panel,parts){
  panel.innerHTML='<div class="vi-head">🇻🇳 Bản dịch tiếng Việt <small>DERIVED_MACHINE_TRANSLATION</small></div>'+parts.map(p=>`<div class="vi-row"><b>${encode(p.label)}</b><div class="vi-en">${encode(p.en)}</div><div class="vi-translated">${encode(cached(String(p.en).trim())||'')}</div></div>`).join('');
  panel.hidden=false;
}
function exportStatic(){
  const data=Object.assign({},window.APTIS_STATIC_LISTENING_VI||{},translationCache);
  const content='/* Listening translations are derived machine translations, NOT Aptis SOURCE. */\nwindow.APTIS_STATIC_LISTENING_VI = '+JSON.stringify(data,null,2)+';\n';
  const url=URL.createObjectURL(new Blob([content],{type:'text/javascript;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='listening_vi_data.js';document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  return Object.keys(data).length;
}
function attach(container,label,parts){
  if(!parts.length||!parts.some(p=>p.en))return;
  const key=String(++nextId);entries.set(key,parts.filter(p=>p.en));
  const actions=document.createElement('div');actions.className='listening-translation-actions';
  const button=document.createElement('button');button.className='btn secondary';button.type='button';button.dataset.action='translate-listening';button.dataset.translationId=key;
  button.textContent='🇻🇳 Dịch đầy đủ bài nghe + câu hỏi';button.title='Dịch máy, lưu kết quả tại trình duyệt. Nội dung và đáp án gốc không thay đổi.';
  actions.appendChild(button);
  const panel=document.createElement('div');panel.className='listening-vi-output vi-meaning';panel.hidden=true;panel.setAttribute('aria-live','polite');
  container.insertAdjacentElement('afterend',panel);container.insertAdjacentElement('afterend',actions);
  const allCached=parts.every(p=>cached(String(p.en).trim())!==null);
  if(allCached){button.textContent='🇻🇳 Ẩn bản dịch';renderCached(panel,parts)}
}
function enhance(app,ctx){
  entries.clear();nextId=0;
  const part=ctx.state.lpart,d=ctx.cset()?.parts?.[part];if(!d)return;
  if(part==='L1'){
    for(const article of app.querySelectorAll('article.question[data-q]')){
      const x=ctx.findListeningL1Item(article.dataset.q);if(!x)continue;
      const dialog=ctx.l1GeneratedSegments(x,ctx.state.l1StudyMode)||[];
      const parts=[{label:'Câu hỏi / Question',en:x.question_en||''},{label:'Hội thoại / Transcript',en:dialog.map(z=>`${z.speaker==='M'?'Man':'Woman'}: ${z.text}`).join('\n')},{label:'Các đáp án / Options',en:(x.options||[]).map((z,i)=>`${String.fromCharCode(65+i)}. ${z}`).join('\n')}];
      attach(article.querySelector('.qhead')||article.querySelector('.qtext'),part,parts);
    }
  }else if(part==='L2'){
    for(const article of app.querySelectorAll('article.question[data-q]')){
      const x=(d.speakers||[]).find(z=>z.id===article.dataset.q);if(!x)continue;
      const parts=[{label:`Speaker ${x.speaker||''} / Nội dung nghe`,en:x.script_text},{label:'Sáu đáp án / Options',en:(d.options||[]).map((z,i)=>`${i+1}. ${z}`).join('\n')}];
      attach(article.querySelector('.qtext'),part,parts);
    }
  }else{
    const section=app.querySelector('section.card:has(.head h2)');
    if(section){attach(section.querySelector('.head'),part,getTranslationGroup(part,ctx))}
  }
}
async function translatePanel(button){
  const parts=entries.get(button.dataset.translationId),panel=button.closest('.listening-translation-actions')?.nextElementSibling;
  if(!parts||!panel)return;
  if(!panel.hidden){panel.hidden=true;button.textContent='🇻🇳 Hiện bản dịch';return}
  const output=panel;button.disabled=true;
  const report=s=>{button.textContent=s};
  const cachedAll=parts.every(p=>cached(String(p.en).trim())!==null);
  // Start Chrome native model creation in the direct click turn to preserve user activation.
  const nativePromise=cachedAll?Promise.resolve(null):nativeTranslator(report);
  output.hidden=false;output.textContent='Đang chuẩn bị bản dịch tiếng Việt…';
  try{
    const model=await nativePromise;
    const translated=[];
    for(let i=0;i<parts.length;i++){
      const p=parts[i];report(`Đang dịch ${i+1}/${parts.length} mục…`);
      const vi=await translateText(p.en,model,report);
      translated.push({en:p.en,label:p.label,vi});
    }
    if(!output.isConnected)return;
    output.innerHTML='<div class="vi-head">🇻🇳 Bản dịch tiếng Việt <small>DERIVED_MACHINE_TRANSLATION</small></div>'+translated.map(p=>`<div class="vi-row"><b>${encode(p.label)}</b><div class="vi-en">${encode(p.en)}</div><div class="vi-translated">${encode(p.vi)}</div></div>`).join('');
    button.textContent='🇻🇳 Ẩn bản dịch';
  }catch(e){
    if(!output.isConnected)return;
    output.innerHTML=`<b>Chưa thể tải bản dịch đầy đủ.</b> ${encode(e?.message||e)}<div class="help">Kiểm tra Internet hoặc sử dụng Chrome trên máy tính có hỗ trợ dịch tích hợp. Các nghĩa Việt và KEY đã có sẵn trong app vẫn dùng được. Dịch máy có thể sai, nên đối chiếu với câu tiếng Anh.</div>`;
    button.textContent='↻ Thử dịch lại';
  }finally{button.disabled=false}
}
window.APTIS_LISTENING_TRANSLATE={enhance,translatePanel,exportStatic};
})();
