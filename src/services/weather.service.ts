import axios from 'axios'
import { ICity, IWeather, IWeatherDay } from '../models/weather'

const apiKey = process.env.REACT_APP_API_KEY

export const findCity = async (searchCity: string) => {
  const cityResponse = await axios.get<ICity[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`
  )
  return cityResponse.data[0] as ICity
}

export const fetchWeatherData = async (
  temperatureThreshold: number,
  selectedCity: ICity
) => {
  try {
    const weatherResponse = await axios.get<IWeather[]>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}&units=metric`
    )
    return arrangeWeatherData(weatherResponse.data.list)
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
  }
}

export const arrangeWeatherData = (weatherData: IWeather[]) => {
  if (!weatherData.length) {
    return
  }
  const weatherDayProcessedData: IWeatherDay[] = []
  let dayWeatherData: IWeather[] = []
  while (weatherData.length > 0) {
    if (dayWeatherData.length === 0) {
      dayWeatherData.push(weatherData[0])
      weatherData.shift()
    } else if (
      new Date(dayWeatherData[dayWeatherData.length - 1].dt_txt).getDate() ===
      new Date(weatherData[0].dt_txt).getDate()
    ) {
      dayWeatherData.push(weatherData[0])
      weatherData.shift()
    } else {
      weatherDayProcessedData.push({
        day: new Date(dayWeatherData[0].dt_txt).toDateString(),
        weather: dayWeatherData,
      })
      dayWeatherData = []
    }
  }
  return weatherDayProcessedData
}
