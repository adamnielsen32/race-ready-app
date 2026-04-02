import { loadRaces } from "./raceList.js";
import { showRaceDetails } from "./raceDetails.js";
import { initTrainingLog } from "./workouts.js";
import { loadSelectedRace } from "./storage.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  setupNav();
  initTrainingLog();
  handleHashChange(); // Set initial view based on hash
  loadRaces();
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

  // Update hash for back/forward navigation
  const hashMap = { raceListView: "#races", raceDetailsView: "#details", trainingView: "#training" };
  window.location.hash = hashMap[viewId] || "";
}

function handleHashChange() {
  const hash = window.location.hash;
  const viewMap = { "#races": "raceListView", "#details": "raceDetailsView", "#training": "trainingView" };
  const viewId = viewMap[hash] || "raceListView";
  showView(viewId);
}

// Listen for hash changes (back/forward buttons)
window.addEventListener("hashchange", handleHashChange);

function loadSavedRace() {
  const race = loadSelectedRace();

  if (race) {
    showRaceDetails(race);
  }
}