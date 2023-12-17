import ReactApexChart from "react-apexcharts";
import { Typography, Select } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import styles from './LineChart.module.css'
import { useState } from "react";

function LineChart() {
  const { Title, Paragraph } = Typography;
  
  const [series, setSeries] = useState(lineChart.series);

  const calculateDifference = () => {
    const outflowsSeries = series.find(s => s.name === "Outflows");
    const inflowsSeries = series.find(s => s.name === "Inflows");

    if (outflowsSeries && inflowsSeries) {
      const outflowsLastValue = outflowsSeries.data[outflowsSeries.data.length - 1];
      const inflowsLastValue = inflowsSeries.data[inflowsSeries.data.length - 1];
      return inflowsLastValue - outflowsLastValue;
    }

    return 0;
  };

  const handleChange = (value) => {
    switch (value) {
      case "pln":
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

  const netCashFlow = calculateDifference();


  return (
    <>
      <div className="linechart">
        <div>
          

          <Title level={3}>Net cash flow {netCashFlow}k</Title>
         
  
        </div>
        
     
      </div>
      <Select
        defaultValue="PLN"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'pln', label: 'PLN' },
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
