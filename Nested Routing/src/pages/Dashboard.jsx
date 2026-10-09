import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <nav>
        <a href="/dashboard/profile">Profile</a> | <a href="/dashboard/settings">Settings</a>
      </nav>
      <Outlet />
    </div>
  );
}