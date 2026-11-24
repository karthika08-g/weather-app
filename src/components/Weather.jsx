
import React, { useState } from "react";
import axios from "axios";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {

    if (!city.trim()) {
      setError("Please enter a city name!");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
      );

      setWeather(response.data);

    } catch (err) {
      setError("City not found! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">

      <div className="header">
        <h1>Weatherly</h1>
        <p>Your Daily Weather Companion</p>
      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />

        <button onClick={getWeather} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>

      </div>

      {error && <p className="error">{error}</p>}

      {weather && (

        <div className="weather-info">

          <h2>{weather.location.name}</h2>

          <p className="country">
            {weather.location.country}
          </p>

          <img
            src={"https:" + weather.current.condition.icon}
            alt="Weather"
            className="weather-icon"
          />

          <h1 className="temperature">
            {weather.current.temp_c}°C
          </h1>

          <p className="condition">
            {weather.current.condition.text}
          </p>

          <div className="details">

            <div className="detail-card">
              <span>💧</span>
              <h3>{weather.current.humidity}%</h3>
              <p>Humidity</p>
            </div>

            <div className="detail-card">
              <span>🌬️</span>
              <h3>{weather.current.wind_kph} km/h</h3>
              <p>Wind Speed</p>
            </div>

            <div className="detail-card">
              <span>🌡️</span>
              <h3>{weather.current.feelslike_c}°C</h3>
              <p>Feels Like</p>
            </div>

            <div className="detail-card">
              <span>☀️</span>
              <h3>{weather.current.uv}</h3>
              <p>UV Index</p>
            </div>

          </div>

          <p className="updated">
            Last Updated: {weather.current.last_updated}
          </p>

        </div>

      )}

      {!weather && !error && !loading && (
        <div className="welcome">
          <span>🌤️</span>
          <h2>Discover Your Weather</h2>
          <p>Enter your city to see live weather updates.</p>
        </div>
      )}

      <footer>
        Powered by WeatherAPI
      </footer>

    </div>
  );
}

export default Weather;
