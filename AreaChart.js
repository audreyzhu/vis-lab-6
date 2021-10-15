export default function AreaChart(container){

	// initialization
    const margin = {top: 20, right: 20, bottom: 20, left: 50};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScale = d3.scaleTime()
        .range([0,width]);
    
    const yScale = d3.scaleLinear()
        .range([height, 0]);

    let xAxis = d3.axisBottom()
        .scale(xScale);

    let yAxis = d3.axisLeft()
        .scale(yScale);

    let xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis');

    let yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis');
    //add labels? 

    svg.append('path').attr('class', 'areapath');

    
	function update(data){ 

		// update scales, encodings, axes (use the total count)
        xScale.domain(d3.extent(data, d=> d.date));
        yScale.domain(d3.extent(data, d=> d.total));

        var area = d3.area()
            //.datum(data)
            .x(d => xScale(d.date))
            .y1(d => yScale(d.total))
            .y0(yScale(0))
            //.attr('d', area)
        
        svg.select('areapath')
            .datum(data)
            .attr('d', area);
        


            
        xAxis = d3.axisBottom(xScale)
            .ticks(5, 's');

        yAxis = d3.axisLeft()
            .scale(yScale);

        xAxisGroup = svg.select('.x-axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);
        
        yAxisGroup = svg.select('.y-axis')
            .call(yAxis);
        
        console.log(xScale.domain());
	}


	return {
		update // ES6 shorthand for "update": update
	};
}

