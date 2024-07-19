// Home.js

import { useEffect } from "react";
import BitgetService from "../utils/bitget_signatures";
import { RequestMethod } from "../utils/enum";
const Home = () => {
  useEffect(() => {
    const bitgetService = new BitgetService();
    bitgetService.buildDigest(RequestMethod.GET);
  }, []);

  return <h1>Home</h1>;
};
export default Home;
