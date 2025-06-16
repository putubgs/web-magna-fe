import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const App = lazy(() => import("./App.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const BusinessUnit = lazy(() => import("./pages/BusinessUnit.tsx"));
const ComingSoon = lazy(() => import("./pages/ComingSoon.tsx"));
const Admin = lazy(() => import("./pages/admin/Admin.tsx"));

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/business-unit/:bu", element: <BusinessUnit /> },
  { path: "/coming-soon", element: <ComingSoon /> },
  { path: "/admin", element: <Admin /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
