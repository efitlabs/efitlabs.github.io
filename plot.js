// is based on https://www.chartjs.org/samples/latest/scales/linear/step-size.html
//
var evictOldAfter = 100;

var config = {
    type: 'line',
    data: {
        labels: [1],
        datasets: [{
            label: '1st Sensor Dataset',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [10],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'EMG Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    min: 0,
                    max: 300,
                    // forces step size to be 5 units
                    stepSize: 5
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    console.log("Chart loaded");
};

function addValueToChart(value) {
    var dataset = config.data.datasets[0];
    console.log("dataset length is: " + dataset.data.length);
    if (dataset.data.length > evictOldAfter) {
        // remove first element
        config.data.labels.shift();
        dataset.data.shift();
    }
    // TODO: label value should probably be changed to something more meaningful.
    config.data.labels.push(config.data.labels[config.data.labels.length - 1] + 1);
    dataset.data.push(value);
    window.myLine.update();
}
