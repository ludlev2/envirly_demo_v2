import { Dayjs } from "dayjs";

export interface IOrderChart {
    count: number;
    status:
        | "waiting"
        | "approved"
        | "overdue"
        | "paid"
        | "could not be paid";
}

export interface IOrderTotalCount {
    total: number;
    totalDelivered: number;
}

export interface ISalesChart {
    date: string;
    title: "Order Count" | "Order Amount";
    value: number;
    value_2: number;
}

export interface IOrderStatus {
    id: number;
    text: "Pending Approval" | "Approved" | "Overdue" | "Paid" | "Cancelled" | "Invoice Received" | "Due Date" | "Live" | "Closed" | "Ending Soon";
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
    addresses: IAddress[];
}

export interface IIdentity {
    id: number;
    name: string;
    avatar: string;
}

export interface IAddress {
    text: string;
    coordinate: [string, string];
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IEvent {
    date: string;
    status: string;
}

export interface IStore {
    id: number;
    title: string;
    isActive: boolean;
    createdAt: string;
    address: IAddress;
    products: IProduct[];
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: string;
    gsm: string;
    createdAt: string;
    accountNumber: string;
    licensePlate: string;
    address: string;
    avatar: IFile[];
    store: IStore;
}
export interface IOrder {
    id: number;
    user: IUser;
    paymentTerms: string;
    dueDate: string;
    createdAt: string;
    products: IProduct[];
    status: IOrderStatus;
    adress: IAddress;
    store: IStore;
    courier: ICourier;
    events: IEvent[];
    orderNumber: number;
    amount: number;
    couriers: ICourier[];

}

export interface IGrant {
    id: number;
    user: IUser;
    createdAt: string;
    products: IProduct;
    status: IOrderStatus;
    adress: IAddress;
    store: IStore;
    courier: ICourier;
    events: IEvent[];
    orderNumber: number;
    amount: number;
    couriers: ICourier;

}

export interface IGrantImage {
    url: string;
    name: string;
    status: string;
    type: string;
    uid: string;
}

export interface IGrantCategory {
    id: string;
}

export interface IGrantEvent {
    date: string;
    status: string;
}

export interface IGrant {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: IGrantImage[];
    createdAt: string;
    price: number;
    category: IGrantCategory;
    events: IGrantEvent[];
    orderNumber: number;
    gitAnalytics: IGrantImage[]; // Assuming gitAnalytics has the same structure as images
}


export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: IFile;
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}

export interface IOrderFilterVariables {
    q?: string;
    store?: string;
    user?: string;
    createdAt?: [Dayjs, Dayjs];
    status?: string;
}

export interface IUserFilterVariables {
    q: string;
    status: boolean;
    createdAt: [Dayjs, Dayjs];
    gender: string;
    isActive: boolean;
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
}

export interface IReview {
    id: number;
    order: IOrder;
    grant: IGrant;
    user: IUser;
    star: number;
    createDate: string;
    status: "pending" | "approved" | "rejected";
    comment: string[];
}
