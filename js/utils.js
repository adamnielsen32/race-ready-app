
export function formatPace(minutes) {
  const min = Math.floor(minutes);
  const sec = Math.round((minutes - min) * 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function calculatePace(race, hours, minutes) {
  const totalMinutes = (hours * 60) + minutes;

  if (totalMinutes === 0) {
    return "Enter a valid time.";
  }

  const pace = totalMinutes / race.distance;

  const paceMinutes = Math.floor(pace);
  const paceSeconds = Math.round((pace - paceMinutes) * 60);

  return `You need to average ${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} per mile`;
}

export function calculateFuel(duration) {
  // 🔥 Core logic
  const carbsPerHour = 60; // grams (standard endurance baseline)
  const totalCarbs = carbsPerHour * duration;

  const waterPerHour = 0.5; // liters/hour
  const totalWater = waterPerHour * duration;

  const sodiumPerHour = 500; // mg/hour
  const totalSodium = sodiumPerHour * duration;

  return {
    totalCarbs,
    totalWater,
    totalSodium
  };
}
