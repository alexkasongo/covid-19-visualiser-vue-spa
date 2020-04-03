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

console.log(`chart-data.js - 9 - yohh`, totalConfirmed);


export const planetChartData = {
    type: 'line',
    data: {
      labels: countries,
    //   labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
      datasets: [
        { // one line graph
          label: 'Number of Confirmed Cases',
          data: totalConfirmed,
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
          borderWidth: 3
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
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }]
      }
    }
  }
  
  export default planetChartData;