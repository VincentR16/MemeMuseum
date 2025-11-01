const MANTINE_COLORS = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "lime",
  "yellow",
  "orange",
  "green",
];

export const getColorFromId = (id: string): string => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return MANTINE_COLORS[hash % MANTINE_COLORS.length];
};
