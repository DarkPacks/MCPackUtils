import { ResourceLocation } from "../../minecraft";
import { InControlHeldItem } from "./held-item";

describe("InControlHeldItem", () => {
  const validRL = new ResourceLocation("test:test");

  it("successfully creates held item", () => {
    expect(() => new InControlHeldItem(validRL)).not.toThrow();
    expect(() => new InControlHeldItem(validRL, -1)).not.toThrow();
    expect(() => new InControlHeldItem(validRL, 1)).not.toThrow();
    expect(() => new InControlHeldItem(validRL, 225)).not.toThrow();
  });

  it("throws error if weight is decimal", () => {
    expect(() => new InControlHeldItem(validRL, 1.1)).toThrow();
    expect(() => new InControlHeldItem(validRL, 0.1)).toThrow();
    expect(() => new InControlHeldItem(validRL, -2.1)).toThrow();
  });

  describe("stringifies", () => {
    it("without weight", () => {
      const item = new InControlHeldItem(validRL);

      expect(String(item)).toBe(String(validRL));
      expect(JSON.stringify(item)).toBe(JSON.stringify(validRL));
    });

    it("with weight", () => {
      const weight = 2;
      const item = new InControlHeldItem(validRL, weight);
      const expected = `${weight}=${validRL}`;

      expect(String(item)).toBe(expected);
      expect(JSON.stringify(item)).toBe(JSON.stringify(expected));
    });
  });
});
