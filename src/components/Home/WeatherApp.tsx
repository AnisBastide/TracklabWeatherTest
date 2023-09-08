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
      const weatherData = await fetchWeatherData(
        temperatureThreshold as number,
        city
      )
      return weatherData
    }
    fetchData().then((result) => setTemperatureForecast(result))
    console.log(temperatureForecast)
  }, [city])

  // const handleRefresh = () => {
  //   console.log('Refresh Button Clicked')
  //   fetchTrainsData()
  // }

  return (
    <>
      <form>
        <label>
          Temperature threshold:
          <input
            type="text"
            name="temperature"
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
              <span
                className={
                  forecast.main.temp_max > temperatureThreshold ? 'active' : ''
                }
              >
                {forecast.main.temp_max}
                {forecast.dt_txt}
                {forecast.main.temp_max > temperatureThreshold
                  ? 'Extreme Heat'
                  : ''}
              </span>
            </li>
          ))}
      </ul>
    </>
  )
}

export default WeatherApp
