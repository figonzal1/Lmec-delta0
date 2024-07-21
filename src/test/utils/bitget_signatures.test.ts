import BitgetService from "../../utils/bitget_signatures";

describe("parseUrlPath function", () => {
  const bitgetService = new BitgetService();

  it("parse de url sin query strings", () => {
    const url = "https://www.cexapi.com/api/v2/service";
    const expectedResult = {
      queryString: "",
      requestPath: "/api/v2/service",
    };
    expect(bitgetService['parseUrlPath'](url)).toEqual(expectedResult);
  });

  it("parseo de url con multiples query strings", () => {
    const url =
      "https://www.cexapi.com/api/v2/service?hola=123&adios=12312&foo=bar";

    const expectedResult = {
      queryString: "hola=123&adios=12312&foo=bar",
      requestPath: "/api/v2/service",
    };

    expect(bitgetService['parseUrlPath'](url)).toEqual(expectedResult);
  });

  it("parseo de url con multiples query strings y caracteres especiales", () => {
    const url =
      "https://www.cexapi.com/api/v2/service?hola=123&adios=12312&foo=bar%20baz";

    const expectedResult = {
      queryString: "hola=123&adios=12312&foo=bar%20baz",
      requestPath: "/api/v2/service",
    };

    expect(bitgetService['parseUrlPath'](url)).toEqual(expectedResult);
  });

  it("parseo de url con multiples query strings y numeros", () => {
    const url =
      "https://www.cexapi.com/api/v2/service?hola=123&adios=12312&foo=12345";

    const expectedResult = {
      queryString: "hola=123&adios=12312&foo=12345",
      requestPath: "/api/v2/service",
    };

    expect(bitgetService['parseUrlPath'](url)).toEqual(expectedResult);
  });
});