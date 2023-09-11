/** @jest-environment jsdom */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { arrangeWeatherData } from '../services/weather.service'
import { weatherDataTest, weatherDataTestProcessed } from './testsData'
import { IWeather } from '../models/weather'

test('loads and displays inputs', async () => {
  render(<App />)
  const cityInput = await screen.findByLabelText('City:')
  console.log(cityInput)
  const temperatureInput = await screen.findByPlaceholderText('max temperature')
  expect(cityInput).toBeInTheDocument()
  expect(temperatureInput).toBeInTheDocument()
})

test('Verify data processing', async () => {
  const processedWeatherData = arrangeWeatherData(weatherDataTest as IWeather[])
  expect(processedWeatherData).toStrictEqual(weatherDataTestProcessed)
})
