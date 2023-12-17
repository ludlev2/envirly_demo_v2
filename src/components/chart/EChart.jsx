import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { Radio } from "antd";



function EChart() {
  const { Title, Paragraph } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const chartBackgroundStyle = {
    background: 'linear-gradient(62deg, #00369e 0%, #005cfd 53%, #a18dff 100%)',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px #0000001f'
  };


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
      <div id="chart" style={chartBackgroundStyle}>
        <div className="title-and-tabs" style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ marginRight: '20px', color: 'white' }}>Cash by</Title>
          <div className="ant-filtertabs">
            <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">Bank</Radio.Button>
                <Radio.Button value="b">Entity</Radio.Button>
                <Radio.Button value="c">Currency</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <Paragraph className="lastweek">
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
