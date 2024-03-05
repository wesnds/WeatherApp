import { ForecastWeatherDetailProps } from "@/model/Weather/WeatherDetailProps";
import { kelvinToCelsius } from "@/utils/convertTemp";
import Container from "./Container";
import WeatherDetails from "./Weather/WeatherDetails";
import WeatherIcon from "./Weather/WeatherIcon";

type Props = {};

export default function Forecast(forecastProps: ForecastWeatherDetailProps) {
  return (
    <>
      <Container className="gap-4">
        <section className="flex gap-4 items-center px-4">
          <div className="flex flex-col gap-1 items-center">
            <WeatherIcon iconname={forecastProps.weatherIcon} />
            <p>{forecastProps.date}</p>
            <p className="text-sm">{forecastProps.day}</p>
          </div>
          <div className="flex flex-col px-4">
            <span className="text-5xl">
              {kelvinToCelsius(forecastProps.temp ?? 0)}°
            </span>
            <p className="text-xs space-x-1 whitespace-nowrap">
              <span>Feels like</span>
              <span>{kelvinToCelsius(forecastProps.feels_like ?? 0)}°</span>
            </p>
            <p className="capitalize text-sm">{forecastProps.description}</p>
          </div>
        </section>
        <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
          <WeatherDetails {...forecastProps} />
        </section>
      </Container>
    </>
  );
}
