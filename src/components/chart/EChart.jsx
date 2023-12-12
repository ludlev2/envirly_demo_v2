/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { Radio } from "antd";



function EChart() {
  const { Title, Paragraph } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);


  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <>
      <div id="chart">
        <div className="title-and-tabs" style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ marginRight: '20px' }}>Cash by</Title>
          <div className="ant-filtertabs">
            <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">Entity</Radio.Button>
                <Radio.Button value="b">Bank</Radio.Button>
                <Radio.Button value="c">Currency</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <Paragraph className="lastweek">
          <span className="bnb2">+10%</span> than last week
        </Paragraph>

        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={280}
        />
      </div>
      {/*
      <div className="chart-vistior">

        <Paragraph className="lastweek">
          More stats
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

export default EChart;
