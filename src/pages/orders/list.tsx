import { useMemo } from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    CrudFilters,
    useExport,
    useNavigation,
    HttpError,
    getDefaultFilter,
} from "@refinedev/core";

import {
    List,
    TextField,
    useTable,
    getDefaultSortOrder,
    DateField,
    NumberField,
    useSelect,
    ExportButton,
} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    Table,
    Popover,
    Card,
    Input,
    Form,
    DatePicker,
    Select,
    Button,
    FormProps,
    Row,
    Col,

} from "antd";
import dayjs from "dayjs";

import { OrderStatus, OrderActions } from "../../components";
import {
    IOrder,
    IStore,
    IOrderFilterVariables,
    IOrderStatus,
    IUser,
} from "../../interfaces";

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
            <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                    marginTop: "52px",
                }}
            >
                <Card title={t("orders.filter.title")}>
                    <Filter
                        formProps={searchFormProps}
                        filters={filters || []}
                    />
                </Card>
            </Col>
            <Col xl={18} xs={24}>
                <List
                    headerProps={{
                        extra: <Actions />,
                    }}
                >
                    <Table
                        {...tableProps}
                        rowKey="id"
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    show("orders", record.id);
                                },
                            };
                        }}
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
                                        value={value}
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
                                            {record?.paymentTerms}
                                        </ul>
                                    }
                                    title="Payment terms"
                                    trigger="hover"
                                >
                                    {t("orders.fields.itemsAmount", {
                                        amount: record?.paymentTerms,
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
