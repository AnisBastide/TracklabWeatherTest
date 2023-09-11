import React, { useEffect, useState } from 'react'
import { fetchWeatherData, findCity } from '../../services/weather.service'
import { ICity, IWeatherDay } from '../../models/weather'
import { WeatherForecast } from './WeatherForecast'

const WeatherApp: React.FC = () => {
  const [temperatureThreshold, setTemperatureThreshold] = useState<string>('')
  const [city, setCity] = useState<string>('Paris')
  const [selectedCity, setSelectedCity] = useState<ICity>()
  const [temperatureForecast, setTemperatureForecast] = useState<IWeatherDay[]>(
    []
  )

  function handleTemperatureChange(e) {
    if (parseInt(e.target.value) || e.target.value === '') {
      setTemperatureThreshold(e.target.value)
    }
  }

  function handleCityChange(e) {
    setCity(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (city === '') {
        return
      }
      const selectedCity = await findCity(city)
      setSelectedCity(selectedCity)
      return await fetchWeatherData(
        temperatureThreshold as number,
        selectedCity
      )
    }
    fetchData().then((result) => setTemperatureForecast(result))
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
        Selected City:{city && selectedCity?.name}
      </form>
      <WeatherForecast
        temperatureThreshold={temperatureThreshold}
        temperatureForecast={temperatureForecast}
      />
    </>
  )
}

export default WeatherApp
