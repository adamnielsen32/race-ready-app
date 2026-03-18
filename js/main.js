import { loadRaces } from "./raceList.js";
import { showRaceDetails } from "./raceDetails.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadRaces();
  setupNav();
  loadSavedRace();
}

function setupNav() {
  const homeBtn = document.querySelector("#homeBtn");
  const trainingBtn = document.querySelector("#trainingBtn");

  homeBtn.addEventListener("click", () => showView("raceListView"));
  trainingBtn.addEventListener("click", () => showView("trainingView"));
}

export function showView(viewId) {
  const views = document.querySelectorAll("main section");

  views.forEach(view => view.classList.add("hidden"));

  document.getElementById(viewId).classList.remove("hidden");
}

function loadSavedRace() {
  const saved = localStorage.getItem("selectedRace");

  if (saved) {
    const race = JSON.parse(saved);
    showRaceDetails(race);
  }
}