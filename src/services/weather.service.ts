import axios from 'axios'
import { ICity, IWeather } from '../models/weather'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchWeatherData = async (
  temperatureThreshold: number,
  searchCity: string
) => {
  try {
    // Replace the URL with your backend API endpoint
    const cityResponse = await axios.get<ICity[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`
    )
    const city = cityResponse.data[0] as ICity
    const weatherResponse = await axios.get<IWeather[]>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`
    )
    return weatherResponse.data.list as IWeather[]
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
  }
}
