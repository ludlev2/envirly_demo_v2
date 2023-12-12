import { useTranslate, useNavigation } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";
import {
    Typography,
    List as AntdList,
    Tooltip,
    ConfigProvider,
    theme,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IOrder } from "../../../interfaces";
import {
    TimelineContent,
    CreatedAt,
    Number,
    Timeline,
    TimelineItem,
} from "./styled";

dayjs.extend(relativeTime);

const { Text } = Typography;

export const GrantTimeline: React.FC = ({events}) => {
    const t = useTranslate();
    const { show } = useNavigation();

    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 6,
        },
        syncWithLocation: false,
    });

    const { dataSource } = listProps;

    const { Text } = Typography;
        // Function to map status string to color and background
        const getStatusColor = (date) => {
            const eventDate = new Date(date);
            const today = new Date();


            if (eventDate < today) {
                return { color: 'green', backgroundColor: '#50F461' };
            } else {
                return { color: 'cyan', backgroundColor: '#e6f7ff' };
            }

            
        };

        return (
            <Timeline>
                {events.map(event => {
                    const { color, backgroundColor } = getStatusColor(event.date);
                    return (
                        <TimelineItem key={event.date} color={color}>
                            <TimelineContent backgroundColor={backgroundColor}>
                                <CreatedAt italic>
                                    {dayjs(event.date).fromNow()}
                                </CreatedAt>
                                <Text>{event.status}</Text>
                                {/* If you have an order number or ID, you can include it here */}
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        );
    };
