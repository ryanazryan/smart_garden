import ApexCharts from "apexcharts";

const chart02 = (data) => {
  console.log('Received data:', data);

  if (!data || !data.data || !Array.isArray(data.data)) {
    console.error('Invalid or missing data:', data);
    return;
  }
  
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  let groupedData = {};

  data.data.forEach(item => {
    const itemDate = new Date(item.created_at);
    const itemDay = itemDate.getDate();

    if (itemDay === currentDay) {
      const hour = itemDate.getHours();
      groupedData[hour] = (groupedData[hour] || 0) + 1;
    }
  });

  console.log('Grouped data:', groupedData);

  const maxCount = Math.max(...Object.values(groupedData)) + 5;

  const chartTwoOptions = {
    series: [
      {
        name: "Data Siram",
        data: Object.values(groupedData),
      },
    ],
    colors: ["#467816"],
    chart: {
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: Object.keys(groupedData).map(hour => `${hour}:00`),
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const chartSelector = document.querySelectorAll("#chartTwo");

  if (chartSelector.length) {
    const chartTwo = new ApexCharts(
      document.querySelector("#chartTwo"),
      chartTwoOptions
    );
    chartTwo.render();
  }
};

let lastResetTime = new Date();

function shouldResetData() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const lastResetDay = lastResetTime.getDate();
  return currentDay !== lastResetDay;
}

async function resetAndFetchData() {
  if (shouldResetData()) {
    lastResetTime = new Date();
    await fetchData();
  }
}

async function fetchData() {
  try {
    const response = await fetch('/api/getDataPenyiraman.php');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Raw response data:', data);

    if (data.success) {
      chart02(data);
    } else {
      console.error('Failed to fetch data:', data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

setInterval(resetAndFetchData, 24 * 60 * 60 * 1000);

fetchData();

export { chart02, fetchData };
