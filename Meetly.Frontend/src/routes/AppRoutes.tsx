import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MeetupDetailsPage from "../pages/MeetupDetailsPage";
import Layout from "../components/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="meetups/:id" element={<MeetupDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
