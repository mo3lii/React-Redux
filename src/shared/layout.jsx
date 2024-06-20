import { Outlet } from "react-router-dom";
import MyNav from "../components/MyNav";

export default function Layout() {
  return (
    <>
      <MyNav />
      <div className="container mt-3">
        <Outlet></Outlet>
      </div>
    </>
  );
}
