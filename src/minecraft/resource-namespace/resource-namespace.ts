const validNamespaceRegex = /^[0-9a-z\_\-\.]+$/;

export class ResourceNamespace {
  public readonly namespace: string;

  constructor(namespace: string) {
    if (!ResourceNamespace.isValidFormat(namespace)) {
      throw new Error("invalid resource namespace format");
    }

    this.namespace = namespace;
  }

  private static isValidFormat(namespace: string): boolean {
    return validNamespaceRegex.test(namespace);
  }

  public toString(): string {
    return this.namespace;
  }

  public toJSON(): string {
    return this.toString();
  }
}
