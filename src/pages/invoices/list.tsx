import { useState } from "react";
import { useModal } from "@refinedev/core";
import {
    List,
    useTable,
    DateField,
    TagField,
    EmailField,
    DeleteButton,
    EditButton,
} from "@refinedev/antd";

import * as Icons from "@ant-design/icons";

import { Table, Space, Button, Modal } from "antd";

import { IInvoice, IMission } from "../../interfaces";
import { PdfLayout } from "../../components/pdf";

const { FilePdfOutlined } = Icons;

export const InvoiceList: React.FC = () => {
    const [record, setRecord] = useState<IInvoice>();

    const { tableProps } = useTable<IInvoice>({
        sorters: { initial: [{ field: "id", order: "desc" }] },
        meta: {
            populate: {
                contact: { populate: ["client"] },
                company: { populate: ["logo"] },
                missions: "*",
            },
        },
    });

    const { show, visible, close } = useModal();

    const hardCodedData = [
        {
            "id": "inv-001",
            "name": "Monthly Web Services",
            "date": "2023-12-01T00:00:00Z",
            "company": {
                "id": "comp-123",
                "name": "Web Solutions Inc.",
                "address": "1234 Internet Blvd, Tech City",
                "country": "Techland",
                "city": "Innovate",
                "email": "contact@websolutions.com",
                "website": "https://www.websolutions.com",
                "logo": {
                    "url": "https://www.websolutions.com/logo.png"
                }
            },
            "discount": 10,
            "tax": 7.5,
            "custom_id": "WSI-INV-123",
            "comments": "Thank you for your business!",
            "contact": {
                "id": "contact-789",
                "first_name": "John",
                "last_name": "Doe",
                "client": {
                    "id": "client-456",
                    "name": "Acme Corp."
                },
                "email": "john.doe@acmecorp.com"
            },
            "missions": [
                {
                    "id": "mission-001",
                    "mission": "Website Redesign",
                    "mission_description": "Complete overhaul of the corporate website.",
                    "day": 15,
                    "daily_rate": 500
                },
                {
                    "id": "mission-002",
                    "mission": "SEO Optimization",
                    "mission_description": "Search engine optimization for increased visibility.",
                    "day": 10,
                    "daily_rate": 300
                }
            ],
            "status": {
                "status": "No Paid"
            }
        }
    ];

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column<IInvoice>
                        dataIndex="name"
                        title="Report Name"
                        render={(_, record) => {
                            return `${record.id}${record?.name}`;
                        }}
                    />
                    <Table.Column<IInvoice>
                        dataIndex="date"
                        title="Date"
                        render={(value) => (
                            <DateField format="LL" value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex={["company", "name"]}
                        title="Type"
                    />
                    <Table.Column
                        dataIndex={"missions"}
                        title="Metric"
                        render={(value) => {
                            return value.map((item: IMission) => {
                                return (
                                    <TagField
                                        key={item?.id}
                                        color="blue"
                                        value={item?.mission}
                                    />
                                );
                            });
                        }}
                    />
                    

                    <Table.Column
                        dataIndex={["contact", "email"]}
                        title="Contact"
                        render={(value) => <EmailField value={value} />}
                    />
                    <Table.Column<IInvoice>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <EditButton
                                        hideText
                                        size="small"
                                        recordItemId={record?.id}
                                    />
                                    <DeleteButton
                                        hideText
                                        size="small"
                                        recordItemId={record?.id}
                                    />
                                    {record.company && (
                                        <Button
                                            size="small"
                                            icon={<FilePdfOutlined />}
                                            onClick={() => {
                                                setRecord(record);
                                                show();
                                            }}
                                        />
                                    )}
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
            <Modal visible={visible} onCancel={close} width="80%" footer={null}>
                {visible && (
                    <object
                        data={'~/images/invoices/investor_Report_example.pdf'}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    >
                        <p>Your browser does not support PDFs.
                            <a href={'~/images/invoices/investor_Report_example.pdf'}>Download the PDF</a> to view it.
                        </p>
                    </object>
                )}
            </Modal>
        </>
    );
};
