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


import { RevenueChart } from "../../components/revenueChart";

import { DollarOutlined } from "@ant-design/icons";

import {useState} from "react";
import { IOrder } from "../../interfaces";

const { Text } = Typography;

export const MetricsPage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedOrderEvents, setSelectedOrderEvents] = useState<IOrder['events']>([]);

    // Function to handle when an order is selected
    const handleOrderSelect = (order: IOrder) => {
        setSelectedOrderEvents(order.events); // Update the selected order's events
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}> {/* This will ensure the content spans the full width */}
        {/*        <Row gutter={[16, 16]}>
                    <Col span={24}>
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
                                    <Text style={{ marginLeft: ".5rem" }}>
                                        Financial flow
                                    </Text>
                                </div>
                            }

                        >
                    
                            <SankeyDiagram />
                        </Card>
                    </Col>

                </Row>
                        */}
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
                            height: "438px",
                        }}
                    >
                        <RevenueChart />
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        xl={8}
                        style={{
                            height: "438px",
                        }}
                    >
                        <TotalRevenue />
                        
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
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
                                    <Text style={{ marginLeft: ".5rem" }}>
                                        OPEX
                                    </Text>
                                </div>
                            }>
                                
                                
                            <OpexChart />


                        </Card>
                    </Col>
                    
                </Row>
               
              
            </Col>
        </Row>
    );
 }