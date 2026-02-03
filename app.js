let slideIndex = 0;
let flow = [];

const state = {
  approach: null,
  beat: "",
  lyrics: "",
  melody: "",
  hook: "",
  verse: ""
};

// autosave
const saved = localStorage.getItem("songSlides");
if (saved) Object.assign(state, JSON.parse(saved));
function save() {
  localStorage.setItem("songSlides", JSON.stringify(state));
}

const slide = document.getElementById("slide");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

// -------- SLIDES --------

function slideReset() {
  slide.innerHTML = `
    <h1>Creative Reset</h1>
    <p>Empty your mind. No structure yet.</p>
    <textarea></textarea>
  `;
}

function slideApproach() {
  slide.innerHTML = `
    <h1>How do you want to start?</h1>

    <div class="choice">
      <label><input type="radio" name="a" value="beat"> Beat First</label><br><br>
      <label><input type="radio" name="a" value="lyrics"> Lyrics First</label><br><br>
      <label><input type="radio" name="a" value="melody"> Melody First</label>
    </div>
  `;
}

function slideBeat() {
  slide.innerHTML = `
    <h1>Beat First</h1>
    <p>Describe tempo, bounce, and mood.</p>
    <textarea oninput="state.beat=this.value; save()">${state.beat}</textarea>
  `;
}

function slideLyrics() {
  slide.innerHTML = `
    <h1>Lyrics First</h1>
    <p>Write raw lines without judging.</p>
    <textarea oninput="state.lyrics=this.value; save()">${state.lyrics}</textarea>
  `;
}

function slideMelody() {
  slide.innerHTML = `
    <h1>Melody First</h1>
    <p>Describe the melody and emotional shape.</p>
    <textarea oninput="state.melody=this.value; save()">${state.melody}</textarea>
  `;
}

function slideHook() {
  slide.innerHTML = `
    <h1>Hook</h1>
    <p>The core idea of the song.</p>
    <textarea oninput="state.hook=this.value; save()">${state.hook}</textarea>
  `;
}

function slideVerse() {
  slide.innerHTML = `
    <h1>Verse</h1>
    <p>Develop or deepen the idea.</p>
    <textarea oninput="state.verse=this.value; save()">${state.verse}</textarea>
  `;
}

function slideFinal() {
  slide.innerHTML = `
    <h1>Final Draft</h1>
    <pre>
HOOK:
${state.hook}

VERSE:
${state.verse}
    </pre>
  `;
}

// -------- FLOW BUILDING --------

function buildFlow(choice) {
  if (choice === "beat") {
    flow = [slideReset, slideApproach, slideBeat, slideHook, slideVerse, slideFinal];
  }
  if (choice === "lyrics") {
    flow = [slideReset, slideApproach, slideLyrics, slideHook, slideVerse, slideFinal];
  }
  if (choice === "melody") {
    flow = [slideReset, slideApproach, slideMelody, slideHook, slideVerse, slideFinal];
  }
}

// -------- NAV --------

function render() {
  flow[slideIndex]();
  save();
}

next.onclick = () => {
  if (flow[slideIndex] === slideApproach) {
    const selected = document.querySelector('input[name="a"]:checked');
    if (!selected) return alert("Choose one");
    state.approach = selected.value;
    buildFlow(state.approach);
  }
  if (slideIndex < flow.length - 1) {
    slideIndex++;
    render();
  }
};

prev.onclick = () => {
  if (slideIndex > 0) {
    slideIndex--;
    render();
  }
};

// initial
flow = [slideReset, slideApproach];
render();
