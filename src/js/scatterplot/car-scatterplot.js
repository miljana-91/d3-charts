import data from '../../data/auto-mpg.csv';

data.forEach(el => {
    el.mpg = +el.mpg;
    el.cylinders = +el.cylinders;
    el.displacement = +el.displacement;
    el.horsepower = +el.horsepower;
    el.weight = +el.weight;
    el.acceleration = +el.acceleration;
    el.year = +el.year;
});

const svg = d3.select('svg').attr('transform', 'translate(0, 60)');
const width = +svg.attr('width');
const height = +svg.attr('height');
const circleRadius = 18;
const chartTitle = 'Cars horsepower and weight';
const xAxisLabel = 'Horsepower';

const render = data => {
    const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 150
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.weight))
        .range([0, innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.horsepower))
        .range([0, innerHeight])

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    g.selectAll('circle')
        .data(data)
        .enter()
            .append('circle')
            .attr('cx', d => xScale(d.weight))
            .attr('r', circleRadius)
            .attr('cy', d => yScale(d.horsepower));

    const xAxisTickFormat = num => d3.format('.3s')(num).replace('G', 'B');
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain')
        .remove();
    
    g.append('g')
        .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth))
        .select('.domain').remove();

    g.append('text').text(chartTitle)
        .classed('chart-title', true)
        .attr('y', -30);

    xAxisG.append('text')
        .classed('chart-legend', true)
        .attr('fill', 'black')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);
}

render(data);