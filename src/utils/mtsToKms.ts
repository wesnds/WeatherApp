export default function mtsToKms(visibilityInMeters: number): string {
  const visibilityInKms = visibilityInMeters / 1000;
  return `${visibilityInKms.toFixed(0)}km`;
}
