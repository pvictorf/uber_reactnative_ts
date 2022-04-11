export function calcSecondsToHours(seconds: number = 0) {
  const time = new Date(seconds * 1000).toISOString().slice(11, 16);

  return {
    hours: time.slice(0,2),
    minutes: time.slice(3),
    totalMinutes: Math.round(seconds / 60),
    totalHours: Math.floor(seconds / 3600),
    totalSeconds: seconds,
    time: time,
  };
}
