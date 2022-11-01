import { ResourceNamespace } from "./resource-namespace";

describe("ResourceNamespace", () => {
  it("successfully creates namespace if valid", () => {
    expect(() => new ResourceNamespace("test")).not.toThrow();
    expect(() => new ResourceNamespace("te-st")).not.toThrow();
    expect(() => new ResourceNamespace("te_st")).not.toThrow();
  });

  it("throws error if it has uppercase characters", () => {
    expect(() => new ResourceNamespace("Test")).toThrow();
  });

  it("throws error if it has / character", () => {
    expect(() => new ResourceNamespace("te/st")).toThrow();
    expect(() => new ResourceNamespace("/test")).toThrow();
    expect(() => new ResourceNamespace("test/")).toThrow();
  });

  it("throws error if it has : character", () => {
    expect(() => new ResourceNamespace("te:st")).toThrow();
    expect(() => new ResourceNamespace(":test")).toThrow();
    expect(() => new ResourceNamespace("test:")).toThrow();
  });

  it("throws error if empty", () => {
    expect(() => new ResourceNamespace("")).toThrow();
  });
});
