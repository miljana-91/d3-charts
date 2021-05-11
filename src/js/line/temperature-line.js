import * as data from '../../data/week-temperature-sf.csv';

data.forEach(d => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
});


const svg = d3.select('svg').attr('transform', 'translate(0, 60)');
const width = +svg.attr('width');
const height = +svg.attr('height');
const chartTitle = 'One week temperature in San Francisco';
const xAxisLabel = 'Date';
const yAxisLabel = 'Temperature';

const render = data => {
    const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 150
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = d => d.timestamp;
    const yValue = d => d.temperature;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([ innerHeight, 0])
        .nice();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const lineGenerator = d3.line()
        .x(d => xScale(d.timestamp))
        .y(d => yScale(d.temperature))
        .curve(d3.curveBasis);

    g.append('path')
        .attr('d', lineGenerator(data))
        .attr('stroke', 'orange')
        .attr('stroke-width', '3')
        .style('fill', 'none');

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight);

    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    
    const yAxisG = g.append('g')
        .call(d3.axisLeft(yScale));
    
    xAxisG.append('text')
        .classed('chart-legend-x', true)
        .attr('fill', 'black')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);

    yAxisG.append('text')
        .classed('chart-legend-y', true)
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -60)
        .style('text-anchor', 'middle')
        .text(yAxisLabel);

    g.append('text').text(chartTitle)
        .classed('chart-title', true)
        .attr('y', -30);
}

render(data);