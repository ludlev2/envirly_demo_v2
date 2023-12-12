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
                "data": [130, 180, 230, 380, 500, 670, 780, 910, 990, 980],
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
            data: [30, 80, 130, 280, 400, 570, 680, 810, 890, 880],

            offsetY: 0,
          },
          {
            name: "Inflows",
            data: [200, 400, 400, 690, 700, 810, 850, 920, 900, 960],
            offsetY: 0,
          },
        ]);

        break;
      case "usd":
        setSeries([
          {
            "name": "Outflows",
            "data": [80, 130, 180, 330, 460, 630, 740, 870, 950, 940],
            "offsetY": 0
          },
          {
            "name": "Inflows",
            "data": [250, 450, 450, 740, 750, 860, 900, 970, 950, 1010],
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
