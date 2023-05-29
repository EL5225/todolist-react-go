import { lazy, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ContentLayout = lazy(() => import("../../layouts/ContentLayout"));

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/todos/get");
      console.log(response);
      setData(response.data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/delete/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentLayout>
      <div className="w-[90vw] max-h-[85vh]  md:max-h-[60vh] rounded-lg overflow-y-auto shadow-lg ">
        <div className="overflow-x-auto w-full">
          <table className="text-md font-semibold w-full text-center">
            <thead className="bg-green-500">
              <tr className="tracking-wide ">
                <th className="p-4">Todo Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Created at</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {data.map((data) => (
                <tr key={data.id}>
                  <td className="border-r p-5 border-white">{data.name}</td>
                  <td className="border-r p-5 border-white">{data.note}</td>
                  <td className="border-r p-5 border-white">
                    {new Date(data.created_at).toLocaleTimeString([], {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="flex p-5 justify-center items-center">
                    <div className="flex justify-between w-52 p-2">
                      <Link
                        to={`/edit/${data.id}`}
                        className="bg-blue-500 rounded-md  hover:bg-blue-600 py-2 px-6  hover:text-slate-200"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 rounded-md  hover:bg-red-600 py-2 px-6  hover:text-slate-200"
                        onClick={() => deleteData(data.id)}
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Table;
