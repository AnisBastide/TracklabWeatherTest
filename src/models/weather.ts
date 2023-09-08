export interface IWeather {
  main: IMainTemp
  dt_txt: string
}

export interface ICity {
  name: string
  lat: number
  lon: number
}

export interface IMainTemp {
  temp_max: number
}
