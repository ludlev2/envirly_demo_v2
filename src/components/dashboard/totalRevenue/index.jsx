import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '@ant-design/plots';
import { DollarOutlined } from "@ant-design/icons";
import { Card, Skeleton, Space } from "antd";
// import { currencyNumber } from "@/utilities";
import { useList } from "@refinedev/core";
import { ConfigProvider, Typography } from "antd";

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



export const  TotalRevenue = () => {
    const config = {
        percent: 0.75,
        radius: 0.75,
        range: {
            color: '#30BF78',
            width: 12,
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            content: {
                formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
                style: {
                    fontSize: 20, // This is your original setting which you want to change
                },
                className: 'custom-statistic-text', // Add this line
            },
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
                    <Text size="sm">Total revenue (yearly)</Text>
                </div>
            }
        >
            <Suspense>
                <Gauge {...config} padding={0} width={280} height={280} />
            </Suspense>

            <div
                style={{
                    display: "flex",
                    gap: "32px",
                    justifyContent: "center",
                }}
            >
                <Space direction="vertical" size={0}>
                    <Text size="xs" className="secondary">
                        Expected
                    </Text>
                    
                        <Text
                            size="md"
                            className="primary"
                            style={{
                                minWidth: "100px",
                            }}
                        >
                           $ 500,000
                        </Text>
                   
                </Space>
                <Space direction="vertical" size={0}>
                    <Text size="xs" className="secondary">
                        Realized
                    </Text>
                        <Text
                            size="md"
                            className="primary"
                            style={{
                                minWidth: "100px",
                            }}
                        >
                         $375,000
                        </Text>
                   
                </Space>
            </div>
        </Card>
    );
};

