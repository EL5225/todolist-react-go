import { lazy, useEffect, useState, UseState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const ContentLayout = lazy(() => import("../../layouts/ContentLayout"));

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
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentLayout>
      <form
        onSubmit={handleSubmit(EditTodo)}
        className="flex flex-col justify-center items-center gap-4 w-[90vw] md:w-auto mt-[30vh] shadow-md rounded-md border-2 p-8 "
      >
        <span className="font-bold">Editing</span>

        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            placeholder="todo name"
            className={` p-2 rounded-md w-[70vw] md:w-[40vw] hover:border shadow-sm  ${
              errors.name
                ? "bg-red-200 hover:border-red-600"
                : "bg-slate-100 hover:border-black"
            } `}
            {...register("name", {
              required: "Todo name field cannot empty",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "numbers are not allowed",
              },
              minLength: {
                value: 3,
                message: "minimum of 3 characters",
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
            placeholder="description"
            className={` p-2 rounded-md w-[70vw] md:w-[40vw] hover:border shadow-sm ${
              errors.note
                ? "bg-red-200 hover:border-red-600"
                : "bg-slate-100 hover:border-black"
            } `}
            {...register("note", {
              required: "Description field cannot empty",
              minLength: {
                value: 3,
                message: "minimum of 3 characters",
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
          disabled={isLoading}
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
      <Link to="/">
        <button className="mt-10 w-[20vw] md:w-[10vw] h-[7vh] md:h-[5vh] mb-9 rounded-2xl text-md font-semibold bg-slate-500 text-white hover:bg-slate-700 hover:text-slate-200">
          Back
        </button>
      </Link>
    </ContentLayout>
  );
};

export default Edit;
