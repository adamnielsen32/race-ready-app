import { showView } from "./main.js";
import { getWeather } from "../weather.js";
import { saveSelectedRace, loadFuelPlan, saveFuelPlan, getFuelPlanKey } from "./storage.js";
import { calculatePace, calculateFuel } from "./utils.js";

const detailsView = document.querySelector("#raceDetailsView");

export function showRaceDetails(race) {

  detailsView.innerHTML = `
    <h2>${race.name}</h2>
    <p>Distance: ${race.distance} miles</p>
    <p>Elevation: ${race.elevation} ft</p>
    <p>City: ${race.city}</p>
    
    <h3>Current Weather</h3>
    <div id="weather"></div>

    <h3>Pace Estimator</h3>

    <label>Desired Finish Time (hours):</label>
    <input id="hours" type="number" placeholder="Hours">

    <label>Minutes:</label>
    <input id="minutes" type="number" placeholder="Minutes">

    <button id="calcPaceBtn">Calculate Pace</button>

    <p id="paceResult"></p>

    <h3>Fuel Calculator</h3>

    <label>Body Weight (lbs):</label>
    <input id="weight" type="number" placeholder="Enter weight">

    <label>Race Duration (hours):</label>
    <input id="duration" type="number" placeholder="Hours">

    <button id="calcFuelBtn">Calculate Fuel</button>

    <div id="fuelResult"></div>

    <button id="backBtn">Back</button>
  `;

  attachEvents(race);

  loadWeather(race.city);

  showView("raceDetailsView");

  displayFuelPlan(race);

  saveSelectedRace(race);
}

function attachEvents(race) {

  document.querySelector("#calcPaceBtn")
    .addEventListener("click", () => {
      const hours = parseFloat(document.querySelector("#hours").value) || 0;
      const minutes = parseFloat(document.querySelector("#minutes").value) || 0;
      const paceResult = calculatePace(race, hours, minutes);
      document.querySelector("#paceResult").textContent = paceResult;
    });

  document.querySelector("#calcFuelBtn")
    .addEventListener("click", () => {
      const weight = parseFloat(document.querySelector("#weight").value);
      const duration = parseFloat(document.querySelector("#duration").value);
      const resultDiv = document.querySelector("#fuelResult");

      if (!weight || !duration) {
        resultDiv.textContent = "Please enter valid inputs.";
        return;
      }

      const fuelPlan = calculateFuel(duration);

      resultDiv.innerHTML = `
        <p><strong>Total Carbs:</strong> ${fuelPlan.totalCarbs}g</p>
        <p><strong>Water Needed:</strong> ${fuelPlan.totalWater.toFixed(1)} L</p>
        <p><strong>Sodium Needed:</strong> ${fuelPlan.totalSodium} mg</p>
      `;

      // Save to localStorage
      const fullPlan = {
        weight,
        duration,
        ...fuelPlan
      };

      saveFuelPlan(race, fullPlan);
    });

  document.querySelector("#backBtn")
    .addEventListener("click", () => {
      showView("raceListView");
    });
}

function displayFuelPlan(race) {
  const saved = loadFuelPlan(race);

  if (!saved) return;

  document.querySelector("#fuelResult").innerHTML = `
    <p><strong>Saved Plan:</strong></p>
    <p>Carbs: ${saved.totalCarbs}g</p>
    <p>Water: ${saved.totalWater} L</p>
    <p>Sodium: ${saved.totalSodium} mg</p>
  `;
}

async function loadWeather(city) {

  const weatherDiv = document.querySelector("#weather");

  weatherDiv.textContent = "Loading weather...";

  const data = await getWeather(city);

  if (!data) {
    weatherDiv.textContent = "Weather unavailable.";
    return;
  }

  weatherDiv.innerHTML = `
    <p>Temp: ${data.main.temp}°F</p>
    <p>Conditions: ${data.weather[0].description}</p>
  `;
}
