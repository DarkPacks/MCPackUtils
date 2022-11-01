import { ResourceLocation } from "./resource-location";

describe("ResourceLocation", () => {
  it("successfully creates resource location if valid", () => {
    expect(() => new ResourceLocation("test:test")).not.toThrow();
    expect(() => new ResourceLocation("te-st:test")).not.toThrow();
    expect(() => new ResourceLocation("te_st:test")).not.toThrow();
    expect(() => new ResourceLocation("te-st:te-st")).not.toThrow();
    expect(() => new ResourceLocation("te_st:te_st")).not.toThrow();
    expect(() => new ResourceLocation("te_st:te-st")).not.toThrow();
    expect(() => new ResourceLocation("te-st:te_st")).not.toThrow();
    expect(() => new ResourceLocation("te-st:te/st")).not.toThrow();
  });

  it("stringifies", () => {
    const id = "test:test";
    const rl = new ResourceLocation(id);

    expect(JSON.stringify(rl)).toBe(JSON.stringify(id));
    expect(String(rl)).toBe(id);
  });

  it("throws error if path is missing", () => {
    expect(() => new ResourceLocation("test")).toThrow();
    expect(() => new ResourceLocation("test:")).toThrow();
  });

  it("throws error if namespace is missing", () => {
    expect(() => new ResourceLocation(":test")).toThrow();
  });

  it("throws error if empty", () => {
    expect(() => new ResourceLocation("")).toThrow();
    expect(() => new ResourceLocation(":")).toThrow();
  });

  it("throws error if namespace has / character", () => {
    expect(() => new ResourceLocation("te/st:test")).toThrow();
    expect(() => new ResourceLocation("/test:test")).toThrow();
    expect(() => new ResourceLocation("test/:test")).toThrow();
  });
});
