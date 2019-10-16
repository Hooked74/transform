export default class TransformParser {
  private static transforms: Map<string, float[]> = new Map();

  public parseMatrix(transform: string): float[] {
    return this.parse(transform, "matrix");
  }

  public parse(transform: string, type: string): float[] {
    const transforms: Map<string, float[]> = TransformParser.transforms;
    const concatArgs: string = `${transform},${type}`;

    if (!transforms.has(concatArgs)) {
      transforms.set(
        concatArgs,
        transform
          .replace(new RegExp(`.*${type}\\(([^)]+)\\).*`), "$1")
          .split(",")
          .map((num: string) => parseFloat(num))
      );
    }
    return transforms.get(concatArgs);
  }
}
