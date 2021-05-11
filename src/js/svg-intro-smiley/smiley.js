"use strict";

const svg = d3.select('svg');
const height = +svg.attr('height');
const width = +svg.attr('width');
const eyeSpacing = 100;
const eyeYOffset = -50;
const eyeRadius = 30;
const eyebrowsWidth = 60;
const eyebrowsHeight = 15;
const eyebrowsYOffset = -110;

const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g.append('circle')
    .attr('r', 240)
    .attr('fill', '#fc3')
    .attr('stroke', 'black')

const eyebrowsGroup = g.append('g')
    .attr('transform', `translate(0, ${eyebrowsYOffset})`)
    
eyebrowsGroup
    .transition().duration(2000).attr('transform', `translate(0, ${eyebrowsYOffset * 2})`)
    .transition().duration(2000).attr('transform', `translate(0, ${eyebrowsYOffset})`)

const leftEyebrow = eyebrowsGroup.append('rect')
    .attr('fill', 'black')
    .attr('width', eyebrowsWidth)
    .attr('height', eyebrowsHeight)
    .attr('x', eyeSpacing - eyebrowsWidth / 2)

const rightEyebrow = eyebrowsGroup.append('rect')
    .attr('fill', 'black')
    .attr('width', eyebrowsWidth)
    .attr('height', eyebrowsHeight)
    .attr('x', -eyeSpacing - eyebrowsWidth / 2)

const eyesGroup = g.append('g')
    .attr('fill', 'black')
    .attr('transform', `translate(0, ${eyeYOffset})`)

const leftEye = eyesGroup.append('circle')
    .attr('cx', -eyeSpacing)
    .attr('r', eyeRadius)

const rightEye = eyesGroup.append('circle')
    .attr('cx', eyeSpacing)
    .attr('r', eyeRadius)

const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2
    }))