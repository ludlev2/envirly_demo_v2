import { useNavigation, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { Typography, Table, Avatar, Space, Tag } from "antd";
import {
    RecentOrdersColumn, Price,
    OrderId,
    Title,
    TitleWrapper,
} from "./styled";

import { OrderActions } from "../../../components";

import { IOrder } from "../../../interfaces";

const { Text, Paragraph } = Typography;

export const RecentGrants: React.FC = () => {
    const t = useTranslate();
    const { tableProps } = useTable<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 4,
        permanentFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
        syncWithLocation: false,
    });

    const { show } = useNavigation();

    return (
        <Table
            {...tableProps}
            pagination={{ ...tableProps.pagination, simple: true }}
            showHeader={false}
            rowKey="id"
        >
            <Table.Column<IOrder>
                key="avatar"
                render={(_, record) => (
                    <Avatar
                        size={{
                            xs: 24,  // extra small screens
                            sm: 32,  // small screens
                            md: 40,  // medium screens
                            lg: 64,  // large screens
                            xl: 80,  // extra large screens
                            xxl: 96, // extra extra large screens
                        }}
                        src={record?.products[0]?.images[0].url}
                    />
                )}
            />
            <RecentOrdersColumn
                key="summary"
                render={(_, record) => (
                    <TitleWrapper>
                        <Title strong>{record.products[0]?.name}</Title>
                        <Paragraph
                            ellipsis={{
                                rows: 2,
                                tooltip: record.products[0]?.description,
                                symbol: <span>...</span>,
                            }}
                        >
                            {record.products[0]?.description}
                        </Paragraph>

                        <OrderId
                            strong
                            onClick={() => {
                                show("orders", record.id);
                            }}
                        >
                            #{record.orderNumber}
                        </OrderId>
                    </TitleWrapper>
                )}
            />
            <RecentOrdersColumn
                key="summary"
                render={(_, record) => (
                    <Space direction="vertical">
                        <Title
                            strong
                        >{`${record.courier.name} ${record.courier.surname}`}</Title>
                        <Text>{record.adress.text}</Text>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                dataIndex="amount"
                render={(value, record) => (
                    <Space
                        size="large"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Price
                            strong
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "standard",
                            }}
                            value={value / 100}
                        />
                        <Tag color="orange">
                            {t(`enum.orderStatuses.${record.status.text}`)}
                        </Tag>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                fixed="right"
                key="actions"
                align="center"
                render={(_, record) => <OrderActions record={record} />}
            />
        </Table>
    );
};