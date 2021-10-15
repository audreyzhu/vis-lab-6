import AreaChart from './AreaChart.js';
//import StackedAreaChart from './StackedAreaChart.js';

let unemployeddata;


d3.csv('unemployment.csv', d=> {
    return {
        ...d, 
        date: Date(d.date),
    }
}).then(data => {
    unemployeddata = data;
    //unemployeddata[0].date = Date(data[0].date);
    console.log(data)

    const overview = AreaChart('.chart');
    overview.update(data);  
});

