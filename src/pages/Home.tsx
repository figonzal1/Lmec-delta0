// Home.js

import { useEffect } from "react";
import BitgetService from "../utils/bitget_signatures";
import { RequestMethod } from "../utils/enum";
const Home = () => {
  useEffect(() => {
    const bitgetService = new BitgetService();

    async function call() {
      const { digest, timestamp } = await bitgetService.buildDigest(
        RequestMethod.GET,
        "https://api.bitget.com/api/v2/account/funding-assets"
      );
      console.log("Digest: ", digest);
      console.log("Timestamp: ", timestamp);
    }

    call();
  }, []);

  return <h1>Home</h1>;
};
export default Home;
