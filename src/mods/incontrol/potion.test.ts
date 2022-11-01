import { ResourceLocation } from "../../minecraft";
import { InControlPotion } from "./potion";

describe("InControlPotion", () => {
  const validRL = new ResourceLocation("test:test");

  it("successfully creates held item", () => {
    expect(() => new InControlPotion(validRL, 0, 0)).not.toThrow();
    expect(() => new InControlPotion(validRL, 1, 1)).not.toThrow();
    expect(() => new InControlPotion(validRL, -1, -1)).not.toThrow();
    expect(() => new InControlPotion(validRL, 200, 200)).not.toThrow();
  });

  it("throws error if decimals are used", () => {
    expect(() => new InControlPotion(validRL, 1.1, 0)).toThrow();
    expect(() => new InControlPotion(validRL, 0, 1.1)).toThrow();
  });

  it("stringifies", () => {
    const item = new InControlPotion(validRL, 10, 22);
    const expected = `${validRL},10,22`;

    expect(String(item)).toBe(expected);
    expect(JSON.stringify(item)).toBe(JSON.stringify(expected));
  });
});
