import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'
import { client } from '../../../apiClient';
import { ICoin } from '../CoinList';

const basicOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.7,
  plugins: {
      legend: {
          labels: {
              color: '#495057'
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      },
      y: {
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      }
  }
};

// const basicData = {
//   labels: ['7 days before', '6 days before', '5 days before', '4 days before', '3 days before', '2 days before', '1 day before'],
//   datasets: [
//       {
//           label: 'prices',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           fill: true,
//           borderColor: '#42A5F5',
//           tension: .4
//       },
//       {
//           label: 'Market caps',
//           data: [28, 48, 40, 19, 86, 27, 90],
//           fill: false,
//           borderColor: '#FFA726',
//           tension: .4
//       }
//   ]
// };

function ExpansionTemplate({ rowData }: { rowData: ICoin}) {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    client.get(`/coins/${rowData.id}/market_chart?vs_currency=usd&days=7&interval=daily`)
    .then(response => {
      const {prices, market_caps } = response.data;
      const chartData = {
        labels: ['7 days before', '6 days before', '5 days before', '4 days before', '3 days before', '2 days before', '1 day before'],
        datasets: [
          {
            label: 'prices',
            data: prices.map((item: Array<number>) => item[1]),
            fill: true,
            borderColor: '#42A5F5',
            tension: .4
          },
          // {
          //   label: 'Market caps',
          //   data: market_caps.map((item: Array<number>) => item[0]),
          //   fill: false,
          //   borderColor: '#FFA726',
          //   tension: .4
          // }
        ]
      };
      setData({...chartData});
    })
  }, []);
  console.log('CHARTDATA', data);
  return (
    <div className="card">
       <Chart type="line" data={data} options={basicOptions} />
    </div>
  )
}



export default ExpansionTemplate
