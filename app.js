let step = 0;
let flow = [];

const song = {
  artist: "",
  title: "",
  about: "",
  keywords: {
    emotion: "",
    conflict: "",
    imagery: "",
    perspective: "",
    takeaway: ""
  },
  mood: "",
  tone: "",
  genre: "",
  intent: "",
  emotionStart: "",
  emotionEnd: "",
  entry: "",
  entryNotes: "",
  structure: [],
  purposes: {},
  lyrics: {}
};

const saved = localStorage.getItem("SongStudioMASTER");
if (saved) Object.assign(song, JSON.parse(saved));
function save() {
  localStorage.setItem("SongStudioMASTER", JSON.stringify(song));
}

const slide = document.getElementById("slide");
const next = document.getElementById("next");
const back = document.getElementById("back");

const h = t => `<div class="helper">${t}</div>`;

/* ---------- SLIDES ---------- */

function welcome() {
  slide.innerHTML = `
    <h1>Welcome</h1>
    <p>This is a deliberate space for writing songs that last.</p>
    <p style="opacity:.5">Every step matters.</p>
  `;
}

function identity() {
  slide.innerHTML = `
    <h2>Session Identity</h2>
    <input placeholder="Artist name" value="${song.artist}"
      oninput="song.artist=this.value;save()">
    <input placeholder="Song title" value="${song.title}"
      oninput="song.title=this.value;save()">
    ${(!song.artist||!song.title)?h("Artist and title are required."):""}
  `;
}

function about() {
  slide.innerHTML = `
    <h2>This song is about</h2>
    <textarea placeholder="One clear sentence."
      oninput="song.about=this.value;save()">${song.about}</textarea>
    ${!song.about?h("Define the core truth of the song."):""}
  `;
}

function keywords() {
  slide.innerHTML = `
    <h2>Core Keywords</h2>
    <p>Define the internal engine of the song.</p>
    <div class="tag-grid">
      <input placeholder="Primary emotion" value="${song.keywords.emotion}"
        oninput="song.keywords.emotion=this.value;save()">
      <input placeholder="Core conflict" value="${song.keywords.conflict}"
        oninput="song.keywords.conflict=this.value;save()">
      <input placeholder="Imagery / symbols" value="${song.keywords.imagery}"
        oninput="song.keywords.imagery=this.value;save()">
      <input placeholder="Point of view" value="${song.keywords.perspective}"
        oninput="song.keywords.perspective=this.value;save()">
      <input placeholder="Listener takeaway" value="${song.keywords.takeaway}"
        oninput="song.keywords.takeaway=this.value;save()">
    </div>
    ${(!song.keywords.emotion||!song.keywords.conflict||!song.keywords.takeaway)
      ?h("Emotion, conflict, and takeaway are mandatory."):""}
  `;
}

function moodToneGenre() {
  slide.innerHTML = `
    <h2>Mood · Tone · Genre</h2>
    <input placeholder="Mood" value="${song.mood}"
      oninput="song.mood=this.value;save()">
    <input placeholder="Tone" value="${song.tone}"
      oninput="song.tone=this.value;save()">
    <input placeholder="Genre" value="${song.genre}"
      oninput="song.genre=this.value;save()">
    ${(!song.mood||!song.tone)?h("Mood and tone must be set."):""}
  `;
}

function intent() {
  slide.innerHTML = `
    <h2>Intent</h2>
    <textarea placeholder="Why must this song exist?"
      oninput="song.intent=this.value;save()">${song.intent}</textarea>
    ${!song.intent?h("Intent anchors the song."):""}
  `;
}

function emotionalArc() {
  slide.innerHTML = `
    <h2>Emotional Arc</h2>
    <input placeholder="Emotion at start" value="${song.emotionStart}"
      oninput="song.emotionStart=this.value;save()">
    <input placeholder="Emotion at end" value="${song.emotionEnd}"
      oninput="song.emotionEnd=this.value;save()">
    ${(!song.emotionStart||!song.emotionEnd)?h("Define emotional movement."):""}
  `;
}

function entryMode() {
  slide.innerHTML = `
    <h2>Entry Mode</h2>
    <select onchange="song.entry=this.value;save()">
      <option value="">Choose</option>
      <option value="beat">Beat first</option>
      <option value="lyrics">Lyrics first</option>
      <option value="melody">Melody first</option>
    </select>
    ${!song.entry?h("Select how the song begins."):""}
  `;
}

function entryDetail() {
  slide.innerHTML = `
    <h2>${song.entry.toUpperCase()} Notes</h2>
    <textarea placeholder="Describe your starting point."
      oninput="song.entryNotes=this.value;save()">${song.entryNotes}</textarea>
    ${!song.entryNotes?h("Capture the raw starting material."):""}
  `;
}

function structureBuilder() {
  slide.innerHTML = `
    <h2>Structure Builder</h2>
    <p>Add sections in the exact order you want them.</p>
    <div class="structure-row">
      ${["intro","hook","verse","pre-hook","bridge","outro"].map(s=>`
        <div class="block" onclick="addSection('${s}')">${s}</div>
      `).join("")}
    </div>
    <input placeholder="Current structure (comma separated)"
      value="${song.structure.join(', ')}"
      oninput="song.structure=this.value.split(',').map(s=>s.trim()).filter(Boolean);save()">
    ${song.structure.length<1?h("At least one section required."):""}
  `;
}

window.addSection = (s)=>{
  song.structure.push(s);
  save();
  structureBuilder();
};

function sectionPurpose(name) {
  slide.innerHTML = `
    <h2>${name.toUpperCase()} · Purpose</h2>
    <textarea placeholder="Why does this section exist?"
      oninput="song.purposes['${name}']=this.value;save()">
${song.purposes[name]||""}</textarea>
    ${!song.purposes[name]?h("Purpose is mandatory."):""}
  `;
}

function writeSection(name) {
  slide.innerHTML = `
    <p style="opacity:.5">${song.about}</p>
    <h1>${name.toUpperCase()}</h1>
    <textarea placeholder="Write intentionally."
      oninput="song.lyrics['${name}']=this.value;save()">
${song.lyrics[name]||""}</textarea>
    ${!song.lyrics[name]?h("Write something to continue."):""}
  `;
}

function finalView() {
  slide.innerHTML = `
    <h2>${song.title}</h2>
    <p><strong>${song.artist}</strong></p>
    <p><em>${song.about}</em></p>
    <pre>${song.structure.map(s=>`${s.toUpperCase()}:\n${song.lyrics[s]||""}`).join("\n\n")}</pre>
  `;
}

/* ---------- FLOW ---------- */

function buildFlow() {
  flow = [
    welcome,
    identity,
    about,
    keywords,
    moodToneGenre,
    intent,
    emotionalArc,
    entryMode,
    entryDetail,
    structureBuilder
  ];

  song.structure.forEach(s=>{
    flow.push(()=>sectionPurpose(s));
    flow.push(()=>writeSection(s));
  });

  flow.push(finalView);
}

function canProceed() {
  if(step===1) return song.artist&&song.title;
  if(step===2) return song.about;
  if(step===3) return song.keywords.emotion&&song.keywords.conflict&&song.keywords.takeaway;
  if(step===4) return song.mood&&song.tone;
  if(step===5) return song.intent;
  if(step===6) return song.emotionStart&&song.emotionEnd;
  if(step===7) return song.entry;
  if(step===8) return song.entryNotes;
  if(step===9) return song.structure.length>0;
  return true;
}

function render() {
  buildFlow();
  flow[step]();
  save();
}

next.onclick = ()=>{
  if(!canProceed()) return;
  if(step<flow.length-1){ step++; render(); }
};

back.onclick = ()=>{
  if(step>0){ step--; render(); }
};

render();
