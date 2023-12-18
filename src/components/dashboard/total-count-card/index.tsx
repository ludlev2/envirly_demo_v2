import React, { useState, useEffect, FC, PropsWithChildren, Suspense } from "react";

import { useList } from "@refinedev/core";

import { AuditOutlined, ShopOutlined, TeamOutlined, FireOutlined, DashboardOutlined, LineChartOutlined  } from "@ant-design/icons";
import { AreaConfig } from "@ant-design/plots";
import { Card, Skeleton } from "antd";
import { ConfigProvider, Typography } from "antd";

import styles from "./index.module.css";

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
const Area = React.lazy(() => import("@ant-design/plots/es/components/area"));

type Type = "companies" | "contacts" | "deals" | "total_cash" | "runaway" | "net_burn";

export const DashboardTotalCountCard: React.FC<{
    resource: Type;
}> = ({ resource }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response = await fetch(`http://localhost:3000/${resource}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (e) {
                setIsError(true);
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [resource]); // The effect runs only when the 'resource' prop changes.

    const { primaryColor, secondaryColor, icon, title } = variants[resource];

    const config: AreaConfig = {
        className: styles.area,
        appendPadding: [1, 0, 0, 0],
        padding: 0,
        syncViewPadding: true,
        data: variants[resource].data,
        autoFit: true,
        tooltip: false,
        animation: false,
        xField: "index",
        yField: "value",
        xAxis: false,
        yAxis: {
            tickCount: 12,
            label: {
                style: {
                    fill: "transparent",
                },
            },
            grid: {
                line: {
                    style: {
                        stroke: "transparent",
                    },
                },
            },
        },
        smooth: true,
        areaStyle: () => {
            return {
                fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
            };
        },
        line: {
            color: primaryColor,
        },
    };

    return (
        <Card
            style={{ height: "96px", padding: 0 }}
            bodyStyle={{
                padding: "8px 8px 8px 12px",
            }}
            size="small"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                }}
            >
                {icon}
                <Text
                    size="md"
                    className="secondary"
                    style={{ marginLeft: "8px" }}
                >
                    {title}
                </Text>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    size="xxxl"
                    strong
                    style={{
                        textAlign: "start",
                        marginLeft: "48px",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {isLoading ? (
                        <Skeleton.Button
                            style={{
                                marginTop: "8px",
                                width: "74px",
                            }}
                        />
                    ) : (
                        data?.total
                    )}
                </Text>
                <Suspense>
                    <Area {...config} />
                </Suspense>
            </div>
        </Card>
    );
};

const IconWrapper: FC<PropsWithChildren<{ color: string }>> = ({
    color,
    children,
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: color,
            }}
        >
            {children}
        </div>
    );
};

const variants: {
    [key in Type]: {
        primaryColor: string;
        secondaryColor?: string;
        icon: React.ReactNode;
        title: string;
        data: { index: string; value: number }[];
    };
} = {
    total_cash: {
        primaryColor: "#1677FF",
        secondaryColor: "#BAE0FF",
        icon: (
            <IconWrapper color="#E6F4FF">
                <LineChartOutlined 
                    className="md"
                    style={{
                        color: "#1677FF",
                    }}
                />
            </IconWrapper>
        ),
        title: "Total cash (PLN)",
        data: [
            {
                index: "1",
                value: 3500,
            },
            {
                index: "2",
                value: 2750,
            },
            {
                index: "3",
                value: 5000,
            },
            {
                index: "4",
                value: 4250,
            },
            {
                index: "5",
                value: 5000,
            },
        ],
    },
    runaway: {
        primaryColor: "#52C41A",
        secondaryColor: "#D9F7BE",
        icon: (
            <IconWrapper color="#F6FFED">
                <DashboardOutlined
                    className="md"
                    style={{
                        color: "#52C41A",
                    }}
                />
            </IconWrapper>
        ),
        title: "Runway",
        data: [
            {
                index: "1",
                value: 10000,
            },
            {
                index: "2",
                value: 19500,
            },
            {
                index: "3",
                value: 13000,
            },
            {
                index: "4",
                value: 17000,
            },
            {
                index: "5",
                value: 13000,
            },
            {
                index: "6",
                value: 20000,
            },
        ],
    },
    net_burn: {
        primaryColor: "#FA541C",
        secondaryColor: "#FFD8BF",
        icon: (
            <IconWrapper color="#FFF2E8">
                <FireOutlined
                    className="md"
                    style={{
                        color: "#FA541C",
                    }}
                />
            </IconWrapper>
        ),
        title: "Net Burn",
        data: [
            {
                index: "1",
                value: 1000,
            },
            {
                index: "2",
                value: 1300,
            },
            {
                index: "3",
                value: 1200,
            },
            {
                index: "4",
                value: 2000,
            },
            {
                index: "5",
                value: 800,
            },
            {
                index: "6",
                value: 1700,
            },
            {
                index: "7",
                value: 1400,
            },
            {
                index: "8",
                value: 1800,
            },
        ],
    },
};
