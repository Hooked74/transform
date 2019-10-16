import { degToRad } from "../utils";
import BaseState from "./BaseState";

export default class SkewState extends BaseState<H74_T.Coord> implements H74_T.Coord {
  private px: float = 0;
  private py: number = 0;

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
    const x: float = degToRad(this.px);
    const y: float = degToRad(this.py);

    // prettier-ignore
    return [
      1,           Math.tan(x), 0,
      Math.tan(y), 1,           0,
      0, 					 0,           1
    ];
  }

  public load(state: H74_T.Coord): void {
    if (state) {
      this.x = state.x;
      this.y = state.y;
    }
  }

  public toString(): string {
    return `skew(${this.x}deg, ${this.y}deg)`;
  }
}
