import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivetRoute from "./PrivetRoute";
import MyTransaction from "../Pages/MyTransaction";
import AddTransaction from "../Pages/AddTransaction";
import Reports from "../Pages/Reports";
import TransactionDetails from "../Pages/TransactionDetails";
import UpdateTransaction from "../Pages/UpdateTransaction";
import MyProfile from "../Pages/MyProfile";
import NotFound from "../Pages/NotFound";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashbord/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/my-transaction",
        element: (
          <PrivetRoute>
            <MyTransaction></MyTransaction>
          </PrivetRoute>
        ),
      },
      {
        path: "/add-transaction",
        element: (
          <PrivetRoute>
            <AddTransaction></AddTransaction>
          </PrivetRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivetRoute>
            <Reports></Reports>
          </PrivetRoute>
        ),
      },
      {
        path: "/transaction-detailes/:id",
        element: (
          <PrivetRoute>
            <TransactionDetails></TransactionDetails>
          </PrivetRoute>
        ),
        loader: async ({ params }) => {
          const token = localStorage.getItem("access-token");
          const res = await fetch(
            `https://asigement-server.vercel.apptransactions/${params.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Response("Transaction not found", { status: 404 });
          }
          return res.json();
        },
      },
      {
        path: "/update-transaction/:id",
        element: (
          <PrivetRoute>
            <UpdateTransaction></UpdateTransaction>
          </PrivetRoute>
        ),
        loader: async ({ params }) => {
          const token = localStorage.getItem("access-token");
          const res = await fetch(
            `https://asigement-server.vercel.apptransactions/${params.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) {
            throw new Response("Transaction not found", { status: 404 });
          }
          return res.json();
        },
      },
      {
        path: "/my-profile",
        element: (
          <PrivetRoute>
            <MyProfile></MyProfile>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-transaction", element: <AddTransaction /> },
      { path: "my-transaction", element: <MyTransaction /> },
      { path: "reports", element: <Reports /> },
      { path: "profile", element: <MyProfile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
