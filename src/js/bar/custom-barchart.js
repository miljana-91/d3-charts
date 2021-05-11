import data from '../../data/data.csv';

data.forEach(el => {
    el.population = +el.population * 1000;
});

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const margin = {
        top: 50,
        right: 20,
        bottom: 20,
        left: 130,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xValue = d => d.population;
    const yValue = d => d.country;

    // SCALES
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

    // AXES
    const xAxisTickFormat = num => d3.format(".3s")(num).replace('G', 'B');
    const xAxis = d3.axisBottom(xScale).tickFormat(xAxisTickFormat);
    const yAxis = d3.axisLeft(yScale);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // APPENDING AXES
    g.append('g').call(yAxis)
        .selectAll('.domain, .tick line')
        .remove();
    
        g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain')
        .remove();

    // APPENDING TEXT LABELS
    g.append('text')
        .text('Ten most populous countries')
        .attr('y', -30)

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)))
}

render(data);

/*  d3 format by Zan Armstrong http://bl.ocks.org/zanarmstrong/raw/05c1e95bf7aa16c4768e/ */