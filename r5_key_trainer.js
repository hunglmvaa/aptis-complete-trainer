/* Reading Part 5 - KEY memorisation only.
 * SOURCE: existing DEFAULT_APTIS_DATA.reading_bank.R5 (teacher headings/tokens).
 * This module neither modifies SOURCE nor writes to the application's old state keys.
 */
(()=>{
"use strict";
const PROGRESS_KEY="aptis_r5_key_memory_v1";
const TOKEN_VI={
  changing:"thay đổi",sense:"cảm giác",publishing:"công bố",wrong:"sai lầm",
  revelation:"phát hiện gây lo ngại",focus:"trọng tâm",relationship:"mối quan hệ",
  life:"lối sống",benefits:"lợi ích",financial:"tài chính",challenges:"thách thức",
  old:"cũ",people:"con người",solutions:"giải pháp",obscure:"bị che khuất",
  pioneer:"người tiên phong",man:"người đàn ông",long:"lâu dài",
  balance:"cân bằng",uniformity:"sự đồng nhất"
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const load=()=>{try{const p=JSON.parse(localStorage.getItem(PROGRESS_KEY)||"null");return p&&typeof p==="object"?p:{}}catch{return {}}};
const progress=Object.assign({topicId:"R5_T01",mode:"chain",direction:"position",vi:true,known:{},tests:{}},load());
if(!progress.known||typeof progress.known!=="object")progress.known={};
if(!progress.tests||typeof progress.tests!=="object")progress.tests={};
const save=()=>{try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress))}catch{}};
const bank=()=>window.DEFAULT_APTIS_DATA?.reading_bank?.R5;
const topics=()=>{
  const b=bank();
  return (b?.topics||[]).map(t=>({
    ...t,
    headings:(b?.items||[]).filter(x=>x.topic_id===t.topic_id)
      .slice().sort((a,c)=>Number(a.heading_position)-Number(c.heading_position))
  })).filter(t=>t.headings.length);
};
const currentTopic=()=>topics().find(t=>t.topic_id===progress.topicId)||topics()[0];
const known=id=>progress.known[id]===true;
const randomOrder=xs=>{
  const a=xs.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  if(a.length>1&&a.every((v,i)=>v===xs[i]))[a[0],a[1]]=[a[1],a[0]];
  return a;
};
const newQuiz=t=>({pool:randomOrder(t.headings.map(h=>h.id)),answers:[],checked:false,message:"",score:null});
const ui={revealed:{},showAll:true,cardIndex:0,cardFlipped:false,weakOnly:false,quiz:null};
const viLine=(text,cl="")=>progress.vi?`<div class="r5km-vi ${cl}">${esc(text||"")}</div>`:"";
const learnedCount=t=>t.headings.filter(h=>known(h.id)).length;
const tokenVi=h=>TOKEN_VI[String(h.memory_token||"").toLowerCase()]||"";
const scoreText=t=>{const s=progress.tests[t.topic_id];return s?`Cao nhất: ${s.best}/${t.headings.length} · ${s.tries} lượt kiểm tra`:`Chưa kiểm tra chủ đề này`};
function commonHeader(t){
  const all=topics(),nLearned=all.reduce((n,x)=>n+learnedCount(x),0),nHeads=all.reduce((n,x)=>n+x.headings.length,0);
  return `<section class="card r5km-top">
    <div class="head"><h2>🔑 Học Key · Reading Part 5</h2>
      <div class="sub">Học thuộc chuỗi key theo bộ đề trong tài liệu · giữ nguyên tiêu đề và thứ tự SOURCE.</div></div>
    <div class="r5km-summary"><span><b>${all.length}</b> chủ đề</span><span><b>${nHeads}</b> tiêu đề</span><span><b>${nLearned}/${nHeads}</b> thẻ đã nhớ</span></div>
    <div class="r5km-topic-picker" aria-label="Chọn chủ đề Reading Part 5">
      ${all.map(x=>`<button class="r5km-topic ${x.topic_id===t.topic_id?"active":""}" data-r5km="topic" data-id="${esc(x.topic_id)}" aria-pressed="${x.topic_id===t.topic_id}">
      <span class="r5km-topic-number">Bộ ${esc(x.source_no)}</span><strong>${esc(x.title_en_teacher)}</strong><small>${learnedCount(x)}/${x.headings.length} key đã nhớ</small></button>`).join("")}
    </div>
    <div class="r5km-selected"><b>${esc(t.title_en_teacher)}</b>${viLine(t.title_vi_teacher)}<small>${esc(scoreText(t))}</small></div>
    <div class="tabs r5km-modes" aria-label="Cách học từ khóa">
      ${[["chain","1 · Học chuỗi"],["cards","2 · Flashcard"],["quiz","3 · Kiểm tra"]].map(([m,label])=>
      `<button class="tab ${progress.mode===m?"active":""}" data-r5km="mode" data-mode="${m}" aria-pressed="${progress.mode===m}">${label}</button>`).join("")}
    </div>
    <div class="r5km-options"><button class="btn small ghost" data-r5km="vi" aria-pressed="${progress.vi}">${progress.vi?"🙈 Ẩn nghĩa Việt":"🇻🇳 Hiện nghĩa Việt"}</button>
    <span class="help">Kết quả học Key R5 được lưu riêng trên trình duyệt này.</span></div>
  </section>`;
}
function renderChain(t){
  return `<section class="card r5km-main">
    <div class="r5km-section-head"><div><h3>Bước 1 · Ghi nhớ chuỗi 7 key</h3>
    <div class="sub">Đọc lần lượt từ 1 đến 7. Sau đó che tiêu đề và tự đọc lại cả chuỗi.</div></div>
    <button class="btn secondary small" data-r5km="all">${ui.showAll?"🙈 Che tiêu đề":"👁 Hiện tất cả"}</button></div>
    <div class="r5km-chain" aria-label="Chuỗi KEY theo thứ tự">
      ${t.headings.map((h,i)=>`<span class="r5km-chain-item"><b>${i+1}</b> ${esc(h.memory_token)}${i<t.headings.length-1?`<span class="r5km-chain-arrow">→</span>`:""}</span>`).join("")}</div>
    <div class="r5km-steps">${t.headings.map((h,i)=>{
      const open=ui.showAll||Boolean(ui.revealed[h.id]);
      return `<article class="r5km-step">
       <div class="r5km-step-num">${i+1}</div><div class="r5km-step-body">
         <div class="r5km-word"><strong>${esc(h.memory_token)}</strong><span class="r5km-meaning">${progress.vi?esc(tokenVi(h)):""}</span>${known(h.id)?`<span class="r5km-known">✓ Đã nhớ</span>`:""}</div>
         ${open?`<div class="r5km-heading">${esc(h.heading_en_teacher)}</div>${viLine(h.heading_vi_teacher)}`:
           `<div class="r5km-covered">Tiêu đề đang được che — hãy tự nhớ trước khi mở.</div>`}
        </div><button class="btn small ghost r5km-reveal-btn" data-r5km="reveal" data-id="${esc(h.id)}" aria-expanded="${open}">${open?"Ẩn":"Xem"}</button>
       </article>`}).join("")}</div>
    <div class="r5km-bottom-actions"><button class="btn" data-r5km="mode" data-mode="cards">Luyện Flashcard →</button><button class="btn secondary" data-r5km="mode" data-mode="quiz">Kiểm tra chuỗi →</button></div>
  </section>`;
}
function cardSet(t){
  const weak=t.headings.filter(h=>!known(h.id));
  return ui.weakOnly&&weak.length?weak:t.headings;
}
function renderCards(t){
  const items=cardSet(t),weakCount=t.headings.length-learnedCount(t);
  ui.cardIndex=Math.max(0,Math.min(ui.cardIndex,items.length-1));
  const h=items[ui.cardIndex];if(!h)return "";
  const asPosition=progress.direction==="position";
  const front=asPosition?`<div class="r5km-card-prompt">Hãy nhớ từ khóa ở vị trí này</div><strong class="r5km-card-frontword">Số ${h.heading_position} / ${t.headings.length}</strong>`:
    `<div class="r5km-card-prompt">Nhìn key, hãy nhớ tiêu đề tương ứng</div><strong class="r5km-card-frontword">${esc(h.memory_token)}</strong>${viLine(tokenVi(h))}`;
  const back=`<div class="r5km-card-prompt">Đáp án cần ghi nhớ</div><strong class="r5km-card-backword">${esc(h.memory_token)}</strong>${viLine(tokenVi(h))}
    <div class="r5km-card-answer-en">${esc(h.heading_en_teacher)}</div>${viLine(h.heading_vi_teacher)}`;
  return `<section class="card r5km-main"><div class="r5km-section-head"><div><h3>Bước 2 · Flashcard nhớ key</h3>
    <div class="sub">Lật thẻ, tự đánh giá. Các thẻ chưa thuộc có thể luyện lại riêng.</div></div><span class="pill">Đã nhớ ${learnedCount(t)}/${t.headings.length}</span></div>
    <div class="r5km-direction" role="group" aria-label="Hướng luyện thẻ">
      <button class="btn small ${asPosition?"secondary":"ghost"}" data-r5km="direction" data-direction="position" aria-pressed="${asPosition}">Vị trí → Key</button>
      <button class="btn small ${!asPosition?"secondary":"ghost"}" data-r5km="direction" data-direction="keyword" aria-pressed="${!asPosition}">Key → Tiêu đề</button>
      <button class="btn small ${ui.weakOnly?"secondary":"ghost"}" data-r5km="weak" aria-pressed="${ui.weakOnly}" ${weakCount?"":"disabled"}>Ôn thẻ chưa thuộc (${weakCount})</button>
    </div>
    <div class="r5km-card-count">Thẻ ${ui.cardIndex+1}/${items.length}${known(h.id)?" · ✓ Đã nhớ":" · Cần luyện"}</div>
    <button class="r5km-flashcard ${ui.cardFlipped?"flipped":""}" data-r5km="flip" aria-label="${ui.cardFlipped?"Ẩn đáp án":"Lật thẻ xem đáp án"}" aria-pressed="${ui.cardFlipped}">
      ${ui.cardFlipped?back:front}<span class="r5km-flip-hint">${ui.cardFlipped?"Chạm để úp thẻ":"Chạm để lật thẻ xem đáp án"}</span>
    </button>
    <div class="r5km-card-controls"><button class="btn ghost" data-r5km="prev">← Trước</button>
      <button class="btn danger" data-r5km="mark" data-known="false" ${ui.cardFlipped?"":"disabled"}>↻ Chưa thuộc</button>
      <button class="btn" data-r5km="mark" data-known="true" ${ui.cardFlipped?"":"disabled"}>✓ Đã thuộc</button>
      <button class="btn ghost" data-r5km="next">Tiếp →</button></div>
    <div class="r5km-bottom-actions"><button class="btn secondary" data-r5km="mode" data-mode="chain">← Xem chuỗi key</button><button class="btn" data-r5km="mode" data-mode="quiz">Kiểm tra trí nhớ →</button></div>
  </section>`;
}
function renderQuiz(t){
  if(!ui.quiz||!ui.quiz.pool.every(id=>t.headings.some(h=>h.id===id))||ui.quiz.pool.length!==t.headings.length)ui.quiz=newQuiz(t);
  const q=ui.quiz,lookup=Object.fromEntries(t.headings.map(h=>[h.id,h]));
  return `<section class="card r5km-main"><div class="r5km-section-head"><div><h3>Bước 3 · Kiểm tra thứ tự key</h3>
      <div class="sub">Chọn từng key để ghép chuỗi từ số 1 đến số 7. Có thể chạm ô đã chọn để bỏ và chọn lại.</div></div>
      <span class="pill">${q.answers.length}/${t.headings.length} key đã chọn</span></div>
    <div class="r5km-slots" aria-label="Chuỗi đang ghép">${t.headings.map((correct,i)=>{
      const h=lookup[q.answers[i]],right=q.checked?(h?.id===correct.id?"correct":"wrong"):"";
      return `<button class="r5km-slot ${h?"filled":""} ${right}" data-r5km="slot" data-index="${i}" ${q.checked||!h?"disabled":""}">
        <span class="r5km-slot-index">${i+1}</span><strong>${h?esc(h.memory_token):"Chọn key…"}</strong>
        ${q.checked&&h&&h.id!==correct.id?`<small>Đúng: ${esc(correct.memory_token)}</small>`:""}</button>`;
    }).join("")}</div>
    <div class="r5km-pool-title">Các key đang được xáo trộn:</div>
    <div class="r5km-pool" aria-label="Bộ key để chọn">${q.pool.map(id=>{
      const h=lookup[id],used=q.answers.includes(id);
      return `<button class="r5km-key-chip" data-r5km="pick" data-id="${esc(id)}" ${used||q.checked?"disabled":""}>${esc(h.memory_token)}${progress.vi?`<small>${esc(tokenVi(h))}</small>`:""}</button>`;
    }).join("")}</div>
    ${q.message?`<div class="r5km-message ${q.checked&&q.score===t.headings.length?"ok":""}" role="status">${esc(q.message)}</div>`:""}
    ${q.checked?`<div class="r5km-solution"><b>Chuỗi chuẩn:</b> ${t.headings.map(h=>esc(h.memory_token)).join(" → ")}</div>`:""}
    <div class="r5km-quiz-actions"><button class="btn ghost" data-r5km="undo" ${!q.answers.length||q.checked?"disabled":""}>↶ Bỏ key cuối</button>
      <button class="btn" data-r5km="grade" ${q.checked?"disabled":""}>✓ Chấm kiểm tra</button>
      <button class="btn secondary" data-r5km="retry">🔀 Làm bài mới</button></div>
    <div class="r5km-bottom-actions"><button class="btn ghost" data-r5km="mode" data-mode="chain">← Học lại chuỗi</button>
      <button class="btn secondary" data-r5km="topic-next">Chủ đề tiếp theo →</button></div>
  </section>`;
}
function render(root){
  const t=currentTopic();
  if(!t){root.innerHTML=`<section class="card"><h2>🔑 Học Key · Reading Part 5</h2><div class="note info">Không có dữ liệu heading/key R5 trong gói hiện tại.</div></section>`;return;}
  if(progress.topicId!==t.topic_id){progress.topicId=t.topic_id;save()}
  root.innerHTML=`<div id="r5-key-trainer">${commonHeader(t)}${progress.mode==="cards"?renderCards(t):progress.mode==="quiz"?renderQuiz(t):renderChain(t)}
    <div class="note info r5km-note">Lưu ý: đây là <b>bộ đề trọng điểm/dự đoán</b> để học key và nhận diện heading, không phải bảo đảm đề thi thật. Khi làm Reading Part 5, vẫn cần đọc đoạn văn để đối chiếu ý chính.</div></div>`;
}
function repaint(){const root=document.getElementById("app");if(root&&document.getElementById("r5-key-trainer"))render(root)}
function setTopic(id){if(!topics().some(t=>t.topic_id===id))return;progress.topicId=id;ui.cardIndex=0;ui.cardFlipped=false;ui.revealed={};ui.showAll=true;ui.quiz=null;save();repaint()}
function nextTopic(){const a=topics(),i=a.findIndex(t=>t.topic_id===progress.topicId);setTopic(a[(i+1)%a.length].topic_id)}
function selectCardStep(t,n){ui.cardIndex=(n+cardSet(t).length)%cardSet(t).length;ui.cardFlipped=false;repaint()}
function handleClick(b){
  const action=b.dataset.r5km;if(!action)return;
  const t=currentTopic();if(!t)return;
  switch(action){
    case "topic":setTopic(b.dataset.id);return;
    case "topic-next":nextTopic();return;
    case "mode":if(!["chain","cards","quiz"].includes(b.dataset.mode)||progress.mode===b.dataset.mode)return;progress.mode=b.dataset.mode;ui.cardFlipped=false;if(progress.mode==="quiz")ui.quiz=newQuiz(t);save();repaint();return;
    case "vi":progress.vi=!progress.vi;save();repaint();return;
    case "all":ui.showAll=!ui.showAll;ui.revealed={};repaint();return;
    case "reveal":{
      const id=b.dataset.id;if(!t.headings.some(h=>h.id===id))return;
      if(ui.showAll){ui.showAll=false;ui.revealed=Object.fromEntries(t.headings.filter(h=>h.id!==id).map(h=>[h.id,true]))}
      else ui.revealed[id]=!ui.revealed[id];repaint();return;
    }
    case "direction":if(!["position","keyword"].includes(b.dataset.direction))return;progress.direction=b.dataset.direction;ui.cardFlipped=false;save();repaint();return;
    case "weak":if(learnedCount(t)===t.headings.length)return;ui.weakOnly=!ui.weakOnly;ui.cardIndex=0;ui.cardFlipped=false;repaint();return;
    case "flip":ui.cardFlipped=!ui.cardFlipped;repaint();return;
    case "prev":selectCardStep(t,ui.cardIndex-1);return;
    case "next":selectCardStep(t,ui.cardIndex+1);return;
    case "mark":{
      if(!ui.cardFlipped)return;
      const h=cardSet(t)[ui.cardIndex];if(!h)return;
      const wasIndex=ui.cardIndex,isLearned=b.dataset.known==="true";
      progress.known[h.id]=isLearned;save();
      if(ui.weakOnly&&learnedCount(t)===t.headings.length)ui.weakOnly=false;
      const remaining=cardSet(t);
      ui.cardIndex=(ui.weakOnly&&isLearned?wasIndex:wasIndex+1)%remaining.length;
      ui.cardFlipped=false;repaint();return;
    }
    case "pick":{
      if(!ui.quiz||ui.quiz.checked||ui.quiz.answers.length>=t.headings.length||ui.quiz.answers.includes(b.dataset.id))return;
      if(!ui.quiz.pool.includes(b.dataset.id))return;
      ui.quiz.answers.push(b.dataset.id);ui.quiz.message="";repaint();return;
    }
    case "slot":{
      if(!ui.quiz||ui.quiz.checked)return;
      const n=Number(b.dataset.index);if(Number.isInteger(n)&&n>=0&&n<ui.quiz.answers.length)ui.quiz.answers.splice(n,1);
      ui.quiz.message="";repaint();return;
    }
    case "undo":if(ui.quiz&&!ui.quiz.checked){ui.quiz.answers.pop();ui.quiz.message="";repaint()}return;
    case "retry":ui.quiz=newQuiz(t);repaint();return;
    case "grade":{
      const q=ui.quiz;if(!q||q.checked)return;
      if(q.answers.length!==t.headings.length){q.message=`Bạn đã chọn ${q.answers.length}/${t.headings.length} key. Hãy chọn đủ rồi chấm.`;repaint();return}
      q.score=q.answers.filter((id,i)=>id===t.headings[i].id).length;q.checked=true;
      q.message=q.score===t.headings.length?`Xuất sắc! ${q.score}/${t.headings.length} key đúng thứ tự.`:
        `Kết quả: ${q.score}/${t.headings.length} key đúng vị trí. Xem key đúng dưới các ô sai rồi làm lại.`;
      const s=progress.tests[t.topic_id]||{best:0,tries:0,last:0};
      s.tries+=1;s.last=q.score;s.best=Math.max(s.best,q.score);progress.tests[t.topic_id]=s;save();repaint();return;
    }
    default:return;
  }
}
document.addEventListener("click",e=>{
  const b=e.target.closest("button[data-r5km]");
  if(b&&document.getElementById("r5-key-trainer")?.contains(b))handleClick(b);
});
window.APTIS_R5_KEY_TRAINER={render,metadata:()=>({topics:topics().length,headings:topics().reduce((n,t)=>n+t.headings.length,0)})};
})();
