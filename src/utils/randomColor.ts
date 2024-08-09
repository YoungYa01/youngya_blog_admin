/**
 * Generates a random hexadecimal color.
 * @returns {string} The random color in hexadecimal format.
 */
export function getRandomColor() {
  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray'
  ];
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
