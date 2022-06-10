const CITIES_LIST = [
  2988507, // Paris,
  3117735, // Madrid,
  5368361, // Los Angeles,
  4930956, // Boston
  5128581, // New York City,
  1880252, // Singapore
  3094802, // Cracow,
  3081368, // Wroclaw,
];

export const OPENWEATHER_API_URL =
  'https://api.openweathermap.org/data/2.5/group?';

export const QUERY_PARAMS = new URLSearchParams({
  APPID: '178d6346b886cb213668e23a86c6ee14',
  id: CITIES_LIST.join(','),
  units: 'metric',
});

// export default api;
