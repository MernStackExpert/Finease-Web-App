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
          const res = await fetch(
            `https://asigement-server.vercel.app/transactions/${params.id}`
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
          const res = await fetch(
            `https://asigement-server.vercel.app/transactions/${params.id}`
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
    path:"*",
    element:<NotFound></NotFound>
  }
]);
