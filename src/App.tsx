import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
    ShoppingOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import jsonServerDataProvider from "@refinedev/simple-rest";
import { authProvider } from "./authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
import { Welcome } from './pages/welcome';
import { useTranslation } from "react-i18next";
import { Header, Title, OffLayoutArea } from "./components";
import { ConfigProvider } from "./context";
import { useAutoLoginForDemo } from "./hooks";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    const { loading } = useAutoLoginForDemo();

    const API_URL = "http://localhost:3000";
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    if (loading) {
        return null;
    }

    return (
        <BrowserRouter>
            <ConfigProvider>
                <RefineKbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
                        authProvider={authProvider}
                        i18nProvider={i18nProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/",
                                meta: {
                                    label: "Dashboard",
                                    icon: <DashboardOutlined />,
                                },
                            },
                            {
                                name: "orders",
                                list: "/orders",
                                show: "/orders/show/:id",
                                meta: {
                                    icon: <ShoppingOutlined />,
                                },
                            },
                            
                           
                           
                        ]}
                    >
                        <Routes>
                            <Route path="/welcome" element={<Welcome />} />
                            {/*
                            <Route path="/grantManagement" element={<GrantManagement />} />
                            */}
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<DashboardPage />} />

                                <Route path="/orders">
                                    <Route index element={<OrderList />} />
                                    <Route
                                        path="show/:id"
                                        element={<OrderShow />}
                                    />
                                </Route>
                                {/*
                                <Route path="/users">
                                    <Route index element={<UserList />} />
                                    <Route
                                        path="show/:id"
                                        element={<UserShow />}
                                    />
                                </Route>
                                */}
                                {/*
                                <Route
                                    path="/products"
                                    element={<ProductList />}
                                />
                                */}
                                {/*
                                <Route path="/stores">
                                    <Route index element={<StoreList />} />
                                    <Route
                                        path="create"
                                        element={<StoreCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<StoreEdit />}
                                    />
                                </Route>
                                */}

                                {/*
                                <Route
                                    path="/categories"
                                    element={<CategoryList />}
                                />
                                */}

                                {/*
                                <Route path="/couriers">
                                    <Route index element={<CourierList />} />
                                    <Route
                                        path="create"
                                        element={<CourierCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<CourierEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<CourierShow />}
                                    />
                                </Route>
                                
                                <Route
                                    path="/reviews"
                                    element={<ReviewsList />}
                                />
                                */}
                            </Route>
                                
                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="dashboard" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: "luca@web3.foundation",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <AuthPage
                                            type="register"
                                            formProps={{
                                                initialValues: {
                                                    email: "luca@web3.foundation",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />

                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
                                <Route
                                    path="/update-password"
                                    element={<AuthPage type="updatePassword" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </RefineKbarProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
