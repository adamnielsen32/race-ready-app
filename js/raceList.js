import { showRaceDetails } from "./raceDetails.js";

export async function loadRaces() {
  const raceListView = document.querySelector("#raceListView");
  
  raceListView.innerHTML = "<p class='loading'>Loading races...</p>";
  
  try {
    const response = await fetch("./data/races.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const races = await response.json();
    
    // Validate 
    if (!Array.isArray(races)) {
      throw new Error("Invalid data format: Expected an array of races.");
    }
    
    displayRaces(races);
  } catch (error) {
    console.error("Error loading races:", error);
    displayError(error.message);
  }
}

function displayRaces(races) {
  const raceListView = document.querySelector("#raceListView");
  raceListView.innerHTML = "";  // Clear loading/error message
  
  if (races.length === 0) {
    raceListView.innerHTML = "<p class='no-races'>No races available.</p>";
    return;
  }
  
  races.forEach(race => {
    const card = document.createElement("div");
    card.classList.add("race-card");
    
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <h3>${race.name}</h3>
          <p><strong>Difficulty:</strong> ${race.difficulty}</p>
          <p><strong>Distance:</strong> ${race.distance} miles</p>
        </div>
        <div class="card-face card-back">
          <h3>${race.name}</h3>
          <p><strong>Distance:</strong> ${race.distance} miles</p>
          <p><strong>Elevation:</strong> ${race.elevation} ft</p>
          <p><strong>Location:</strong> ${race.city ?? race.location ?? "TBD"}</p>
          <p><strong>Difficulty:</strong> ${race.difficulty}</p>
          <button class="details-btn">View Details</button>
        </div>
      </div>
    `;
    
    card.querySelector(".details-btn").addEventListener("click", () => {
      showRaceDetails(race);
    });
    
    // Add click handler for mobile card flipping
    card.addEventListener("click", (e) => {
      // Don't flip if clicking the details button
      if (!e.target.closest(".details-btn")) {
        card.classList.toggle("flipped");
      }
    });
    
    raceListView.appendChild(card);
  });
}

function displayError(message) {
  const raceListView = document.querySelector("#raceListView");
  raceListView.innerHTML = `
    <p class="error-message">${message}</p>
    <button class="retry-btn">Retry</button>
  `;
  
  document.querySelector(".retry-btn").addEventListener("click", loadRaces);
}

