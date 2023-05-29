import { lazy } from "react";
import { Link } from "react-router-dom";
const Table = lazy(() => import("../../components/Table"));

const View = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-center font-semibold text-6xl mb-[5vh] mt-[10vh] ">
        Todo List
      </h1>
      <Table />
      <div className="flex justify-center">
        <Link to="/add">
          <button className="mt-10 w-[20vw] md:w-[10vw] h-[7vh] md:h-[5vh] mb-9 rounded-2xl text-md font-semibold bg-green-500 text-white hover:bg-green-700 hover:text-slate-200">
            Add Todo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default View;
