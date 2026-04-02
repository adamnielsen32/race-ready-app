// Workout Storage
export function saveWorkouts(workouts) {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

export function loadWorkouts() {
  const saved = localStorage.getItem("workouts");
  return saved ? JSON.parse(saved) : [];
}

// Selected Race Storage
export function saveSelectedRace(race) {
  localStorage.setItem("selectedRace", JSON.stringify(race));
}

export function loadSelectedRace() {
  const saved = localStorage.getItem("selectedRace");
  return saved ? JSON.parse(saved) : null;
}

// Fuel Plan Storage
export function getFuelPlanKey(race) {
  return `fuelPlan-${race.id}`;
}

export function saveFuelPlan(race, fuelPlan) {
  localStorage.setItem(getFuelPlanKey(race), JSON.stringify(fuelPlan));
}

export function loadFuelPlan(race) {
  const saved = localStorage.getItem(getFuelPlanKey(race));
  return saved ? JSON.parse(saved) : null;
}
