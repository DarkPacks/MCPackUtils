import { ResourceLocation } from "../../minecraft";

export class InControlHeldItem {
  private resource: ResourceLocation;
  private weight?: number;

  /**
   *
   * @param resource The resource location of the potion
   * @param weight The weight this item should have over others in the list
   */
  constructor(resource: ResourceLocation, weight?: number) {
    if (weight !== undefined && weight % 1 !== 0) {
      throw new Error("invalid weight");
    }

    this.resource = resource;
    this.weight = weight;
  }

  public toString(): string {
    if (this.weight !== undefined) {
      return `${this.weight}=${this.resource}`;
    }

    return this.resource.toString();
  }

  public toJSON(): string {
    return this.toString();
  }
}
