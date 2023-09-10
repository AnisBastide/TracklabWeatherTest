import React, { useEffect, useState } from 'react'
import { fetchWeatherData } from '../../services/weather.service'
import { IWeather } from '../../models/weather'
// Models

const WeatherApp: React.FC = () => {
  const [temperatureThreshold, setTemperatureThreshold] = useState<string>('')
  const [city, setCity] = useState<string>('Paris')
  const [temperatureForecast, setTemperatureForecast] = useState<IWeather[]>([])

  function handleTemperatureChange(e) {
    if (parseInt(e.target.value) || e.target.value === '') {
      setTemperatureThreshold(e.target.value)
    }
  }

  function handleCityChange(e) {
    setCity(e.target.value)
    console.log(city)
  }

  useEffect(() => {
    console.log('Use Effect Called')
    const fetchData = async () => {
      return await fetchWeatherData(temperatureThreshold as number, city)
    }
    fetchData().then((result) => setTemperatureForecast(result))
    console.log(temperatureForecast)
  }, [city])

  return (
    <>
      <form className="form">
        <label>
          Temperature threshold:
          <input
            type="number"
            name="temperature"
            placeholder={'max temperature'}
            value={temperatureThreshold}
            onChange={handleTemperatureChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
          />
        </label>
      </form>

      <ul className="days">
        {temperatureForecast &&
          temperatureForecast.map((forecast) => (
            <li key={forecast.dt_txt}>
              <div
                className={
                  (forecast.main.temp_max > temperatureThreshold
                    ? 'heat'
                    : 'noHeat') + ' temperature'
                }
              >
                <span>{forecast.main.temp_max} degré celsius</span>
                <span>{forecast.dt_txt}</span>
                <span>
                  {forecast.main.temp_max > temperatureThreshold
                    ? 'Extreme Heat'
                    : 'Correct temperature'}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}

export default WeatherApp
