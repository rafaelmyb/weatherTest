export interface WeatherArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ListArray {
  coord: {
    lon: number;
    lat: number;
  };
  sys: {
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  weather: WeatherArray[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  id: number;
  name: string;
}

export interface DataProps {
  cnt: number;
  list: ListArray[];
}
