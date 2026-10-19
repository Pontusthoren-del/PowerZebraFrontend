import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MeetupDetailsPage from "../pages/MeetupDetailsPage";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="meetups/:id" element={<MeetupDetailsPage/>} /> 
      </Route>
    </Routes>
  );
}
