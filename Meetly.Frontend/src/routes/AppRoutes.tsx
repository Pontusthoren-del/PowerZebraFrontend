import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
