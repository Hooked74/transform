import { MatrixState, MatrixStateUnion } from "./state";
import { roundTo } from "./utils";

export default class MatrixGenerator {
  private static matrices: Map<string, string> = new Map();

  public generate(matrixState: MatrixState, transformOrder: Array<keyof MatrixState>): string {
    const { matrices }: typeof MatrixGenerator = MatrixGenerator;
    const transform: string = Object.values(matrixState).reduce(
      (accum: string, state: MatrixStateUnion) => (accum += state),
      `${transformOrder};`
    );

    if (!matrices.has(transform)) {
      const digits: int = 5;
      const matrix: float[] = this.generateTransformMatrix(matrixState, transformOrder);
      const a: float = roundTo(matrix[0], digits);
      const b: float = roundTo(matrix[3], digits);
      const c: float = roundTo(matrix[1], digits);
      const d: float = roundTo(matrix[4], digits);
      const tx: float = roundTo(matrix[2], digits);
      const ty: float = roundTo(matrix[5], digits);

      matrices.set(transform, `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`);
    }

    return matrices.get(transform);
  }

  private generateTransformMatrix(
    matrixState: MatrixState,
    transformOrder: Array<keyof MatrixState>
  ): float[] {
    return transformOrder.reduce(
      (inputMatrix: float[], key: keyof MatrixState): float[] =>
        inputMatrix
          ? this.multiplyMatrices(inputMatrix, matrixState[key].matrix)
          : matrixState[key].matrix,
      null
    );
  }

  // prettier-ignore
  private multiplyMatrices(matrixA: float[], matrixB: float[]): float[] {
    const row0:float[] = [matrixB[0], matrixB[1], matrixB[2]];
    const row1:float[] = [matrixB[3], matrixB[4], matrixB[5]];
    const row2:float[] = [matrixB[6], matrixB[7], matrixB[8]];

    const result0:float[] = this.multiplyMatrixAndVector(matrixA, row0);
    const result1:float[] = this.multiplyMatrixAndVector(matrixA, row1);
    const result2:float[] = this.multiplyMatrixAndVector(matrixA, row2);

    return [
      result0[0], result0[1], result0[2],
      result1[0], result1[1], result1[2],
      result2[0], result2[1], result2[2]
    ];
  }

  // prettier-ignore
  private multiplyMatrixAndVector(matrix: float[], vector: float[]): float[] {
    const c0r0:float = matrix[0], c1r0:float = matrix[1], c2r0:float = matrix[2];
    const c0r1:float = matrix[3], c1r1:float = matrix[4], c2r1:float = matrix[5];
    const c0r2:float = matrix[6], c1r2:float = matrix[7], c2r2:float = matrix[8];

    const x:float = vector[0];
    const y:float = vector[1];
    const z:float = vector[2];

    const resultX:float = (x * c0r0) + (y * c0r1) + (z * c0r2);
    const resultY:float = (x * c1r0) + (y * c1r1) + (z * c1r2);
    const resultW:float = (x * c2r0) + (y * c2r1) + (z * c2r2);

    return [resultX, resultY, resultW];
  }
}
