import {
  Button,
  Card,
  CardBody,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import { TbPlugConnected, TbPlugConnectedX, TbSettings } from "react-icons/tb";
import CexSecretsForm from "./form/CexSecretsForm";

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

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <CexSecretsForm isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      <Card className="max-w-80" shadow="sm" radius="lg">
        <CardBody className="p-5">
          <div className="flex justify-between items-start">
            <Image
              alt={`${name} logo`}
              height={48}
              width={48}
              radius="md"
              src={logo}
            />

            {connected ? (
              <>
                <div className="flex items-center gap-2">
                  <Button
                    radius="md"
                    variant="flat"
                    className="text-gray-400"
                    onPress={() => {
                      console.log("Settings button pressed");
                    }}
                    isIconOnly
                  >
                    <TbSettings size={24} />
                  </Button>
                  <Button
                    className="bg-green-300/45 text-green-600 hover:bg-red-300/45 hover:text-red-600"
                    radius="md"
                    variant="flat"
                    onPress={() => {
                      console.log("Settings button pressed");

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
                    startContent={
                      <>
                        {btnHover ? (
                          <TbPlugConnectedX size={18} />
                        ) : (
                          <MdDone size={18} />
                        )}
                      </>
                    }
                  >
                    <h2 className="text-sm">
                      {btnHover ? "Disconnect" : "Connected"}
                    </h2>
                  </Button>
                </div>
              </>
            ) : (
              <Button
                radius="md"
                variant="bordered"
                onPress={onOpen}
                startContent={<TbPlugConnected size={18} />}
              >
                <h2 className="text-sm">Connect</h2>
              </Button>
            )}
          </div>
          <h3 className="font-bold text-xl my-3">{name}</h3>
          <p className="text-xs font-thin">{description}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default Cexcard;
