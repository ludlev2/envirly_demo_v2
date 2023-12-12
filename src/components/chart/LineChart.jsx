import ReactApexChart from "react-apexcharts";
import { Typography, Select } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import styles from './LineChart.module.css'
import { useState } from "react";

function LineChart() {
  const { Title, Paragraph } = Typography;
  
  const [series, setSeries] = useState(lineChart.series);


  const handleChange = (value) => {
    switch (value) {
      case "dot":
        setSeries([
          
              {
                "name": "Outflows",
                "data": [100, 280, 240, 380, 480, 770, 780, 510, 690, 880],
                "offsetY": 0
              },
              {
                "name": "Inflows",
                "data": [300, 500, 500, 790, 800, 910, 950, 1020, 1000, 1060],
                "offsetY": 0
              }
            
          
        ]);

        break;
      case "usdc":
        setSeries([
          {
            name: "Outflows",
            data: [303, 280, 530, 280, 420, 570, 680, 810, 790, 880],

            offsetY: 0,
          },
          {
            name: "Inflows",
            data: [200, 600, 640, 690, 820, 610, 850, 920, 900, 960],
            offsetY: 0,
          },
        ]);

        break;
      case "usd":
        setSeries([
          {
            "name": "Outflows",
            "data": [680, 430, 280, 180, 462, 230, 540, 670, 750, 640],
            "offsetY": 0
          },
          {
            "name": "Inflows",
            "data": [750, 420, 650, 710, 950, 1060, 1300, 970, 1350, 1110],
            "offsetY": 0
          }
        ]);

        break;
      case "eur":
        setSeries([
          {
            "name": "Outflows",
            "data": [230, 280, 330, 480, 600, 770, 880, 1010, 1090, 1080],
            "offsetY": 0
          },
          {
            "name": "Inflows",
            "data": [350, 550, 550, 840, 850, 960, 1000, 1070, 1050, 1110],
            "offsetY": 0
          }
        ]);

        break;
  
    }
  };

  return (
    <>
      <div className="linechart">
        <div>
          

          <Title level={3}>Net cash flow $72,103</Title>
          <Paragraph className="lastweek">
            <span className="bnb2">+30%</span> this month
          </Paragraph>
          
  
        </div>
        
     
      </div>
      <Select
        defaultValue="DOT"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'dot', label: 'DOT' },
          { value: 'usdc', label: 'USDC' },
          { value: 'usd', label: 'USD' },
          { value: 'eur', label: 'EUR' },
        ]}
      />
      <ReactApexChart
        className="full-width"
        
        options={lineChart.options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
