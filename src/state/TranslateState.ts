import BaseState from "./BaseState";

export default class TranslateState extends BaseState<H74_T.Coord> implements H74_T.Coord {
  private px: float = 0;
  private py: float = 0;

  get x(): float {
    return this.px;
  }

  set x(x: float) {
    if (Number.isFinite(x)) {
      this.px = x;
    }
  }

  get y(): float {
    return this.py;
  }

  set y(y: float) {
    if (Number.isFinite(y)) {
      this.py = y;
    }
  }

  get matrix(): float[] {
    // prettier-ignore
    return [
      1, 0, this.px,
      0, 1, this.py,
      0, 0, 1
    ];
  }

  public load(state: H74_T.Coord): void {
    if (state) {
      this.x = state.x;
      this.y = state.y;
    }
  }

  public toString(): string {
    return `translate(${this.x}px, ${this.y}px)`;
  }
}
