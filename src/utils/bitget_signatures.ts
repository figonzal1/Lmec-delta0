import { createHmac } from "crypto";
import { RequestMethod } from "./enum";

class BitgetService {
  buildDigest(preDigest: string) {
    const textEncoder = new TextEncoder();

    let bytes = textEncoder.encode(preDigest);

    var accessSecret = "your_access_secret";
    let key = textEncoder.encode(accessSecret);

    const hmac = createHmac("sha256", key);
    hmac.update(bytes);
    const digest = hmac.digest("base64");

    console.log("Digest: ", digest);

    return digest;
  }

  private buildPreDigest(method: RequestMethod, url: string): string {
    url = "https://api.bitget.com/api/v2/account/funding-assets";

    let { queryString, requestPath } = this.parseUrlPath(url);

    let methodUpperCase: string = method.toUpperCase();
    let timeStampt = Math.round(new Date().getTime());

    let preDigest = "";

    if (queryString != "") {
      preDigest = timeStampt + methodUpperCase + requestPath + queryString;
    } else {
      //console.log("Query string empty");
      preDigest = timeStampt + methodUpperCase + requestPath;
    }

    //console.log("Predigest: ", preDigest);
    return preDigest;
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
