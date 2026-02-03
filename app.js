let i = 0;

const song = {
  artist: "",
  title: "",
  about: "",
  keywords: ["", "", ""],
  mood: "",
  tone: "",
  genre: "",
  intent: "",
  structure: "",
  sections: {}
};

// autosave
const saved = localStorage.getItem("songStudio");
if (saved) Object.assign(song, JSON.parse(saved));
function save() {
  localStorage.setItem("songStudio", JSON.stringify(song));
}

const slide = document.getElementById("slide");
const next = document.getElementById("next");
const back = document.getElementById("back");

function helper(text) {
  return `<div class="helper">${text}</div>`;
}

/* ---------- SLIDES ---------- */

function welcome() {
  slide.innerHTML = `
    <h1>Welcome</h1>
    <p>
      This is a quiet space for building songs with intention.
      Nothing here is rushed.
    </p>
    <p style="opacity:.55">Each song is treated as if it matters.</p>
  `;
}

function identity() {
  slide.innerHTML = `
    <h2>Begin the session</h2>
    <input placeholder="Artist name" value="${song.artist}"
      oninput="song.artist=this.value; save()" />
    <input placeholder="Song title" value="${song.title}"
      oninput="song.title=this.value; save()" />
    ${(!song.artist || !song.title) ? helper("Give the song a name before moving on.") : ""}
  `;
}

function aboutSong() {
  slide.innerHTML = `
    <h2>This song is about</h2>
    <textarea placeholder="One clear sentence."
      oninput="song.about=this.value; save()">${song.about}</textarea>
    ${(!song.about) ? helper("Clarity here saves hours later.") : ""}
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
      ? helper("At least two anchors keep the song grounded.") : ""}
  `;
}

function moodTone() {
  slide.innerHTML = `
    <h2>Mood & Tone</h2>
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

function structure() {
  slide.innerHTML = `
    <h2>Structure</h2>
    <select onchange="song.structure=this.value; save()">
      <option value="">Choose structure</option>
      <option value="HVHVH">Hook – Verse – Hook – Verse – Hook</option>
      <option value="HVBH">Hook – Verse – Bridge – Hook</option>
      <option value="V">Verse only</option>
    </select>
    ${(!song.structure)
      ? helper("Structure gives the song bones.") : ""}
  `;
}

function writeSection(name) {
  if (!song.sections[name]) song.sections[name] = "";
  slide.innerHTML = `
    <p style="opacity:.5">${song.about}</p>
    <h1>${name.toUpperCase()}</h1>
    <textarea
      placeholder="Write slowly. No need to impress."
      oninput="song.sections['${name}']=this.value; save()">
${song.sections[name]}</textarea>
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

/* ---------- FLOW ---------- */

const flow = [
  welcome,
  identity,
  aboutSong,
  keywords,
  moodTone,
  intent,
  structure,
  () => writeSection("hook"),
  () => writeSection("verse"),
  finalView
];

function canProceed() {
  if (i === 1) return song.artist && song.title;
  if (i === 2) return song.about;
  if (i === 3) return song.keywords.filter(k => k.trim()).length >= 2;
  if (i === 4) return song.mood && song.tone;
  if (i === 6) return song.structure;
  return true;
}

function render() {
  flow[i]();
  save();
}

next.onclick = () => {
  if (!canProceed()) return;
  if (i < flow.length - 1) {
    i++;
    render();
  }
};

back.onclick = () => {
  if (i > 0) {
    i--;
    render();
  }
};

render();
