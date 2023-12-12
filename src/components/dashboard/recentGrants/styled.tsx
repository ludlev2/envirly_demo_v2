import styled from "@emotion/styled";
import { NumberField } from "@refinedev/antd";
import { Table, Typography } from "antd";

import { IOrder } from "../../../interfaces";

export const RecentOrdersColumn = styled(Table.Column<IOrder>)`
    vertical-align: top;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled(Typography.Text)`
    font-size: 12px;
    word-break: inherit;
`;

export const OrderId = styled(Typography.Text)`
    cursor: pointer;
    font-size: 10px;
`;

export const Price = styled(NumberField)`
    white-space: nowrap;
    font-size: 12px;
`;
