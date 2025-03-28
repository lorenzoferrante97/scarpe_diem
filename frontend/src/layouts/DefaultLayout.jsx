import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <section className="wrapper font-custom">
        <Outlet />
      </section>
    </>
  );
}
