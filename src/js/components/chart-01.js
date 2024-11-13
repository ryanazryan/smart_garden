import ApexCharts from 'apexcharts'

const translateDay = (day) => {
  switch (day.toLowerCase()) {
    case 'sunday':
      return 'Minggu'
    case 'monday':  
      return 'Senin'
    case 'tuesday':
      return 'Selasa'
    case 'wednesday':
      return 'Rabu'
    case 'thursday':
      return 'Kamis'
    case 'friday':
      return 'Jumat'
    case 'saturday':
      return 'Sabtu'
    default:
      return day
  }
}

const groupByWeek = (data) => {
  const sortedData = data.sort((a, b) => {
    const dayOrder = { 'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6 }
    return dayOrder[a.day.toLowerCase()] - dayOrder[b.day.toLowerCase()]
  })

  const groupedData = {}
  let currentWeekStart

  sortedData.forEach((item) => {
    const itemDate = new Date(item.created_at)
    const itemDay = itemDate.getDay()

    if (!currentWeekStart || itemDay === 1) {
      currentWeekStart = new Date(itemDate)
      groupedData[currentWeekStart] = []
    }

    groupedData[currentWeekStart].push(item)
  })

  const latestWeekStart = Object.keys(groupedData).pop()
  const latestWeekData = groupedData[latestWeekStart]

  return { [latestWeekStart]: latestWeekData }
}


const chart01 = () => {
  fetch('/api/getAverageHumidity.php')
    .then((response) => response.json())
    .then((data) => {
      const groupedData = groupByWeek(data.averageHumidity)

      const latestWeekStart = Object.keys(groupedData).pop()
      const latestWeekData = groupedData[latestWeekStart]

      const transformedData = latestWeekData.map((item) => ({
        x: translateDay(item.day),
        y: parseFloat(item.avg_humidity),
        status: parseFloat(item.avg_humidity) === 0 ? 'Basah' : 'Kering',
      }))

      const roundedData = transformedData.map((item) => ({
        x: item.x,
        y: Math.min(Math.round(item.y), 20),
        status: item.status === 'Basah' ? 0 : 1,
      }))

      const chartOneOptions = {
        series: [
          {
            name: 'Rata Rata Kelembaban',
            data: roundedData,
          },
        ],
        colors: ['#467816', '#80CAEE'],
        chart: {
          fontFamily: 'Satoshi, sans-serif',
          height: 335,
          type: 'area',
          dropShadow: {
            enabled: true,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
          },
          toolbar: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                height: 300,
              },
            },
          },
          {
            breakpoint: 1366,
            options: {
              chart: {
                height: 350,
              },
            },
          },
        ],
        stroke: {
          width: [2, 2],
          curve: 'straight',
        },
        markers: {
          size: 0,
        },
        labels: {
          show: false,
          position: 'top',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
          colors: '#fff',
          strokeColors: ['#467816', '#80CAEE'],
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          hover: {
            size: undefined,
            sizeOffset: 5,
          },
        },
        xaxis: {
          type: 'category',
          categories: [
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu',
            'Minggu',
          ],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          title: {
            style: {
              fontSize: '0px',
            },
          },
          min: 0,
          max: 1, 
          tickAmount: 1,
          labels: {
            formatter: (value) => {
              const status = value === 0 ? 'Basah' : 'Kering'
              return `${status}`
            },
          },
        },
        chart: {
          height: 400,
        },
        tooltip: {
          enabled: true,
          shared: false,
          y: {
            formatter: (value) => {
              const status = value === 0 ? 'Basah' : 'Kering'
              return `${value} (${status})`
            },
          },
          style: {
            fontFamily: 'Satoshi, sans-serif',
          },
        },
      }

      const chartSelector = document.querySelectorAll('#chartOne')

      if (chartSelector.length) {
        const chartOne = new ApexCharts(
          document.querySelector('#chartOne'),
          chartOneOptions
        )
        chartOne.render()
      }
    })
    .catch((error) => {
      console.error('Error fetching average humidity data:', error)
    })
}

export default chart01
