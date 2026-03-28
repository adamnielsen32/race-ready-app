import { showView } from "./main.js";
import { getWeather } from "../weather.js";

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

  loadFuelPlan(race);

  localStorage.setItem("selectedRace", JSON.stringify(race));
}

function attachEvents(race) {

  document.querySelector("#calcPaceBtn")
    .addEventListener("click", () => calculatePace(race));

  document.querySelector("#calcFuelBtn")
    .addEventListener("click", () => calculateFuel(race));

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

function getFuelPlanKey(race) {
  return `fuelPlan-${race.id}`;
}

function calculateFuel(race) {

  const weight = parseFloat(document.querySelector("#weight").value);
  const duration = parseFloat(document.querySelector("#duration").value);

  const resultDiv = document.querySelector("#fuelResult");

  if (!weight || !duration) {
    resultDiv.textContent = "Please enter valid inputs.";
    return;
  }

  // 🔥 Core logic
  const carbsPerHour = 60; // grams (standard endurance baseline)
  const totalCarbs = carbsPerHour * duration;

  const waterPerHour = 0.5; // liters/hour
  const totalWater = waterPerHour * duration;

  const sodiumPerHour = 500; // mg/hour
  const totalSodium = sodiumPerHour * duration;

  resultDiv.innerHTML = `
    <p><strong>Total Carbs:</strong> ${totalCarbs}g</p>
    <p><strong>Water Needed:</strong> ${totalWater.toFixed(1)} L</p>
    <p><strong>Sodium Needed:</strong> ${totalSodium} mg</p>
  `;

  // Save to localStorage
  const fuelPlan = {
    weight,
    duration,
    totalCarbs,
    totalWater,
    totalSodium
  };

  localStorage.setItem(getFuelPlanKey(race), JSON.stringify(fuelPlan));
}

function loadFuelPlan(race) {
  const saved = localStorage.getItem(getFuelPlanKey(race));

  if (!saved) return;

  const plan = JSON.parse(saved);

  document.querySelector("#fuelResult").innerHTML = `
    <p><strong>Saved Plan:</strong></p>
    <p>Carbs: ${plan.totalCarbs}g</p>
    <p>Water: ${plan.totalWater} L</p>
    <p>Sodium: ${plan.totalSodium} mg</p>
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
