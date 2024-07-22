import { appDataDir } from "@tauri-apps/api/path";
import { Client, Stronghold } from "@tauri-apps/plugin-stronghold";

const initStronghold = async () => {
  const vaultPath = `${await appDataDir()}/vault.hold`;

  console.log("Initializing stronghold...");
  console.log(vaultPath);
  const vaultPassword = "48dpswx45kfiga";
  const stronghold = await Stronghold.load(vaultPath, vaultPassword);

  let client: Client;
  const clientName = "name your client";
  try {
    client = await stronghold.loadClient(clientName);
  } catch {
    client = await stronghold.createClient(clientName);
  }

  return {
    stronghold,
    client,
  };
};

// Insert a record to the store
async function insertRecord(store: any, key: string, value: string) {
  const data = Array.from(new TextEncoder().encode(value));
  await store.insert(key, data);
}

// Read a record from store
async function getRecord(store: any, key: string): Promise<string> {
  const data = await store.get(key);
  return new TextDecoder().decode(new Uint8Array(data));
}

export { initStronghold, insertRecord, getRecord };
