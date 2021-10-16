export default function AreaChart(container){

	// initialization
    const margin = {top: 50, right: 20, bottom: 20, left: 50};
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    var svg = d3.select(container).append('svg')
        .attr('width', width + margin.left + margin.right) //.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xScale = d3.scaleTime()
        .range([0,width]);
    var yScale = d3.scaleLinear()
        .rangeRound([height, 0]);

    let xAxis = d3.axisBottom()
        .scale(xScale);
    let yAxis = d3.axisLeft()
        .scale(yScale);
    let xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis');
    let yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis');

    svg.append('path')
        .attr('class', 'areapath')
        .attr('fill', d3.schemeTableau10[0]);

    svg.append('text')
        .attr('x', -20)
        .attr('y', -20)
        .attr('font-size', 14)
        .text('Total Unemployment')
        .attr('fill', '#5b5b5b');

    
	function update(data){ 

		// update scales, encodings, axes (use the total count)
        xScale.domain(d3.extent(data, d=> d.date));
        yScale.domain([0, d3.max(data, d=> d.total)]);

        var area = d3.area()
            //.datum(data)
            .x(d => xScale(d.date))
            .y1(d => yScale(d.total))
            .y0(yScale(0))
            //.attr('d', area)
        
        d3.select('.areapath')
            .datum(data)
            .attr('d', area);
             
        xAxis = d3.axisBottom()
            .scale(xScale);

        yAxis = d3.axisLeft()
            .scale(yScale);

        xAxisGroup = svg.select('.x-axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);
        
        yAxisGroup = svg.select('.y-axis')
            .call(yAxis);

	}

    var brush = d3.brushX()
        .extent([[0,0], [width,height]])
        .on('brush', brushed)
        .on('end', brushed)

    svg.append('g')
        .attr('class', 'brush')
        .call(brush);

    var listeners = { brushed: null }

    function on(event, listener) {
        listeners[event] = listener;
    }

    function brushed(event) {
        if (event.selection) {
            listeners['brushed'](event.selection.map(xScale.invert));
        }
    }

	return {
		update, on // ES6 shorthand for "update": update
	};
}

