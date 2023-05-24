import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const View = lazy(() => import("../pages/View"));
const Edit = lazy(() => import("../pages/Edit"));
// const Loading = lazy(() => import("../components/Loading"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/view" element={<View />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        {/* <Route path="/loading" element={<Loading />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
