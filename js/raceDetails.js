import { showView } from "./main.js";

const detailsView = document.querySelector("#raceDetailsView");

export function showRaceDetails(race) {

  detailsView.innerHTML = `
    <h2>${race.name}</h2>
    <p>Distance: ${race.distance} miles</p>
    <p>Elevation: ${race.elevation} ft</p>
    <p>Difficulty: ${race.difficulty}</p>

    <h3>Pace Estimator</h3>

    <label>Desired Finish Time (hours):</label>
    <input id="hours" type="number" placeholder="Hours">

    <label>Minutes:</label>
    <input id="minutes" type="number" placeholder="Minutes">

    <button id="calcPaceBtn">Calculate Pace</button>

    <p id="paceResult"></p>

    <button id="backBtn">Back</button>
  `;

  attachEvents(race);

  showView("raceDetailsView");

  localStorage.setItem("selectedRace", JSON.stringify(race));
}

function attachEvents(race) {

  document.querySelector("#calcPaceBtn")
    .addEventListener("click", () => calculatePace(race));

  document.querySelector("#backBtn")
    .addEventListener("click", () => {
      showView("raceListView");
    });
}

function calculatePace(race) {

  const hours = parseFloat(document.querySelector("#hours").value) || 0;
  const minutes = parseFloat(document.querySelector("#minutes").value) || 0;

  const totalMinutes = (hours * 60) + minutes;

  if (totalMinutes === 0) {
    document.querySelector("#paceResult").textContent = "Enter a valid time.";
    return;
  }

  const pace = totalMinutes / race.distance;

  const paceMinutes = Math.floor(pace);
  const paceSeconds = Math.round((pace - paceMinutes) * 60);

  document.querySelector("#paceResult").textContent =
    `You need to average ${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} per mile`;
}