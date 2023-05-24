import { lazy } from "react";
const Navbar = lazy(() => import("../../components/Navbar"));
const Table = lazy(() => import("../../components/Table"));

const View = () => {
  return (
    <>
      <Navbar />
      <Table />
    </>
  );
};

export default View;
