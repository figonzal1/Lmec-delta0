// Home.js

import { useEffect } from "react";
import BitgetService from "../utils/bitget_signatures";
import { RequestMethod } from "../utils/enum";
import Database from "@tauri-apps/plugin-sql";
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

  useEffect(() => {
    const initDb = async () => {
      const db = await Database.load("sqlite:test.db");
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE
        );
      `);

      /*await db.execute("INSERT INTO users (name, email) VALUES (?,?)", [
        "John Doe",
        "email@example.com",
      ]);*/

      const results = await db.select("SELECT * FROM users");
      console.log(results);
    };

    initDb();
  }, []);

  return <h1>Home</h1>;
};
export default Home;
