(()=>{
"use strict";
const DEFAULT=window.DEFAULT_APTIS_DATA;
const PRACTICE=window.READING_PRACTICE_BANK||{topics:[],items:[]};
const READ_VI=window.READING_VI_BANK||{r1:{leads:{},sentences:{}},glosses:{},topic_vi:{},practice_part1_context:{},practice_items:{}};
const L1_CANON=window.L1_CANONICAL_BANK||{meta:{},items:[],dialogues:{},batches:[]};
const L1_DIALOGUES=L1_CANON.dialogues||window.L1_DIALOGUE_BANK||{};
// L3 KEY ↔ CODE memory bank supplied by the user. Keep the mapping itself exactly as provided.
// vi/context/mnemonic fields below are DERIVED / GENERATED_PRACTICE aids for memorisation, not SOURCE exam data.
const KEY_CODE_ITEMS=[
  {id:"KC01",family:"12-xx",key:"Job",code:"12-01",vi:"Công việc",audio:"Job",anchors:["job","work","career","change jobs"],contexts:["She decided to change jobs after several years in the same company.","His work and career are the main focus of the discussion."],contextVi:["Cô ấy quyết định đổi việc sau vài năm ở cùng một công ty.","Công việc và sự nghiệp là trọng tâm của cuộc thảo luận."],mnemonic:"Họ 12 · chỉ nhớ đuôi 01: Job → 01."},
  {id:"KC02",family:"12-xx",key:"Beautiful / Art",code:"12-02",vi:"Cái đẹp / Nghệ thuật",audio:"Beautiful. Art.",anchors:["beautiful","art","painting","creative"],contexts:["They talk about art, beauty and the way a painting can make people feel.","The speaker describes something beautiful and creative."],contextVi:["Họ nói về nghệ thuật, cái đẹp và cảm xúc mà một bức tranh tạo ra.","Người nói mô tả một điều đẹp và sáng tạo."],mnemonic:"Họ 12 · Art đứng sau Job một bước: 01 → 02."},
  {id:"KC03",family:"12-xx",key:"Audition / Actor",code:"12-00",vi:"Thử vai / Diễn viên",audio:"Audition. Actor.",anchors:["audition","actor","acting","role"],contexts:["The actor is preparing for an audition and hopes to get the role.","They discuss acting, performers and trying out for a part."],contextVi:["Diễn viên đang chuẩn bị thử vai và hy vọng nhận được vai diễn.","Họ nói về diễn xuất, người biểu diễn và việc thử vai."],mnemonic:"Họ 12 · Audition là mốc 00."},
  {id:"KC04",family:"12-xx",key:"Technology",code:"12-20",vi:"Công nghệ",audio:"Technology",anchors:["technology","digital","device","online"],contexts:["New technology and digital devices have changed the way people communicate.","The conversation focuses on technology and online tools."],contextVi:["Công nghệ mới và thiết bị số đã thay đổi cách mọi người giao tiếp.","Cuộc trò chuyện tập trung vào công nghệ và công cụ trực tuyến."],mnemonic:"Họ 12 · Technology → đuôi 20."},
  {id:"KC05",family:"10-xx",key:"Social festival",code:"10-22",vi:"Lễ hội / sự kiện xã hội",audio:"Social festival",anchors:["festival","social event","celebration","people together"],contexts:["People come together for a local festival with music, food and activities.","The event is a social celebration for the whole community."],contextVi:["Mọi người tụ họp trong một lễ hội địa phương có âm nhạc, đồ ăn và hoạt động.","Sự kiện là một dịp giao lưu và ăn mừng cho cộng đồng."],mnemonic:"Nhóm 10 chỉ có một mốc chính: Social festival → 22."},
  {id:"KC06",family:"12-xx",key:"Home school",code:"12-10",vi:"Học tại nhà",audio:"Home school",anchors:["home school","study at home","parents teach","learning at home"],contexts:["The children study at home instead of attending a traditional school.","Their parents chose home schooling and organise lessons at home."],contextVi:["Trẻ học ở nhà thay vì đến trường truyền thống.","Cha mẹ chọn hình thức học tại nhà và tổ chức bài học ở nhà."],mnemonic:"Họ 12 · Home school → đuôi 10."},
  {id:"KC07",family:"20-xx",key:"Internet - framing - singer - music",code:"20-10",vi:"Internet / framing / ca sĩ / âm nhạc",audio:"Internet. Framing. Singer. Music.",anchors:["internet","singer","music","online"],contexts:["The discussion moves between the internet, a singer and music shared online.","They talk about music, a singer and how the internet changes what people see and hear."],contextVi:["Cuộc thảo luận xoay quanh internet, ca sĩ và âm nhạc được chia sẻ trực tuyến.","Họ nói về âm nhạc, một ca sĩ và cách internet thay đổi nội dung mọi người xem và nghe."],mnemonic:"Họ 20 · Internet/music → 10; Culture/Business → 11."},
  {id:"KC08",family:"20-xx",key:"Cultural difference",code:"20-11",vi:"Khác biệt văn hóa",audio:"Cultural difference",anchors:["culture","cultural difference","tradition","different customs"],contexts:["The speakers compare different cultures, traditions and customs.","They notice cultural differences when people from different countries meet."],contextVi:["Người nói so sánh các nền văn hóa, truyền thống và phong tục khác nhau.","Họ nhận thấy khác biệt văn hóa khi người từ các quốc gia khác nhau gặp nhau."],mnemonic:"Họ 20 · Cultural difference dùng 11."},
  {id:"KC09",family:"20-xx",key:"Business",code:"20-11",vi:"Kinh doanh",audio:"Business",anchors:["business","company","customer","market"],contexts:["The conversation is about a business, its customers and the way the company operates.","They discuss companies, markets and business decisions."],contextVi:["Cuộc trò chuyện nói về một doanh nghiệp, khách hàng và cách công ty hoạt động.","Họ thảo luận về công ty, thị trường và các quyết định kinh doanh."],mnemonic:"Business cũng dùng 20–11; đây là mã trùng với Cultural difference."},
  {id:"KC10",family:"0x-xx",key:"University - education - university life - volunteer",code:"01-21",vi:"Đại học / giáo dục / đời sống đại học / tình nguyện",audio:"University. Education. University life. Volunteer.",anchors:["university","education","curriculum","student life","volunteer"],contexts:["University students discuss education, campus life and volunteering.","The topic includes university life, a curriculum and opportunities to volunteer."],contextVi:["Sinh viên đại học nói về giáo dục, đời sống trong trường và hoạt động tình nguyện.","Chủ đề gồm đời sống đại học, chương trình học và cơ hội tình nguyện."],mnemonic:"University = 01–21; Children + technology = 00–21. Cùng đuôi 21, khác đầu 01/00."},
  {id:"KC11",family:"0x-xx",key:"Politics",code:"02-10",vi:"Chính trị",audio:"Politics",anchors:["politics","politician","government","election"],contexts:["The speakers discuss politics, government decisions and politicians.","The conversation is about political issues and public decisions."],contextVi:["Người nói thảo luận về chính trị, quyết định của chính phủ và các chính trị gia.","Cuộc trò chuyện nói về các vấn đề chính trị và quyết định công."],mnemonic:"Politics đứng riêng: 02–10."},
  {id:"KC12",family:"0x-xx",key:"Community",code:"01-20",vi:"Cộng đồng",audio:"Community",anchors:["community","local people","neighbourhood","residents"],contexts:["Local people work together to improve their community and neighbourhood.","The plan is designed for residents and the wider community."],contextVi:["Người dân địa phương cùng nhau cải thiện cộng đồng và khu phố.","Kế hoạch được thiết kế cho cư dân và cộng đồng rộng hơn."],mnemonic:"Community = 01–20; University = 01–21. Cùng đầu 01, khác đuôi 20/21."},
  {id:"KC13",family:"0x-xx",key:"Children and technology",code:"00-21",vi:"Trẻ em và công nghệ",audio:"Children and technology",anchors:["children","technology","screen","device","young people"],contexts:["The discussion is about children using technology, screens and digital devices.","They consider how technology affects young children."],contextVi:["Cuộc thảo luận nói về trẻ em sử dụng công nghệ, màn hình và thiết bị số.","Họ xem xét công nghệ ảnh hưởng đến trẻ nhỏ như thế nào."],mnemonic:"Children + technology = 00–21; University = 01–21. Cùng đuôi 21."}
];
const KEY_CODE_GROUPS=(()=>{const m=new Map();for(const x of KEY_CODE_ITEMS){if(!m.has(x.code))m.set(x.code,{code:x.code,family:x.family,keys:[],items:[]});const g=m.get(x.code);g.keys.push(x.key);g.items.push(x.id)}return [...m.values()]})();
const KEY_CODE_FAMILIES=["all","12-xx","20-xx","0x-xx","10-xx"];
const fmtCode=c=>String(c||"").replace("-","–");
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const STORE={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}},del(k){try{localStorage.removeItem(k)}catch{}}};
const APP_VERSION="3.9.0", USER_PK="aptis_v33_user_packs", ONLINE_PK="aptis_v34_online_cache", LEGACY_PK="aptis_v32_packs", SK="aptis_v32_state", VK="aptis_v32_voice";
const readStore=(k,fallback)=>{try{const v=JSON.parse(STORE.get(k)||"null");return v??fallback}catch{return fallback}};
function validatePack(p){if(!p||!p.pack_id||!Array.isArray(p.sets))throw new Error("Pack không hợp lệ: cần pack_id và sets[].");for(const s of p.sets){if(s.parts?.L1&&s.parts.L1.length!==24)throw new Error(`${s.set_id}: nếu có L1 thì phải đúng 24 câu.`)}return p}
function tagPack(p,source,version=""){const q=Object.assign({},p);q.__pack_source=source;q.__pack_version=version||p.pack_version||p.__pack_version||"";return q}
let userPacks=readStore(USER_PK,[]);
if(!userPacks.length){const legacy=readStore(LEGACY_PK,[]);userPacks=legacy.filter(p=>p?.pack_id&&p.pack_id!==DEFAULT.pack_id);if(userPacks.length)STORE.set(USER_PK,JSON.stringify(userPacks));}
let cache=readStore(ONLINE_PK,{manifest_version:"",updated_at:"",packs:[]});
let onlinePacks=(Array.isArray(cache.packs)?cache.packs:[]).map(p=>tagPack(p,"online-cache",p.__pack_version||p.pack_version||""));
if(!onlinePacks.length&&Array.isArray(window.BUNDLED_ONLINE_PACKS))onlinePacks=window.BUNDLED_ONLINE_PACKS.map(p=>tagPack(p,"bundled",p.__pack_version||p.pack_version||""));
let packs=[];let onlineStatus={state:"idle",message:"Đang dùng pack tích hợp sẵn.",manifest:cache.manifest_version||"",updated_at:cache.updated_at||""};
function rebuildPacks(){const map=new Map();map.set(DEFAULT.pack_id,tagPack(DEFAULT,"builtin",DEFAULT.pack_version||"3.3"));for(const p of onlinePacks){try{validatePack(p);map.set(p.pack_id,p)}catch{}}for(const p of userPacks){try{validatePack(p);if(!map.has(p.pack_id))map.set(p.pack_id,tagPack(p,"local",p.pack_version||""))}catch{}}packs=[...map.values()];if(state&&!packs.some(p=>p.pack_id===state.packId)){state.packId=DEFAULT.pack_id;state.setId=DEFAULT.sets?.[0]?.set_id||"SET_01";save();}}
let state=(()=>{try{return Object.assign({view:"practice",packId:DEFAULT.pack_id,skill:"listening",setId:"SET_01",lpart:"L1",rmode:"source",rpart:"R1",runit:{R1:"R1_S01",R23:"R23_T01",R4:"R4_T01",R5:"R5_T01"},ptopic:(PRACTICE.topics?.[0]||""),ppart:"part1",kcMode:"level1",kcFamily:"all",kcSmart:true,kcCurrent:null,kcLastId:"",kcStats:{correct:0,total:0,streak:0,best:0},kcItemStats:{},orders:{},attempts:{},showVi:true,l1Scope:"current",r1Scope:"current",l1StudyMode:"source",l1CheckIds:[],l1CheckRound:1,l1LearnRound:1,l1Batch:1},JSON.parse(STORE.get(SK)||"{}"))}catch{return{view:"practice",packId:DEFAULT.pack_id,skill:"listening",setId:"SET_01",lpart:"L1",rmode:"source",rpart:"R1",runit:{R1:"R1_S01",R23:"R23_T01",R4:"R4_T01",R5:"R5_T01"},ptopic:(PRACTICE.topics?.[0]||""),ppart:"part1",kcMode:"level1",kcFamily:"all",kcSmart:true,kcCurrent:null,kcLastId:"",kcStats:{correct:0,total:0,streak:0,best:0},kcItemStats:{},orders:{},attempts:{},showVi:true,l1Scope:"current",r1Scope:"current",l1StudyMode:"source",l1CheckIds:[],l1CheckRound:1,l1LearnRound:1,l1Batch:1}}})();
// Migrate V3.6 Key-Code state without breaking existing browser progress.
if(state.kcMode==="key-code")state.kcMode="level1";
if(!["level1","level2","level3","code-key","table"].includes(state.kcMode))state.kcMode="level1";
state.kcFamily=KEY_CODE_FAMILIES.includes(state.kcFamily)?state.kcFamily:"all";
if(typeof state.kcSmart!=="boolean")state.kcSmart=true;
state.kcItemStats=state.kcItemStats||{};
state.kcCurrent=null;
if(!["current","all"].includes(state.l1Scope))state.l1Scope="current";
if(!["current","all"].includes(state.r1Scope))state.r1Scope="current";
if(!["source","learn","check"].includes(state.l1StudyMode))state.l1StudyMode="source";
if(!Array.isArray(state.l1CheckIds))state.l1CheckIds=[];
state.l1CheckRound=Math.max(1,Number(state.l1CheckRound)||1);
state.l1LearnRound=Math.max(1,Number(state.l1LearnRound)||1);
state.l1Batch=Math.max(1,Math.min(Number(state.l1Batch)||1,(L1_CANON.batches?.length||6)));
let vs=(()=>{try{return Object.assign({male:"",female:"",extra1:"",extra2:"",rate:.95,random:false},JSON.parse(STORE.get(VK)||"{}"))}catch{return{male:"",female:"",extra1:"",extra2:"",rate:.95,random:false}}})();
let voices=[], speechToken=0; const app=$("#app");
function save(){STORE.set(SK,JSON.stringify(state))} function saveV(){STORE.set(VK,JSON.stringify(vs))} function saveUsers(){STORE.set(USER_PK,JSON.stringify(userPacks))}
rebuildPacks();
function cp(){return packs.find(x=>x.pack_id===state.packId)||packs[0]||DEFAULT}
function cset(){const p=cp();return (p.sets||[]).find(x=>x.set_id===state.setId)||(p.sets||[])[0]||null}
function bank(){return cp().reading_bank||DEFAULT.reading_bank}
function l1AllUniqueItems(){
  if(Array.isArray(L1_CANON.items)&&L1_CANON.items.length){return L1_CANON.items.map(x=>Object.assign({},x,{__sets:[`Canonical ${Math.floor((Number(x.source_no||1)-1)/24)+1}`]}));}
  const map=new Map();
  for(const set of (cp().sets||[])){for(const x of (set.parts?.L1||[])){if(!map.has(x.id))map.set(x.id,{item:x,sets:[]});map.get(x.id).sets.push(set.set_id)}}
  return [...map.values()].map(z=>Object.assign({},z.item,{__sets:z.sets})).sort((a,b)=>String(a.id).localeCompare(String(b.id),undefined,{numeric:true}));
}
function l1BatchItems(){
  const all=l1AllUniqueItems(),batches=L1_CANON.batches||[];
  if(batches.length){const b=batches.find(z=>Number(z.batch_id)===Number(state.l1Batch))||batches[0],m=new Map(all.map(x=>[x.id,x]));return (b.ids||[]).map(id=>m.get(id)).filter(Boolean)}
  const start=(Math.max(1,Number(state.l1Batch)||1)-1)*24;return all.slice(start,start+24);
}
function l1Category(x){
  const t=String(x?.key_vi?.type||"").toUpperCase();
  if(/GIÁ|SỐ LƯỢNG|CON SỐ|TUỔI|SĐT/.test(t))return "number";
  if(/THỜI GIAN|THỨ|NGÀY|THỜI LƯỢNG/.test(t))return "time";
  if(/ĐỊA ĐIỂM|KHU VỰC|PHÒNG|TẦNG/.test(t))return "place";
  if(/PHƯƠNG TIỆN/.test(t))return "transport";
  if(/LÝ DO|MỤC ĐÍCH|NGUYÊN NHÂN|LỜI KHUYÊN/.test(t))return "reason";
  if(/HOẠT ĐỘNG|THÓI QUEN|KẾ HOẠCH/.test(t))return "activity";
  if(/ĐỒ VẬT|MÓN ĂN|ĐỒ UỐNG|ĐỒ ĂN|MUA|MẤT|QUÊN|SỬA/.test(t))return "item";
  if(/NGHỀ|CÔNG VIỆC|HỌC TẬP|KHÓA HỌC|MÔN HỌC/.test(t))return "study";
  if(/SỞ THÍCH|CẢM XÚC|Ý KIẾN|THỜI TIẾT|ĐIỂM NỔI BẬT/.test(t))return "opinion";
  if(/MÀU SẮC|NGOẠI HÌNH|MÔ TẢ/.test(t))return "description";
  if(/AI \/|NGƯỜI NÀO|SỐNG VỚI AI|CHỤP AI/.test(t))return "person";
  return "general";
}
function buildL1CheckIds(){
  const all=l1AllUniqueItems(),prev=new Set(state.l1CheckIds||[]),fresh=all.filter(x=>!prev.has(x.id)),pool=fresh.length>=24?fresh:all;
  const groups=new Map();for(const x of pool){const c=l1Category(x);if(!groups.has(c))groups.set(c,[]);groups.get(c).push(x)}
  for(const [k,v] of groups)groups.set(k,shuffle(v));
  const cats=shuffle([...groups.keys()]),out=[];let i=0,guard=0;
  while(out.length<Math.min(24,pool.length)&&guard++<1000){const c=cats[i%cats.length],g=groups.get(c)||[];if(g.length)out.push(g.shift().id);i++}
  if(out.length<Math.min(24,pool.length)){for(const x of shuffle(pool)){if(!out.includes(x.id))out.push(x.id);if(out.length>=Math.min(24,pool.length))break}}
  return out;
}
function ensureL1CheckSet(force=false){
  const validIds=new Set(l1AllUniqueItems().map(x=>x.id)),ok=Array.isArray(state.l1CheckIds)&&state.l1CheckIds.length===Math.min(24,validIds.size)&&state.l1CheckIds.every(id=>validIds.has(id));
  if(force||!ok){state.l1CheckIds=buildL1CheckIds();if(force)state.l1CheckRound=(Number(state.l1CheckRound)||1)+1;save()}
  return state.l1CheckIds;
}
function newL1CheckSet(){ensureL1CheckSet(true);Object.keys(state.orders).filter(k=>k.includes(":L1CHECK")).forEach(k=>delete state.orders[k]);save()}
function l1CheckItems(){const ids=ensureL1CheckSet(false),m=new Map(l1AllUniqueItems().map(x=>[x.id,x]));return ids.map(id=>m.get(id)).filter(Boolean)}
function listeningL1Items(){if(state.l1StudyMode==="check")return l1CheckItems();return state.l1Scope==="all"?l1AllUniqueItems():l1BatchItems()}
function findListeningL1Item(id){return listeningL1Items().find(x=>x.id===id)||l1AllUniqueItems().find(x=>x.id===id)||null}
function l1OrderName(){return state.l1StudyMode==="check"?`L1CHECK:${state.l1CheckRound}`:(state.l1Scope==="all"?"L1ALL":`L1CANON:${state.l1Batch}`)}
function l1Hash(s){let h=2166136261;for(const ch of String(s||"")){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function l1Clean(s){return String(s??"").trim().replace(/[\s.?!]+$/g,"")}
function l1FixedDialogueSegments(x){const d=L1_DIALOGUES?.[x?.id];return Array.isArray(d?.segments)&&d.segments.length?d.segments:(x?.script_segments||[])}
function l1GeneratedSegments(x,mode=state.l1StudyMode){
  if(mode==="source"||mode==="check")return l1FixedDialogueSegments(x);
  const opts=x?.options||[],ai=Number(x?.answer_index)||0,ans=l1Clean(opts[ai]??x?.key_vi?.answer??""),ds=opts.map((v,i)=>({v:l1Clean(v),i})).filter(z=>z.i!==ai),round=state.l1LearnRound,h=l1Hash(`${x?.id}:${mode}:${round}`);
  if(ds.length>1&&(h%2))ds.reverse();const d1=ds[0]?.v||"the first option",d2=ds[1]?.v||"the other option",evidence=l1Clean(x?.key_vi?.evidence_en||""),q=String(x?.question_en||"").trim(),cat=l1Category(x),cue=evidence&&evidence.toLowerCase()!==ans.toLowerCase()?evidence:ans;
  if(mode==="learn"){
    const second={
      number:`I first noted ${d1}, but that figure belongs to a different detail. The number to remember here is ${ans}.`,
      time:`I almost wrote down ${d1}, but that is not the relevant time or day. The detail to remember is ${ans}.`,
      place:`${d1} is mentioned, so it is an easy trap. The place that matters here is ${ans}.`,
      transport:`Do not stop at ${d1}; that is only a distractor. The way the person actually travels is ${ans}.`,
      reason:`${d1} sounds possible, but it is not the real reason. The key idea is ${ans}.`,
      activity:`${d1} is one possibility, but the actual activity is ${ans}.`,
      item:`${d1} is mentioned, but the item we need to remember is ${ans}.`,
      study:`${d1} is discussed, but the relevant study or work detail is ${ans}.`,
      opinion:`${d1} is not the final view. The important opinion or preference is ${ans}.`,
      description:`Do not choose ${d1}. The description that matches is ${ans}.`,
      person:`${d1} is mentioned, but the person or group that matters is ${ans}.`,
      general:`${d1} appears in the context, but the detail to remember is ${ans}.`
    }[cat];
    return [{speaker:"M",text:q||"Listen for the key detail."},{speaker:"F",text:`${second}${cue&&cue.toLowerCase()!==ans.toLowerCase()?` Another useful clue is: ${cue}.`:""}`}];
  }
  return l1ContextCheckSegments(x,{ans,d1,d2,h,cat,q,cue});
}
function l1ContextCheckSegments(x,{ans,d1,d2,h,cat,q,cue}){
  const ql=String(q||"").toLowerCase();
  const v=h%3;
  const pair=(a,b)=>[{speaker:v===1?"F":"M",text:a},{speaker:v===1?"M":"F",text:b}];

  // PRICE / NUMBER / AGE / COUNT
  if(cat==="number"){
    if(/how much|cost|pay/.test(ql)){
      const A=[
        [`I checked the price before coming here and thought it was ${d1}. Has it changed?`,`Yes. ${d1} was the old price. ${d2} is for a different option, but the one we're talking about now costs ${ans}.`],
        [`I only brought enough money for ${d2}. Do I need more?`,`For this item, yes. The cheaper figure ${d1} was on last week's label. Today's price is ${ans}.`],
        [`The shelf shows two prices, ${d1} and ${d2}, and I'm not sure which one applies.`,`Those labels are for other versions. The current price for this one is ${ans}.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/how old/.test(ql)){
      const A=[
        [`I thought she was ${d1}, because her brother is around that age.`,`Her brother is, but she had her birthday recently. She's ${ans} now; ${d2} is another age mentioned in the family.`],
        [`Is she ${d2} already? I can never remember their ages.`,`Not yet. The person we're talking about is ${ans}. ${d1} is her friend's age.`],
        [`There are three ages in my notes: ${d1}, ${ans}, and ${d2}.`,`For her, use ${ans}. The other two belong to people mentioned earlier.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/phone number/.test(ql)) return pair(`I wrote down ${d1}, but the last two groups sounded unclear on the phone.`,`Let me read it slowly: ${ans}. The number ${d2} belongs to another shop nearby.`);
    if(/door|press/.test(ql)) return pair(`The announcement mentioned ${d1} and ${d2}, so I missed which one we actually need.`,`For this service, use ${ans}. The other numbers are for different routes or menu choices.`);
    return pair(`The first figure I heard was ${d1}, and later someone mentioned ${d2}.`,`Those refer to other details. For the situation we're discussing, the figure we need is ${ans}.`);
  }

  // TIMES / DAYS / DURATIONS
  if(cat==="time"){
    if(/train/.test(ql)){
      const A=[
        [`I was going to catch the service at ${d1}. Is that still the plan?`,`No, the timetable changed. ${d2} doesn't fit our connection, so we're taking the one at ${ans}.`],
        [`There are trains around ${d1}, ${d2}, and ${ans}. Which one gives us enough time?`,`The ${ans} service. The earlier one is unnecessary, and the other one gets us there too late.`],
        [`I heard there was a delay. Should I still arrive for ${d2}?`,`Come for the ${ans} train. ${d1} was the original time before the change.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/meeting|meet|appointment/.test(ql)){
      const A=[
        [`Can we meet at ${d1}? I have another appointment later.`,`That clashes with my schedule. ${d2} was suggested too, but ${ans} works for both of us.`],
        [`I put ${d2} in my calendar, but I'm not completely sure.`,`Change it to ${ans}. We discussed ${d1} first, then moved it because of another commitment.`],
        [`I can manage ${d1} or ${ans}, but not ${d2}.`,`Let's settle on ${ans}. That gives us enough time without rushing.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/how long/.test(ql)) return pair(`I expected the journey to take ${d1}, but traffic looks heavier today.`,`It won't be as long as ${d2}. Allow about ${ans}, and we should arrive comfortably.`);
    if(/due|day|when|weeks|usually/.test(ql)){
      const A=[
        [`I had ${d1} in mind, but I may have copied the old schedule.`,`The old plan did say ${d1}. The current arrangement is ${ans}; ${d2} belongs to a different activity.`],
        [`Does it happen on ${d2}, or have I mixed up the dates?`,`You've mixed them up. The relevant day or time is ${ans}. ${d1} is mentioned for something else.`],
        [`My calendar has three notes: ${d1}, ${d2}, and ${ans}.`,`Keep ${ans} for this one. The other two refer to separate events.`]
      ][v];return pair(A[0],A[1]);
    }
  }

  // TRANSPORT
  if(cat==="transport"){
    const A=[
      [`I thought she went by ${d1}, especially when the weather is bad.`,`Only occasionally. Most days she uses ${ans}; ${d2} is another option she has tried before.`],
      [`Does he normally use ${d2} for the journey?`,`Not now. He changed his routine and usually goes by ${ans}. ${d1} is what he used in the past.`],
      [`There are several ways to get there. I would probably choose ${d1}.`,`He considered that, but his regular way of travelling is ${ans}. ${d2} isn't practical for him.`]
    ][v];return pair(A[0],A[1]);
  }

  // PLACES / ROOMS / AREAS
  if(cat==="place"){
    if(/where is|where's|opposite|near/.test(ql)){
      const A=[
        [`I passed ${d1}, but I still couldn't find the place. Is it close to ${d2}?`,`You're nearly there. Look for ${ans}; that's the location described in the directions.`],
        [`The map makes it look as if it's ${d2}.`,`That marker is for another building. The place you want is ${ans}; ${d1} is nearby but not the destination.`],
        [`Should I turn toward ${d1} when I get there?`,`No. Follow the signs until you reach ${ans}. ${d2} is on the other side.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/room|floor/.test(ql)){
      const A=[
        [`I checked ${d1}, but nobody was there. Could it be ${d2}?`,`Neither. They've put us in ${ans}. The notice downstairs was updated this morning.`],
        [`The building has several rooms, and I always confuse them.`,`For this one, go to ${ans}. ${d1} is used by another group, and ${d2} is unavailable today.`],
        [`I was about to go to ${d2}.`,`Don't. We need ${ans}. ${d1} was listed on the old notice.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/meet|wait/.test(ql)){
      const A=[
        [`Shall we wait at ${d1}? It's easy to find.`,`It gets too crowded there. ${d2} was another idea, but let's use ${ans} instead.`],
        [`I can meet you at ${d2} if that's convenient.`,`Let's make it ${ans}. We talked about ${d1} earlier, but it isn't suitable today.`],
        [`Where exactly should I look for you? Near ${d1}?`,`No, I'll be at ${ans}. If you reach ${d2}, you've gone a little too far.`]
      ][v];return pair(A[0],A[1]);
    }
    const A=[
      [`I remember hearing about ${d1} and ${d2}, but which place did they finally choose?`,`They considered both, but the plan they kept was ${ans}.`],
      [`Would you choose ${d2} for this trip?`,`They thought about it, but ${ans} suited the situation better. ${d1} was discussed earlier.`],
      [`There were a few places in the conversation, so I lost track.`,`The important location is ${ans}. ${d1} and ${d2} are connected to other details.`]
    ][v];return pair(A[0],A[1]);
  }

  // ACTIVITIES / HABITS
  if(cat==="activity"){
    const A=[
      [`I know ${d1} is something she enjoys sometimes. Does she do that regularly?`,`Not usually. She may also do ${d2}, but her normal activity is ${ans}.`],
      [`Last time we talked, he mentioned ${d2}. Is that still what he does?`,`Only now and then. These days, ${ans} is the activity he does most often; ${d1} is less regular.`],
      [`There are so many things in her schedule: ${d1}, ${d2}, and ${ans}.`,`Yes, but ${ans} is the one that matches the time or situation we're talking about.`]
    ][v];return pair(A[0],A[1]);
  }

  // REASONS / ADVICE / CAUSES
  if(cat==="reason"){
    const A=[
      [`Was it because ${d1}? That would make sense.`,`That was mentioned, but it wasn't the main reason. ${d2} also played a part; the real reason was ${ans}.`],
      [`I assumed ${d2} was the reason for the decision.`,`Not really. The key point was ${ans}. ${d1} came up in the discussion but didn't cause the final decision.`],
      [`So the problem was ${d1}, right?`,`No. After they explained the situation, it became clear that ${ans} was the main reason. ${d2} was only background.`]
    ][v];return pair(A[0],A[1]);
  }

  // ITEMS / FOOD / DRINK / PURCHASES / LOST THINGS
  if(cat==="item"){
    if(/lost|forget/.test(ql)){
      const A=[
        [`She checked for her ${d1} first and then looked for her ${d2}.`,`She still had both of those. The thing she couldn't find was ${ans}.`],
        [`I thought he'd left his ${d2} at home.`,`He had that with him. What he actually forgot was ${ans}; ${d1} was in his bag.`],
        [`They searched the car for ${d1}. Was that what was missing?`,`No. They found ${d1}. The missing item was ${ans}; ${d2} was never lost.`]
      ][v];return pair(A[0],A[1]);
    }
    if(/drink|feed/.test(ql)){
      const A=[
        [`I offered ${d1}, but she didn't want it. Would ${d2} be better?`,`She sometimes has that, but today she chose ${ans}.`],
        [`Should I get ${d2} for them?`,`No, they already have that. What they need is ${ans}; ${d1} isn't suitable this time.`],
        [`I saw ${d1} and ${ans} on the table. Which one did he have?`,`He had ${ans}. ${d1} belonged to someone else, and ${d2} wasn't ordered.`]
      ][v];return pair(A[0],A[1]);
    }
    const A=[
      [`Do we still need ${d1}, or did someone buy it already?`,`That's already sorted, and so is ${d2}. The thing we still need is ${ans}.`],
      [`I was going to choose ${d2}, but I'm not sure it's the right one.`,`For this situation, take ${ans}. ${d1} was considered earlier but doesn't fit what they need.`],
      [`The list mentions ${d1}, ${d2}, and ${ans}.`,`Right, but ${ans} is the item connected with this part of the conversation.`]
    ][v];return pair(A[0],A[1]);
  }

  // STUDY / JOB / CAREER
  if(cat==="study"){
    const A=[
      [`He talked about ${d1} for a while. Did he finally choose that?`,`No. He also considered ${d2}, but in the end he chose ${ans} because it suited his plans better.`],
      [`I expected her to go into ${d2}.`,`She thought about it, but ${ans} matched her interests more closely. ${d1} was another possibility.`],
      [`There were a few study or career options: ${d1}, ${d2}, and ${ans}.`,`Yes, and after comparing them, ${ans} was the one they actually selected.`]
    ][v];return pair(A[0],A[1]);
  }

  // OPINIONS / FEELINGS / WEATHER / PREFERENCES
  if(cat==="opinion"){
    const A=[
      [`Some people focused on ${d1}, while others mentioned ${d2}. What stood out to him?`,`For him, the important thing was ${ans}. That's what he kept talking about afterwards.`],
      [`I thought she felt ${d1}, but her voice didn't quite sound like that.`,`That's because she actually felt ${ans}. ${d2} describes someone else in the conversation.`],
      [`Would you describe it as ${d2}?`,`Not in this case. The description or opinion that matches best is ${ans}; ${d1} doesn't fit what was said.`]
    ][v];return pair(A[0],A[1]);
  }

  // COLOUR / APPEARANCE / DESCRIPTION
  if(cat==="description"){
    const A=[
      [`I pictured it as ${d1}, but I may be remembering another one.`,`This one is ${ans}. ${d2} belongs to a different person or object they mentioned.`],
      [`Was it ${d2}? That's the detail I wrote down.`,`Not quite. The description given was ${ans}. ${d1} came up earlier.`],
      [`They compared several descriptions, including ${d1} and ${d2}.`,`The one that actually matches is ${ans}.`]
    ][v];return pair(A[0],A[1]);
  }

  // PEOPLE / GROUPS
  if(cat==="person"){
    const A=[
      [`I thought it involved ${d1}.`,`They were mentioned, but the person or group connected with this situation was ${ans}. ${d2} was part of another detail.`],
      [`Was ${d2} the one they were talking about?`,`No. It was ${ans}. ${d1} came up earlier in the conversation.`],
      [`There were several people mentioned, so I lost track.`,`The one you need here is ${ans}. The references to ${d1} and ${d2} belong elsewhere.`]
    ][v];return pair(A[0],A[1]);
  }

  // Fallback: still contextual, never uses test/answer/distractor language.
  const A=[
    [`At first I thought the detail was ${d1}, because that came up early in the conversation.`,`Later the situation changed. ${d2} belongs to something else, and the detail that applies now is ${ans}.`],
    [`I remember ${d2} being mentioned, but I may be mixing up two parts of the story.`,`That's what happened. For this part, the relevant detail is ${ans}; ${d1} was from an earlier point.`],
    [`There are three details in my notes: ${d1}, ${d2}, and ${ans}.`,`The situation develops a little, and by the end the one that applies is ${ans}.`]
  ][v];return pair(A[0],A[1]);
}
function l1OptionOrder(x){const ids=(x?.options||[]).map((_,i)=>i);if(state.l1StudyMode!=="check")return ids;return getShuffledOrder(orderKey(`L1CHECKOPT:${state.l1CheckRound}:${x.id}`),ids)}
function l1ModeLabel(){return state.l1StudyMode==="learn"?"HỌC KEY":state.l1StudyMode==="check"?"L1-CHECK":"HỘI THOẠI ĐẦY ĐỦ"}
function packSourceLabel(p){const s=p?.__pack_source||"local";if(s==="builtin")return "TÍCH HỢP";if(s==="online")return "ONLINE";if(s==="online-cache")return "CACHE ONLINE";if(s==="bundled")return "BUNDLED";return "IMPORT CÁ NHÂN"}
async function refreshOnlinePacks(force=false,silent=false){
  if(location.protocol==="file:"){onlineStatus={state:"idle",message:"Chế độ file:// dùng pack bundled. Muốn đồng bộ manifest GitHub, hãy dùng START_LOCAL_SERVER.bat hoặc GitHub Pages.",manifest:onlineStatus.manifest||"",updated_at:onlineStatus.updated_at||""};rebuildPacks();if(state.view==="packs")renderPacks();return false;}
  onlineStatus={state:"loading",message:"Đang kiểm tra pack trên GitHub…",manifest:onlineStatus.manifest||"",updated_at:onlineStatus.updated_at||""};
  if(state.view==="packs")renderPacks();
  try{
    const suffix=force?`?t=${Date.now()}`:"";
    const mr=await fetch(`packs/pack_manifest.json${suffix}`,{cache:force?"no-store":"no-cache"});
    if(!mr.ok)throw new Error(`Không tải được manifest (${mr.status}).`);
    const manifest=await mr.json();
    if(!Array.isArray(manifest.packs))throw new Error("Manifest không có packs[].");
    const previous=new Map(onlinePacks.map(p=>[p.pack_id,p])),loaded=[],errors=[];
    for(const e of manifest.packs.filter(x=>x.enabled!==false)){
      try{
        const sep=String(e.file).includes("?")?"&":"?",v=e.version?`${sep}v=${encodeURIComponent(e.version)}`:"";
        const r=await fetch(`packs/${e.file}${v}`,{cache:force?"no-store":"default"});
        if(!r.ok)throw new Error(`HTTP ${r.status}`);
        const raw=validatePack(await r.json());
        if(e.pack_id&&raw.pack_id!==e.pack_id)throw new Error(`pack_id không khớp manifest: ${e.pack_id}`);
        loaded.push(tagPack(raw,"online",e.version||raw.pack_version||""));
      }catch(err){
        const old=previous.get(e.pack_id);if(old)loaded.push(tagPack(old,"online-cache",e.version||old.__pack_version||""));
        errors.push(`${e.pack_id||e.file}: ${err.message}`);
      }
    }
    if(!loaded.length&&manifest.packs.some(x=>x.enabled!==false))throw new Error(errors.join("; ")||"Không tải được pack online.");
    onlinePacks=loaded;
    const now=new Date().toISOString();
    STORE.set(ONLINE_PK,JSON.stringify({manifest_version:manifest.manifest_version||"",updated_at:now,packs:onlinePacks}));
    onlineStatus={state:errors.length?"warn":"ok",message:errors.length?`Đã cập nhật, nhưng ${errors.length} pack dùng cache.`:`Đã đồng bộ ${onlinePacks.length} pack từ GitHub.`,manifest:manifest.manifest_version||"",updated_at:now};
    rebuildPacks();
    if(state.view==="packs")renderPacks();else if(state.view==="practice")renderPractice();
    return true;
  }catch(err){
    onlineStatus={state:"error",message:`Không thể cập nhật online; app tiếp tục dùng pack tích hợp/cache. ${err.message}`,manifest:onlineStatus.manifest||"",updated_at:onlineStatus.updated_at||""};
    rebuildPacks();
    if(state.view==="packs")renderPacks();
    if(!silent)console.warn("APTIS online pack update:",err);
    return false;
  }
}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function shuffleDifferent(a){const src=[...a];if(src.length<2)return src;let out=shuffle(src);if(out.every((v,i)=>v===src[i]))out=[...src.slice(1),src[0]];return out}
function getShuffledOrder(key,ids){const o=state.orders[key],valid=Array.isArray(o)&&o.length===ids.length&&o.every(x=>ids.includes(x)),sameAsSource=valid&&o.every((v,i)=>v===ids[i]);if(valid&&!sameAsSource)return o;const out=shuffleDifferent(ids);state.orders[key]=out;save();return out}
function orderKey(extra=""){return `${state.packId}:${state.skill}:${state.setId}:${state.lpart}:${state.rmode||"source"}:${state.rpart}:${state.runit?.[state.rpart]||""}:${state.ptopic||""}:${state.ppart||""}:${extra}`}
function getOrder(key,ids){const o=state.orders[key];return Array.isArray(o)&&o.length===ids.length&&o.every(x=>ids.includes(x))?o:[...ids]}
function setOrder(key,o){state.orders[key]=o;save()}
function resetOrder(key){delete state.orders[key];save()}
function l4HistoryKey(qid){return `${state.packId}:${state.setId}:${qid}`}
function prepareL4OptionOrders(d){
  state.l4LastPos=state.l4LastPos||{};
  const out=new Map(),used=new Set();
  for(const x of (d.questions||[])){
    const ids=(x.options||[]).map((_,i)=>i);
    let ans=Number(x.answer_index);if(!Number.isInteger(ans)||!ids.includes(ans))ans=0;
    const hk=l4HistoryKey(x.id),prev=Number.isInteger(state.l4LastPos[hk])?state.l4LastPos[hk]:null;
    let candidates=ids.filter(pos=>pos!==prev);
    const unused=candidates.filter(pos=>!used.has(pos));if(unused.length)candidates=unused;
    if(!candidates.length)candidates=[...ids];
    const target=candidates[Math.floor(Math.random()*candidates.length)];
    const distractors=shuffle(ids.filter(i=>i!==ans));
    const ord=[];let di=0;for(let pos=0;pos<ids.length;pos++)ord.push(pos===target?ans:distractors[di++]);
    out.set(x.id,ord);used.add(target);state.l4LastPos[hk]=target;
  }
  save();return out;
}
function provBadge(v){const s=String(v||"");if(s.includes("GENERATED"))return '<span class="badge generated">GENERATED_PRACTICE</span>';if(s.includes("DERIVED"))return '<span class="badge derived">DERIVED_GUIDANCE</span>';if(s.includes("INCOMPLETE"))return '<span class="badge incomplete">SOURCE_INCOMPLETE</span>';return '<span class="badge source">SOURCE</span>'}
function provFromObject(o){const vals=Object.values(o||{}).map(String);let h="";if(vals.some(x=>x.includes("SOURCE")))h+=provBadge("SOURCE");if(vals.some(x=>x.includes("GENERATED")))h+=provBadge("GENERATED_PRACTICE");if(vals.some(x=>x.includes("DERIVED")))h+=provBadge("DERIVED_GUIDANCE");return h||provBadge("SOURCE")}
function markEl(el,ok){if(!el)return;el.classList.remove("correct","wrong");el.classList.add(ok?"correct":"wrong")}
function score(c,t){return `<div class="feedback"><span class="${c/t>=.8?"good":"bad"}">${c}/${t} · ${Math.round(c/t*100)}%</span></div>`}
function rec(k,c,t){state.attempts[k]={correct:c,total:t,pct:t?c/t:0,date:Date.now()};save()}
function stop(){speechToken++;try{speechSynthesis.cancel()}catch{}}
function vuri(u){return voices.find(v=>v.voiceURI===u)||voices[0]||null}
function loadVoices(){if(!('speechSynthesis'in window))return;voices=speechSynthesis.getVoices().filter(v=>/^en([-_]|$)/i.test(v.lang));if(!vs.male||!voices.some(v=>v.voiceURI===vs.male))vs.male=(voices.find(v=>/(david|mark|george|guy|ryan|eric|daniel|james|male)/i.test(v.name))||voices[0])?.voiceURI||"";if(!vs.female||!voices.some(v=>v.voiceURI===vs.female))vs.female=(voices.find(v=>/(aria|jenny|zira|samantha|hazel|susan|sonia|libby|emma|natasha|female)/i.test(v.name)&&v.voiceURI!==vs.male)||voices.find(v=>v.voiceURI!==vs.male)||voices[0])?.voiceURI||"";saveV();if(state.view==="voices")render()}
function voiceFor(role,i=0,strictGender=false){if(!voices.length)return null;if(strictGender){if(role==="M")return voices.find(v=>v.voiceURI===vs.male)||vuri(vs.male);if(role==="F")return voices.find(v=>v.voiceURI===vs.female)||vuri(vs.female);}if(vs.random)return voices[Math.floor(Math.random()*voices.length)];const extras=[vs.extra1,vs.extra2].filter(Boolean);if(role==="M")return vuri(vs.male);if(role==="F")return vuri(vs.female);return vuri(extras[i%Math.max(1,extras.length)]||vs.female||vs.male)}
function speakOne(text,voice,token){return new Promise(res=>{if(token!==speechToken){res();return}const u=new SpeechSynthesisUtterance(String(text||""));u.rate=Number(vs.rate)||.95;u.lang=voice?.lang||"en-GB";if(voice)u.voice=voice;let done=false;const keep=setInterval(()=>{if(token===speechToken&&speechSynthesis.speaking&&!speechSynthesis.paused){try{speechSynthesis.pause();setTimeout(()=>{try{speechSynthesis.resume()}catch{}},30)}catch{}}},14000);const fin=()=>{if(done)return;done=true;clearInterval(keep);res()};u.onend=fin;u.onerror=fin;speechSynthesis.speak(u)})}
async function speakSegments(a,strictGender=false){stop();const t=speechToken;for(let i=0;i<a.length;i++){if(t!==speechToken)break;await speakOne(a[i].text,voiceFor(a[i].speaker,i,strictGender),t);if(t===speechToken)await new Promise(r=>setTimeout(r,120));}}
async function speakText(s,i=0){stop();const t=speechToken;await speakOne(s,voiceFor("",i),t)}
function topControls(){const p=cp(),s=cset(),sets=(p.sets||[]),viVisible=state.showVi!==false,l1Active=state.skill==="listening"&&state.lpart==="L1",l1Check=l1Active&&state.l1StudyMode==="check",l1Full=l1Active&&!l1Check&&state.l1Scope==="all",l1FullCount=l1Active?l1AllUniqueItems().length:0,batches=L1_CANON.batches||[];return `<section class="card"><div class="toolbar space"><div class="toolbar"><select id="packSel" class="select" aria-label="Chọn pack">${packs.map(x=>`<option value="${esc(x.pack_id)}" ${x.pack_id===p.pack_id?"selected":""}>${esc(x.title)} · ${esc(packSourceLabel(x))}</option>`).join("")}</select>${l1Active?`<select id="l1BatchSel" class="select full-aware-select" aria-label="Chọn bộ L1 canonical"><option value="__L1_CHECK__" ${l1Check?"selected":""}>★ L1-CHECK · 24/143 câu ngẫu nhiên</option><option value="__L1_FULL__" ${l1Full?"selected":""}>★ FULL L1 · ${l1FullCount} câu canonical</option>${batches.map(b=>`<option value="${b.batch_id}" ${!l1Full&&!l1Check&&Number(state.l1Batch)===Number(b.batch_id)?"selected":""}>Bộ Canonical ${b.batch_id} · ${b.count} câu</option>`).join("")}</select>`:(sets.length?`<select id="setSel" class="select" aria-label="Chọn set">${sets.map(x=>`<option value="${esc(x.set_id)}" ${s&&x.set_id===s.set_id?"selected":""}>${esc(x.title)}</option>`).join("")}</select>`:"")}</div><div class="toolbar"><button class="btn vi-toggle ${viVisible?"secondary":"ghost"}" data-action="toggle-vi">${viVisible?"🙈 Ẩn nghĩa Việt":"🇻🇳 Hiện nghĩa Việt"}</button><span class="pill">L1 Canonical ${esc(L1_CANON.meta?.version||"3.9.0")} · ${l1FullCount||143} verified</span></div></div><div class="skilltabs"><button class="skilltab ${state.skill==="listening"?"active":""}" data-skill="listening">🎧 Listening</button><button class="skilltab ${state.skill==="reading"?"active":""}" data-skill="reading">📖 Reading</button></div></section>`}
function listeningControls(){const l1=state.lpart==="L1",currentCount=l1?l1BatchItems().length:(cset()?.parts?.L1?.length||0),allCount=l1?l1AllUniqueItems().length:0,check=state.l1StudyMode==="check";return `<section class="card"><div class="toolbar space"><div class="tabs">${["L1","L2","L3","L4"].map(x=>`<button class="tab ${state.lpart===x?"active":""}" data-lpart="${x}">${x}</button>`).join("")}</div><div class="toolbar"><button class="btn secondary" data-action="shuffle">🔀 Xáo thứ tự</button><button class="btn ghost" data-action="original">↺ Thứ tự gốc</button><button class="btn danger" data-action="stop-audio">■ Stop</button></div></div>${l1?`<div class="l1-modebar"><span class="scope-label">Cách luyện:</span><button class="btn small ${state.l1StudyMode==="source"?"secondary":"ghost"}" data-l1mode="source">1 · Hội thoại canonical</button><button class="btn small ${state.l1StudyMode==="learn"?"secondary":"ghost"}" data-l1mode="learn">2 · Học KEY</button><button class="btn full-btn small ${check?"secondary":"ghost"}" data-l1mode="check">3 · ★ L1-CHECK</button>${state.l1StudyMode==="learn"?`<button class="btn ghost small" data-action="new-l1-learn">🔄 Đổi cách nghe</button>`:""}${check?`<button class="btn key small" data-action="new-l1-check">🎲 Tạo CHECK mới</button><span class="help">Bộ #${state.l1CheckRound} · chọn ngẫu nhiên 24/${allCount} câu canonical · options xáo.</span>`:""}</div>${!check?`<div class="l1-scopebar"><span class="scope-label">Phạm vi:</span><button class="btn small ${state.l1Scope!=="all"?"secondary":"ghost"}" data-l1scope="current">Bộ Canonical ${state.l1Batch} · ${currentCount} câu</button><button class="btn full-btn small ${state.l1Scope==="all"?"secondary":"ghost"}" data-l1scope="all">★ FULL L1 · ${allCount} câu chuẩn</button>${state.l1Scope==="all"?`<span class="help">Đã loại duplicate và bỏ 135/151/157 vì nguồn không đủ.</span>`:""}</div>`:""}`:""}</section>`}
function readingUnitOptions(part){const b=bank();if(part==="R1")return (b.R1?.sets||[]).map(x=>({id:x.set_id,label:`R1 · Bộ ${x.source_variant||x.source_printed_no||x.internal_set_no}`}));if(part==="R23")return (b.R23?.topics||[]).map(x=>({id:x.topic_id,label:`R2–3 · ${x.source_printed_no}. ${x.topic_en}`}));if(part==="R4")return (b.R4?.topics||[]).map(x=>({id:x.topic_id,label:`R4 · ${x.topic_en}`}));if(part==="R5")return (b.R5?.topics||[]).map(x=>({id:x.topic_id,label:`R5 · ${x.title_en_teacher}`}));return[]}
function ensureReadingUnit(){const opts=readingUnitOptions(state.rpart);if(!opts.some(x=>x.id===state.runit?.[state.rpart])){state.runit=state.runit||{};state.runit[state.rpart]=opts[0]?.id||"";save()}}
function practiceTopics(){return PRACTICE.topics||[]}
function practicePartLabel(p){return p==="part1"?"R1":p==="part2"?"R2–3":p==="part4"?"R4":"R5"}
function readingControls(){
  if((state.rmode||"source")==="source"){
    ensureReadingUnit();const opts=readingUnitOptions(state.rpart),r1AllCount=bank().R1?.items?.length||0;
    return `<section class="card">
      <div class="toolbar space"><div class="tabs">
        <button class="tab ${state.rmode!=="practice"?"active":""}" data-rmode="source">SOURCE · 39 bài</button>
        <button class="tab ${state.rmode==="practice"?"active":""}" data-rmode="practice">PRACTICE · 10 chủ đề</button>
      </div><span class="pill">Đã đối chiếu lại 4 tài liệu Reading</span></div>
      <div class="toolbar space" style="margin-top:10px"><div class="tabs">${["R1","R23","R4","R5"].map(x=>`<button class="tab ${state.rpart===x?"active":""}" data-rpart="${x}">${x==="R23"?"R2–3":x}</button>`).join("")}</div>
      <div class="toolbar"><select id="runitSel" class="select full-aware-select">${state.rpart==="R1"?`<option value="__R1_FULL__" ${state.r1Scope==="all"?"selected":""}>★ FULL R1 · ${r1AllCount} câu / ${(bank().R1?.sets||[]).length} bài</option>`:""}${opts.map(x=>`<option value="${esc(x.id)}" ${state.r1Scope!=="all"&&x.id===state.runit[state.rpart]?"selected":""}>${esc(x.label)}</option>`).join("")}</select><button class="btn secondary" data-action="shuffle">🔀 Xáo</button>${state.rpart==="R5"?"":`<button class="btn ghost" data-action="original">↺ Gốc</button>`}</div></div>
      ${state.rpart==="R1"?`<div class="l1-scopebar"><span class="scope-label">R1:</span><button class="btn small ${state.r1Scope!=="all"?"secondary":"ghost"}" data-r1scope="current">Bộ hiện tại · 5 câu</button><button class="btn full-btn small ${state.r1Scope==="all"?"secondary":"ghost"}" data-r1scope="all">★ FULL R1 · ${r1AllCount} câu</button>${state.r1Scope==="all"?`<span class="help">Đủ ${(bank().R1?.sets||[]).length} bài; giữ lead/context của từng bài.</span>`:""}</div>`:""}
      <div class="note source" style="margin-top:10px"><b>SOURCE đã kiểm chứng:</b> R1 17 bài/85 blanks · R2–3 13 bài/65 câu · R4 6 bài/42 câu · R5 3 chủ đề/21 headings. Numbering lạ của tài liệu được giữ nguyên.</div>
    </section>`;
  }
  const topics=practiceTopics();if(!topics.includes(state.ptopic))state.ptopic=topics[0]||"";
  return `<section class="card">
    <div class="toolbar space"><div class="tabs">
      <button class="tab" data-rmode="source">SOURCE · 39 bài</button>
      <button class="tab active" data-rmode="practice">PRACTICE · 10 chủ đề</button>
    </div><span class="pill">90 items · GENERATED_PRACTICE</span></div>
    <div class="toolbar space" style="margin-top:10px"><div class="tabs">${["part1","part2","part4","part5"].map(x=>`<button class="tab ${state.ppart===x?"active":""}" data-ppart="${x}">${practicePartLabel(x)}</button>`).join("")}</div>
    <div class="toolbar"><select id="ptopicSel" class="select">${topics.map(t=>`<option value="${esc(t)}" ${t===state.ptopic?"selected":""}>${esc(t.replace(/^Day \d+ · /,""))}</option>`).join("")}</select><button class="btn secondary" data-action="shuffle">🔀 Xáo</button>${state.ppart==="part5"?"":`<button class="btn ghost" data-action="original">↺ Gốc</button>`}</div></div>
    <div class="note generated" style="margin-top:10px"><b>PRACTICE:</b> 10 chủ đề/90 item lấy từ app Day 1–Day 5 trước đây. Đây là bài luyện sinh thêm, không phải đề SOURCE trong 4 tài liệu vừa gửi.</div>
  </section>`;
}
function applyViVisibility(){document.body.classList.toggle("hide-vi",state.showVi===false)}
function renderPractice(){
  applyViVisibility();
  try{
    app.innerHTML=topControls()+(state.skill==="listening"?listeningControls()+renderListening():readingControls()+renderReading());
  }catch(err){
    console.error("APTIS renderPractice error:",err);
    app.innerHTML=`<section class="card"><div class="note incomplete"><b>Lỗi hiển thị:</b> ${esc(err?.message||err)}<br>Hãy chuyển phần khác hoặc tải lại trang. Dữ liệu học không bị xóa.</div></section>`;
  }
  bindDynamic();
}
function renderListening(){const s=cset();if(!s?.parts)return `<section class="card"><div class="note info">Pack/set này không có Listening. Hãy chọn pack khác hoặc chuyển sang Reading.</div></section>`;const p=state.lpart,d=s.parts[p];if(!d)return `<section class="card">Không có ${esc(p)} trong set này.</section>`;if(p==="L1")return renderL1(s,d);if(p==="L2")return renderL2(d);if(p==="L3")return renderL3(d);return renderL4(d)}
function renderL1(s,d){
  const checkMode=state.l1StudyMode==="check",allMode=!checkMode&&state.l1Scope==="all",items=listeningL1Items(),ids=items.map(x=>x.id),k=orderKey(l1OrderName()),ord=getOrder(k,ids),m=new Map(items.map(x=>[x.id,x])),mode=l1ModeLabel();
  const title=checkMode?`L1-CHECK · Bộ #${state.l1CheckRound} · ${items.length} câu trộn`:state.l1StudyMode==="learn"?`Listening Part 1 · Học KEY · ${allMode?"FULL":"bộ hiện tại"}`:allMode?`Listening Part 1 · Tất cả ${items.length} câu duy nhất`:`Listening Part 1 · Bộ Canonical ${state.l1Batch}`;
  const provenance=state.l1StudyMode==="learn"?"GENERATED_LEARNING":"GENERATED_CANONICAL_DIALOGUE";
  return `<section class="card"><div class="head"><h2>${title}</h2><div class="sub"><b>${items.length} câu</b> · ${mode} · Nghe → chọn → Chấm; Bài đọc và Key mở riêng.</div></div><div class="note generated"><b>Question/options/answer = SOURCE_DOCX_VERIFIED.</b> Audio ở chế độ này = <b>${provenance}</b>, không phải transcript/audio Aptis gốc.${state.l1StudyMode==="source"?` <b>L1 thường:</b> dùng 143 câu canonical đã đối chiếu nguồn; mỗi câu có một dialogue cố định mới.`:""}${state.l1StudyMode==="learn"?` <b>Học KEY:</b> nghe câu hỏi + một distractor + đáp án chốt để tạo liên kết nhớ.`:""}${checkMode?` <b>L1-CHECK:</b> chỉ random 24/${l1AllUniqueItems().length} câu và xáo options; transcript/audio lấy nguyên dialogue cố định của từng câu, không sinh lại nội dung khi chạy.`:""}</div>${ord.map((id,n)=>{const x=m.get(id),sets=x.__sets||[],segs=l1GeneratedSegments(x,state.l1StudyMode),optOrd=l1OptionOrder(x);return `<article class="question" data-q="${esc(id)}"><div class="qhead"><div><div class="number">Câu ${n+1}/${items.length} · Nguồn #${esc(x.source_no||id)} · ${esc(id)}</div><div class="qtext">${esc(x.question_en)}</div></div><div>${provFromObject(x.provenance)}<span class="badge generated">${provenance}</span></div></div><div class="toolbar"><button class="btn secondary" data-action="play-l1" data-id="${esc(id)}">▶ Nghe</button><button class="btn danger" data-action="stop-audio">■ Stop</button><button class="btn ghost" data-action="toggle" data-target="scr-${esc(id)}">📄 Bài đọc</button></div><div id="scr-${esc(id)}" class="script hidden">${segs.map(z=>`<b>${z.speaker==="M"?"Man":"Woman"}:</b> ${esc(z.text)}`).join("<br>")}</div><div class="options">${optOrd.map(i=>`<label class="option"><input type="radio" name="${esc(id)}" value="${i}"> ${esc(x.options[i])}</label>`).join("")}</div><div class="toolbar"><button class="btn key" data-action="toggle" data-target="key-${esc(id)}">🔑 Hiện Key</button><button class="btn" data-action="check-l1-item" data-id="${esc(id)}">✓ Chấm câu</button></div><div id="key-${esc(id)}" class="keybox hidden"><h4>Key & móc nhớ</h4><div class="vi-meaning"><b>Dạng:</b> ${esc(x.key_vi?.type)}</div><div class="key-answer">Đáp án SOURCE: ${esc(x.options?.[x.answer_index]??x.key_vi?.answer??"")}</div><div class="evidence"><b>Trạng thái:</b> ${esc(x.canonical_status||"SOURCE_VERIFIED")}</div><div class="vi-meaning">${esc(x.key_vi?.explanation)}</div><div class="evidence"><b>Evidence/KEY:</b> ${esc(x.key_vi?.evidence_en)}</div>${state.l1StudyMode!=="source"?`<div class="evidence"><b>Móc nghe:</b> ngữ cảnh → thông tin nhiễu/paraphrase → <span class="key-answer">${esc(x.options?.[x.answer_index]??"")}</span></div>`:""}</div><div id="fb-${esc(id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><div class="counter">L1: ${items.length} câu · ${mode}.</div><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn secondary" data-action="play-wrong">▶ Nghe lại câu sai</button>${checkMode?`<button class="btn key" data-action="new-l1-check">🎲 CHECK mới</button>`:""}<button class="btn danger" data-action="stop-audio">■ Stop</button><button class="btn" data-action="check-l1-all">✓ Chấm toàn bộ</button></div></div></section>`;
}
function l2KeyData(x){
  const k=L2_CANONICAL_KEY_BANK[x?.id];
  if(k)return k;
  const raw=String(x?.key_vi?.evidence_en||"").split(" · ").map(s=>s.trim()).filter(Boolean);
  return {answer_en:x?.answer||"",answer_vi:x?.key_vi?.answer||"",keys:raw.map(en=>({en,vi:""})),explanation_vi:x?.key_vi?.explanation||"",trap_vi:"",evidence_sentence:"",provenance:"SOURCE",translation_provenance:""};
}
function reEsc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function l2TranscriptHtml(text,keyData){
  const terms=(keyData?.keys||[]).map(k=>k.en).filter(Boolean).sort((a,b)=>b.length-a.length);
  let raw=String(text||"");
  if(terms.length){
    try{const rx=new RegExp(terms.map(reEsc).join("|"),"gi");raw=raw.replace(rx,m=>`\uE000${m}\uE001`)}catch{}
  }
  return esc(raw).replace(/\uE000/g,'<strong class="l2-key-highlight">').replace(/\uE001/g,'</strong>');
}
function l2KeyHtml(x){
  const k=l2KeyData(x),items=(k.keys||[]).map(z=>`<li><strong>${esc(z.en)}</strong>${z.vi?` <span class="vi-meaning">— ${esc(z.vi)}</span>`:""}</li>`).join("");
  return `<div class="key-answer"><b>Đáp án SOURCE:</b> ${esc(k.answer_en||x.answer)}${k.answer_vi?` <span class="vi-meaning">— ${esc(k.answer_vi)}</span>`:""}</div>
  <div class="l2-key-title"><b>🔑 KEY nghe trong transcript:</b> <span class="badge source">${esc(k.provenance||"SOURCE_RED_HIGHLIGHT")}</span></div>
  <ul class="l2-key-list">${items||'<li>Chưa có key phrase trong dữ liệu nguồn.</li>'}</ul>
  ${k.explanation_vi?`<div class="l2-explain vi-meaning">${esc(k.explanation_vi)}</div>`:""}
  ${k.trap_vi?`<div class="evidence vi-meaning"><b>Bẫy dễ nhầm:</b> ${esc(k.trap_vi)}</div>`:""}
  ${k.evidence_sentence?`<div class="evidence"><b>Câu evidence:</b> ${esc(k.evidence_sentence)}</div>`:""}
  ${k.data_warning?`<div class="note incomplete" style="margin-top:8px"><b>Cảnh báo dữ liệu:</b> ${esc(k.data_warning)}</div>`:""}
  <div class="sub vi-meaning" style="margin-top:6px">Nghĩa tiếng Việt của KEY = DERIVED_TRANSLATION để hỗ trợ học; KEY tiếng Anh giữ theo canonical/source red highlight.</div>`;
}
function renderL2(d){const ids=(d.speakers||[]).map(x=>x.id),ord=getOrder(orderKey("L2"),ids),m=new Map(d.speakers.map(x=>[x.id,x]));return `<section class="card"><div class="head"><h2>L2 · ${esc(d.title)}</h2><div class="sub vi-meaning">${esc(d.title_vi)}</div></div><div class="note source">Transcript tiếng Anh, đáp án đúng và KEY/paraphrase tô đỏ = SOURCE. Distractor bổ sung = GENERATED_PRACTICE. <b>6 lựa chọn được xáo độc lập cho từng speaker mỗi lần vào L2.</b></div>${ord.map((id,n)=>{const x=m.get(id),opts=shuffle(d.options||[]),kd=l2KeyData(x);return `<article class="question" data-q="${esc(id)}"><div class="qtext">Speaker ${esc(x.speaker||n+1)}</div><div class="toolbar"><button class="btn secondary" data-action="play-l2" data-id="${esc(id)}" data-slot="${n}">▶ Nghe</button><button class="btn danger" data-action="stop-audio">■ Stop</button><button class="btn ghost" data-action="toggle" data-target="scr-${esc(id)}">📄 Bài đọc</button></div><div id="scr-${esc(id)}" class="script hidden">${l2TranscriptHtml(x.script_text,kd)}</div><select class="select ans" data-id="${esc(id)}" style="width:100%;margin-top:8px"><option value="">-- Chọn đáp án --</option>${opts.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join("")}</select><div class="toolbar"><button class="btn key" data-action="toggle" data-target="key-${esc(id)}">🔑 Hiện Key</button><button class="btn" data-action="check-l2-item" data-id="${esc(id)}">✓ Chấm câu</button></div><div id="key-${esc(id)}" class="keybox hidden">${l2KeyHtml(x)}</div><div id="fb-${esc(id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">${ids.length} speakers</span><button class="btn" data-action="check-l2-all">✓ Chấm bài</button></div></section>`}
function renderL3(d){const ids=(d.statements||[]).map(x=>x.id),ord=getOrder(orderKey("L3"),ids),m=new Map(d.statements.map(x=>[x.id,x]));return `<section class="card"><div class="head"><h2>L3 · ${esc(d.title)}</h2><div class="sub vi-meaning">${esc(d.title_vi)}</div></div><div class="note generated">Statements + Man/Woman/Both + mã = SOURCE; dialogue = GENERATED_PRACTICE. <b>L3 khóa giọng:</b> Man luôn dùng giọng Nam đã chọn, Woman luôn dùng giọng Nữ đã chọn; Random voice không ghi đè.</div><div class="toolbar"><button class="btn secondary" data-action="play-l3">▶ Nghe toàn bài</button><button class="btn danger" data-action="stop-audio">■ Stop</button><button class="btn ghost" data-action="toggle" data-target="mainScript">📄 Bài đọc</button><button class="btn key" data-action="toggle" data-target="mainKey">🔑 Hiện Key</button><button class="btn" data-action="check-l3-all">✓ Chấm bài</button></div><div id="mainScript" class="script hidden">${(d.script_segments||[]).map(z=>`<b>${z.speaker==="M"?"Man":"Woman"}:</b> ${esc(z.text)}`).join("<br>")}</div><div id="mainKey" class="keybox hidden"><h4>Key tiếng Việt</h4>${(d.statements||[]).map(x=>`<div><b>${esc(x.no)}. ${esc(x.text)}</b>${x.key_vi?.statement_vi?`<div class="vi-meaning"><span class="vi-tag">VI</span><b>${esc(x.key_vi.statement_vi)}</b></div>`:""} — <span class="key-answer">${esc(x.key_vi?.answer_text||x.answer_text||x.answer)}</span></div>`).join("")}<div class="evidence"><b>Mã SOURCE:</b> ${esc(d.canonical_code)}</div></div>${ord.map((id,n)=>{const x=m.get(id);return `<article class="question" data-q="${esc(id)}"><div class="qtext">${n+1}. ${esc(x.text)}</div><select class="select ans" data-id="${esc(id)}" style="width:100%;margin-top:8px"><option value="">-- Chọn --</option><option value="M">Man</option><option value="W">Woman</option><option value="B">Both</option></select><div id="fb-${esc(id)}"></div></article>`}).join("")}</section>`}
function renderL4(d){
  const ids=(d.questions||[]).map(x=>x.id),ord=getOrder(orderKey("L4"),ids),m=new Map(d.questions.map(x=>[x.id,x])),optOrders=prepareL4OptionOrders(d);
  const keyHtml=(d.questions||[]).map(x=>{
    const o=optOrders.get(x.id)||((x.options||[]).map((_,i)=>i));
    let ans=Number(x.answer_index);if(!Number.isInteger(ans)||!o.includes(ans))ans=0;
    const pos=o.indexOf(ans),letter=pos>=0?String.fromCharCode(65+pos):"?",answerEn=x.options?.[ans]||x.key_vi?.answer||"",answerVi=x.key_vi?.answer||"";
    return `<div><b>Câu ${esc(x.no||x.id)}</b><br><div class="key-answer">Đáp án đúng: ${esc(letter)}. ${esc(answerEn)}</div><div class="vi-meaning"><b>Nghĩa tiếng Việt:</b> ${esc(answerVi||"Chưa có bản dịch tiếng Việt trong dữ liệu.")}</div>${x.key_vi?.explanation?`<div class="vi-meaning" style="margin-top:6px">${esc(x.key_vi.explanation)}</div>`:""}${x.key_vi?.evidence_en?`<div class="evidence"><b>Evidence:</b> ${esc(x.key_vi.evidence_en)}</div>`:""}</div>`;
  }).join("<div class='divider'></div>");
  return `<section class="card"><div class="head"><h2>L4 · ${esc(d.title)}</h2><div class="sub vi-meaning">${esc(d.title_vi)}</div></div><div class="note generated">Topic/question/answer = SOURCE; full monologue = GENERATED_PRACTICE. <b>Đáp án L4 được xáo lại mỗi lần vào phần này</b>; vị trí A/B/C không làm thay đổi đáp án gốc.</div><div class="toolbar"><button class="btn secondary" data-action="play-l4">▶ Nghe toàn bài</button><button class="btn danger" data-action="stop-audio">■ Stop</button><button class="btn ghost" data-action="toggle" data-target="mainScript">📄 Bài đọc</button><button class="btn key" data-action="toggle" data-target="mainKey">🔑 Hiện Key</button><button class="btn" data-action="check-l4-all">✓ Chấm bài</button></div><div id="mainScript" class="script hidden">${esc(d.script_text)}</div><div id="mainKey" class="keybox hidden"><h4>Key tiếng Việt</h4>${keyHtml}</div>${ord.map((id,n)=>{const x=m.get(id),o=optOrders.get(id)||((x.options||[]).map((_,i)=>i));return `<article class="question" data-q="${esc(id)}"><div class="qtext">${n+1}. Chọn đáp án phù hợp nhất.</div><div class="options">${o.map((srcIdx,displayIdx)=>`<label class="option"><input type="radio" name="${esc(id)}" value="${srcIdx}"> <b>${String.fromCharCode(65+displayIdx)}.</b> ${esc(x.options[srcIdx])}</label>`).join("")}</div><div id="fb-${esc(id)}"></div></article>`}).join("")}</section>`
}


function viGloss(text){return READ_VI.glosses?.[String(text??"")]||""}
function viPractice(itemOrId){const id=typeof itemOrId==="string"?itemOrId:itemOrId?.id;return READ_VI.practice_items?.[id]||{}}
function viTopic(topic){return READ_VI.topic_vi?.[topic]||""}
function biText(en,vi,extra=""){const e=String(en??""),v=String(vi??"");return `<div class="bi-block ${extra}"><div class="bi-en">${esc(e)}</div>${v?`<div class="bi-vi vi-meaning"><span class="vi-tag">VI</span>${esc(v)}</div>`:""}</div>`}
function biContext(en,vi,extra=""){const e=pContextHtml(en),v=pContextHtml(vi);return `<div class="bi-context ${extra}"><div class="bi-en">${e}</div>${vi?`<div class="bi-vi vi-meaning"><span class="vi-tag">VI</span>${v}</div>`:""}</div>`}
function biAnswer(en,vi,label="Đáp án đúng"){return `<div class="bi-answer"><div class="answer-label">${esc(label)}</div><strong class="answer-en">${esc(en||"")}</strong>${vi?`<strong class="answer-vi vi-meaning"><span class="vi-tag">VI</span>${esc(vi)}</strong>`:""}</div>`}
function personVi(letter){return `Người ${String(letter||"").toUpperCase()}`}
const R23_TITLE_VI={R23_T01:"Làm phim",R23_T02:"Các hoạt động cuối tuần",R23_T03:"Ca sĩ nổi tiếng",R23_T04:"Chuẩn bị viết về một địa điểm",R23_T05:"Thuyết trình nhóm",R23_T06:"Lịch sử du lịch",R23_T07:"Một quán cà phê mới trong thị trấn",R23_T08:"Dự án cuối kỳ về lịch sử",R23_T09:"Buổi biểu diễn âm nhạc tại công viên",R23_T10:"Ngày chào đón sinh viên tại trường đại học",R23_T11:"Phụ nữ người Mỹ gốc Phi trong không gian",R23_T12:"Cầu thủ bóng đá nổi tiếng",R23_T13:"Du lịch"};
const R5_TOKEN_VI={changing:"thay đổi",sense:"ý thức/cảm nhận",publishing:"xuất bản",wrong:"sai lầm",revelation:"phát hiện mới",focus:"tập trung",relationship:"mối quan hệ",rise:"tăng lên",rescheduling:"sắp xếp lại lịch",value:"giá trị",evidence:"bằng chứng",habits:"thói quen",negative:"tiêu cực",adaptation:"sự thích nghi",obscure:"ít được biết đến",pioneer:"tiên phong",man:"nam giới",long:"lâu dài",people:"con người",balance:"cân bằng",uniformity:"đồng nhất"};
function mnemonicVi(chain){return String(chain||"").split("→").map(x=>x.trim()).map(x=>R5_TOKEN_VI[x]||x).join(" → ")}
function r5PracticeLearning(id){return READ_VI.practice_r5_learning?.[id]||{}}
function r5SourceLearning(id){return READ_VI.source_r5_learning?.[id]||{}}
function splitR5Paragraphs(text){
  const blocks=String(text||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  return blocks.filter(x=>/^Paragraph\s+[A-G]\b/i.test(x)).map((x,i)=>({label:(x.match(/^Paragraph\s+([A-G])/i)||[])[1]||String.fromCharCode(65+i),text:x.replace(/^Paragraph\s+[A-G]\s*/i,"").trim()}));
}
function r5ConceptDisplay(text){const v=String(text||"");return state.showVi!==false?v:v.split(/\s*\/\s*/)[0].trim()}
function r5KeywordHtml(rows){
  const a=Array.isArray(rows)?rows:[]; if(!a.length)return "";
  return `<div class="r5-keyword-map"><div class="r5-keyword-title">🔍 Cụm nhận diện → ý suy ra</div>${a.map(k=>`<div class="r5-keyword-row"><strong class="r5-keyword-en">${esc(k.en||"")}</strong><span class="r5-arrow">→</span><span class="r5-keyword-vi vi-meaning">${esc(k.vi||"")}</span><span class="r5-arrow">→</span><strong class="r5-concept">${esc(r5ConceptDisplay(k.concept||""))}</strong></div>`).join("")}</div>`;
}
function r5StudyHtml(fullVi,ideaVi){return `<div class="r5-study vi-meaning"><div class="r5-full-vi"><div class="r5-study-label">🇻🇳 Bản dịch đầy đủ</div>${esc(fullVi||"")}</div>${ideaVi?`<div class="r5-main-idea"><b>💡 Ý nghĩa chính:</b> ${esc(ideaVi)}</div>`:""}</div>`}
function pItems(part=state.ppart){return (PRACTICE.items||[]).filter(x=>x.topic===state.ptopic&&x.originPart===part)}
function pChoiceText(item,id){return item?.choices?.find(x=>x.id===id)?.text||id}
function pMatchText(item,id){return item?.matchOptions?.find(x=>x.id===id)?.text||id}
function pContextHtml(text){return esc(text||"").replace(/\n/g,"<br>")}
function renderPracticeReading(){
  const items=pItems(); if(!items.length)return `<section class="card"><div class="note incomplete">Không có dữ liệu ${esc(practicePartLabel(state.ppart))} cho chủ đề này.</div></section>`;
  const topicEn=state.ptopic.replace(/^Day \d+ · /,""),topicVi=viTopic(state.ptopic).replace(/^Ngày \d+ · /,"");
  if(state.ppart==="part1"){
    const context=items[0].context||"",contextVi=READ_VI.practice_part1_context?.[state.ptopic]||"";
    return `<section class="card"><div class="head"><h2>Reading Practice R1 · ${esc(topicEn)}</h2>${topicVi?`<div class="vi-title vi-meaning">${esc(topicVi)}</div>`:""}<div class="sub">5 gaps · 3 lựa chọn/gap</div></div><div class="note generated">GENERATED_PRACTICE. <b>English giữ nguyên</b>; dòng VI là DERIVED_TRANSLATION để học nhanh.</div><div class="lead practice-context">${biContext(context,contextVi)}</div>${items.map((x,n)=>{const ids=(x.choices||[]).map(c=>c.id),ord=getOrder(orderKey(`P1:${x.id}`),ids),ans=pChoiceText(x,x.answer),ansVi=viGloss(ans);return `<article class="question" data-pq="${esc(x.id)}"><div class="qtext">${esc(x.prompt||`Gap ${n+1}`)} <span class="mini">· Chỗ trống ${n+1}</span></div><div class="options">${ord.map(cid=>{const en=pChoiceText(x,cid),vi=viGloss(en);return `<label class="option bilingual-option"><input type="radio" name="${esc(x.id)}" value="${esc(cid)}"><span><span class="option-en">${esc(en)}</span>${vi?`<span class="option-vi">${esc(vi)}</span>`:""}</span></label>`}).join("")}</div><div class="toolbar"><button class="btn key" data-action="toggle" data-target="pkey-${esc(x.id)}">🔑 Hiện Key</button><button class="btn" data-action="check-p1-item" data-id="${esc(x.id)}">✓ Chấm câu</button></div><div id="pkey-${esc(x.id)}" class="keybox hidden">${biAnswer(ans,ansVi)}<div class="sub">GENERATED_PRACTICE · đối chiếu theo ngữ cảnh của đoạn.</div></div><div id="pfb-${esc(x.id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">Practice R1 · ${items.length} blanks</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-p1-all">✓ Chấm bài</button></div></div></section>`;
  }
  if(state.ppart==="part2"){
    return `<section class="card"><div class="head"><h2>Reading Practice R2–3 · ${esc(topicEn)}</h2>${topicVi?`<div class="vi-title vi-meaning">${esc(topicVi)}</div>`:""}<div class="sub">${items.length} bài sắp xếp × 5 câu</div></div><div class="note generated">GENERATED_PRACTICE. Mỗi câu hiển thị <b>English + tiếng Việt</b>; phần Key in đậm cả hai ngôn ngữ.</div>${items.map((x,taskNo)=>{const pv=viPractice(x),ids=(x.sentences||[]).map(s=>s.id),ord=getOrder(orderKey(`P23:${x.id}`),ids),sm=new Map((x.sentences||[]).map(s=>[s.id,s]));return `<article class="question" data-ptask="${esc(x.id)}"><div class="number">Task ${taskNo+1}</div><div class="lead">${biText(x.context||"",pv.context_vi||"")}</div><div class="reorder-list">${ord.map((sid,i)=>{const en=sm.get(sid)?.text||"",vi=pv.sentences_vi?.[sid]||"";return `<div class="reorder-row" data-p23="${esc(x.id)}:${esc(sid)}"><div class="reorder-index">${i+1}</div><div class="reorder-text">${biText(en,vi)}</div><div class="movegroup"><button class="btn ghost small" data-action="p23-up" data-task="${esc(x.id)}" data-id="${esc(sid)}">↑</button><button class="btn ghost small" data-action="p23-down" data-task="${esc(x.id)}" data-id="${esc(sid)}">↓</button></div></div>`}).join("")}</div><div class="toolbar"><button class="btn key" data-action="toggle" data-target="pkey-${esc(x.id)}">🔑 Hiện Key</button><button class="btn" data-action="check-p23-task" data-id="${esc(x.id)}">✓ Chấm bài này</button></div><div id="pkey-${esc(x.id)}" class="keybox hidden"><h4>Thứ tự đúng · Correct order</h4>${(x.answer||[]).map((sid,i)=>`<div class="ordered-answer"><b>${i+1}. ${esc(sm.get(sid)?.text||sid)}</b><br><b class="answer-vi vi-meaning"><span class="vi-tag">VI</span>${esc(pv.sentences_vi?.[sid]||"")}</b></div>`).join("")}</div><div id="pfb-${esc(x.id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">Practice R2–3 · ${items.length} bài</span><button class="btn" data-action="check-p23-all">✓ Chấm tất cả</button></div></section>`;
  }
  if(state.ppart==="part4"){
    const x=items[0],pv=viPractice(x),optIds=(x.matchOptions||[]).map(o=>o.id),optOrder=getOrder(orderKey(`P4OPTS:${x.id}`),optIds),optMap=new Map((x.matchOptions||[]).map(o=>[o.id,o])),opts=optOrder.map(id=>optMap.get(id)).filter(Boolean);
    return `<section class="card"><div class="head"><h2>Reading Practice R4 · ${esc(topicEn)}</h2>${topicVi?`<div class="vi-title vi-meaning">${esc(topicVi)}</div>`:""}<div class="sub">4 persons · 7 statements</div></div><div class="note generated">GENERATED_PRACTICE. Nội dung A–D, statement và đáp án đều có nghĩa Việt để đối chiếu nhanh.</div><div class="script practice-context">${biContext(x.context,pv.context_vi||"")}</div>${(x.matchPrompts||[]).map((q,n)=>{const qvi=pv.match_prompts_vi?.[q.id]||"",aid=x.answer?.[q.id],aen=pMatchText(x,aid),avi=pv.match_options_vi?.[aid]||personVi(String(aid||"").toUpperCase());return `<article class="question" data-pmatch="${esc(q.id)}">${biText(`${n+1}. ${q.text}`,qvi)}<select class="select pans" data-id="${esc(q.id)}" style="width:100%;margin-top:8px"><option value="">-- Chọn Person / Người --</option>${opts.map(o=>`<option value="${esc(o.id)}">${esc(o.text)}${state.showVi!==false&&pv.match_options_vi?.[o.id]?` — ${esc(pv.match_options_vi[o.id])}`:""}</option>`).join("")}</select><div class="toolbar"><button class="btn key" data-action="toggle" data-target="pkey-${esc(q.id)}">🔑 Hiện Key</button><button class="btn" data-action="check-p4-item" data-id="${esc(q.id)}">✓ Chấm câu</button></div><div id="pkey-${esc(q.id)}" class="keybox hidden">${biAnswer(aen,avi)}<div class="answer-statement"><b>${esc(q.text)}</b><br><b class="answer-vi vi-meaning"><span class="vi-tag">VI</span>${esc(qvi)}</b></div></div><div id="pfb-${esc(q.id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">Practice R4 · 7 câu</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-p4-all">✓ Chấm bài</button></div></div></section>`;
  }
  const x=items[0],pv=viPractice(x),learn=r5PracticeLearning(x.id),hids=(x.matchOptions||[]).map(o=>o.id),hord=getShuffledOrder(orderKey(`P5HEAD:${x.id}`),hids),hm=new Map((x.matchOptions||[]).map(o=>[o.id,o])),paras=splitR5Paragraphs(x.context);
  return `<section class="card"><div class="head"><h2>Reading Practice R5 · ${esc(topicEn)}</h2>${topicVi?`<div class="vi-title vi-meaning">${esc(topicVi)}</div>`:""}<div class="sub">7 paragraphs · 8 headings (1 heading thừa)</div></div><div class="note generated">GENERATED_PRACTICE. Mỗi đoạn có <b>English gốc → bản dịch đầy đủ → ý nghĩa chính</b>. Cụm <b>KEY → concept → heading</b> nằm trong “Hiện Key” để không lộ đáp án trước khi luyện.</div><div><b>Heading pool / Danh sách tiêu đề:</b><div class="heading-pool">${hord.map((hid,i)=>`<span class="heading-chip bilingual-heading"><b>${i+1}. ${esc(hm.get(hid)?.text||hid)}</b><span class="vi-meaning">${esc(pv.match_options_vi?.[hid]||"")}</span></span>`).join("")}</div></div>${(x.matchPrompts||[]).map((q,n)=>{const aid=x.answer?.[q.id],aen=hm.get(aid)?.text||aid||"",avi=pv.match_options_vi?.[aid]||"",qvi=pv.match_prompts_vi?.[q.id]||`Đoạn ${String.fromCharCode(65+n)}`,para=paras[n]||{label:String.fromCharCode(65+n),text:q.text},fullVi=learn.full_vi?.[q.id]||"",ideaVi=learn.idea_vi?.[q.id]||"",keywords=learn.keywords?.[q.id]||[];return `<article class="r5para" data-p5="${esc(q.id)}"><div class="qhead"><div class="number">Paragraph ${esc(para.label)} · ${esc(qvi)}</div>${provBadge("GENERATED_PRACTICE")}</div><div class="r5-en-paragraph">${esc(para.text)}</div>${r5StudyHtml(fullVi,ideaVi)}<select class="select p5ans" data-id="${esc(q.id)}" style="width:100%;margin-top:10px"><option value="">-- Chọn heading / tiêu đề --</option>${hord.map(hid=>`<option value="${esc(hid)}">${esc(hm.get(hid)?.text||hid)}${state.showVi!==false&&pv.match_options_vi?.[hid]?` — ${esc(pv.match_options_vi[hid])}`:""}</option>`).join("")}</select><div class="toolbar"><button class="btn key" data-action="toggle" data-target="pkey-${esc(q.id)}">🔑 Hiện Key + từ khóa</button><button class="btn" data-action="check-p5-item" data-id="${esc(q.id)}">✓ Chấm câu</button></div><div id="pkey-${esc(q.id)}" class="keybox hidden">${biAnswer(aen,avi)}${r5KeywordHtml(keywords)}</div><div id="pfb-${esc(q.id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">Practice R5 · 7 paragraphs · headings tự xáo</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-p5-all">✓ Chấm bài</button></div></div></section>`;
}
function renderReading(){
  if((state.rmode||"source")==="practice"){
    try{return renderPracticeReading()}catch(err){console.error("APTIS Reading Practice render error:",err);return `<section class="card"><div class="note incomplete"><b>Reading Practice gặp lỗi:</b> ${esc(err?.message||err)}</div></section>`}
  }
  ensureReadingUnit();
  try{
    if(state.rpart==="R1")return renderR1();
    if(state.rpart==="R23")return renderR23();
    if(state.rpart==="R4")return renderR4();
    if(state.rpart==="R5")return renderR5();
    state.rpart="R1";ensureReadingUnit();save();
    return renderR1();
  }catch(err){
    console.error(`APTIS Reading ${state.rpart} render error:`,err);
    return `<section class="card"><div class="note incomplete"><b>Reading ${esc(state.rpart)} gặp lỗi hiển thị:</b> ${esc(err?.message||err)}<br>Có thể chuyển sang R1/R2–3/R4/R5 khác mà không cần tải lại toàn bộ app.</div></section>`;
  }
}

function renderR1(){
  const b=bank().R1,allMode=state.r1Scope==="all",optKey=orderKey(allMode?"R1ALLopts":"R1opts");
  const renderQuestion=(x)=>{const key=`${optKey}:${x.id}`,inds=[0,1,2],ord=getOrder(key,inds),svi=READ_VI.r1?.sentences?.[x.id]||"",avi=viGloss(x.answer);return `<article class="question" data-q="${esc(x.id)}"><div class="qhead"><div><div class="number">Blank ${x.blank_no}/5 · ${esc(x.id)}</div>${biText(x.sentence_template,svi,"cloze-line")}</div>${provBadge("SOURCE")}</div><div class="options">${ord.map(i=>{const en=x.options[i],vi=viGloss(en);return `<label class="option bilingual-option"><input type="radio" name="${esc(x.id)}" value="${esc(en)}"><span><span class="option-en">${esc(en)}</span><span class="option-vi">${esc(vi)}</span></span></label>`}).join("")}</div><div class="toolbar"><button class="btn key" data-action="toggle" data-target="key-${esc(x.id)}">🔑 Hiện Key</button><button class="btn" data-action="check-r1-item" data-id="${esc(x.id)}">✓ Chấm câu</button><button class="btn ghost small" data-action="speak-r1" data-id="${esc(x.id)}">🔊 Đọc câu</button></div><div id="key-${esc(x.id)}" class="keybox hidden">${biAnswer(x.answer,avi)}<div><b>Micro-key / Cụm khóa EN:</b> ${esc(x.micro_key||"—")} ${provBadge("DERIVED_GUIDANCE")}</div><div class="vi-meaning"><b>Nghĩa câu VI:</b> <strong>${esc(svi)}</strong></div><div class="vi-meaning">${esc(x.explanation_vi||`Chọn “${x.answer}” vì phù hợp ngữ cảnh/collocation của câu; hai lựa chọn còn lại không phù hợp.`)}</div></div><div id="fb-${esc(x.id)}"></div></article>`};
  if(allMode){
    const sets=b.sets||[],total=(b.items||[]).length;
    return `<section class="card"><div class="head"><h2>Reading Part 1 · Tất cả ${total} câu</h2><div class="sub">17 bài · ${total} blanks · SOURCE + nghĩa Việt học nhanh</div></div><div class="note source">Chế độ <b>Tất cả câu</b> giữ nguyên từng bài và phần lead/context để anh không mất ngữ cảnh. Câu, lựa chọn và đáp án tiếng Anh = SOURCE; dòng VI = DERIVED_TRANSLATION.</div>${sets.map((meta,si)=>{const items=(b.items||[]).filter(x=>x.set_id===meta.set_id).sort((a,z)=>a.blank_no-z.blank_no),leadVi=READ_VI.r1?.leads?.[meta.set_id]||[];return `<section class="r1-all-set"><div class="r1-all-set-head"><h3>Bài ${si+1}/${sets.length} · Bộ ${esc(meta.source_variant||meta.source_printed_no||meta.internal_set_no)}</h3><span class="pill">${items.length} blanks</span></div>${meta.lead_lines?.length?`<div class="lead">${meta.lead_lines.map((en,i)=>biText(en,leadVi[i]||"")).join("")}</div>`:""}${items.map(renderQuestion).join("")}</section>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">R1 · ${total} blanks / ${sets.length} bài</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-r1-all">✓ Chấm tất cả ${total} câu</button></div></div></section>`;
  }
  const id=state.runit.R1,meta=(b.sets||[]).find(x=>x.set_id===id),items=(b.items||[]).filter(x=>x.set_id===id).sort((a,z)=>a.blank_no-z.blank_no); if(!meta)return `<section class="card">Không có dữ liệu R1.</section>`;
  const leadVi=READ_VI.r1?.leads?.[meta.set_id]||[];
  return `<section class="card"><div class="head"><h2>Reading Part 1 · Bộ ${esc(meta.source_variant||meta.source_printed_no)}</h2><div class="sub">5 blanks × 3 options · SOURCE + nghĩa Việt học nhanh</div></div><div class="note source">Câu, lựa chọn và đáp án tiếng Anh = SOURCE. Dòng VI = DERIVED_TRANSLATION. <b>Tiếng Việt mặc định hiển thị để học nhanh.</b></div>${meta.lead_lines?.length?`<div class="lead">${meta.lead_lines.map((en,i)=>biText(en,leadVi[i]||"")).join("")}</div>`:""}${items.map(renderQuestion).join("")}<div class="sticky-actions toolbar space"><span class="counter">R1 · ${items.length} blanks</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-r1-all">✓ Chấm bài</button></div></div></section>`;
}
function renderR23(){
  const b=bank().R23,id=state.runit.R23,t=(b.topics||[]).find(x=>x.topic_id===id),items=(b.sentences||[]).filter(x=>x.topic_id===id),links=(b.links||[]).filter(x=>x.topic_id===id).sort((a,z)=>a.from_position-z.from_position); if(!t)return `<section class="card">Không có dữ liệu R2–3.</section>`;
  const ids=items.map(x=>x.id),key=orderKey("R23"),ord=getOrder(key,ids),m=new Map(items.map(x=>[x.id,x])),correct=[...items].sort((a,z)=>a.correct_position-z.correct_position),titleVi=R23_TITLE_VI[t.topic_id]||"";
  return `<section class="card"><div class="head"><h2>Reading Part 2–3 · ${esc(t.topic_en)}</h2>${titleVi?`<div class="vi-title vi-meaning">${esc(titleVi)}</div>`:""}<div class="sub">Số in nguồn: ${esc(t.source_printed_no)} · 5 câu cần sắp xếp</div></div>${(t.lead_en||t.lead_vi)?`<div class="lead">${biText(t.lead_en||"",t.lead_vi||"")}</div>`:""}<div class="note info">Mỗi câu hiển thị song ngữ. Sắp xếp bằng nút ↑ ↓; Key hiển thị toàn bộ thứ tự đúng bằng <b>English + VI</b>.</div><div class="reorder-list">${ord.map((sid,i)=>{const x=m.get(sid);return `<div class="reorder-row" data-r23="${esc(sid)}"><div class="reorder-index">${i+1}</div><div class="reorder-text">${biText(x.sentence_en_source,x.sentence_vi_source)}</div><div class="movegroup"><button class="btn ghost small" data-action="r23-up" data-id="${esc(sid)}">↑</button><button class="btn ghost small" data-action="r23-down" data-id="${esc(sid)}">↓</button></div></div>`}).join("")}</div><div class="toolbar" style="margin-top:12px"><button class="btn key" data-action="toggle" data-target="r23key">🔑 Hiện Key / Linking</button><button class="btn" data-action="check-r23">✓ Chấm bài</button></div><div id="r23key" class="keybox hidden"><h4>Thứ tự đúng · Correct order</h4><div class="order-code">${correct.map(x=>x.correct_position).join(" → ")}</div>${correct.map(x=>`<div class="ordered-answer"><b>${x.correct_position}. ${esc(x.sentence_en_source)}</b><br><b class="answer-vi vi-meaning"><span class="vi-tag">VI</span>${esc(x.sentence_vi_source)}</b></div>`).join("")}<h4 style="margin-top:12px">Chuỗi liên kết ${provBadge("DERIVED_GUIDANCE")}</h4>${links.map(l=>`<div class="linking-row"><b>${l.from_position} → ${l.to_position}:</b> <span>“${esc(l.before_anchor)}” → “${esc(l.after_anchor)}”</span><div class="bi-vi vi-meaning"><span class="vi-tag">VI</span>${esc(l.explanation_vi)}</div></div>`).join("")}</div><div id="r23fb"></div></section>`;
}
function renderR4(){
  const b=bank().R4,id=state.runit.R4,t=(b.topics||[]).find(x=>x.topic_id===id),items=(b.items||[]).filter(x=>x.topic_id===id); if(!t)return `<section class="card">Không có dữ liệu R4.</section>`;
  const ids=items.map(x=>x.id),ord=getOrder(orderKey("R4questions"),ids),m=new Map(items.map(x=>[x.id,x])),passagesVi=items[0]?.passages_vi||{},titleVi=String(t.teacher_title||"").replace(/^\d+[.)]?\s*/,"");
  return `<section class="card"><div class="head"><h2>Reading Part 4 · ${esc(t.topic_en)}</h2>${titleVi?`<div class="vi-title vi-meaning">${esc(titleVi)}</div>`:""}<div class="sub">4 persons A–D · 7 questions · SOURCE</div></div><div class="note source">Đoạn đọc, câu hỏi và đáp án giữ nguyên SOURCE. Bản VI lấy từ tài liệu giáo viên/DERIVED_TRANSLATION để học nhanh.</div><div class="passage-grid">${["A","B","C","D"].map(letter=>`<details class="person" ${letter==="A"?"open":""}><summary>Person ${letter}${state.showVi!==false?` · ${personVi(letter)}`:""}</summary><div class="inside">${biText(t.passages_en?.[letter]||"",passagesVi?.[letter]||"")}</div></details>`).join("")}</div><div class="toolbar" style="margin-top:10px"><button class="btn secondary" data-action="speak-r4-passages">🔊 Đọc A→D</button></div>${ord.map((qid,n)=>{const x=m.get(qid),avi=personVi(x.answer),evVi=READ_VI.r4_evidence?.[qid]||x.hint_vi||x.question_vi||"";return `<article class="question" data-q="${esc(qid)}">${biText(`${n+1}. ${x.question_en}`,x.question_vi)}<select class="select ans" data-id="${esc(qid)}" style="width:100%;margin-top:8px"><option value="">-- Chọn Person / Người --</option>${["A","B","C","D"].map(v=>`<option value="${v}">Person ${v}${state.showVi!==false?` — ${personVi(v)}`:""}</option>`).join("")}</select><div class="toolbar"><button class="btn key" data-action="toggle" data-target="key-${esc(qid)}">🔑 Hiện Key/Evidence</button><button class="btn" data-action="check-r4-item" data-id="${esc(qid)}">✓ Chấm câu</button></div><div id="key-${esc(qid)}" class="keybox hidden">${biAnswer(`Person ${x.answer}`,avi)}<div class="answer-statement"><b>${esc(x.question_en)}</b><br><b class="answer-vi vi-meaning"><span class="vi-tag">VI</span>${esc(x.question_vi)}</b></div><div class="evidence"><b>Evidence EN:</b> ${esc(x.evidence_en)}</div><div class="evidence vi-evidence"><b>Ý nghĩa VI:</b> ${esc(evVi)}</div><div><b>Paraphrase EN:</b> ${esc(x.paraphrase_relation||x.question_key||"")}</div><div class="vi-meaning"><b>Paraphrase VI:</b> ${esc(x.question_vi)} ↔ ${esc(evVi)}</div>${x.trap?`<div><b>Trap:</b> ${esc(typeof x.trap==="string"?x.trap:JSON.stringify(x.trap))}</div>`:""}</div><div id="fb-${esc(qid)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">R4 · ${items.length} câu</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-r4-all">✓ Chấm bài</button></div></div></section>`;
}
function renderR5(){
  const b=bank().R5,id=state.runit.R5,t=(b.topics||[]).find(x=>x.topic_id===id),items=(b.items||[]).filter(x=>x.topic_id===id).sort((a,z)=>a.heading_position-z.heading_position); if(!t)return `<section class="card">Không có dữ liệu R5.</section>`;
  const headingIds=items.map(x=>x.id),hkey=orderKey("R5headings"),hord=getShuffledOrder(hkey,headingIds),hm=new Map(items.map(x=>[x.id,x]));
  return `<section class="card"><div class="head"><h2>Reading Part 5 · ${esc(t.title_en_teacher)}</h2><div class="vi-title vi-meaning">${esc(t.title_vi_teacher||"")}</div><div class="sub">7 headings SOURCE · 7 paragraphs GENERATED_PRACTICE</div></div><div class="note generated"><b>Quan trọng:</b> nguồn canonical không có 7 paragraph đầy đủ. Heading/key là SOURCE; paragraph luyện tập là GENERATED_PRACTICE. Heading được <b>xáo tự động</b>; đoạn vẫn giữ A→G. Mỗi đoạn có dịch đầy đủ, ý chính và KEY paraphrase.</div><div><b>Heading pool / Danh sách tiêu đề:</b><div class="heading-pool">${hord.map((hid,i)=>{const h=hm.get(hid);return `<span class="heading-chip bilingual-heading"><b>${i+1}. ${esc(h.heading_en_teacher)}</b><span class="vi-meaning">${esc(h.heading_vi_teacher)}</span></span>`}).join("")}</div></div>${items.map((x,n)=>{const tokenVi=R5_TOKEN_VI[x.memory_token]||"",learn=r5SourceLearning(x.id),fullVi=learn.full_vi||x.practice_paragraph_vi||"",ideaVi=learn.idea_vi||x.practice_paragraph_vi||"",keywords=learn.keywords||[];return `<article class="r5para" data-q="${esc(x.id)}"><div class="qhead"><div class="number">Paragraph ${String.fromCharCode(65+n)} · Đoạn ${String.fromCharCode(65+n)}</div>${provBadge("GENERATED_PRACTICE")}</div><div class="r5-en-paragraph">${esc(x.practice_paragraph_en)}</div>${r5StudyHtml(fullVi,ideaVi)}<div class="toolbar"><button class="btn ghost small" data-action="speak-r5" data-id="${esc(x.id)}">🔊 Đọc</button></div><select class="select r5ans" data-id="${esc(x.id)}" style="width:100%;margin-top:8px"><option value="">-- Chọn heading / tiêu đề --</option>${hord.map(hid=>{const h=hm.get(hid);return `<option value="${esc(hid)}">${esc(h.heading_en_teacher)}${state.showVi!==false&&h.heading_vi_teacher?` — ${esc(h.heading_vi_teacher)}`:""}</option>`}).join("")}</select><div class="toolbar"><button class="btn key" data-action="toggle" data-target="key-${esc(x.id)}">🔑 Hiện Key + từ khóa</button><button class="btn" data-action="check-r5-item" data-id="${esc(x.id)}">✓ Chấm câu</button></div><div id="key-${esc(x.id)}" class="keybox hidden">${biAnswer(x.heading_en_teacher,x.heading_vi_teacher)}${r5KeywordHtml(keywords)}<div class="r5-memory"><b>Memory token:</b> <strong>${esc(x.memory_token)}</strong>${tokenVi?` <span class="vi-meaning">— <strong>${esc(tokenVi)}</strong></span>`:""}</div><div><b>Chain EN:</b> ${esc(x.mnemonic_chain)}</div><div class="vi-meaning"><b>Chain VI:</b> ${esc(mnemonicVi(x.mnemonic_chain))}</div></div><div id="fb-${esc(x.id)}"></div></article>`}).join("")}<div class="sticky-actions toolbar space"><span class="counter">R5 · paragraphs A→G cố định · headings tự xáo</span><div class="toolbar"><button class="btn key" data-action="show-all-keys">🔑 Hiện tất cả Key</button><button class="btn" data-action="check-r5-all">✓ Chấm bài</button></div></div></section>`;
}
function answerL3(x){let a=x.answer||x.correct||x.answer_text||x.key_vi?.answer_text||"";a=String(a).toLowerCase();if(a.includes("man")||a==="m"||a==="1")return"M";if(a.includes("woman")||a==="w"||a==="2")return"W";if(a.includes("both")||a==="b"||a==="0")return"B";return String(x.code_digit??x.key_vi?.code_digit??"")==="1"?"M":String(x.code_digit??x.key_vi?.code_digit??"")==="2"?"W":"B"}
function checkL1Item(id){const x=findListeningL1Item(id),sel=$(`input[name="${CSS.escape(id)}"]:checked`),ok=!!sel&&Number(sel.value)===Number(x.answer_index),q=$(`[data-q="${CSS.escape(id)}"]`);markEl(q,ok);$(`#fb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn đáp án.</div>`;return ok}
function checkL1All(){const d=listeningL1Items();let c=0;d.forEach(x=>{if(checkL1Item(x.id))c++});rec(orderKey(state.l1StudyMode==="check"?`L1CHECKscore:${state.l1CheckRound}`:(state.l1Scope==="all"?"L1ALLscore":"score")),c,d.length);appendGlobalScore(c,d.length)}
function checkL2Item(id){const d=cset().parts.L2,x=d.speakers.find(z=>z.id===id),sel=$(`select.ans[data-id="${CSS.escape(id)}"]`)?.value||"",ans=x.answer||x.correct_answer||x.key_vi?.answer||"",ok=!!sel&&norm(sel)===norm(ans);markEl($(`[data-q="${CSS.escape(id)}"]`),ok);$(`#fb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkL2All(){const d=cset().parts.L2;let c=0;d.speakers.forEach(x=>{if(checkL2Item(x.id))c++});rec(orderKey("score"),c,d.speakers.length);appendGlobalScore(c,d.speakers.length)}
function checkL3All(){const d=cset().parts.L3;let c=0;d.statements.forEach(x=>{const sel=$(`select.ans[data-id="${CSS.escape(x.id)}"]`)?.value||"",ok=!!sel&&sel===answerL3(x);markEl($(`[data-q="${CSS.escape(x.id)}"]`),ok);$(`#fb-${CSS.escape(x.id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;if(ok)c++});rec(orderKey("score"),c,d.statements.length);appendGlobalScore(c,d.statements.length)}
function checkL4All(){const d=cset().parts.L4;let c=0;d.questions.forEach(x=>{const sel=$(`input[name="${CSS.escape(x.id)}"]:checked`),ok=!!sel&&Number(sel.value)===Number(x.answer_index);markEl($(`[data-q="${CSS.escape(x.id)}"]`),ok);$(`#fb-${CSS.escape(x.id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;if(ok)c++});rec(orderKey("score"),c,d.questions.length);appendGlobalScore(c,d.questions.length)}
function checkR1Item(id){const x=bank().R1.items.find(z=>z.id===id),sel=$(`input[name="${CSS.escape(id)}"]:checked`)?.value||"",ok=!!sel&&norm(sel)===norm(x.answer);markEl($(`[data-q="${CSS.escape(id)}"]`),ok);$(`#fb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkR1All(){const items=state.r1Scope==="all"?bank().R1.items:bank().R1.items.filter(x=>x.set_id===state.runit.R1);let c=0;items.forEach(x=>{if(checkR1Item(x.id))c++});rec(orderKey(state.r1Scope==="all"?"R1ALLscore":"score"),c,items.length);appendGlobalScore(c,items.length)}
function checkR23(){const items=bank().R23.sentences.filter(x=>x.topic_id===state.runit.R23),correct=[...items].sort((a,z)=>a.correct_position-z.correct_position).map(x=>x.id),ord=getOrder(orderKey("R23"),items.map(x=>x.id)),c=ord.reduce((n,x,i)=>n+(x===correct[i]),0);$$('[data-r23]').forEach((el,i)=>markEl(el,ord[i]===correct[i]));$("#r23fb").innerHTML=score(c,correct.length);rec(orderKey("score"),c,correct.length)}
function checkR4Item(id){const x=bank().R4.items.find(z=>z.id===id),sel=$(`select.ans[data-id="${CSS.escape(id)}"]`)?.value||"",ok=!!sel&&sel===x.answer;markEl($(`[data-q="${CSS.escape(id)}"]`),ok);$(`#fb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkR4All(){const items=bank().R4.items.filter(x=>x.topic_id===state.runit.R4);let c=0;items.forEach(x=>{if(checkR4Item(x.id))c++});rec(orderKey("score"),c,items.length);appendGlobalScore(c,items.length)}
function checkR5Item(id){const sel=$(`select.r5ans[data-id="${CSS.escape(id)}"]`)?.value||"",ok=!!sel&&sel===id;markEl($(`[data-q="${CSS.escape(id)}"]`),ok);$(`#fb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkR5All(){const items=bank().R5.items.filter(x=>x.topic_id===state.runit.R5);let c=0;items.forEach(x=>{if(checkR5Item(x.id))c++});rec(orderKey("score"),c,items.length);appendGlobalScore(c,items.length)}

function pCurrentItem(){return pItems()[0]||null}
function checkP1Item(id){const x=pItems("part1").find(z=>z.id===id),sel=$(`input[name="${CSS.escape(id)}"]:checked`)?.value||"",ok=!!sel&&sel===x?.answer;markEl($(`[data-pq="${CSS.escape(id)}"]`),ok);$(`#pfb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkP1All(){const items=pItems("part1");let c=0;items.forEach(x=>{if(checkP1Item(x.id))c++});rec(orderKey("PRACTICE_SCORE"),c,items.length);appendGlobalScore(c,items.length)}
function p23Order(x){const ids=(x.sentences||[]).map(s=>s.id);return getOrder(orderKey(`P23:${x.id}`),ids)}
function checkP23Task(id){const x=pItems("part2").find(z=>z.id===id);if(!x)return false;const ord=p23Order(x),ans=x.answer||[],c=ord.reduce((n,s,i)=>n+(s===ans[i]),0);$$(`[data-p23^="${CSS.escape(id)}:"]`).forEach((el,i)=>markEl(el,ord[i]===ans[i]));$(`#pfb-${CSS.escape(id)}`).innerHTML=score(c,ans.length);return c===ans.length}
function checkP23All(){const items=pItems("part2");let c=0,t=0;for(const x of items){const ord=p23Order(x),ans=x.answer||[];c+=ord.reduce((n,s,i)=>n+(s===ans[i]),0);t+=ans.length;checkP23Task(x.id)}rec(orderKey("PRACTICE_SCORE"),c,t);appendGlobalScore(c,t)}
function checkP4Item(id){const x=pCurrentItem(),sel=$(`select.pans[data-id="${CSS.escape(id)}"]`)?.value||"",ans=x?.answer?.[id]||"",ok=!!sel&&sel===ans;markEl($(`[data-pmatch="${CSS.escape(id)}"]`),ok);$(`#pfb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkP4All(){const x=pCurrentItem(),qs=x?.matchPrompts||[];let c=0;qs.forEach(q=>{if(checkP4Item(q.id))c++});rec(orderKey("PRACTICE_SCORE"),c,qs.length);appendGlobalScore(c,qs.length)}
function checkP5Item(id){const x=pCurrentItem(),sel=$(`select.p5ans[data-id="${CSS.escape(id)}"]`)?.value||"",ans=x?.answer?.[id]||"",ok=!!sel&&sel===ans;markEl($(`[data-p5="${CSS.escape(id)}"]`),ok);$(`#pfb-${CSS.escape(id)}`).innerHTML=sel?`<div class="feedback ${ok?"good":"bad"}">${ok?"Đúng":"Sai"}</div>`:`<div class="feedback bad">Chưa chọn.</div>`;return ok}
function checkP5All(){const x=pCurrentItem(),qs=x?.matchPrompts||[];let c=0;qs.forEach(q=>{if(checkP5Item(q.id))c++});rec(orderKey("PRACTICE_SCORE"),c,qs.length);appendGlobalScore(c,qs.length)}
function moveP23(taskId,sid,delta){const x=pItems("part2").find(z=>z.id===taskId);if(!x)return;const ids=(x.sentences||[]).map(s=>s.id),key=orderKey(`P23:${x.id}`),ord=getOrder(key,ids),i=ord.indexOf(sid),j=i+delta;if(i<0||j<0||j>=ord.length)return;[ord[i],ord[j]]=[ord[j],ord[i]];setOrder(key,ord);renderPractice()}
function appendGlobalScore(c,t){let el=$("#globalScore");if(!el){el=document.createElement("div");el.id="globalScore";el.className="card";app.appendChild(el)}el.innerHTML=`<div class="head"><h3>Kết quả gần nhất</h3></div>${score(c,t)}`;el.scrollIntoView({behavior:"smooth",block:"nearest"})}
function norm(s){return String(s??"").trim().toLowerCase().replace(/\s+/g," ")}
function shuffleCurrent(){if(state.skill==="listening"){const s=cset(),p=state.lpart,d=s?.parts?.[p];if(!d)return;if(p==="L1"){const items=listeningL1Items();setOrder(orderKey(l1OrderName()),shuffle(items.map(x=>x.id)))}if(p==="L2")setOrder(orderKey("L2"),shuffle(d.speakers.map(x=>x.id)));if(p==="L3")setOrder(orderKey("L3"),shuffle(d.statements.map(x=>x.id)));if(p==="L4")setOrder(orderKey("L4"),shuffle(d.questions.map(x=>x.id)));renderPractice();return}
 if((state.rmode||"source")==="practice"){const items=pItems();if(state.ppart==="part1"){for(const x of items)setOrder(orderKey(`P1:${x.id}`),shuffle((x.choices||[]).map(c=>c.id)));}else if(state.ppart==="part2"){for(const x of items)setOrder(orderKey(`P23:${x.id}`),shuffle((x.sentences||[]).map(s=>s.id)));}else if(state.ppart==="part4"){const x=items[0];if(x)setOrder(orderKey(`P4OPTS:${x.id}`),shuffle((x.matchOptions||[]).map(o=>o.id)));}else if(state.ppart==="part5"){const x=items[0];if(x)setOrder(orderKey(`P5HEAD:${x.id}`),shuffleDifferent((x.matchOptions||[]).map(o=>o.id)));}renderPractice();return}
 const b=bank();if(state.rpart==="R1"){const items=state.r1Scope==="all"?b.R1.items:b.R1.items.filter(x=>x.set_id===state.runit.R1),base=orderKey(state.r1Scope==="all"?"R1ALLopts":"R1opts");for(const x of items)setOrder(`${base}:${x.id}`,shuffle([0,1,2]));}if(state.rpart==="R23"){const ids=b.R23.sentences.filter(x=>x.topic_id===state.runit.R23).map(x=>x.id);setOrder(orderKey("R23"),shuffle(ids));}if(state.rpart==="R4"){const ids=b.R4.items.filter(x=>x.topic_id===state.runit.R4).map(x=>x.id);setOrder(orderKey("R4questions"),shuffle(ids));}if(state.rpart==="R5"){const ids=b.R5.items.filter(x=>x.topic_id===state.runit.R5).map(x=>x.id);setOrder(orderKey("R5headings"),shuffleDifferent(ids));}renderPractice()}
function originalCurrent(){if(state.skill==="listening"){if(state.lpart==="L1")resetOrder(orderKey(l1OrderName()));else resetOrder(orderKey(state.lpart));}else{const prefix=orderKey("");Object.keys(state.orders).filter(k=>k.startsWith(prefix)).forEach(k=>delete state.orders[k]);save();}renderPractice()}
function moveR23(id,delta){const items=bank().R23.sentences.filter(x=>x.topic_id===state.runit.R23),ids=items.map(x=>x.id),key=orderKey("R23"),ord=getOrder(key,ids),i=ord.indexOf(id),j=i+delta;if(i<0||j<0||j>=ord.length)return;[ord[i],ord[j]]=[ord[j],ord[i]];setOrder(key,ord);renderPractice()}
function showAllKeys(){$$('.keybox').forEach(x=>x.classList.remove('hidden'))}

function kcPick(arr,n){return shuffle(arr).slice(0,n)}
function kcPoolItems(){const fam=state.kcFamily||"all";return KEY_CODE_ITEMS.filter(x=>fam==="all"||x.family===fam)}
function kcItemStat(id){state.kcItemStats=state.kcItemStats||{};return state.kcItemStats[id]||(state.kcItemStats[id]={correct:0,wrong:0,seen:0,streak:0})}
function kcMastery(item){const st=kcItemStat(item.id),n=(st.correct||0)+(st.wrong||0);if(!n)return 0;return Math.max(0,Math.min(100,Math.round((st.correct/(n+1))*100 + Math.min(st.correct,3)*8 - Math.min(st.wrong,3)*8)))}
function kcWeightedPick(items){
  if(!items.length)return null;
  if(!state.kcSmart)return items[Math.floor(Math.random()*items.length)];
  const weighted=items.map(x=>{const st=kcItemStat(x.id),master=kcMastery(x);let w=1+(100-master)/22+(st.wrong||0)*1.8;if((st.seen||0)===0)w+=4;if(x.id===state.kcLastId)w*=.18;return [x,w]});
  const total=weighted.reduce((a,[,w])=>a+w,0);let r=Math.random()*total;for(const [x,w] of weighted){r-=w;if(r<=0)return x}return weighted[weighted.length-1][0];
}
function kcDistractorCodes(item){
  const same=KEY_CODE_GROUPS.filter(x=>x.family===item.family&&x.code!==item.code).map(x=>x.code);
  const other=KEY_CODE_GROUPS.filter(x=>x.code!==item.code&&!same.includes(x.code)).map(x=>x.code);
  let out=[item.code,...kcPick(same,3)];
  if(out.length<4)out.push(...kcPick(other.filter(x=>!out.includes(x)),4-out.length));
  return shuffle([...new Set(out)].slice(0,4));
}
function kcMakeQuestion(){
  const mode=state.kcMode||"level1";
  if(mode==="table")return null;
  if(mode==="code-key"){
    let groups=KEY_CODE_GROUPS.filter(g=>(state.kcFamily||"all")==="all"||g.family===state.kcFamily);
    if(!groups.length)groups=KEY_CODE_GROUPS;
    let candidates=groups.filter(x=>x.code!==state.kcLastId);if(!candidates.length)candidates=groups;
    const g=candidates[Math.floor(Math.random()*candidates.length)];state.kcLastId=g.code;
    const same=KEY_CODE_GROUPS.filter(x=>x.family===g.family&&x.code!==g.code).map(x=>x.code),other=KEY_CODE_GROUPS.filter(x=>x.code!==g.code&&!same.includes(x.code)).map(x=>x.code);
    let choices=[g.code,...kcPick(same,3)];if(choices.length<4)choices.push(...kcPick(other.filter(x=>!choices.includes(x)),4-choices.length));
    state.kcCurrent={mode,promptId:g.code,choices:shuffle([...new Set(choices)].slice(0,4)),selected:"",answered:false};save();return state.kcCurrent;
  }
  let pool=kcPoolItems();if(!pool.length)pool=KEY_CODE_ITEMS;
  const item=kcWeightedPick(pool);state.kcLastId=item.id;
  const contextIdx=mode==="level3"?Math.floor(Math.random()*item.contexts.length):0;
  state.kcCurrent={mode,promptId:item.id,contextIdx,choices:kcDistractorCodes(item),selected:"",answered:false};save();return state.kcCurrent;
}
function kcQuestionValid(q){
  if(!q||q.mode!==(state.kcMode||"level1")||!Array.isArray(q.choices)||q.choices.length<2)return false;
  if(q.mode==="code-key")return KEY_CODE_GROUPS.some(x=>x.code===q.promptId);
  return KEY_CODE_ITEMS.some(x=>x.id===q.promptId);
}
function kcEnsureQuestion(){if(!kcQuestionValid(state.kcCurrent))return kcMakeQuestion();return state.kcCurrent}
function kcCorrectCode(q){if(q.mode==="code-key")return q.promptId;return KEY_CODE_ITEMS.find(x=>x.id===q.promptId)?.code||""}
function kcChoiceLabel(q,code){if(q.mode!=="code-key")return fmtCode(code);const g=KEY_CODE_GROUPS.find(x=>x.code===code);return g?g.keys.join(" / "):code}
function kcAnswer(code){
  const q=kcEnsureQuestion();if(!q||q.answered)return;q.selected=code;q.answered=true;
  const correct=kcCorrectCode(q),ok=code===correct,st=state.kcStats||{correct:0,total:0,streak:0,best:0};
  st.total=(st.total||0)+1;st.correct=(st.correct||0)+(ok?1:0);st.streak=ok?(st.streak||0)+1:0;st.best=Math.max(st.best||0,st.streak||0);state.kcStats=st;
  if(q.mode!=="code-key"){const it=kcItemStat(q.promptId);it.seen=(it.seen||0)+1;if(ok){it.correct=(it.correct||0)+1;it.streak=(it.streak||0)+1}else{it.wrong=(it.wrong||0)+1;it.streak=0}}
  save();renderKeyCodeTrainer();
}
function kcNewQuestion(){state.kcCurrent=null;save();renderKeyCodeTrainer()}
function kcResetStats(){state.kcStats={correct:0,total:0,streak:0,best:0};state.kcItemStats={};state.kcCurrent=null;state.kcLastId="";save();renderKeyCodeTrainer()}
function kcMasterySummary(){const arr=kcPoolItems(),vals=arr.map(kcMastery);return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0}
function kcWeakItems(){return [...KEY_CODE_ITEMS].sort((a,b)=>kcMastery(a)-kcMastery(b)).slice(0,4)}
function renderKeyCodeTable(){
  return `<section class="card"><div class="head"><h2>Bảng ghi nhớ L3 · KEY ↔ CODE</h2><div class="sub">Mapping giữ nguyên theo bảng đã cung cấp. Nghĩa Việt, mnemonic và ví dụ nghe là lớp hỗ trợ DERIVED / GENERATED_PRACTICE.</div></div><div class="memory-table-wrap"><table class="memory-table"><thead><tr><th>Nhóm</th><th>KEY cần nhớ</th><th>Nghĩa</th><th>CODE</th><th>Mẹo</th><th>Độ nhớ</th></tr></thead><tbody>${KEY_CODE_ITEMS.map(x=>`<tr><td><span class="family-chip">${esc(x.family)}</span></td><td><b>${esc(x.key)}</b></td><td class="vi-meaning">${esc(x.vi)}</td><td><span class="code-chip">${esc(fmtCode(x.code))}</span></td><td class="mini vi-meaning">${esc(x.mnemonic)}</td><td><b>${kcMastery(x)}%</b></td></tr>`).join("")}</tbody></table></div><div class="note info"><b>Chuỗi nhớ nhanh:</b> họ 12 = Job 01 · Art 02 · Audition 00 · Home 10 · Tech 20. Họ 20 = Internet/music 10 · Culture/Business 11. Nhóm 0x = Community 0120 · University 0121 · Children+Tech 0021 · Politics 0210.</div></section>`;
}
function kcPromptBlock(q,item){
  if(q.mode==="level1")return `<div class="kc-prompt"><span>CẤP 1 · NHÌN KEY</span><strong>${esc(item.key)}</strong><small class="vi-meaning">${esc(item.vi)}</small></div>`;
  if(q.mode==="level2")return `<div class="kc-prompt audio"><span>CẤP 2 · NGHE KEY</span><strong>🎧 Nghe rồi chọn CODE</strong><small>Không nhìn KEY trước khi trả lời</small><div class="toolbar" style="justify-content:center"><button class="btn secondary" data-action="kc-play">▶ Nghe KEY</button><button class="btn danger" data-action="stop-audio">■ Stop</button></div></div>`;
  if(q.mode==="level3")return `<div class="kc-prompt audio"><span>CẤP 3 · NGHE PARAPHRASE</span><strong>🎧 Nhận diện chủ đề rồi chọn CODE</strong><small>${provBadge("GENERATED_PRACTICE")} Câu gợi ý luyện phản xạ, không phải audio đề nguồn.</small><div class="toolbar" style="justify-content:center"><button class="btn secondary" data-action="kc-play">▶ Nghe câu</button><button class="btn danger" data-action="stop-audio">■ Stop</button></div></div>`;
  const g=KEY_CODE_GROUPS.find(x=>x.code===q.promptId);return `<div class="kc-prompt"><span>ĐẢO CHIỀU · CODE → KEY</span><strong>${esc(fmtCode(q.promptId))}</strong><small>Chọn nhóm KEY tương ứng</small></div>`;
}
function kcResultBlock(q,item,correct){
  if(!q.answered)return `<div class="toolbar" style="justify-content:center;margin-top:12px"><button class="btn ghost" data-action="toggle" data-target="kcFamilyHint">💡 Gợi ý nhóm mã</button></div>`;
  if(q.mode==="code-key"){const g=KEY_CODE_GROUPS.find(x=>x.code===correct);return `<div class="kc-result ${q.selected===correct?"ok":"no"}">${q.selected===correct?"✓ Chính xác":"✗ Chưa đúng"} · <b>${esc(fmtCode(correct))} → ${esc(g?.keys.join(" / ")||"")}</b></div><div class="toolbar" style="justify-content:center;margin-top:12px"><button class="btn" data-action="kc-next">Câu tiếp →</button></div>`}
  const idx=q.contextIdx||0,context=item.contexts[idx]||"",cvi=item.contextVi[idx]||"";
  return `<div class="kc-result ${q.selected===correct?"ok":"no"}">${q.selected===correct?"✓ Chính xác":"✗ Chưa đúng"} · <b>${esc(item.key)} → ${esc(fmtCode(correct))}</b></div><div class="kc-reveal"><div><b>KEY:</b> ${esc(item.key)} · <span class="vi-meaning"><b>Nghĩa:</b> ${esc(item.vi)}</span></div><div class="vi-meaning"><b>Mẹo nhớ:</b> ${esc(item.mnemonic)}</div>${q.mode==="level3"?`<div><b>Câu đã nghe:</b> ${esc(context)}</div><div class="mini vi-meaning"><b>Nghĩa:</b> ${esc(cvi)}</div>`:""}<div class="mini"><b>Anchor words:</b> ${item.anchors.map(a=>`<strong>${esc(a)}</strong>`).join(" · ")}</div></div><div class="toolbar" style="justify-content:center;margin-top:12px"><button class="btn" data-action="kc-next">Câu tiếp →</button></div>`;
}
function renderKeyCodeTrainer(){
  applyViVisibility();
  const mode=state.kcMode||"level1",st=state.kcStats||{correct:0,total:0,streak:0,best:0},pct=st.total?Math.round(st.correct/st.total*100):0,master=kcMasterySummary();
  let body="";
  if(mode==="table")body=renderKeyCodeTable();
  else{
    const q=kcEnsureQuestion(),correct=kcCorrectCode(q),item=q.mode==="code-key"?KEY_CODE_GROUPS.find(x=>x.code===q.promptId):KEY_CODE_ITEMS.find(x=>x.id===q.promptId);
    body=`<section class="card keycode-card"><div class="head"><h2>L3 Smart Key ↔ Code Trainer</h2><div class="sub">Cấp 1 → Cấp 2 → Cấp 3. Smart Review ưu tiên KEY anh còn yếu.</div></div><div class="kc-stats"><div><b>${st.correct||0}/${st.total||0}</b><span>Đúng</span></div><div><b>${pct}%</b><span>Tỷ lệ</span></div><div><b>${st.streak||0}</b><span>Chuỗi đúng</span></div><div><b>${master}%</b><span>Độ nhớ nhóm</span></div></div>${kcPromptBlock(q,item)}<div id="kcFamilyHint" class="note info hidden"><b>Nhóm gợi ý:</b> ${esc(item.family||"")}${q.mode!=="code-key"?` · ${esc(item.mnemonic)}`:""}</div><div class="kc-options">${q.choices.map(code=>{const selected=q.selected===code,isCorrect=code===correct;let cls="kc-option";if(q.answered&&isCorrect)cls+=" correct";else if(q.answered&&selected)cls+=" wrong";return `<button class="${cls}" data-action="kc-answer" data-code="${esc(code)}" ${q.answered?"disabled":""}>${esc(kcChoiceLabel(q,code))}</button>`}).join("")}</div>${kcResultBlock(q,item,correct)}</section>`;
  }
  const weak=kcWeakItems();
  app.innerHTML=`<section class="card"><div class="toolbar space"><div class="tabs kc-level-tabs"><button class="tab ${mode==="level1"?"active":""}" data-kcmode="level1">1 · Nhìn KEY</button><button class="tab ${mode==="level2"?"active":""}" data-kcmode="level2">2 · Nghe KEY</button><button class="tab ${mode==="level3"?"active":""}" data-kcmode="level3">3 · Nghe câu</button><button class="tab ${mode==="code-key"?"active":""}" data-kcmode="code-key">↔ Đảo chiều</button><button class="tab ${mode==="table"?"active":""}" data-kcmode="table">Bảng</button></div><div class="toolbar"><button class="btn vi-toggle ${state.showVi!==false?"secondary":"ghost"}" data-action="toggle-vi">${state.showVi!==false?"🙈 Ẩn nghĩa Việt":"🇻🇳 Hiện nghĩa Việt"}</button><button class="btn danger small" data-action="kc-reset-stats">Xóa điểm</button></div></div><div class="kc-controls"><label>Học theo họ <select id="kcFamilySel" class="select">${KEY_CODE_FAMILIES.map(f=>`<option value="${esc(f)}" ${f===(state.kcFamily||"all")?"selected":""}>${f==="all"?"Tất cả":f}</option>`).join("")}</select></label><label class="kc-smart"><input id="kcSmart" type="checkbox" ${state.kcSmart!==false?"checked":""}> Smart Review</label><span class="mini">Yếu nhất: ${weak.map(x=>`${esc(x.key)} ${kcMastery(x)}%`).join(" · ")}</span></div></section>${body}`;
}

function renderVoices(){const opts=(sel,blank=false)=>`${blank?'<option value="">-- Không chọn --</option>':''}${voices.map(v=>`<option value="${esc(v.voiceURI)}" ${v.voiceURI===sel?'selected':''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}`;app.innerHTML=`<section class="card"><div class="head"><h2>Giọng đọc · Web Speech API</h2><div class="sub">Không cần Google API key. Voice lấy từ Chrome/Edge/Windows.</div></div><div class="note info">Tìm thấy <b>${voices.length}</b> English voices trên máy/trình duyệt này.</div><div class="grid"><div class="field"><label>Giọng nam</label><select id="male">${opts(vs.male)}</select><button class="btn secondary" data-action="test-m">▶ Test</button></div><div class="field"><label>Giọng nữ</label><select id="female">${opts(vs.female)}</select><button class="btn secondary" data-action="test-f">▶ Test</button></div><div class="field"><label>Voice phụ 1</label><select id="extra1">${opts(vs.extra1,true)}</select></div><div class="field"><label>Voice phụ 2</label><select id="extra2">${opts(vs.extra2,true)}</select></div><div class="field"><label>Tốc độ</label><select id="rate">${[.7,.8,.85,.9,.95,1,1.05,1.1,1.2].map(r=>`<option value="${r}" ${Number(vs.rate)===r?'selected':''}>${r}×</option>`).join('')}</select></div><div class="field"><label>Random voice</label><select id="random"><option value="0" ${!vs.random?'selected':''}>Không</option><option value="1" ${vs.random?'selected':''}>Có</option></select></div></div><div class="toolbar" style="margin-top:12px"><button class="btn" data-action="save-v">Lưu giọng</button><button class="btn ghost" data-action="reload-v">↻ Tải lại voice</button><button class="btn danger" data-action="stop-audio">■ Dừng đọc</button></div></section>`}
function renderPacks(){
  const sc=onlineStatus.state==="ok"?"source":onlineStatus.state==="error"?"generated":"info";
  const onlineCount=packs.filter(p=>["online","online-cache","bundled"].includes(p.__pack_source)).length;
  const localCount=packs.filter(p=>p.__pack_source==="local").length;
  app.innerHTML=`<section class="card"><div class="head"><h2>Quản lý Pack · GitHub Edition</h2><div class="sub">Pack chính thức được tải tự động từ <span class="kbd">packs/pack_manifest.json</span>. Import JSON vẫn dùng được cho pack cá nhân.</div></div><div class="note ${sc}"><b>${esc(onlineStatus.message)}</b>${onlineStatus.manifest?`<br>Manifest: ${esc(onlineStatus.manifest)}`:""}${onlineStatus.updated_at?` · Cache: ${esc(onlineStatus.updated_at)}`:""}</div><div class="toolbar"><button class="btn" data-action="refresh-online">↻ Cập nhật Pack Online</button><label class="btn secondary" for="packFile">＋ Import Pack JSON</label><input id="packFile" type="file" accept=".json,application/json" class="hidden"><span class="pill">Online: ${onlineCount}</span><span class="pill">Cá nhân: ${localCount}</span></div><div class="divider"></div>${packs.map(p=>{const src=p.__pack_source||"local",canDelete=src==="local";return `<div class="pack-row"><div><h3>${esc(p.title)}</h3><div class="help"><span class="pill">${esc(packSourceLabel(p))}</span> ${esc(p.pack_id)} · schema ${esc(p.schema_version||'?')} ${p.__pack_version?`· version ${esc(p.__pack_version)}`:""} · ${(p.sets||[]).length} set · Reading bank: ${p.reading_bank?'có':'không'}</div></div><div class="toolbar"><button class="btn" data-action="use-pack" data-id="${esc(p.pack_id)}">Dùng</button>${canDelete?`<button class="btn danger" data-action="delete-pack" data-id="${esc(p.pack_id)}">Xóa</button>`:''}</div></div>`}).join('')}</section>`;bindDynamic()}

function renderProgress(){const a=Object.entries(state.attempts).map(([k,v])=>({k,...v})),avg=a.length?a.reduce((s,x)=>s+x.pct,0)/a.length:0;const rb=bank();app.innerHTML=`<div class="statgrid"><div class="stat"><b>${a.length}</b><span>Bài/lượt đã chấm</span></div><div class="stat"><b>${Math.round(avg*100)}%</b><span>Điểm trung bình</span></div><div class="stat"><b>${rb.R1?.coverage?.sets||rb.R1?.sets?.length||0}</b><span>R1 sets</span></div><div class="stat"><b>${rb.R4?.coverage?.questions||rb.R4?.items?.length||0}</b><span>R4 questions</span></div></div><section class="card" style="margin-top:12px"><div class="head"><h2>Lịch sử gần đây</h2></div>${a.length?a.sort((x,y)=>y.date-x.date).slice(0,30).map(x=>`<div class="pack-row"><div class="help">${esc(x.k)}</div><b class="${x.pct>=.8?'good':'bad'}">${x.correct}/${x.total} · ${Math.round(x.pct*100)}%</b></div>`).join(''):'<div class="note info">Chưa có bài nào được chấm.</div>'}<div class="toolbar" style="margin-top:12px"><button class="btn danger" data-action="clear-progress">Xóa lịch sử điểm</button></div></section>`}
function renderAbout(){const b=bank();const onlineCount=packs.filter(p=>["online","online-cache","bundled"].includes(p.__pack_source)).length;app.innerHTML=`<section class="card"><div class="head"><h2>APTIS Complete Trainer V3.8.3 · Toggle Vietnamese Meaning</h2><div class="sub">Listening 01–27 canonical + Set 28 supplemental + Reading SOURCE đã đối chiếu lại 4 tài liệu + 10-topic Practice bank.</div></div><div class="statgrid"><div class="stat"><b>${packs.reduce((n,p)=>n+(p.sets||[]).filter(s=>s.parts?.L1).length,0)}</b><span>Listening sets đang có</span></div><div class="stat"><b>${onlineCount}</b><span>Online packs</span></div><div class="stat"><b>${b.R1?.items?.length||0}</b><span>R1 blanks</span></div><div class="stat"><b>${b.R4?.items?.length||0}</b><span>R4 questions</span></div></div><div class="about-list"><p><b>Cơ chế GitHub:</b> Listening Set 01–27 và toàn bộ Reading đã nằm trong core nên mọi thiết bị thấy ngay, không phụ thuộc localStorage. <span class="kbd">packs/pack_manifest.json</span> chỉ dành cho pack bổ sung về sau.</p><p><b>Import cá nhân:</b> vẫn có thể import JSON thủ công. Pack cá nhân nằm trong localStorage của từng trình duyệt; pack online nằm trên GitHub và mọi thiết bị dùng cùng website đều nhận được.</p><p><b>Reading SOURCE:</b> R1 = ${b.R1?.sets?.length||0} sets / ${b.R1?.items?.length||0} blanks; R2–3 = ${b.R23?.topics?.length||0} topics / ${b.R23?.sentences?.length||0} sentences; R4 = ${b.R4?.topics?.length||0} topics / ${b.R4?.items?.length||0} questions; R5 = ${b.R5?.topics?.length||0} topics / ${b.R5?.items?.length||0} source headings.</p><p><b>Reading PRACTICE:</b> ${PRACTICE.topics?.length||0} chủ đề / ${PRACTICE.items?.length||0} item, tách riêng và luôn gắn GENERATED_PRACTICE.</p><p><b>L3 Key ↔ Code:</b> có 3 cấp: nhìn KEY, nghe KEY, nghe paraphrase; thêm Smart Review theo lỗi, học theo họ mã, đảo chiều CODE → KEY và bảng ghi nhớ.</p><p><b>L3:</b> Man/Woman luôn khóa đúng voice Nam/Nữ, kể cả khi bật Random voice. <b>L4:</b> lựa chọn A/B/C được xáo lại mỗi lần vào và Key hiển thị nghĩa tiếng Việt.</p><p><b>R5:</b> heading/đáp án tự xáo; Paragraph A→G giữ nguyên. Mỗi đoạn có bản dịch đầy đủ, ý chính và cụm KEY → concept → heading trong phần Hiện Key. Canonical source có 0 full paragraphs; paragraph luyện vẫn được gắn <span class="badge generated">GENERATED_PRACTICE</span>.</p><p><b>Triển khai:</b> GitHub Pages là chế độ khuyến nghị. Khi chạy cục bộ, dùng <span class="kbd">START_LOCAL_SERVER.bat</span> để cơ chế manifest hoạt động đầy đủ.</p></div></section>`}

function bindDynamic(){}
function render(){stop();applyViVisibility();$$('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));if(state.view==='practice')renderPractice();else if(state.view==='keycode')renderKeyCodeTrainer();else if(state.view==='voices')renderVoices();else if(state.view==='packs')renderPacks();else if(state.view==='progress')renderProgress();else renderAbout()}
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.view){state.view=b.dataset.view;save();render();return}if(b.dataset.kcmode){state.kcMode=b.dataset.kcmode;state.kcCurrent=null;save();renderKeyCodeTrainer();return}if(b.dataset.skill){state.skill=b.dataset.skill;save();renderPractice();return}if(b.dataset.lpart){state.lpart=b.dataset.lpart;save();renderPractice();return}if(b.dataset.l1mode){state.l1StudyMode=b.dataset.l1mode;if(state.l1StudyMode==="check")ensureL1CheckSet(false);save();renderPractice();return}if(b.dataset.l1scope){state.l1Scope=b.dataset.l1scope;if(state.l1StudyMode==="check")state.l1StudyMode="source";save();renderPractice();return}if(b.dataset.r1scope){state.r1Scope=b.dataset.r1scope;save();renderPractice();return}if(b.dataset.rmode){state.rmode=b.dataset.rmode;save();renderPractice();return}if(b.dataset.rpart){state.rpart=b.dataset.rpart;ensureReadingUnit();if(state.rpart==="R5")delete state.orders[orderKey("R5headings")];save();renderPractice();return}if(b.dataset.ppart){state.ppart=b.dataset.ppart;if(state.ppart==="part5"){const x=pItems()[0];if(x)delete state.orders[orderKey(`P5HEAD:${x.id}`)]}save();renderPractice();return}const a=b.dataset.action;if(a==='toggle-vi'){state.showVi=state.showVi===false?true:false;save();render();return}else if(a==='new-l1-check'){newL1CheckSet();state.l1StudyMode='check';save();renderPractice();return}else if(a==='new-l1-learn'){state.l1LearnRound=(Number(state.l1LearnRound)||1)+1;save();renderPractice();return}else if(a==='toggle')$(`#${CSS.escape(b.dataset.target)}`)?.classList.toggle('hidden');else if(a==='kc-answer')kcAnswer(b.dataset.code);else if(a==='kc-next')kcNewQuestion();else if(a==='kc-play'){const q=kcEnsureQuestion();if(q&&q.mode!=='code-key'){const item=KEY_CODE_ITEMS.find(x=>x.id===q.promptId);if(item){const text=q.mode==='level3'?(item.contexts[q.contextIdx||0]||item.contexts[0]):item.audio;await speakText(text,0)}}}else if(a==='kc-reset-stats'){if(confirm('Xóa điểm luyện KEY ↔ CODE?'))kcResetStats()}else if(a==='shuffle')shuffleCurrent();else if(a==='original')originalCurrent();else if(a==='check-l1-item')checkL1Item(b.dataset.id);else if(a==='check-l1-all')checkL1All();else if(a==='check-l2-item')checkL2Item(b.dataset.id);else if(a==='check-l2-all')checkL2All();else if(a==='check-l3-all')checkL3All();else if(a==='check-l4-all')checkL4All();else if(a==='check-r1-item')checkR1Item(b.dataset.id);else if(a==='check-r1-all')checkR1All();else if(a==='check-r23')checkR23();else if(a==='check-r4-item')checkR4Item(b.dataset.id);else if(a==='check-r4-all')checkR4All();else if(a==='check-r5-item')checkR5Item(b.dataset.id);else if(a==='check-r5-all')checkR5All();else if(a==='check-p1-item')checkP1Item(b.dataset.id);else if(a==='check-p1-all')checkP1All();else if(a==='check-p23-task')checkP23Task(b.dataset.id);else if(a==='check-p23-all')checkP23All();else if(a==='check-p4-item')checkP4Item(b.dataset.id);else if(a==='check-p4-all')checkP4All();else if(a==='check-p5-item')checkP5Item(b.dataset.id);else if(a==='check-p5-all')checkP5All();else if(a==='show-all-keys')showAllKeys();else if(a==='r23-up')moveR23(b.dataset.id,-1);else if(a==='r23-down')moveR23(b.dataset.id,1);else if(a==='p23-up')moveP23(b.dataset.task,b.dataset.id,-1);else if(a==='p23-down')moveP23(b.dataset.task,b.dataset.id,1);else if(a==='play-l1'){const x=findListeningL1Item(b.dataset.id);if(x)await speakSegments(l1GeneratedSegments(x,state.l1StudyMode))}else if(a==='play-l2'){const d=cset().parts.L2,x=d.speakers.find(z=>z.id===b.dataset.id);await speakText(x.script_text,Number(b.dataset.slot||0))}else if(a==='play-l3')await speakSegments(cset().parts.L3.script_segments||[],true);else if(a==='play-l4')await speakText(cset().parts.L4.script_text,1);else if(a==='play-wrong'){const x=listeningL1Items().find(x=>$(`[data-q="${CSS.escape(x.id)}"]`)?.classList.contains('wrong'));if(x)await speakSegments(l1GeneratedSegments(x,state.l1StudyMode));else alert('Chưa có câu sai đã chấm.')}else if(a==='speak-r1'){const x=bank().R1.items.find(z=>z.id===b.dataset.id);await speakText(x.sentence_template.replace('___',x.answer))}else if(a==='speak-r4-passages'){const t=bank().R4.topics.find(x=>x.topic_id===state.runit.R4);await speakSegments(['A','B','C','D'].map((k,i)=>({speaker:i%2?'F':'M',text:`Person ${k}. ${t.passages_en[k]}`})))}else if(a==='speak-r5'){const x=bank().R5.items.find(z=>z.id===b.dataset.id);await speakText(x.practice_paragraph_en)}else if(a==='save-v'){const male=$('#male').value,female=$('#female').value;if(male&&female&&male===female){alert('Giọng Nam và Nữ phải là hai voice khác nhau để L3 đọc đúng Man/Woman.');return}vs.male=male;vs.female=female;vs.extra1=$('#extra1').value;vs.extra2=$('#extra2').value;vs.rate=Number($('#rate').value);vs.random=$('#random').value==='1';saveV();alert('Đã lưu giọng đọc. L3 luôn khóa đúng Man/Woman kể cả khi bật Random voice.')}else if(a==='reload-v')loadVoices();else if(a==='test-m'){stop();const t=speechToken;await speakOne('This is the selected male English voice for Aptis practice.',vuri($('#male').value),t)}else if(a==='test-f'){stop();const t=speechToken;await speakOne('This is the selected female English voice for Aptis practice.',vuri($('#female').value),t)}else if(a==='stop-audio')stop();else if(a==='refresh-online'){await refreshOnlinePacks(true,false)}else if(a==='use-pack'){state.packId=b.dataset.id;const p=cp();state.setId=p.sets?.[0]?.set_id||'';state.view='practice';save();render()}else if(a==='delete-pack'){const target=packs.find(x=>x.pack_id===b.dataset.id);if(target?.__pack_source!=="local"){alert('Chỉ xóa được pack cá nhân đã Import. Pack tích hợp/online được quản lý bằng manifest GitHub.');return}userPacks=userPacks.filter(x=>x.pack_id!==b.dataset.id);saveUsers();if(state.packId===b.dataset.id){state.packId=DEFAULT.pack_id;state.setId=DEFAULT.sets[0].set_id;save()}rebuildPacks();renderPacks()}else if(a==='clear-progress'){if(confirm('Xóa toàn bộ lịch sử điểm?')){state.attempts={};save();renderProgress()}}});
document.addEventListener('change',async e=>{if(e.target.id==='kcFamilySel'){state.kcFamily=e.target.value;state.kcCurrent=null;state.kcLastId='';save();renderKeyCodeTrainer()}else if(e.target.id==='kcSmart'){state.kcSmart=e.target.checked;state.kcCurrent=null;save();renderKeyCodeTrainer()}else if(e.target.id==='packSel'){state.packId=e.target.value;const p=cp();state.setId=p.sets?.[0]?.set_id||'';save();renderPractice()}else if(e.target.id==='l1BatchSel'){if(e.target.value==='__L1_CHECK__'){state.l1StudyMode='check';ensureL1CheckSet(false)}else if(e.target.value==='__L1_FULL__'){if(state.l1StudyMode==='check')state.l1StudyMode='source';state.l1Scope='all'}else{if(state.l1StudyMode==='check')state.l1StudyMode='source';state.l1Scope='current';state.l1Batch=Math.max(1,Number(e.target.value)||1)}save();renderPractice()}else if(e.target.id==='setSel'){if(e.target.value==='__L1_CHECK__'){state.l1StudyMode='check';ensureL1CheckSet(false)}else if(e.target.value==='__L1_FULL__'){state.l1StudyMode=state.l1StudyMode==='check'?'source':state.l1StudyMode;state.l1Scope='all'}else{if(state.l1StudyMode==='check')state.l1StudyMode='source';state.l1Scope='current';state.setId=e.target.value;const s=cset();if(s?.reading_refs){state.runit=Object.assign({},state.runit,s.reading_refs)}}save();renderPractice()}else if(e.target.id==='runitSel'){state.runit=state.runit||{};if(state.rpart==='R1'&&e.target.value==='__R1_FULL__'){state.r1Scope='all'}else{if(state.rpart==='R1')state.r1Scope='current';state.runit[state.rpart]=e.target.value;if(state.rpart==="R5")delete state.orders[orderKey("R5headings")]}save();renderPractice()}else if(e.target.id==='ptopicSel'){state.ptopic=e.target.value;if(state.ppart==="part5"){const x=pItems()[0];if(x)delete state.orders[orderKey(`P5HEAD:${x.id}`)]}save();renderPractice()}else if(e.target.id==='packFile'){const f=e.target.files?.[0];if(!f)return;try{const p=validatePack(JSON.parse(await f.text()));const protectedPack=packs.find(x=>x.pack_id===p.pack_id&&x.__pack_source!=="local");if(protectedPack)throw new Error(`pack_id ${p.pack_id} đã thuộc pack ${packSourceLabel(protectedPack)}. Hãy đổi pack_id nếu muốn giữ một bản cá nhân riêng.`);const i=userPacks.findIndex(x=>x.pack_id===p.pack_id);if(i>=0){if(!confirm(`Pack ${p.pack_id} đã được import trước đó. Ghi đè bản cá nhân?`)){e.target.value='';return}userPacks[i]=p}else userPacks.push(p);saveUsers();rebuildPacks();alert(`Đã import ${p.title||p.pack_id}. Pack cá nhân chỉ lưu trên trình duyệt này.`);renderPacks()}catch(err){alert(err.message)}finally{e.target.value=''}}});
if('speechSynthesis'in window){speechSynthesis.onvoiceschanged=loadVoices;loadVoices()}
render();
setTimeout(()=>refreshOnlinePacks(false,true),0);
})();