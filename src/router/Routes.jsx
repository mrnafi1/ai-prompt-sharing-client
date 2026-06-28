import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/Home/Home";
import AllPrompts from "../pages/AllPrompts/AllPrompts";
import PromptDetails from "../pages/PromptDetails/PromptDetails";
import Payment from "../pages/Payment/Payment";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";

import Profile from "../pages/Dashboard/User/Profile";
import AddPrompt from "../pages/Dashboard/User/AddPrompt";
import MyPrompts from "../pages/Dashboard/User/MyPrompts";
import SavedPrompts from "../pages/Dashboard/User/SavedPrompts";
import MyReviews from "../pages/Dashboard/User/MyReviews";

import CreatorHome from "../pages/Dashboard/Creator/CreatorHome";
import CreatorAddPrompt from "../pages/Dashboard/Creator/CreatorAddPrompt";
import CreatorMyPrompts from "../pages/Dashboard/Creator/CreatorMyPrompts";

import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminAllPrompts from "../pages/Dashboard/Admin/AdminAllPrompts";
import AllPayments from "../pages/Dashboard/Admin/AllPayments";
import ReportedPrompts from "../pages/Dashboard/Admin/ReportedPrompts";
import AdminAnalytics from "../pages/Dashboard/Admin/AdminAnalytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-prompts", element: <AllPrompts /> },
      {
        path: "prompt/:id",
        element: (
          <PrivateRoute>
            <PromptDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Profile /> },
      { path: "profile", element: <Profile /> },
      { path: "add-prompt", element: <AddPrompt /> },
      { path: "my-prompts", element: <MyPrompts /> },
      { path: "saved-prompts", element: <SavedPrompts /> },
      { path: "my-reviews", element: <MyReviews /> },

      {
        path: "creator-home",
        element: (
          <RoleRoute allowedRoles={["Creator", "Admin"]}>
            <CreatorHome />
          </RoleRoute>
        ),
      },
      {
        path: "creator-add-prompt",
        element: (
          <RoleRoute allowedRoles={["Creator", "Admin"]}>
            <CreatorAddPrompt />
          </RoleRoute>
        ),
      },
      {
        path: "creator-my-prompts",
        element: (
          <RoleRoute allowedRoles={["Creator", "Admin"]}>
            <CreatorMyPrompts />
          </RoleRoute>
        ),
      },

      {
        path: "all-users",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <AllUsers />
          </RoleRoute>
        ),
      },
      {
        path: "admin-all-prompts",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <AdminAllPrompts />
          </RoleRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <AllPayments />
          </RoleRoute>
        ),
      },
      {
        path: "reported-prompts",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <ReportedPrompts />
          </RoleRoute>
        ),
      },
      {
        path: "admin-analytics",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <AdminAnalytics />
          </RoleRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
