import AreaChart from './AreaChart.js';
import StackedAreaChart from './StackedAreaChart.js';

let unemployeddata;


d3.csv('unemployment.csv', d3.autoType).then(data => {
    unemployeddata = data;
    console.log(data);

    var categories = data.columns.slice(1, -1);
    unemployeddata.categories = categories;
    
    for (let i=0; i < data.length; i++) {
        unemployeddata[i].date = new Date(data[i].date);
        //unemployeddata[i].total = parseInt(data[i].total);
    }


    var area_chart = AreaChart('.area-chart');
    area_chart.update(unemployeddata);  
    area_chart.on('brushed', function(range) {
        stacked_chart.filterByDate(range);
    });
    

    var stacked_chart = StackedAreaChart('.stacked-chart');
    stacked_chart.update(unemployeddata);

});

