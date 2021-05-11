import data from '../../data/data.csv';

data.forEach(el => {
    el.population = +el.population * 1000;
});

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const margin = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 150
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, innerWidth])
        .nice();
    
    const yScale = d3.scalePoint()
        .domain(data.map(d => d.country))
        .range([0, innerHeight])
        .padding(0.7);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    g.selectAll('circle')
        .data(data)
        .enter()
            .append('circle')
            .classed('scatterplot', true)
            .attr('cx', d => xScale(d.population))
            .attr('r', 17)
            .attr('cy', d => yScale(d.country));

    const xAxisTickFormat = num => d3.format('.3s')(num).replace('G', 'B');
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain').remove();
    g.append('g').call(d3.axisLeft(yScale).tickSize(-innerWidth)).select('.domain').remove();

    g.append('text').text('Top 10 Most Populous Countries')
        .classed('chart-title', true);
    xAxisG.append('text').text('Population')
        .classed('chart-legend', true)
        .attr('fill', 'black')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
}

render(data);