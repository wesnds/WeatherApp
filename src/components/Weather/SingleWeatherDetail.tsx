import { SingleWeatherDetailProps } from "@/model/Weather/WeatherDetailProps";

export default function SingleWeatherDetail(swd: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black">
      <p className="whitespace-nowrap">{swd.information}</p>
      <div className="text-3xl">{swd.icon}</div>
      <p>{swd.value}</p>
    </div>
  );
}
