import { IWeatherDay } from '../../models/weather'
import React from 'react'

type Props = {
  temperatureForecast: IWeatherDay[]
  temperatureThreshold: string
}
export const WeatherForecast: React.FC<Props> = ({
  temperatureForecast,
  temperatureThreshold,
}) => {
  return (
    temperatureForecast &&
    temperatureForecast.map((dayForecast, index) => (
      <ul className="days" key={index}>
        <div className={'dayDate'}>{dayForecast.day}</div>
        <br />

        {dayForecast.weather.map((forecast) => (
          <li key={forecast.dt_txt}>
            <div
              className={
                (forecast.main.temp_max > temperatureThreshold
                  ? 'heat'
                  : 'noHeat') + ' temperature'
              }
            >
              <span>{forecast.main.temp_max}° celsius</span>
              <span>{new Date(forecast.dt_txt).getHours()}h</span>
              <span>
                {forecast.main.temp_max > temperatureThreshold
                  ? 'Extreme Heat'
                  : 'Correct temperature'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    ))
  )
}
