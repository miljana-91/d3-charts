const colorScale = d3.scaleOrdinal()
  .domain(['aple', 'lemon'])
  .range(['#c11d1d', '#eae600']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([40, 30]);



export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;
  const xPosition = (d, i) => i * 100 + 60;

  const circles = selection.selectAll('circle')
    .data(fruits, d => d.id)
    
    circles.enter()
      .append('circle')
      .attr('cx', xPosition)
      .attr('cy', height / 2)
      .attr('r', 0)

    // update
    .merge(circles)
      .attr('fill', d => colorScale(d.type))
      .transition()
      .duration(1000)
        .attr('r', d => radiusScale(d.type))
        .attr('cx', xPosition)


    //remove
    circles.exit()
    .transition()
    .duration(1000)
      .attr('r', 0)
      .remove();
}