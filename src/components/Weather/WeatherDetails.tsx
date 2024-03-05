import { WeatherDetailProps } from "@/model/Weather/WeatherDetailProps";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import SingleWeatherDetail from "./SingleWeatherDetail";

type Props = {};

export default function WeatherDetails(wd: WeatherDetailProps) {
  return (
    <>
      <SingleWeatherDetail
        icon={<IoEyeOutline />}
        information="Visibility"
        value={wd.visibility}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={wd.humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind speed"
        value={wd.windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Air Pressure"
        value={wd.airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={wd.sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={wd.sunset}
      />
    </>
  );
}
