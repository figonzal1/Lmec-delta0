import { TbPlug, TbPlugConnected } from "react-icons/tb";
import Logo from "../assets/cex/bitget_logo.jpg";
import Cexcard from "../components/Cexcard";

const Integrations = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200/20 h-screen p-14">
      <h1 className="font-bold text-white text-3xl pb-10">Integraciones</h1>

      <div className="grid grid-cols-3 gap-6">
        <Cexcard
          name="Bitget"
          description="Plataforma de intercambio de criptoderivados que ofrece trading
          inteligente, copy trading y apalancamiento hasta 125x."
          Icon={TbPlugConnected}
          logo={Logo}
        />

        <div className="bg-white rounded-3xl">
          <h1>Card view</h1>
        </div>
        <div className="bg-white rounded-3xl">
          <h1>Card view</h1>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
