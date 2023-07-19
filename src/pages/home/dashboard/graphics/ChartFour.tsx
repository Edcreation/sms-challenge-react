import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartFourState {
  series: { data: number[] }[];
}

const ChartFour: React.FC = () => {
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        data: [
          168, 385, 201, 298, 187, 195, 291
        ],
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inter',

      markers: {
        radius: 99,
      },
    },
    // yaxis: {
    //   title: false,
    // },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      // y: {
      //   formatter: function (val) {
      //     return val;
      //   },
      // },
    },
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-=lg sm:px-3 mt-10">
      <div>
        <h3 onClick={() => setState({ series: [{ data: [1,2,3,4,5,6] }] })} className="text-xl py-3 font-semibold text-black">
          Usage Analytics
        </h3>
      </div>

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
