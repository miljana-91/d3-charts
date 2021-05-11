import { fruitBowl } from './fruitBowl';

const svg = d3.select('svg');

const makeFruit = type => ({
  type,
  id: Math.random() * 50
});

let fruits = d3.range(5).map(() => makeFruit('apple'));
let selectedFruit = null;
let hoveredFruit = null;

const setSelectedFruit = id => {
  selectedFruit = id;
  render();
}

const hoverFruit = id => {
  hoveredFruit = id;
  render();
}

const unhoverFruit = () => {
  hoveredFruit = null;
  render();
}


const render = () => {
  fruitBowl(svg, {
    fruits, 
    height: +svg.attr('height'),
    setSelectedFruit,
    hoverFruit,
    unhoverFruit,
    selectedFruit,
    hoveredFruit
  });
}

render();

setTimeout(() => {
  // Eating an apple.
  fruits.pop();

  render();
}, 1000);

setTimeout(() => {
  // Replacing an apple with lemon.
  fruits[2].type = 'lemon';

  render();
}, 2000);

setTimeout(() => {
  // Eating another apple.
  fruits.splice(1, 1);

  render();
}, 3000);
