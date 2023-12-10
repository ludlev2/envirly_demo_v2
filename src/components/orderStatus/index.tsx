import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type OrderStatusProps = {
    status: "Pending Approval" | "Approved" | "Overdue" | "Paid" | "Cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;

    switch (status) {
        case "Pending Approval":
            color = "orange";
            break;
        case "Approved":
            color = "cyan";
            break;
        case "Overdue":
            color = "blue";
            break;
        case "Paid":
            color = "green";
            break;
        case "Cancelled":
            color = "red";
            break;
    }

    return <Tag color={color}>{t(`enum.orderStatuses.${status}`)}</Tag>;
};
