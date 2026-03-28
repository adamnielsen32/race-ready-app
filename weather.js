const API_KEY = "58ee3821ec3a7e959e4b94f14ec3c2f9";

export async function getWeather(city) {
  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
}