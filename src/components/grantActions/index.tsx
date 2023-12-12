import { useTranslate, useUpdate } from "@refinedev/core";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

import { IGrant } from "../../interfaces";

type GrantActionProps = {
    record: IGrant;
};

export const GrantActions: React.FC<GrantActionProps> = ({ record }) => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const moreMenu = (record: IGrant) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="activate"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                disabled={record.isActive}
                icon={
                    <CheckCircleOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    mutate({
                        resource: "grants",
                        id: record.id,
                        values: {
                            isActive: true,
                        },
                    });
                }}
            >
                {t("buttons.activate")}
            </Menu.Item>
            <Menu.Item
                key="deactivate"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <CloseCircleOutlined
                        style={{
                            color: "#EE2A1E",
                            fontSize: 17,
                        }}
                    />
                }
                disabled={!record.isActive}
                onClick={() =>
                    mutate({
                        resource: "grants",
                        id: record.id,
                        values: {
                            isActive: false,
                        },
                    })
                }
            >
                {t("buttons.deactivate")}
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
            <MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                    fontSize: 24,
                }}
            />
        </Dropdown>
    );
};