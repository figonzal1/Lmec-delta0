// Home.js

import { useEffect, useState } from "react";
import BitgetService from "../utils/bitget_signatures";
import { RequestMethod } from "../utils/enum";
import { getRecord, initStronghold, insertRecord } from "./hola";
import { Button } from "@nextui-org/react";
const Home = () => {
  const [secretValue, setSecretValue] = useState("");

  useEffect(() => {
    /*const bitgetService = new BitgetService();

    async function call() {
      const { digest, timestamp } = await bitgetService.buildDigest(
        RequestMethod.GET,
        "https://api.bitget.com/api/v2/account/funding-assets"
      );
      console.log("Digest: ", digest);
      console.log("Timestamp: ", timestamp);
    }

    call();*/
  }, []);

  const saveValue = async () => {
    const { stronghold, client } = await initStronghold();

    await insertRecord(client.getStore(), "my_key", "secret||value");

    await stronghold.save();

    setSecretValue("secret||value");
  };

  useEffect(() => {
    async function fetchSecret() {
      try {
        const { stronghold, client } = await initStronghold();
        const store = client.getStore();

        // Lee el registro de la base de datos
        const value = await getRecord(store, "my_key");
        setSecretValue(value);
      } catch (error) {
        console.error("Error al interactuar con Stronghold:", error);
      }
    }

    fetchSecret();
  }, [secretValue]);

  return (
    <div>
      <p>Valor secreto almacenado: {secretValue}</p>
      <Button onPress={saveValue} />
    </div>
  );
};
export default Home;
