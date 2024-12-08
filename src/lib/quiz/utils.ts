export function getNextRoundId(current: string) {
  const nextIt = parseRoundId(current) + 1;
  return `r${nextIt.toString().padStart(3, "0")}`;
}

export function parseRoundId(id: string): number {
  return parseInt(id.replace("r", ""));
}
