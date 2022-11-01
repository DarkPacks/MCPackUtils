const validIDRegex = /^[0-9a-z\_\-\.]+:[0-9a-z\_\-\.\/]+$/;

export class ResourceLocation {
  public readonly id: string;

  constructor(id: string) {
    if (!ResourceLocation.isValidFormat(id)) {
      throw new Error("invalid resource ID format");
    }

    this.id = id;
  }

  private static isValidFormat(id: string): boolean {
    return validIDRegex.test(id);
  }

  public toString(): string {
    return this.id;
  }

  public toJSON(): string {
    return this.toString();
  }
}
