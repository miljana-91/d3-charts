import * as data from '../../data/world-population-by-year.csv';

const parseTime = d3.timeParse("%Y");

data.forEach(d => {
    d.population = +d.population;
    d.year = parseTime(d.year);
});


const svg = d3.select('svg').attr('transform', 'translate(0, 60)');
const width = +svg.attr('width');
const height = +svg.attr('height');
const chartTitle = 'World Population';
const xAxisLabel = 'Year';
const yAxisLabel = 'Population';

const render = data => {
    const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 150
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = d => d.year;
    const yValue = d => d.population;

    const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([innerHeight, 0])
        .nice();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const areaGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.population))
        .curve(d3.curveBasis);
        
    const yAxisTickFormat = num => d3.format('.1s')(num).replace('G', 'B');
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)
        .tickFormat(yAxisTickFormat);
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight)
        .tickPadding(15)

    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain').remove();
    
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
        .attr('x', innerWidth / 3)
        .attr('y', -30);

    g.append('path')
        .attr('d', areaGenerator(data))
        .attr('stroke', 'orange')
        .attr('stroke-width', '3')
        .style('fill', 'none');

}

render(data);