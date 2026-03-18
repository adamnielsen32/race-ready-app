import { showRaceDetails } from "./raceDetails.js";



export async function loadRaces() {
  try {

    const response = await fetch("./data/races.json");

    if (!response.ok) {
      throw new Error("Race data failed to load");
    }

    const races = await response.json();

    displayRaces(races);

  } catch (error) {
    console.error(error);
  }
}

function displayRaces(races) {
    const raceListView = document.querySelector("#raceListView");

  raceListView.innerHTML = "";

  races.forEach(race => {

    const card = document.createElement("div");
    card.classList.add("race-card");

    card.innerHTML = `
      <h3>${race.name}</h3>
      <p>Distance: ${race.distance} miles</p>
      <p>Elevation: ${race.elevation} ft</p>
      <button data-id="${race.id}">View Details</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
  showRaceDetails(race);
});

    raceListView.appendChild(card);

  });
}

