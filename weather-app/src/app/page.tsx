import { Locations } from "@/sharedTypes";
import WeatherAppController from "../features/WeatherAppController/WeatherAppController";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-1.5 p-24">
      <WeatherAppController active={Locations[0].url} />
    </main>
  );
}
