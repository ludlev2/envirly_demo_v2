import { useEffect, useState } from "react";
import { useTranslate, useUpdate } from "@refinedev/core";
import {
    Action,
    createAction,
    Priority,
    useRegisterActions,
} from "@refinedev/kbar";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { IOrder } from "../../interfaces";

export const useOrderCustomKbarActions = (order?: IOrder): void => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const canAcceptOrder = order?.status.text === "Pending Approval";
    const canRejectOrder =
        order?.status.text === "Pending Approval" ||
        order?.status.text === "Approved" ||
        order?.status.text === "Overdue";

    const [actions, setActions] = useState<Action[]>([]);

    const handleMutate = (status: { id: number; text: string }) => {
        if (order) {
            mutate(
                {
                    resource: "orders",
                    id: order.id.toString(),
                    values: {
                        status,
                    },
                },
                {
                    onSuccess: () => setActions([]),
                },
            );
        }
    };

    useEffect(() => {
        const preActions: Action[] = [];
        if (canAcceptOrder) {
            preActions.push(
                createAction({
                    name: t("buttons.accept"),
                    icon: <CheckCircleOutlined />,
                    section: "actions",
                    perform: () => {
                        handleMutate({
                            id: 2,
                            text: "Approved",
                        });
                    },
                    priority: Priority.HIGH,
                }),
            );
        }
        if (canRejectOrder) {
            preActions.push(
                createAction({
                    name: t("buttons.reject"),
                    icon: <CloseCircleOutlined />,
                    section: "actions",
                    perform: () => {
                        handleMutate({
                            id: 5,
                            text: "Cancelled",
                        });
                    },
                    priority: Priority.HIGH,
                }),
            );
        }
        setActions(preActions);
    }, [order]);
    useRegisterActions(actions, [actions]);
};
