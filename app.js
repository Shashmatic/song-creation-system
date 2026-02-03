let stepIndex = 0;

const state = {
  approach: null,
  hook: "",
  verse1: "",
  verse2: ""
};

// Load autosave
const saved = localStorage.getItem("songState");
if (saved) Object.assign(state, JSON.parse(saved));

function save() {
  localStorage.setItem("songState", JSON.stringify(state));
}

const stepDiv = document.getElementById("step");

const steps = [
  startStep,
  approachStep,
  hookStep,
  verse1Step,
  verse2Step,
  finalStep
];

function render() {
  steps[stepIndex]();
  save();
}

document.getElementById("nextBtn").onclick = () => {
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    render();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (stepIndex > 0) {
    stepIndex--;
    render();
  }
};

render();

// -------- STEPS --------

function startStep() {
  stepDiv.innerHTML = `
    <h2>Creative Reset</h2>
    <p>What are you feeling right now?</p>
    <textarea></textarea>
  `;
}

function approachStep() {
  stepDiv.innerHTML = `
    <h2>How do you want to start?</h2>
    <label><input type="radio" name="a"> Beat First</label><br>
    <label><input type="radio" name="a"> Lyrics First</label><br>
    <label><input type="radio" name="a"> Melody First</label>
  `;
}

function hookStep() {
  stepDiv.innerHTML = `
    <h2>Hook</h2>
    <textarea oninput="state.hook=this.value; save()">${state.hook}</textarea>
  `;
}

function verse1Step() {
  stepDiv.innerHTML = `
    <h2>Verse 1</h2>
    <textarea oninput="state.verse1=this.value; save()">${state.verse1}</textarea>
  `;
}

function verse2Step() {
  stepDiv.innerHTML = `
    <h2>Verse 2</h2>
    <textarea oninput="state.verse2=this.value; save()">${state.verse2}</textarea>
  `;
}

function finalStep() {
  stepDiv.innerHTML = `
    <h2>Final Song</h2>
    <pre>
HOOK:
${state.hook}

VERSE 1:
${state.verse1}

VERSE 2:
${state.verse2}
    </pre>
  `;
}
