let step = 0;
let flow = [];

const song = {
  artist: "",
  title: "",
  about: "",
  keywords: {
    emotion: "",
    imagery: "",
    conflict: "",
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
  structureType: "",
  customStructure: [],
  sectionPurpose: {},
  sections: {}
};

const saved = localStorage.getItem("SongStudioFinal");
if (saved) Object.assign(song, JSON.parse(saved));
function save() {
  localStorage.setItem("SongStudioFinal", JSON.stringify(song));
}

const slide = document.getElementById("slide");
const next = document.getElementById("next");
const back = document.getElementById("back");

function helper(t){ return `<div class="helper">${t}</div>`; }

/* ---------- SLIDES ---------- */

function welcome(){
  slide.innerHTML = `
    <h1>Welcome</h1>
    <p>This is a focused space to build songs with intention.</p>
    <p style="opacity:.5">Nothing here is rushed. Every decision matters.</p>
  `;
}

function identity(){
  slide.innerHTML = `
    <h2>Session Identity</h2>
    <input placeholder="Artist name" value="${song.artist}"
      oninput="song.artist=this.value;save()" />
    <input placeholder="Song title" value="${song.title}"
      oninput="song.title=this.value;save()" />
    ${(!song.artist || !song.title)?helper("Name the work before shaping it."):""}
  `;
}

function about(){
  slide.innerHTML = `
    <h2>This song is about</h2>
    <textarea placeholder="One clear sentence."
      oninput="song.about=this.value;save()">${song.about}</textarea>
    ${(!song.about)?helper("Clarity here prevents confusion later."):""}
  `;
}

function keywordDetails(){
  slide.innerHTML = `
    <h2>Song Keywords</h2>
    <p>Define the inner engine of the song.</p>

    <input placeholder="Primary emotion"
      value="${song.keywords.emotion}"
      oninput="song.keywords.emotion=this.value;save()" />

    <input placeholder="Imagery / symbols"
      value="${song.keywords.imagery}"
      oninput="song.keywords.imagery=this.value;save()" />

    <input placeholder="Core conflict"
      value="${song.keywords.conflict}"
      oninput="song.keywords.conflict=this.value;save()" />

    <input placeholder="Point of view (I / you / observer)"
      value="${song.keywords.perspective}"
      oninput="song.keywords.perspective=this.value;save()" />

    <input placeholder="Listener takeaway"
      value="${song.keywords.takeaway}"
      oninput="song.keywords.takeaway=this.value;save()" />

    ${(
      !song.keywords.emotion ||
      !song.keywords.conflict ||
      !song.keywords.takeaway
    ) ? helper("Emotion, conflict, and takeaway are required.") : ""}
  `;
}

function moodToneGenre(){
  slide.innerHTML = `
    <h2>Mood · Tone · Genre</h2>
    <input placeholder="Mood (emotional atmosphere)"
      value="${song.mood}" oninput="song.mood=this.value;save()" />
    <input placeholder="Tone (how it speaks)"
      value="${song.tone}" oninput="song.tone=this.value;save()" />
    <input placeholder="Genre (any genre)"
      value="${song.genre}" oninput="song.genre=this.value;save()" />
    ${(!song.mood || !song.tone)?helper("Mood and tone must be defined."):""}
  `;
}

function intent(){
  slide.innerHTML = `
    <h2>Intent</h2>
    <textarea placeholder="Why must this song exist?"
      oninput="song.intent=this.value;save()">${song.intent}</textarea>
  `;
}

function emotionalArc(){
  slide.innerHTML = `
    <h2>Emotional Arc</h2>
    <input placeholder="Emotion at the start"
      value="${song.emotionStart}"
      oninput="song.emotionStart=this.value;save()" />
    <input placeholder="Emotion at the end"
      value="${song.emotionEnd}"
      oninput="song.emotionEnd=this.value;save()" />
    ${(!song.emotionStart || !song.emotionEnd)
      ?helper("Songs move emotionally. Define the shift."):""}
  `;
}

function entryMode(){
  slide.innerHTML = `
    <h2>How do you begin?</h2>
    <select onchange="song.entry=this.value;save()">
      <option value="">Choose</option>
      <option value="beat">Beat first</option>
      <option value="lyrics">Lyrics first</option>
      <option value="melody">Melody first</option>
    </select>
    ${(!song.entry)?helper("Beginning shapes the song."):""}
  `;
}

function entryDetail(){
  if(song.entry==="beat"){
    slide.innerHTML=`
      <h2>Beat Foundation</h2>
      <textarea placeholder="Tempo, rhythm, energy"
        oninput="song.beatNotes=this.value;save()">${song.beatNotes||""}</textarea>
    `;
  }
  if(song.entry==="lyrics"){
    slide.innerHTML=`
      <h2>Raw Lyrics</h2>
      <textarea placeholder="No structure, no filter"
        oninput="song.rawLyrics=this.value;save()">${song.rawLyrics||""}</textarea>
    `;
  }
  if(song.entry==="melody"){
    slide.innerHTML=`
      <h2>Melody Shape</h2>
      <textarea placeholder="Rise, fall, repetition"
        oninput="song.melodyNotes=this.value;save()">${song.melodyNotes||""}</textarea>
    `;
  }
}

function structureChoice(){
  slide.innerHTML=`
    <h2>Structure</h2>
    <select onchange="song.structureType=this.value;save()">
      <option value="">Choose</option>
      <option value="standard">Standard</option>
      <option value="custom">Custom</option>
    </select>
    ${(!song.structureType)?helper("Structure is mandatory."):""}
  `;
}

function customStructure(){
  slide.innerHTML=`
    <h2>Custom Structure</h2>
    <p>Enter sections in order, separated by commas.</p>
    <input placeholder="hook, verse1, verse2, bridge, hook"
      value="${song.customStructure.join(",")}"
      oninput="song.customStructure=this.value.split(',').map(s=>s.trim());save()" />
    ${(song.customStructure.length<1)?helper("At least one section required."):""}
  `;
}

function sectionPurpose(name){
  slide.innerHTML=`
    <h2>${name.toUpperCase()} · Purpose</h2>
    <textarea placeholder="Why does this section exist?"
      oninput="song.sectionPurpose['${name}']=this.value;save()">
${song.sectionPurpose[name]||""}</textarea>
    ${(!song.sectionPurpose[name])?helper("Purpose must be defined."):""}
  `;
}

function writeSection(name){
  slide.innerHTML=`
    <p style="opacity:.5">${song.about}</p>
    <h1>${name.toUpperCase()}</h1>
    <textarea placeholder="Write with intent"
      oninput="song.sections['${name}']=this.value;save()">
${song.sections[name]||""}</textarea>
    ${(!song.sections[name])?helper("Write something to proceed."):""}
  `;
}

function finalView(){
  slide.innerHTML=`
    <h2>${song.title}</h2>
    <p><strong>${song.artist}</strong></p>
    <p><em>${song.about}</em></p>
    <pre>${Object.entries(song.sections)
      .map(([k,v])=>k.toUpperCase()+":\n"+v).join("\n\n")}</pre>
  `;
}

/* ---------- FLOW ---------- */

function buildFlow(){
  flow = [
    welcome,
    identity,
    about,
    keywordDetails,
    moodToneGenre,
    intent,
    emotionalArc,
    entryMode,
    entryDetail,
    structureChoice
  ];

  if(song.structureType==="custom"){
    flow.push(customStructure);
    song.customStructure.forEach(s=>{
      flow.push(()=>sectionPurpose(s));
      flow.push(()=>writeSection(s));
    });
  }

  flow.push(finalView);
}

function canProceed(){
  if(step===1) return song.artist && song.title;
  if(step===2) return song.about;
  if(step===3) return song.keywords.emotion && song.keywords.conflict && song.keywords.takeaway;
  if(step===4) return song.mood && song.tone;
  if(step===6) return song.emotionStart && song.emotionEnd;
  if(step===7) return song.entry;
  if(step===9) return song.structureType;
  return true;
}

function render(){
  buildFlow();
  flow[step]();
  save();
}

next.onclick=()=>{
  if(!canProceed()) return;
  if(step<flow.length-1){ step++; render(); }
};

back.onclick=()=>{
  if(step>0){ step--; render(); }
};

render();
