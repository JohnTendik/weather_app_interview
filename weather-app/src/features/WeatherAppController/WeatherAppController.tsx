import { Locations, weatherApiBaseUrl } from "@/sharedTypes";
import MenuController from "../MenuController/MenuController";
import axios from "axios";

type WeatherAppControllerProps = {
  active: string;
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function WeatherAppController({
  active,
}: WeatherAppControllerProps) {
  const activeRoute = Locations.find((location) => location.url === active);

  if (!activeRoute) {
    return <p>This city data does not exist.</p>;
  }

  let getWeatherData;

  try {
    getWeatherData = await axios.get(
      `${weatherApiBaseUrl}/forecast.json?key=${process.env.API_KEY}&q=${activeRoute.name}&days=3`
    );
  } catch (error) {
    return <p>This city data does not exist.</p>;
  }

  const forecast = getWeatherData.data.forecast.forecastday;

  return (
    <div className="w-[32rem] flex flex-col gap-3">
      <MenuController active={active} />

      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-col">
            <h1 className="p-12 text-5xl font-bold bg-black text-white uppercase rounded-md flex items-center justify-center">
              {activeRoute.name}
            </h1>
          </div>
          <div className="flex gap-3 h-[100%]">
            <div className="w-1/2 flex gap-2 flex-col bg-[#50aeae] rounded-md text-white items-center justify-center p-2">
              <h2 className="font-bold text-5xl">
                {getWeatherData.data.current.temp_c}°
              </h2>
              <p className="uppercase text-sm font-semibold">current</p>
            </div>
            <div className="w-1/2 flex gap-2 flex-col bg-[#56b36f] rounded-md text-white items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${getWeatherData.data.current.condition.icon}`}
                alt="weather icon"
              />
              <p className="uppercase text-sm p-2 text-center font-semibold">
                {getWeatherData.data.current.condition.text}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md bg-[#e1dcd7] p-4 flex flex-col gap-10 items-center justify-center">
          {forecast.map((day: any, index: number) => (
            <div key={index} className="text-center">
              <h4 className="font-semibold uppercase text-sm">
                {index === 0
                  ? "Tomorrow"
                  : daysOfWeek[new Date(day.date).getDay()]}
              </h4>
              <h3 className="text-3xl font-bold">{day.day.avgtemp_c}°</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
