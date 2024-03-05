import { cn } from "@/utils/cn";
import Image from "next/image";

type Props = {};

export default function WeatherIcon(
  weatherIconProps: React.HTMLProps<HTMLDivElement> & { iconname: string },
) {
  return (
    <div {...weatherIconProps} className={cn("relative h-20 w-20")}>
      <Image
        priority
        src={`https://openweathermap.org/img/wn/${weatherIconProps.iconname}@4x.png`}
        alt="weather-icon"
        width={100}
        height={100}
        className="absolute h-full w-full"
      />
    </div>
  );
}
