import { useState } from "react";
import { MdDone } from "react-icons/md";
import { TbPlugConnected, TbPlugConnectedX } from "react-icons/tb";

const Cexcard = ({
  name,
  description,
  logo,
}: {
  name: string;
  description: string;
  logo: string;
}) => {
  const [btnHover, setBtnHover] = useState(false);
  const [connected, setConnected] = useState(true);

  return (
    <div className="rounded-xl border-[1px] border-gray-300">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt=""
            className="bg-green-400/35 rounded-lg border-[2px] border-gray-400 h-10"
          />

          {connected ? (
            <button
              onClick={() => {
                console.log("gola");

                if (btnHover && connected) {
                  console.log("Desconectando ...");
                  setConnected(false);
                }
              }}
              onMouseEnter={() => {
                setBtnHover(true);
              }}
              onMouseLeave={() => {
                setBtnHover(false);
              }}
              className="rounded-lg  bg-green-300/45 text-green-600 font-semibold px-2 py-1 hover:bg-red-300/45 hover:text-red-600 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-center items-center gap-1">
                {btnHover ? (
                  <>
                    <TbPlugConnectedX size={18} />
                    <h2 className="text-sm">Disconnect</h2>
                  </>
                ) : (
                  <>
                    <MdDone size={18} />
                    <h2 className="text-sm">Connected</h2>
                  </>
                )}
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setConnected(true);
              }}
              className="rounded-lg border-opacity-10 border-[1px] font-semibold px-2 py-1"
            >
              <div className="flex justify-center items-center gap-1">
                <TbPlugConnected size={18} />
                <h2 className="text-sm">Connect</h2>
              </div>
            </button>
          )}
        </div>
        <h3 className="font-bold text-xl my-3">{name}</h3>
        <p className="text-xs font-thin">{description}</p>
      </div>
    </div>
  );
};

export default Cexcard;
