import { useMemo } from "react";
import {useTranslate, IResourceComponentsProps, CrudFilters, useExport, useNavigation, HttpError, getDefaultFilter, } from "@refinedev/core";

import {List, TextField, useTable, getDefaultSortOrder, DateField, NumberField, useSelect, ExportButton, } from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import {  Table, Popover, Card, Input, Form, DatePicker, Select, Button, FormProps, Row, Col, } from "antd";
import dayjs from "dayjs";

import { OrderStatus, OrderActions } from "..";
import { IOrder, IStore,IOrderFilterVariables,
    IOrderStatus,
    IUser,
} from "../../interfaces";

const { RangePicker } = DatePicker;

export const GrantsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, searchFormProps, filters } = useTable<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >;

    const t = useTranslate();
    const { show } = useNavigation();

    const { isLoading, triggerExport } = useExport<IOrder>({
        sorter,
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                amount: item.amount,
                orderNumber: item.orderNumber,
                status: item.status.text,
                store: item.store.title,
                user: item.user.firstName,
            };
        },
    });

    const Actions: React.FC = () => (
        <ExportButton onClick={triggerExport} loading={isLoading} />
    );

    return (
        <Row gutter={[16, 16]}>    
            <Col xl={18} xs={24}>
                <List>
                    <Table
                        {...tableProps}
                        rowKey="id"
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    show("orders", record.id);
                                },
                            };
                        }} style={{ width: '100%' }}
                    >
                        <Table.Column
                            key="orderNumber"
                            dataIndex="orderNumber"
                            title={t("orders.fields.orderNumber")}
                            render={(value) => <TextField value={value} />}
                        />
                        <Table.Column<IOrder>
                            key="status.text"
                            dataIndex={["status", "text"]}
                            title={t("orders.fields.status")}
                            render={(value) => {
                                return <OrderStatus status={value} />;
                            }}
                            defaultSortOrder={getDefaultSortOrder(
                                "status.text",
                                sorter,
                            )}
                            sorter
                        />
                        <Table.Column
                            align="right"
                            key="amount"
                            dataIndex="amount"
                            title={t("orders.fields.amount")}
                            defaultSortOrder={getDefaultSortOrder(
                                "amount",
                                sorter,
                            )}
                            sorter
                            render={(value) => {
                                return (
                                    <NumberField
                                        options={{
                                            currency: "USD",
                                            style: "currency",
                                        }}
                                        value={value / 100}
                                    />
                                );
                            }}
                        />
                        <Table.Column
                            key="store.id"
                            dataIndex={["store", "title"]}
                            title={t("orders.fields.store")}
                        />
                        <Table.Column
                            key="user.fullName"
                            dataIndex={["user", "fullName"]}
                            title={t("orders.fields.user")}
                        />
                        <Table.Column<IOrder>
                            key="products"
                            dataIndex="products"
                            title={t("orders.fields.products")}
                            render={(_, record) => (
                                <Popover
                                    content={
                                        <ul>
                                            {record.products.map((product) => (
                                                <li key={product.id}>
                                                    {product.name}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    title="Payment terms"
                                    trigger="hover"
                                >
                                    {t("orders.fields.itemsAmount", {
                                        amount: record.products.length,
                                    })}
                                </Popover>
                            )}
                        />
                        <Table.Column
                            key="createdAt"
                            dataIndex="createdAt"
                            title={t("orders.fields.createdAt")}
                            render={(value) => (
                                <DateField value={value} format="LLL" />
                            )}
                            sorter
                        />
                        <Table.Column<IOrder>
                            fixed="right"
                            title={t("table.actions")}
                            dataIndex="actions"
                            key="actions"
                            align="center"
                            render={(_value, record) => (
                                <OrderActions record={record} />
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    );
};


