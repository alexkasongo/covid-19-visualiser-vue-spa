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

export const planetChartData = {
    type: 'horizontalBar',
    data: {
      labels: countries,
      datasets: [
        { // one line graph
          label: 'Number of Confirmed Cases',
          data: totalConfirmed,
        //   barThickness: 40,
          backgroundColor: [
            'rgba(54,73,93,.5)', // Blue
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)'
          ],
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
          backgroundColor: [
            'rgba(71, 183,132,.5)', // Green
          ],
          borderColor: [
            '#47b784',
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
    //   responsive: true,
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