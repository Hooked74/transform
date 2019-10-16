import BaseState from "./BaseState";

export default class ScaleState extends BaseState<H74_T.Coord> implements H74_T.Coord {
  private px: float = 1;
  private py: float = 1;

  get x(): float {
    return this.px;
  }

  set x(x: float) {
    if (Number.isFinite(x) && x >= 0) {
      this.px = x;
    }
  }

  get y(): float {
    return this.py;
  }

  set y(y: float) {
    if (Number.isFinite(y) && y >= 0) {
      this.py = y;
    }
  }

  get matrix(): float[] {
    // prettier-ignore
    return [
      this.px, 0,        0,
      0,       this.py,  0,
      0,       0,        1
    ];
  }

  public load(state: H74_T.Coord): void {
    if (state) {
      this.x = state.x;
      this.y = state.y;
    }
  }

  public toString(): string {
    return `scale(${this.x}, ${this.y})`;
  }
}
