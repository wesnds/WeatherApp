export default function convertWindSpeed(speedInMtsPerSec: number): string {
  const speedInKmsPerHour = speedInMtsPerSec * 3.6;
  return `${speedInKmsPerHour.toFixed(0)} km/h`;
}
