import { appDataDir } from "@tauri-apps/api/path";
import { Client, Store, Stronghold } from "@tauri-apps/plugin-stronghold";

export class SecretVault {
  private stronghold?: Stronghold;
  private client?: Client;
  private store?: Store;

  private readonly clientName = "LMEC_VAULT";
  private readonly vaultPassword = "48dpswx45kfiga";

  public async init() {
    console.log("Initializing secret vault...");

    const vaultPath = `${await appDataDir()}/vault.hold`;
    console.log("Vault path: ", vaultPath);
    this.stronghold = await Stronghold.load(vaultPath, this.vaultPassword);

    await this.createClient();
  }

  private async createClient() {
    if (this.client) {
      this.client = await this.stronghold!.loadClient(this.clientName);
    } else {
      this.client = await this.stronghold!.createClient(this.clientName);
    }

    this.store = this.client?.getStore();
  }

  public async insertRecord(key: string, value: string) {
    if (this.store) {
      const data = Array.from(new TextEncoder().encode(value));

      await this.store.insert(key, data);

      // Save data to database
      await this.stronghold!.save();
    }
  }

  public async getRecord(key: string) {
    if (this.store) {
      const data = await this.store!.get(key);

      if (data != null) {
        return new TextDecoder().decode(new Uint8Array(data));
      } else {
        console.error(`No record found for key: ${key}`);
        return null;
      }
    } else {
      console.error("No store available");
      return null;
    }
  }
}
