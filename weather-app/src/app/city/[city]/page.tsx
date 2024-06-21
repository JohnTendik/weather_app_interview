import WeatherAppController from "@/features/WeatherAppController/WeatherAppController";

type CityWeatherPageProps = {
  params: { city: string };
};

export default async function CityWeatherPage({
  params,
}: CityWeatherPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-1.5 p-24">
      <WeatherAppController active={params.city} />
    </main>
  );
}
