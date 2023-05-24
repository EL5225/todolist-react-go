import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex w-full h-[8vh] px-6 font-semibold shadow-md justify-between">
      <div className="flex items-center">
        <Link
          to="/"
          className="border-b-white hover:border-b hover:border-b-black ease-in-out duration-300"
        >
          Add Todo
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          to="/view"
          className="border-b-white hover:border-b hover:border-b-black ease-in-out duration-300"
        >
          View Todo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
