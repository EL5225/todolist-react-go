import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Add = lazy(() => import("../pages/Add"));
const View = lazy(() => import("../pages/View"));
const Edit = lazy(() => import("../pages/Edit"));
// const Loading = lazy(() => import("../components/Loading"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<View />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        {/* <Route path="/loading" element={<Loading />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
