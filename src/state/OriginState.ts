import BaseState from "./BaseState";

export default class OriginState extends BaseState<H74_T.Coord> implements H74_T.Coord {
  private px: float = 0;
  private py: float = 0;

  get x(): float {
    return this.px;
  }

  set x(x: float) {
    if (Number.isFinite(x) && x >= 0 && x <= 1) {
      this.px = x;
    }
  }

  get y(): float {
    return this.py;
  }

  set y(y: float) {
    if (Number.isFinite(y) && y >= 0 && y <= 1) {
      this.py = y;
    }
  }

  public load(state: H74_T.Coord): void {
    if (state) {
      this.x = state.x;
      this.y = state.y;
    }
  }

  public toString(): string {
    return `${this.x * 100}% ${this.y * 100}%`;
  }
}
