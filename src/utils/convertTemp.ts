export const kelvinToCelsius = (kelvinTemp: number): number => {
  const celsiusTemp = kelvinTemp - 273.15;
  return Math.floor(celsiusTemp);
};

export const kelvinToFahrenheit = (kelvinTemp: number): number => {
  const fahrenheitTemp = (kelvinTemp - 273.15) * (9 / 5) + 32;
  return Math.floor(fahrenheitTemp);
};

export const celsiusToFahrenheit = (celsiusTemp: number): number => {
  const fahrenheitTemp = celsiusTemp * (9 / 5) + 32;
  return Math.floor(fahrenheitTemp);
};
