import { useState } from "react";
import { useNavigation, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { Typography, Table, Avatar, Space, Tag, Modal } from "antd";
import { RecentOrdersColumn, Price,
    OrderId,
    Title,
    TitleWrapper,
    Paragraph

} from "./styled";

import { OrderActions } from "../../../components";

import { IGrant } from "../../../interfaces";

import { GrantTimeline } from  "../grantTimeline";

const { Text } = Typography;

export const RecentOrders: React.FC = () => {
    const t = useTranslate();
    const { tableProps } = useTable<IGrant>({
        resource: "grants",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 4,
       
        syncWithLocation: false,
    });

    const { show } = useNavigation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IGrant | null>(null);

    const showModal = (record: IGrant) => {
        setSelectedOrder(record);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
        <Table
            {...tableProps}
            pagination={{ ...tableProps.pagination, simple: true }}
            showHeader={false}
            rowKey="id"
            
        >
            <Table.Column<IGrant>
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
                        src={record?.products?.images.url} 
                        onClick={() => showModal(record)}
                    />
                )}
            />
            <RecentOrdersColumn
                key="summary"
                render={(_, record) => (
                    <TitleWrapper >
                        <Title strong
                            onClick={() => showModal(record)}>{record.products[0]?.name}</Title>
                        <Paragraph
                            ellipsis={{
                                rows: 2,
                                tooltip: record.products[0]?.description,
                                symbol: <span>...</span>,
                              }} 
                            strong
                            onClick={() => showModal(record)}
                        >
                            {record.products[0]?.description}
                        </Paragraph>

                        <OrderId
                            strong
                            onClick={() => showModal(record)}
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
                            onClick={() => showModal(record)} 
                        >{`${record.courier.name} ${record.courier.surname}`} </Title>
                        <Text>{record.adress.text}</Text>
                    </Space>
                )}
            />
            <Table.Column<IGrant>
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
                            value={value}
                        />
                        <Tag color={ record.status.text === "Live" ? "green"
                                    : record.status.text === "Closed"? "red"
                                     : "blue"}>
                            {t(`enum.orderStatuses.${record.status.text}`)}
                        </Tag>
                    </Space>
                )}
            />
            <Table.Column<IGrant>
                fixed="right"
                key="actions"
                align="center"
                render={(_, record) => <OrderActions record={record} />}
            />
        </Table>
            <Modal
                title="Order Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // You can add buttons here if needed
            >
                {/* Render your selected order details here */}
                {selectedOrder && (
                    <GrantTimeline events={selectedOrder.events} />
                )}
            </Modal>
        </>
    );
};