import { ResourceLocation } from "../../minecraft";

export class InControlPotion {
  private resource: ResourceLocation;
  private duration: number;
  private amplifier: number;

  /**
   *
   * @param resource The resource location of the potion
   * @param duration The amount of time in seconds
   * @param amplifier The level of the effect
   */
  constructor(resource: ResourceLocation, duration: number, amplifier: number) {
    if (duration % 1 !== 0) {
      throw new Error("invalid duration");
    }

    if (amplifier % 1 !== 0) {
      throw new Error("invalid amplifier");
    }

    this.resource = resource;
    this.duration = duration;
    this.amplifier = amplifier;
  }

  public toString(): string {
    return `${this.resource},${this.duration},${this.amplifier}`;
  }

  public toJSON(): string {
    return this.toString();
  }
}
