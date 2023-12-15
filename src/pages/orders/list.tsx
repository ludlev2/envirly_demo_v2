import { useMemo, useState } from "react";
import { useTranslate, IResourceComponentsProps, CrudFilters, useExport,useNavigation, HttpError, getDefaultFilter, } from "@refinedev/core";
import { List, TextField,  useTable,  getDefaultSortOrder,  DateField,  NumberField,  useSelect,  ExportButton,} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Popover, Card, Input, Form, DatePicker, Select, Button, FormProps, Row, Col, Tag, Space, Dropdown, message, Tooltip, Menu } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import dayjs from "dayjs";

import { OrderStatus, OrderActions } from "../../components";
import {  IOrder,  IStore,  IOrderFilterVariables,  IOrderStatus,  IUser,} from "../../interfaces";

const { RangePicker } = DatePicker;

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter, searchFormProps, filters } = useTable<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, store, user, createdAt, status } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q,
            });

            filters.push({
                field: "store.id",
                operator: "eq",
                value: store,
            });

            filters.push({
                field: "user.id",
                operator: "eq",
                value: user,
            });

            filters.push({
                field: "status.text",
                operator: "in",
                value: status,
            });

            filters.push(
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt
                        ? createdAt[0].startOf("day").toISOString()
                        : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt
                        ? createdAt[1].endOf("day").toISOString()
                        : undefined,
                },
            );

            return filters;
        },
    });

    

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
                statuses: item.statuses.map(status => status.text).join(', '), // Join the statuses texts into a single string
                store: item.store.title,
                user: item.user.firstName,
            };
        },
    });

    const Actions: React.FC = () => ( <ExportButton onClick={triggerExport} loading={isLoading} />);

    // ExpandedOrderDetails component
    const ExpandedOrderDetails = ({ order }) => {

    // Create details table
    const { tableProps } = useTable({
            resource: "orders",
            permanentFilter: [
                {
                    field: "order.id",
                    operator: "eq",
                    value: order.id,
                }
            ]
        })
        const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            message.info('Click on left button.');
            console.log('click left button', e);
        };

        const handleMenuClick: MenuProps['onClick'] = (e) => {
            message.info('Click on menu item.');
            console.log('click', e.key);
        };

        const items: MenuProps['items'] = [
            {
                label: '1st menu item',
                key: '1',
            },
            {
                label: '2nd menu item',
                key: '2',
            },
            {
                label: '3rd menu item',
                key: '3',
                
            },
            {
                label: '4rd menu item',
                key: '4',
             
            },
        ];

        ;

        return (
            <>
                <div style={{ fontWeight: 'bold' }}>
                    Journal Entry: {order.journalEntry.text}
                   <> <Space/></>
                    {order.statuses.map(status => (
                        <Space >
                        <Tag color="blue" key={status.id}>{status.text}</Tag>
                        </Space>
                    ))}

                </div>
                    <Table >


                    <Table.Column
                        title="Breakdown by"
                        dataIndex="breakdownBy"
                        key="breakdownBy"
                        render={() => (
                            <Dropdown overlay={<Menu onClick={handleMenuClick} items={items} />}>
                                <Button>
                                    <Space>
                                        Button <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        )}
                    />

                <Table.Column
                    key="percent"
                    dataIndex="percent"
                    title={t("orders.fields.percent")}
                    //render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="value"
                    dataIndex="value"
                    title={t("orders.fields.value")}
                       // render={(value) => { return (<NumberField options={{ currency: "USD", style: "currency", }} value={value} />); }} 
                        sorter
                        />
                

                <Table.Column
                    key="category"
                    dataIndex="category"
                    title={t("orders.fields.category")}
                   // render={(value) => (<DateField value={value} format="LLL" />)}  
                        />


            </Table>
            </>
        )
        
    }

    return (        
        <>
         <Filter formProps={searchFormProps} filters={filters || []}/>
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <List  headerProps={{ extra: <Actions />, }} >
                    <Table
                        {...tableProps}
                            expandable={{ expandedRowRender: (record) => <ExpandedOrderDetails order={record} />  }}
                        rowKey="id"
                        onRow={(record) => {return { onClick: () => {show("orders", record.id); },}; }}>

                        <Table.Column
                            key="orderNumber"
                            dataIndex="orderNumber"
                            title={t("orders.fields.orderNumber")}
                            render={(value) => <TextField value={value} />}
                        />
                            <Table.Column
                                key="journalEntry.id"
                                dataIndex={["journalEntry", "text"]}
                                title={t("orders.fields.journalEntry")}
                                sorter
                            />
                            <Table.Column<IOrder>
                                key="account.id"
                                dataIndex={["account", "title"]}
                                title={t("orders.fields.account")}
                                sorter
                                render={(_, record) => (
                                    <Popover
                                        content={
                                            <ul>
                                                <li>{record?.account?.description}</li> 
                                            </ul>
                                        }
                                        title="Description of accounting account"
                                        trigger="hover"
                                    >
                                        {record?.account?.title} 
                                    </Popover>
                                )}
                            />
                       
                        
                       
                        <Table.Column
                                key="category.fullName"
                                dataIndex={["category", "fullName"]}
                                title={t("orders.fields.category")}
                                sorter
                                
                        />
                        
                            <Table.Column
                          
                                key="credit"
                                dataIndex="credit"
                                title={t("orders.fields.credit")}
                                render={(value) => {
                                    return ( <NumberField options={{currency: "USD", style: "currency", }} value={value} />
                                    );
                                }}
                            />
                            <Table.Column
                                
                                key="debit"
                                dataIndex="debit"
                                title={t("orders.fields.debit")}
                                render={(value) => {
                                    return (<NumberField options={{ currency: "USD", style: "currency", }} value={value} />
                                    );
                                }}
                            />
                            
                        <Table.Column
                            key="createdAt"
                            dataIndex="createdAt"
                            title={t("orders.fields.createdAt")}
                            render={(value) => (
                                <DateField value={value} format="LLL" /> )}sorter/>
                        
                            <Table.Column<IOrder>
                                key="statuses"
                                dataIndex="statuses"
                                title={t("orders.fields.status")}
                                render={(statuses: IOrderStatus[]) => { // Now we expect statuses to be an array of strings
                                    return ( <> {statuses.map((status) => (
                                                <Tag color="blue" key={status.id}>
                                                    {status.text}
                                                </Tag> ))} 
                                                </> ); }} />

                        <Table.Column<IOrder>
                            fixed="right"
                            title={t("table.actions")}
                            dataIndex="actions"
                            key="actions"
                            align="center"
                           // render={(_value, record) => (
                            //    <OrderActions record={record} />
                           // )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
     </>
    );
};

const Filter: React.FC<{ formProps: FormProps; filters: CrudFilters }> = (
    props,
) => {
    const t = useTranslate();

    const { formProps, filters } = props;
    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        defaultValue: getDefaultFilter("store.id", filters),
    });

    const { selectProps: orderSelectProps } = useSelect<IOrderStatus>({
        resource: "orderStatuses",
        optionLabel: "text",
        optionValue: "text",
        defaultValue: getDefaultFilter("status.text", filters),
    });

    const { selectProps: userSelectProps } = useSelect<IUser>({
        resource: "users",
        optionLabel: "fullName",
        defaultValue: getDefaultFilter("user.id", filters),
    });

    const createdAt = useMemo(() => {
        const start = getDefaultFilter("createdAt", filters, "gte");
        const end = getDefaultFilter("createdAt", filters, "lte");

        const startFrom = dayjs(start);
        const endAt = dayjs(end);

        if (start && end) {
            return [startFrom, endAt];
        }
        return undefined;
    }, [filters]);

    return (
        <Form
            layout="vertical"
            {...formProps}
            initialValues={{
                q: getDefaultFilter("q", filters),
                store: getDefaultFilter("store.id", filters)
                    ? Number(getDefaultFilter("store.id", filters))
                    : undefined,
                user: getDefaultFilter("user.id", filters)
                    ? Number(getDefaultFilter("user.id", filters))
                    : undefined,
                status: getDefaultFilter("status.text", filters, "in"),
                createdAt,
            }}
        >
            <Row gutter={[10, 0]} align="bottom">
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item label={t("orders.filter.search.label")} name="q">
                        <Input
                            placeholder={t("orders.filter.search.placeholder")}
                            prefix={<SearchOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item
                        label={t("orders.filter.status.label")}
                        name="status"
                    >
                        <Select
                            {...orderSelectProps}
                            allowClear
                            mode="multiple"
                            placeholder={t("orders.filter.status.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item
                        label={t("orders.filter.store.label")}
                        name="store"
                    >
                        <Select
                            {...storeSelectProps}
                            allowClear
                            placeholder={t("orders.filter.store.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item
                        label={t("orders.filter.user.label")}
                        name="user"
                    >
                        <Select
                            {...userSelectProps}
                            allowClear
                            placeholder={t("orders.filter.user.placeholder")}
                        />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item
                        label={t("orders.filter.createdAt.label")}
                        name="createdAt"
                    >
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xl={24} md={8} sm={12} xs={24}>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            block
                        >
                            {t("orders.filter.submit")}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
