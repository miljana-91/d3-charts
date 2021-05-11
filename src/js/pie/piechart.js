import data from '../../data/pie-data.csv';


const pieValue = d => d.population;
const colorValue = d => d.religion;
const colorLabel = 'Religion';
const margin = { left: 20, right: 400, top: 1, bottom: 1 };

const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const pie = d3.pie().value(pieValue);
const arc = d3.arc()
    .innerRadius(innerHeight / 6) // 0 for pie chart!
    .outerRadius(innerHeight / 3); // size

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
const pieG = g.append('g')
    .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);
const colorLegendG = g.append('g')
    .attr('transform', `translate(${innerWidth + 60}, 150)`);

colorLegendG.append('text')
    .attr('class', 'legend-label')
    .attr('x', -30)
    .attr('y', -40)
    .text(colorLabel);

const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory10);

const colorLegend = d3.legendColor()
    .scale(colorScale)
    .shape('circle');

const row = d => {
    d.population = +d.population;
    return d;
};

const renderChart = () => {
    colorScale.domain(data.map(colorValue));

    const arcs = pie(data);

    pieG.selectAll('path').data(arcs)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(colorValue(d.data)));

    colorLegendG.call(colorLegend)
        .selectAll('.cell text')
        .attr('dy', '0.1em');
};

renderChart();