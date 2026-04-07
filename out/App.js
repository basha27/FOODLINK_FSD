import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDash from "./pages/dashboards/AdminDashboard";
import DonorDash from "./pages/dashboards/DonorDashboard";
import AcceptorDash from "./pages/dashboards/AcceptorDashboard";
import AnalystDash from "./pages/dashboards/AnalystDashboard";
function App() {
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(AuthProvider, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { path: "/", element: /* @__PURE__ */ React.createElement(Landing, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/login/:role", element: /* @__PURE__ */ React.createElement(Login, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/dashboard", element: /* @__PURE__ */ React.createElement(DashboardLayout, null) }, /* @__PURE__ */ React.createElement(Route, { path: "admin", element: /* @__PURE__ */ React.createElement(AdminDash, null) }), /* @__PURE__ */ React.createElement(Route, { path: "donor", element: /* @__PURE__ */ React.createElement(DonorDash, null) }), /* @__PURE__ */ React.createElement(Route, { path: "acceptor", element: /* @__PURE__ */ React.createElement(AcceptorDash, null) }), /* @__PURE__ */ React.createElement(Route, { path: "analyst", element: /* @__PURE__ */ React.createElement(AnalystDash, null) })), /* @__PURE__ */ React.createElement(Route, { path: "*", element: /* @__PURE__ */ React.createElement(Navigate, { to: "/", replace: true }) }))));
}
export default App;
