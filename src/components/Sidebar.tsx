import { AiFillThunderbolt } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 flex flex-col items-center pt-10">
      <Link to="/home" className="text-white text-lg my-2 hover:text-gray-400">
        Home
      </Link>
      <Link
        to="/integrations"
        className="text-white text-lg my-2 hover:text-gray-400"
      >
        <AiFillThunderbolt size={32} />
      </Link>
    </div>
  );
};

export default Sidebar;
