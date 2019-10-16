import StateManager, {
  MatrixState,
  RotateState,
  ScaleState,
  SkewState,
  TranslateState
} from "./state";

export default class TransformCalculator {
  public calculate(matrix: float[]): MatrixState {
    const matrixState: MatrixState = StateManager.createMatrixState();

    if (matrix.length > 0) {
      this.calculateRotate(matrix, matrixState.rotate);
      this.calculateScale(matrix, matrixState.scale);
      this.calculateSkew(matrix, matrixState.skew);
      this.calculateTranslate(matrix, matrixState.translate);
    }

    return matrixState;
  }

  private calculateRotate(matrix: float[], state: RotateState): void {
    state.angle = Math.round(Math.atan2(matrix[1], matrix[0]) / (Math.PI / 180));
  }

  private calculateScale(matrix: float[], state: ScaleState): void {
    state.x = Math.sqrt(matrix[0] ** 2 + matrix[1] ** 2);
    state.y = (matrix[0] * matrix[3] - matrix[2] * matrix[1]) / state.x;
  }

  private calculateSkew(matrix: float[], state: SkewState): void {
    state.x =
      Math.atan2(matrix[0] * matrix[2] + matrix[1] * matrix[3], matrix[0] ** 2 + matrix[1] ** 2) /
      (Math.PI / 180);
    state.y = 0;
  }

  private calculateTranslate(matrix: float[], state: TranslateState): void {
    state.x = matrix[4];
    state.y = matrix[5];
  }
}
