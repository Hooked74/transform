import SinglePurposeEmitter from "@hooked74/single-purpose-emitter";
import {
  MatrixState,
  OriginState,
  RotateState,
  ScaleState,
  SkewState,
  StateFactory,
  TransformState,
  TransformStateUnion,
  TranslateState
} from ".";
import { omit } from "../utils";

export default class StateManager extends SinglePurposeEmitter
  implements H74_T.Loader<TransformState> {
  public static createMatrixState(onChange?: Handler): MatrixState {
    return {
      rotate: StateFactory.create(RotateState, onChange),
      scale: StateFactory.create(ScaleState, onChange),
      skew: StateFactory.create(SkewState, onChange),
      translate: StateFactory.create(TranslateState, onChange)
    };
  }

  public static createOriginState(onChange?: Handler): OriginState {
    return StateFactory.create(OriginState, onChange);
  }

  public static createTransformState(onChange?: Handler): TransformState {
    return StateManager.collapseState(
      StateManager.createMatrixState(onChange),
      StateManager.createOriginState(onChange)
    );
  }

  public static collapseState(matrixState: MatrixState, originState: OriginState): TransformState {
    return Object.assign({ origin: originState }, matrixState);
  }

  public transformState: TransformState = StateManager.createTransformState(
    (state: TransformStateUnion) => this.emit(state instanceof OriginState)
  );
  public matrixState: MatrixState = omit(this.transformState, ["origin"]) as MatrixState;
  public originState: OriginState = this.transformState.origin;

  public load(transformState: TransformState): void {
    const { rotate, scale, skew, translate, origin }: TransformState = this.transformState;

    rotate.load(transformState.rotate);
    scale.load(transformState.scale);
    skew.load(transformState.skew);
    translate.load(transformState.translate);
    origin.load(transformState.origin);
  }

  public get<T extends keyof TransformState>(stateName: T): TransformState[T] {
    return this.transformState[stateName];
  }
}
