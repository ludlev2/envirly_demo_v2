import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { useList, useNavigation } from "@refinedev/core";
import { DollarOutlined, RightCircleOutlined, DownOutlined } from "@ant-design/icons";
import { AreaConfig } from "@ant-design/plots";
import { Button, Card, Menu, Dropdown } from "antd";
import dayjs from "dayjs";
import { Select, ConfigProvider, Typography } from 'antd';

const { Option } = Select; // Destructure Option from Select if needed
const Area = lazy(() => import("@ant-design/plots/es/components/area"));


const sizes = {
    sm: { fontSize: '12px' },
    md: { fontSize: '16px' },
    lg: { fontSize: '20px' },
    // Add more sizes as needed
};

const Text = ({
    size = "sm",
    children,
    ...rest
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    ...sizes[size],
                },
            }}
        >
            <Typography.Text {...rest}>{children}</Typography.Text>
        </ConfigProvider>
    );
};

export const RevenueChart: React.FC<{}> = () => {
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [dealType, setDealType] = useState('WON');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/revenue');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                console.log(result); // Add this line to check what you're receiving
            } catch (e) {
                setIsError(true);
                setError(e.message);
            }
        };
        fetchData();
    }, []);

    // State to track the current selection

    if (isError) {
        console.error("Error fetching deals chart data", error);
        return null;
    }

    const wonDealData = useMemo(() => {
        const won = data?.find((node) => node.title === "WON")?.dealsAggregate.map((item) => {
            const { closeDateMonth, closeDateYear } = item.groupBy;
            const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
            return {
                timeUnix: date.unix(),
                timeText: date.format("MMM YYYY"),
                value: item.sum?.value,
                state: "Won",
            };
        });
        return (won || []).sort((a, b) => a.timeUnix - b.timeUnix);
    }, [data]);

    const lostDealData = useMemo(() => {
        const lost = data?.find((node) => node.title === "LOST")?.dealsAggregate.map((item) => {
            const { closeDateMonth, closeDateYear } = item.groupBy;
            const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
            return {
                timeUnix: date.unix(),
                timeText: date.format("MMM YYYY"),
                value: item.sum?.value,
                state: "Lost",
            };
        });
        return (lost || []).sort((a, b) => a.timeUnix - b.timeUnix);
    }, [data]);


    // Current deal data based on selection
    const currentDealData = dealType === 'WON' ? wonDealData : lostDealData;

    const config: AreaConfig = {
        isStack: false,
        data: currentDealData,
        xField: "timeText",
        yField: "value",
        seriesField: "state",
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: false,
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => {
                    return `$${Number(v) / 1000}k`;
                },
            },
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state === "Won" ? "MRR" : "ARR",
                    value: `$${Number(data.value) / 1000}k`,
                };
            },
        },
        areaStyle: (datum) => {
            const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
            const lost = "l(270) 0:#ffffff 0.5:#adc8e6 1:#1890ff";
            return { fill: datum.state === "Won" ? won : lost };
        },
        color: (datum) => {
            return datum.state === "Won" ? "#52C41A" : "#1890FF";
        },
    };

    return (
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
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Revenue
                    </Text>
                </div>
            }
            extra={
                <Select defaultValue="WON" style={{ width: 120 }} onChange={setDealType}>
                    <Select.Option value="WON">MRR</Select.Option>
                    <Select.Option value="LOST">ARR</Select.Option>
                </Select>
            }
        >

            <Suspense>
                <Area {...config} height={325} />
            </Suspense>
        </Card>
    );
};
