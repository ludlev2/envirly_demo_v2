import { Row, Col, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
   
 RecentOrders,
    
     // Ensure that this is imported since it will now be used
} from "../../components";
import {TotalRevenue} from "../../components/dashboard/totalRevenue";
import { SankeyDiagram } from "../../components/dashboard/sankeyDiagram";
import { OpexChart } from "../../components/dashboard/opexChart";
import { DashboardTotalCountCard } from "../../components/dashboard/total-count-card";

import LineChart from "../../components/chart/LineChart";
import EChart from "../../components/chart/EChart";

import { DollarOutlined } from "@ant-design/icons";

import {useState} from "react";
import { IOrder } from "../../interfaces";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedOrderEvents, setSelectedOrderEvents] = useState<IOrder['events']>([]);

    // Function to handle when an order is selected
    const handleOrderSelect = (order: IOrder) => {
        setSelectedOrderEvents(order.events); // Update the selected order's events
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}> {/* This will ensure the content spans the full width */}
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={24} xl={8}>
                        <DashboardTotalCountCard resource="total_cash" />
                    </Col>
                    <Col xs={24} sm={24} xl={8}>
                        <DashboardTotalCountCard resource="runaway" />
                    </Col>
                    <Col xs={24} sm={24} xl={8}>
                        <DashboardTotalCountCard resource="net_burn" />
                    </Col>
                </Row>
                <Row
                    gutter={[32, 32]}
                    style={{
                        marginTop: "32px",
                    }}
                >
                    <Col
                        xs={24}
                        sm={24}
                        xl={16}
                        style={{
                            height: "550px",
                        }}
                    >

                        <Card
                            style={{ height: "100%" }}
                            headStyle={{ padding: "8px 16px" }}
                            bodyStyle={{ padding: "24px 24px 0px 24px" }}
                            title={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <DollarOutlined />
                                    <Text  style={{ marginLeft: ".5rem" }}>
                                        Revenue
                                    </Text>
                                </div>
                            }
                           
                        >
                        <LineChart />
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        xl={8}
                        style={{
                            height: "550px",
                        }}
                    >
                        <EChart style={{
                            background: 'transparent linear-gradient(62deg, #00369e 0%, #005cfd 53%, #a18dff 100%) no-repeat padding-box',
                            boxShadow: '0px 4px 6px #0000001f',
                            borderRadius: '8px',
                        }} />
                        
                    </Col>
                </Row>
               
            </Col>
        </Row>
    );
 }