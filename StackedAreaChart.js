export default function StackedAreaChart(container) {
	// initialization
    const margin = {top: 20, right: 20, bottom: 20, left: 50};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	let xScale = d3.scaleTime()
        .rangeRound([0,width]);
    
    let yScale = d3.scaleLinear()
        .range([height, 0]);

    let otherScale = d3.scaleOrdinal();
    
    let xAxis = d3.axisBottom()
        .scale(xScale);

    let yAxis = d3.axisLeft()
        .scale(yScale);

    let xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis');

    let yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis');

    //update function!!
    function update(data){
        

	}
	return {
		update
	}
}