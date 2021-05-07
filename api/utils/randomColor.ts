const collorsPallete = [
  '#9c5ab6',
  '#003f88',
  '#ff9505',
  '#7678ed',
  '#d80032',
  '#3d348b',
  '#1b998b',
  '#f46036',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const randomColor = () => {
  const color = collorsPallete[getRandomInt(0, 7)]

  return color
};
