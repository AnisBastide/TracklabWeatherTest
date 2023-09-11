export interface IWeather {
  main: IMainTemp
  dt_txt: string
}

export interface IMainTemp {
  temp_max: number
}

export interface ICity {
  name: string
  lat: number
  lon: number
}

export interface IWeatherDay {
  day: string
  weather: IWeather[]
}
