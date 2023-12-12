import { ReactNode, useState } from "react";
import {useShow, IResourceComponentsProps, useTranslate, useUpdate,} from "@refinedev/core";
import { List } from "@refinedev/antd";
import { CheckCircleOutlined, CloseCircleOutlined,LoadingOutlined, SendOutlined} from "@ant-design/icons";
import { Row, Col, Button, Steps, Grid, Space, Avatar, Typography, Card, Table, Skeleton, Modal} from "antd";
import dayjs from "dayjs";
import { StatusButton } from "../../components/statusButton";
import { useOrderCustomKbarActions } from "../../hooks";
import { IEvent, IOrder } from "../../interfaces";

import { Courier, CourierBoxContainer, CourierInfoBox, CourierInfoBoxText, CourierInfoText, PageHeader, } from "./styled";

const { useBreakpoint } = Grid;
const { Text } = Typography;


const pdfUrl = "/images/invoices/invoice_2.pdf";

const renderPdf = () => {
    return (
        <div style={{ height: "500px", width: "100%" }}>
            <iframe type="application/pdf"  src={pdfUrl} frameBorder="0"  title="PDF Document"
                width="100%"
                height="100%"/> </div>
    );
}
export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const screens = useBreakpoint();
    const { queryResult } = useShow<IOrder>();
    const { data } = queryResult;
    const { mutate } = useUpdate();
    const record = data?.data;

    const canAcceptOrder = record?.status.text === "Approved";
    const canRejectOrder =
        record?.status.text === "Pending Approval" ||
        record?.status.text === "Approved" ||
        record?.status.text === "Invoice Received";

    const currentBreakPoints = Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0]);

    const renderOrderSteps = () => {
        const notFinishedCurrentStep = (event: IEvent, index: number) =>
            event.status !== "Cancelled" &&
            event.status !== "Paid" &&
            record?.events.findIndex(
                (el) => el.status === record?.status?.text,
            ) === index;

        const stepStatus = (event: IEvent, index: number) => {
            if (!event.date) return "wait";
            if (event.status === "Cancelled") return "error";
            if (notFinishedCurrentStep(event, index)) return "process";
            return "finish";
        };

        const handleMutate = (status: { id: number; text: string }) => {
            if (record) {

                const newEvent = {
                    "date": new Date().toISOString(),
                    "status": status.text

                };
                const lastEvent = record.events[record.events.length - 1];
                if (lastEvent && lastEvent.status === status.text) {
                    // If the last event is the same as the one we're trying to add, only update the date
                    lastEvent.date = newEvent.date;
                } else {
                    // Otherwise, add the new event to the events array
                    record.events.push(newEvent);
                }
                
                mutate({
                    resource: "orders",
                    id: record.id.toString(),
                    values: {
                        status,
                        events: record.events,
                    },
                });
            }
        };




        useOrderCustomKbarActions(record);

        return (
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={`Due Date: ${record ? dayjs(record.dueDate).format('YYYY-MM-DD HH:mm:ss') : ""}`}
                subTitle={`Invoice Number #${record?.orderNumber ?? ""}`}
                extra={[
                    <Button disabled={!canAcceptOrder}  key="accept" icon={<SendOutlined />} type="primary"
                        onClick={() =>
                            handleMutate({
                                id: 2,
                                text: "Paid",})}> {t("buttons.accept")}  </Button>,
                                
                    <Button disabled={!canRejectOrder} key="reject" danger icon={< CloseCircleOutlined />}
                        onClick={() => handleMutate({
                                id: 5,
                                text: "Cancelled", })} > {t("buttons.reject")} </Button>,]}>
                <Steps
                    direction={
                        currentBreakPoints.includes("lg")
                            ? "horizontal"
                            : "vertical"
                    }
                    current={record?.events.findIndex(
                        (el) => el.status === record?.status?.text,
                    )}
                >
                    {record?.events.map((event: IEvent, index: number) => (
                        <Steps.Step
                            status={stepStatus(event, index)}
                            key={index}
                            title={t(`enum.orderStatuses.${event.status}`)}
                            icon={
                                notFinishedCurrentStep(event, index) && (
                                    <LoadingOutlined />
                                )
                            }
                            description={
                                event.date && dayjs(event.date).format("L LT")
                            }
                        />
                    ))}
                </Steps>
                {!record && <Skeleton paragraph={{ rows: 1 }} />}
            </PageHeader>
        );
    };

    const renderCourierInfo = () => (
        <Card>
            {record?.courier.map((courier, index) => (
                <Row justify="center" key={index}>
                    <Col xl={12} lg={10}>
                        <Courier>
                            <Avatar
                                size={108}
                                src={courier.avatar && courier.avatar[0].url} // Assuming avatar is an array
                            />
                            <CourierInfoText>
                                <Text style={{ fontSize: 16 }}>{courier.title}</Text>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 800,
                                    }}
                                >
                                    {courier.name} {courier.surname}
                                </Text>
                                <Text>ID #{courier.id}</Text>
                            </CourierInfoText>
                        </Courier>
                    </Col>

                    <CourierBoxContainer xl={12} lg={14} md={24}>
                        <StatusButton text={courier.approval_status} />  
                        <Button >
                            Send Reminder
                        </Button>
                        <Button danger>Delete</Button>

                    </CourierBoxContainer>
                </Row>
            ))}
        </Card>
    );

    return (
        <>
            <Space size={20} direction="vertical" style={{ width: "100%" }}>
                {renderOrderSteps()}
                {renderCourierInfo()}
                {renderPdf()}
            </Space>
           {/*} {renderDeliverables()} */}
        </>
    );
};
