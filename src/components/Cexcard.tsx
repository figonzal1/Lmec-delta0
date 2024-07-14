import { IconType } from "react-icons";
import { MdDone } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";

const Cexcard = ({
  name,
  description,
  logo,
  Icon,
}: {
  name: string;
  description: string;
  logo: string;
  Icon: IconType;
}) => {
  return (
    <div className="rounded-xl border-[1px] border-gray-300">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt=""
            className="bg-green-400/35 rounded-lg border-[2px] border-gray-400 h-10"
          />

          <button
            onClick={() => {
              console.log("gola");
            }}
            className="rounded-lg  bg-green-300/45 text-green-600 font-semibold px-2 py-1"
          >
            <div className="flex justify-center items-center gap-1">
              <MdDone size={18} />
              <h2 className="text-sm">Connected</h2>
            </div>
          </button>

          <button
            onClick={() => {
              console.log("gola");
            }}
            className="rounded-lg border-opacity-10 border-[1px] font-semibold px-2 py-1"
          >
            <div className="flex justify-center items-center gap-1">
              <TbPlugConnected size={18} />
              <h2 className="text-sm">Connect</h2>
            </div>
          </button>
        </div>
        <h3 className="font-bold text-xl my-3">{name}</h3>
        <p className="text-xs font-thin">{description}</p>
      </div>
    </div>
  );
};

export default Cexcard;
