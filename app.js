let i = 0;
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
  structure: "",
  sections: {},
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

/* ---------------- SLIDES ---------------- */

function welcome() {
  slide.innerHTML = `
    <h1>Welcome</h1>
    <p>
      This is a quiet space for building songs with intention.
      Take your time. Nothing here is rushed.
    </p>
    <p style="opacity:0.6">Each song is treated as if it matters.</p>
  `;
}

function identity() {
  slide.innerHTML = `
    <h2>Session Identity</h2>
    <input placeholder="Artist name" value="${song.artist}"
      oninput="song.artist=this.value; save()" />
    <input placeholder="Song title" value="${song.title}"
      oninput="song.title=this.value; save()" />
  `;
}

function aboutSong() {
  slide.innerHTML = `
    <h2>This song is about</h2>
    <textarea placeholder="One clear sentence."
      oninput="song.about=this.value; save()">${song.about}</textarea>
  `;
}

function keywords() {
  slide.innerHTML = `
    <h2>Keywords</h2>
    <p>3 emotional or thematic anchors.</p>
    <div class="tag-row">
      <input value="${song.keywords[0]}" oninput="song.keywords[0]=this.value; save()" />
      <input value="${song.keywords[1]}" oninput="song.keywords[1]=this.value; save()" />
      <input value="${song.keywords[2]}" oninput="song.keywords[2]=this.value; save()" />
    </div>
  `;
}

function moodToneGenre() {
  slide.innerHTML = `
    <h2>Mood · Tone · Genre</h2>
    <input placeholder="Mood (e.g. calm, intense, reflective)"
      value="${song.mood}" oninput="song.mood=this.value; save()" />
    <input placeholder="Tone (e.g. intimate, confident, restrained)"
      value="${song.tone}" oninput="song.tone=this.value; save()" />
    <input placeholder="Genre (any genre)"
      value="${song.genre}" oninput="song.genre=this.value; save()" />
  `;
}

function intent() {
  slide.innerHTML = `
    <h2>Intent & Necessity</h2>
    <textarea placeholder="Why does this song need to exist?"
      oninput="song.intent=this.value; save()">${song.intent}</textarea>
  `;
}

function entryMode() {
  slide.innerHTML = `
    <h2>How do you want to start?</h2>
    <select onchange="song.entry=this.value; save()">
      <option value="">Choose</option>
      <option value="beat">Beat first</option>
      <option value="lyrics">Lyrics first</option>
      <option value="melody">Melody first</option>
    </select>
  `;
}

function structure() {
  slide.innerHTML = `
    <h2>Song Structure</h2>
    <select onchange="song.structure=this.value; save()">
      <option value="">Choose structure</option>
      <option value="HVHVH">Hook – Verse – Hook – Verse – Hook</option>
      <option value="HVBH">Hook – Verse – Bridge – Hook</option>
      <option value="V">Verse only</option>
    </select>
  `;
}

function writeSection(name) {
  if (!song.sections[name]) song.sections[name] = "";
  slide.innerHTML = `
    <p style="opacity:0.6">${song.about}</p>
    <h1>${name.toUpperCase()}</h1>
    <textarea
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

/* ---------------- FLOW ---------------- */

flow = [
  welcome,
  identity,
  aboutSong,
  keywords,
  moodToneGenre,
  intent,
  entryMode,
  structure,
  () => writeSection("hook"),
  () => writeSection("verse"),
  finalView
];

function render() {
  flow[i]();
  save();
}

next.onclick = () => {
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
