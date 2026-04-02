import { saveWorkouts, loadWorkouts } from "./storage.js";

let workouts = [];

export function initTrainingLog() {
  workouts = loadWorkouts();
  renderWorkouts();
  setupForm();
}

function setupForm() {
  document.querySelector("#addWorkout")
    .addEventListener("click", addWorkout);
}

function addWorkout() {
  const date = document.querySelector("#date").value;
  const miles = parseFloat(document.querySelector("#miles").value);
  const type = document.querySelector("#type").value;

  if (!date || !miles) return;

  workouts.push({ date, miles, type });

  saveWorkouts();
  renderWorkouts();
}

function renderWorkouts() {
  const list = document.querySelector("#workoutList");
  list.innerHTML = "";

  let total = 0;

  workouts.forEach((w, index) => {

    total += w.miles;

    const li = document.createElement("li");
    li.innerHTML = `
      ${w.date} - ${w.miles} mi (${w.type})
      <button data-index="${index}">X</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      deleteWorkout(index);
    });

    list.appendChild(li);
  });

  document.querySelector("#totalMiles").textContent =
    `Weekly Total: ${total} miles`;
}

function deleteWorkout(index) {
  workouts.splice(index, 1);
  saveWorkouts(workouts);
  renderWorkouts();
}