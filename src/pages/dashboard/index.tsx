import { Row, Col, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
   
 RecentOrders,
    
     // Ensure that this is imported since it will now be used
} from "../../components";
import {TotalRevenue} from "../../components/dashboard/totalRevenue";
import { SankeyDiagram } from "../../components/dashboard/sankeyDiagram";
import LineChart from "../../components/chart/LineChart";
import EChart from "../../components/chart/EChart";


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
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                           // style={{
                           //     background: "url(images/blank-page.png)",
                           //     backgroundRepeat: "no-repeat",
                           //     backgroundPosition: "right",
                           //     backgroundSize: "cover",
                           // }}
                        >
                            <LineChart />
                            <EChart />
                            <TotalRevenue />
                            <SankeyDiagram />

                        </Card>
                    </Col>
                    
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}> {/* Full width for RecentOrders */}
                        <Card
                            bodyStyle={{
                                padding: 0,
                            }}
                            title={
                                <Text strong>
                                    {t("dashboard.recentOrders.title")}
                                </Text>
                            }
                        >
                            <RecentOrders />
                            
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
 }