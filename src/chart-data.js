// NOTE no longer being used in this way
// get random color for fills
function getRandomColor() {
  // console.log(`chart-data.js - 51 - this is being called`, summaryData);
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const summaryChart = {
    type: 'horizontalBar',
    data: {
      // labels: countries,
      datasets: [
        { // one line graph
            barPercentage: .2,
            barThickness: 60,
            maxBarThickness: 8,
            minBarLength: 2,
            label: 'Number of Confirmed Cases',
            // data: totalConfirmed,
            backgroundColor: getRandomColor(),
            borderColor: [
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
                '#36495d',
            ],
            borderWidth: 1
        },
        // another line graph
        { 
          label: 'Number of Confirmed Deaths',
          // data: totalDeaths,
          backgroundColor: '#000',
          borderColor: [
            '#000',
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      lineTension: 1,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
            autoSkip: false,
          }
        }]
      },
      legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    }
  }
  
  export default summaryChart;