"use client";

import Container from "@/components/Container";
import Forecast from "@/components/Forecast";
import Navbar from "@/components/NavBar/Navbar";
import WeatherSkeleton from "@/components/Skeleton";
import WeatherDetails from "@/components/Weather/WeatherDetails";
import WeatherIcon from "@/components/Weather/WeatherIcon";
import { kelvinToCelsius } from "@/utils/convertTemp";
import convertWindSpeed from "@/utils/convertWindSpeed";
import dayOrNight from "@/utils/dayorNight";
import mtsToKms from "@/utils/mtsToKms";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import * as dotenv from "dotenv";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "./atom";

dotenv.config({ path: "../../.env.local" });

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/data/${process.env.NEXT_PUBLIC_APP_VERSION}/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`;

  const { isLoading, error, data, refetch } = useQuery("repoData", async () => {
    const { data } = await axios.get(url);
    return data;
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];
  const weekDay = () => parseISO(firstData?.dt_txt);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1200).toISOString().split("T")[0],
      ),
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1200).toISOString().split("T")[0];
      1;
      const entryTime = new Date(entry.dt * 1200).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center min-h-screen justify-center">
          <p className="animate-bounce">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
          <Navbar location={data?.city.name} />
          <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
            {loadingCity ? (
              <WeatherSkeleton />
            ) : (
              <>
                <section className="space-y-4">
                  <div className="flex gap-1 text-2xl items-end space-y-2 ">
                    <h2 className="text-2xl">
                      {format(weekDay() ?? "", "EEEE")}
                    </h2>
                    <h2 className="text-lg">
                      ({format(weekDay() ?? "", "dd.MM.yyyy")})
                    </h2>
                  </div>
                  <Container className=" gap-10 px-6 items-center">
                    <div className="flex flex-col px-4">
                      <span className="text-5xl">
                        {kelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                      </span>
                      <p className="text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span>
                          {kelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                        </span>
                      </p>
                      <div className="text-xs space-x-2 flex">
                        <span className="flex items-center">
                          {kelvinToCelsius(firstData?.main.temp_min ?? 0)}°
                          <FaLongArrowAltDown className="text-[8px]" />
                        </span>
                        <span className="flex items-center">
                          {kelvinToCelsius(firstData?.main.temp_max ?? 0)}°
                          <FaLongArrowAltUp className="text-[8px]" />
                        </span>
                      </div>
                    </div>
                    <ul className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                      {data?.list.map((data, index) => {
                        return (
                          <li
                            key={index}
                            className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                          >
                            <p className="whitespace-nowrap">
                              {format(parseISO(data.dt_txt), "HH:mm a")}
                            </p>
                            <WeatherIcon
                              iconname={dayOrNight(
                                data.weather[0].icon,
                                data.dt_txt,
                              )}
                            />
                            <p className="flex items-center">
                              {kelvinToCelsius(data?.main.temp ?? 0)}°
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </Container>
                  <div className="flex gap-4">
                    <Container className="w-fit justify-center flex-col px-4 items-center">
                      <p className="capitalize text-center">
                        {firstData?.weather[0].description}
                      </p>
                      <WeatherIcon
                        iconname={dayOrNight(
                          firstData?.weather[0].icon ?? "",
                          firstData?.dt_txt ?? "",
                        )}
                      />
                    </Container>
                    <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                      <WeatherDetails
                        visibility={mtsToKms(firstData?.visibility ?? 10000)}
                        airPressure={`${firstData?.main.pressure ?? ""} hPa`}
                        humidity={`${firstData?.main.humidity ?? ""}%`}
                        sunrise={`${format(
                          fromUnixTime(data?.city.sunrise ?? 1702949452),
                          "H:mm",
                        )}`}
                        sunset={`${format(
                          fromUnixTime(data?.city.sunset ?? 1702517657),
                          "H:mm",
                        )}`}
                        windSpeed={convertWindSpeed(
                          firstData?.wind.speed ?? 1.64,
                        )}
                      />
                    </Container>
                  </div>
                </section>
                <section className="flex w-full flex-col gap-4">
                  <p className="text-2xl">Forecast (7 days)</p>
                  {firstDataForEachDate.slice(1, 7).map((data, index) => (
                    <Forecast
                      key={index}
                      description={data?.weather[0].description ?? ""}
                      weatherIcon={data?.weather[0].icon ?? "01d"}
                      date={format(parseISO(data?.dt_txt ?? ""), "dd.MM")}
                      day={format(parseISO(data?.dt_txt ?? ""), "EEEE")}
                      feels_like={data?.main.feels_like ?? 0}
                      temp={data?.main.temp ?? 0}
                      temp_max={data?.main.temp_max ?? 0}
                      temp_min={data?.main.temp_min ?? 0}
                      airPressure={`${data?.main.pressure} hPa `}
                      humidity={`${data?.main.humidity}%`}
                      sunrise={format(
                        fromUnixTime(data?.city?.sunrise ?? 1702517657),
                        "H:mm",
                      )}
                      sunset={format(
                        fromUnixTime(data?.city?.sunset ?? 1702517657),
                        "H:mm",
                      )}
                      visibility={`${mtsToKms(data?.visibility ?? 10000)} `}
                      windSpeed={`${convertWindSpeed(
                        data?.wind.speed ?? 1.64,
                      )} `}
                    />
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      )}
    </>
  );
}
