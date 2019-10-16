import { degToRad } from "../utils";
import BaseState from "./BaseState";

export default class RotateState extends BaseState<H74_T.Rotate> implements H74_T.Rotate {
  private pangle: float = 0;

  get angle(): float {
    return this.pangle;
  }

  set angle(angle: float) {
    if (Number.isFinite(angle)) {
      this.pangle = angle;
    }
  }

  get matrix(): float[] {
    const angle: float = degToRad(this.pangle);

    // prettier-ignore
    return [
      Math.cos(angle), -Math.sin(angle), 0,
      Math.sin(angle), Math.cos(angle),  0,
      0, 					     0,                1
    ];
  }

  public load(state: H74_T.Rotate): void {
    if (state) {
      this.angle = state.angle;
    }
  }

  public toString(): string {
    return `rotate(${this.angle}deg)`;
  }
}
