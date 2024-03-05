// import { CityInfo } from "../model/CityInfo";
import { CityInfo } from "@/model/CityInfo";
import { WeatherData } from "@/model/Weather/WeatherData";
import { WeatherDetail } from "@/model/Weather/WeatherDetail";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export const {
  WEATHER_KEY,
  API_URL,
  APP_VERSION,
  GEO_LOCATION_VERSION,
  CITY_LIMIT_REQ,
} = process.env;

export async function reqByName(city: string) {
  const cityList: CityInfo[] = [];
  const url =
    API_URL +
    "geo/" +
    GEO_LOCATION_VERSION +
    "/direct?q=" +
    city +
    "&limit=" +
    CITY_LIMIT_REQ +
    "&appid=" +
    WEATHER_KEY +
    "cnt=56";

  const res = await fetch(url);
  const geoRes = await res.json();
  for (let i = 1; i < geoRes.length; i++) {
    cityList.push(geoRes[i]);
  }
  return cityList;
}

//https://api.openweathermap.org/data/2.5/forecast?q=manaus&appid=52e7a4c8ee46069572b154b8af11104a
export async function weatherInfo(selectedCity: string) {
  const res = await fetch(
    `${API_URL}/data/${APP_VERSION}/forecast?q=${selectedCity}&appid=${WEATHER_KEY}`,
  );
  const weatherInfo: WeatherData = await res.json();
  return weatherInfo;
}

weatherInfo("manaus");
