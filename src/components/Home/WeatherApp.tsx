import React, { useState, useEffect } from 'react'
import axios from 'axios'


// Models
import { ICity, IWeather } from '../../models/weather'

const WeatherApp: React.FC = () => {
  //console.log('qqqqqq')
  //console.log(process.env.REACT_APP_API_KEY)
  const [temperatureThreshold, setTemperatureThreshold] = useState<number>(0)
  const [city, setCity] = useState<string>('')

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(formData.get('temperature'))
    await fetchWeatherData()

    // alert('A name was submitted: ' + this.state.value)
  }
  function handleTemperatureChange(e) {
    if (e.target.value == '') {
      setTemperatureThreshold(0)
    }
    if (parseInt(e.target.value)) {
      setTemperatureThreshold(e.target.value)
    }
  }

  function handleCityChange(e) {
    setCity(e.target.value)
  }
  const fetchWeatherData = async () => {
    try {
      // Replace the URL with your backend API endpoint
      const response = await axios.get<ICity[]>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      )
      console.log('Trains List ', response.data)
      // setTrains(response.data)
    } catch (error) {
      console.error('Failed to fetch train data:', error)
    }
  }

  // useEffect(() => {
  //   console.log('Use Effect Called')
  //   fetchTrainsData()
  // }, [])

  // const handleRefresh = () => {
  //   console.log('Refresh Button Clicked')
  //   fetchTrainsData()
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default WeatherApp
