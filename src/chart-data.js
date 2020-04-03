import store from './store'

const summaryData = store.getters['summaryFeed'];
let countries = []
let totalConfirmed = []
let totalDeaths = []

for (var i = 0; i < summaryData.length; i++) {
    console.log(`chart-data.js - 8 - variable`, summaryData[i]);
    countries.push(summaryData[i].Country)
    totalConfirmed.push(summaryData[i].TotalConfirmed)
    totalDeaths.push(summaryData[i].TotalDeaths)
}

// get random color for fills
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const planetChartData = {
    type: 'horizontalBar',
    data: {
      labels: countries,
      datasets: [
        { // one line graph
          label: 'Number of Confirmed Cases',
          data: totalConfirmed,
        //   barThickness: 40,
            // fillColor : getRandomColor(),   
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
          data: totalDeaths,
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
  
  export default planetChartData;