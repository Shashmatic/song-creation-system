let step = 0;
let flow = [];

const song = {
  artist: "",
  title: "",
  about: "",
  keywords: ["", "", ""],
  mood: "",
  tone: "",
  genre: "",
  intent: "",
  entry: "",
  emotionStart: "",
  emotionEnd: "",
  structure: "",
  purposes: {},
  sections: {}
};

// autosave
const saved = localStorage.getItem("songStudioMaster");
if (saved) Object.assign(song, JSON.parse(saved));
function save() {
  localStorage.setItem("songStudioMaster", JSON.stringify(song));
}

const slide = document.getElementById("slide");
const next = document.getElementById("next");
const back = document.getElementById("back");

function helper(text) {
  return `<div class="helper">${text}</div>`;
}

/* ───────────── SLIDES ───────────── */

function welcome() {
  slide.innerHTML = `
    <h1>Welcome</h1>
    <p>This is a quiet space for building songs with intention.</p>
    <p style="opacity:.55">Take your time. Every song here is treated seriously.</p>
  `;
}

function identity() {
  slide.innerHTML = `
    <h2>Session Identity</h2>
    <input placeholder="Artist name" value="${song.artist}"
      oninput="song.artist=this.value; save()" />
    <input placeholder="Song title" value="${song.title}"
      oninput="song.title=this.value; save()" />
    ${(!song.artist || !song.title) ? helper("Name the work before shaping it.") : ""}
  `;
}

function aboutSong() {
  slide.innerHTML = `
    <h2>This song is about</h2>
    <textarea placeholder="One clear sentence."
      oninput="song.about=this.value; save()">${song.about}</textarea>
    ${(!song.about) ? helper("Clarity here prevents empty writing later.") : ""}
  `;
}

function keywords() {
  slide.innerHTML = `
    <h2>Keywords</h2>
    <p>Emotional or thematic anchors.</p>
    <div class="tag-row">
      <input value="${song.keywords[0]}" oninput="song.keywords[0]=this.value; save()" />
      <input value="${song.keywords[1]}" oninput="song.keywords[1]=this.value; save()" />
      <input value="${song.keywords[2]}" oninput="song.keywords[2]=this.value; save()" />
    </div>
    ${(song.keywords.filter(k => k.trim()).length < 2)
      ? helper("At least two anchors are required.") : ""}
  `;
}

function moodToneGenre() {
  slide.innerHTML = `
    <h2>Mood · Tone · Genre</h2>
    <input placeholder="Mood (emotional atmosphere)"
      value="${song.mood}" oninput="song.mood=this.value; save()" />
    <input placeholder="Tone (how it speaks)"
      value="${song.tone}" oninput="song.tone=this.value; save()" />
    <input placeholder="Genre (any genre)"
      value="${song.genre}" oninput="song.genre=this.value; save()" />
    ${(!song.mood || !song.tone)
      ? helper("Mood and tone define how this song breathes.") : ""}
  `;
}

function intent() {
  slide.innerHTML = `
    <h2>Intent</h2>
    <textarea placeholder="Why does this song need to exist?"
      oninput="song.intent=this.value; save()">${song.intent}</textarea>
  `;
}

function emotionalArc() {
  slide.innerHTML = `
    <h2>Emotional Arc</h2>
    <input placeholder="Emotion at the start"
      value="${song.emotionStart}" oninput="song.emotionStart=this.value; save()" />
    <input placeholder="Emotion at the end"
      value="${song.emotionEnd}" oninput="song.emotionEnd=this.value; save()" />
    ${(!song.emotionStart || !song.emotionEnd)
      ? helper("Songs move. Decide where.") : ""}
  `;
}

function entryMode() {
  slide.innerHTML = `
    <h2>How do you want to begin?</h2>
    <select onchange="song.entry=this.value; save()">
      <option value="">Choose entry mode</option>
      <option value="beat">Beat first</option>
      <option value="lyrics">Lyrics first</option>
      <option value="melody">Melody first</option>
    </select>
    ${(!song.entry) ? helper("Different beginnings shape different songs.") : ""}
  `;
}

/* ── ENTRY MODE BRANCHES ── */

function beatFirst() {
  slide.innerHTML = `
    <h2>Beat Foundation</h2>
    <textarea placeholder="Tempo, groove, bounce, energy."
      oninput="song.beatNotes=this.value; save()">${song.beatNotes || ""}</textarea>
  `;
}

function lyricsFirst() {
  slide.innerHTML = `
    <h2>Raw Lyrics</h2>
    <textarea placeholder="No structure. No judgment."
      oninput="song.rawLyrics=this.value; save()">${song.rawLyrics || ""}</textarea>
  `;
}

function melodyFirst() {
  slide.innerHTML = `
    <h2>Melody Shape</h2>
    <textarea placeholder="Describe rise, fall, repetition."
      oninput="song.melodyNotes=this.value; save()">${song.melodyNotes || ""}</textarea>
  `;
}

/* ── STRUCTURE ── */

function structure() {
  slide.innerHTML = `
    <h2>Structure</h2>
    <select onchange="song.structure=this.value; save()">
      <option value="">Choose structure</option>
      <option value="HVHVH">Hook – Verse – Hook – Verse – Hook</option>
      <option value="HVBH">Hook – Verse – Bridge – Hook</option>
      <option value="V">Verse only</option>
    </select>
    ${(!song.structure) ? helper("Structure gives the song bones.") : ""}
  `;
}

function sectionPurpose(name) {
  if (!song.purposes[name]) song.purposes[name] = "";
  slide.innerHTML = `
    <h2>${name.toUpperCase()} · Purpose</h2>
    <textarea placeholder="What does this section do?"
      oninput="song.purposes['${name}']=this.value; save()">
${song.purposes[name]}</textarea>
    ${(!song.purposes[name]) ? helper("Every section must earn its place.") : ""}
  `;
}

function writeSection(name) {
  if (!song.sections[name]) song.sections[name] = "";
  slide.innerHTML = `
    <p style="opacity:.5">${song.about}</p>
    <h1>${name.toUpperCase()}</h1>
    <textarea placeholder="Write with intention."
      oninput="song.sections['${name}']=this.value; save()">
${song.sections[name]}</textarea>
  `;
}

function refinement() {
  slide.innerHTML = `
    <h2>Refinement</h2>
    <textarea placeholder="What line is weakest? What should be cut?"
      oninput="song.refinement=this.value; save()">${song.refinement || ""}</textarea>
  `;
}

function finalView() {
  slide.innerHTML = `
    <h2>${song.title}</h2>
    <p><strong>${song.artist}</strong></p>
    <p><em>${song.about}</em></p>
    <pre>${Object.entries(song.sections)
      .map(([k,v]) => k.toUpperCase()+":\n"+v)
      .join("\n\n")}</pre>
  `;
}

/* ───────────── FLOW BUILD ───────────── */

function buildFlow() {
  flow = [
    welcome,
    identity,
    aboutSong,
    keywords,
    moodToneGenre,
    intent,
    emotionalArc,
    entryMode
  ];

  if (song.entry === "beat") flow.push(beatFirst);
  if (song.entry === "lyrics") flow.push(lyricsFirst);
  if (song.entry === "melody") flow.push(melodyFirst);

  flow.push(structure);

  const sections =
    song.structure === "HVHVH" ? ["hook","verse1","verse2"] :
    song.structure === "HVBH" ? ["hook","verse","bridge"] :
    ["verse"];

  sections.forEach(s => flow.push(() => sectionPurpose(s)));
  sections.forEach(s => flow.push(() => writeSection(s)));

  flow.push(refinement, finalView);
}

/* ───────────── NAV ───────────── */

function canProceed() {
  if (step === 1) return song.artist && song.title;
  if (step === 2) return song.about;
  if (step === 3) return song.keywords.filter(k=>k.trim()).length >= 2;
  if (step === 4) return song.mood && song.tone;
  if (step === 6) return song.emotionStart && song.emotionEnd;
  if (step === 7) return song.entry;
  if (flow[step] === structure) return song.structure;
  return true;
}

function render() {
  flow[step]();
  save();
}

next.onclick = () => {
  if (!canProceed()) return;
  if (flow[step] === entryMode || flow[step] === structure) {
    buildFlow();
  }
  if (step < flow.length - 1) {
    step++;
    render();
  }
};

back.onclick = () => {
  if (step > 0) {
    step--;
    render();
  }
};

buildFlow();
render();
