import { lazy, useEffect, useState, UseState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ContentLayout = lazy(() => import("../../layouts/ContentLayout"));
const Navbar = lazy(() => import("../../components/Navbar"));

const Edit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getDataId();
  }, []);

  const getDataId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/todos/get/${id}`
      );
      console.log(response.data.data);
      const res = await response.data.data;
      setValue("name", res.name);
      setValue("note", res.note);
      setValue("complete", res.complete);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      note: "",
      complete: true,
    },
    mode: "onBlur",
  });

  const EditTodo = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todos/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      setIsLoading(false);
      navigate("/view");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <ContentLayout>
        <form
          onSubmit={handleSubmit(EditTodo)}
          className="flex flex-col justify-center items-center gap-4 mb-24 shadow-md p-8 "
        >
          <h1 className="font-semibold text-6xl mb-5">Todo List</h1>
          <span className="font-bold">Editing</span>

          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              placeholder="masukan nama"
              className={` p-2 rounded-md w-[50vw] hover:border shadow-sm  ${
                errors.name
                  ? "bg-red-200 hover:border-red-600"
                  : "bg-slate-100 hover:border-black"
              } `}
              {...register("name", {
                required: "Nama harus diisi",
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "hanya bisa diisi alfabet",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-600 font-semibold">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Note */}
          <div className="flex flex-col">
            <label htmlFor="note"></label>
            <input
              type="text"
              id="note"
              placeholder="masukan note"
              className={` p-2 rounded-md w-[50vw] hover:border shadow-sm ${
                errors.note
                  ? "bg-red-200 hover:border-red-600"
                  : "bg-slate-100 hover:border-black"
              } `}
              {...register("note", {
                required: "Note harus diisi",
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "hanya bisa diisi alfabet",
                },
              })}
            />
            {errors.note && (
              <span className="text-red-600 font-semibold">
                {errors.note.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`mt-10 w-[20vw] md:w-[10vw] h-[5vh] rounded-2xl text-md font-semibold bg-green-500  text-white
              ${
                isLoading
                  ? "cursor-not-allowed bg-blue-200 text-slate-500"
                  : "hover:bg-green-700 hover:text-slate-200"
              } `}
          >
            {isLoading ? "Loading..." : "Edit"}
          </button>
        </form>
      </ContentLayout>
    </>
  );
};

export default Edit;
