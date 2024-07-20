import { RequestMethod } from "./enum";
import { invoke } from "@tauri-apps/api/core";

class BitgetService {
  async buildDigest(method: RequestMethod, url: string) {
    const { preDigest, timestamp } = this.buildPreDigest(method, url);

    const key = "bg_c6ceb999d2e94ec769595f5b02f8c73b";

    let digest = "";
    try {
      digest = await invoke<string>("generate_hmac", { key, preDigest });
    } catch (error) {
      console.error("Error generating HMAC: ", error);
    }

    return {
      digest: digest,
      timestamp: timestamp,
    };
    /*const textEncoder = new TextEncoder();

    const data = textEncoder.encode(preDigest);
    const accessSecret = "your_access_secret";
    const keyData = textEncoder.encode(accessSecret);

    // Importar la clave para HMAC
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Generar el HMAC
    const signature = await crypto.subtle.sign("HMAC", key, data);

    // Convertir el resultado a base64
    const digestArray = Array.from(new Uint8Array(signature));
    const base64Digest = btoa(String.fromCharCode(...digestArray));

    console.log("Digest: ", base64Digest);

    return base64Digest;*/
  }

  private buildPreDigest(method: RequestMethod, url: string) {
    url = "https://api.bitget.com/api/v2/account/funding-assets";

    let { queryString, requestPath } = this.parseUrlPath(url);

    let methodUpperCase: string = method.toUpperCase();
    let timestamp = Math.round(new Date().getTime());

    let preDigest = "";

    if (queryString != "") {
      preDigest = timestamp + methodUpperCase + requestPath + queryString;
    } else {
      //console.log("Query string empty");
      preDigest = timestamp + methodUpperCase + requestPath;
    }

    //console.log("Predigest: ", preDigest);
    return { preDigest, timestamp };
  }

  /**
   * Función para extraer el requestPath y el queryString de la url enviada por parametro
   * @param url Url a analizar
   * @returns { queryString: string, requestPath: string } Objeto con la información extraída del request
   */
  private parseUrlPath(url: string): {
    queryString: string;
    requestPath: string;
  } {
    let requestPath = "";
    let queryString = "";

    const apiIndex = url.indexOf("/api/v2");
    const queryIndex = url.indexOf("?", apiIndex);

    if (queryIndex != -1) {
      requestPath = url.substring(apiIndex, queryIndex);
      queryString = url.substring(queryIndex + 1);

      //console.log("[Url parsing] Query string:", queryString);
    } else {
      requestPath = url.substring(apiIndex);
    }
    //console.log("[Url parsing] Request path:", requestPath);
    return { queryString, requestPath };
  }
}

export default BitgetService;
