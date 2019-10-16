import OriginState from "./OriginState";
import RotateState from "./RotateState";
import ScaleState from "./ScaleState";
import SkewState from "./SkewState";
import StateFactory from "./StateFactory";
import StateManager from "./StateManager";
import TranslateState from "./TranslateState";

export interface TransformState extends MatrixState {
  origin: OriginState;
}
export interface MatrixState {
  rotate: RotateState;
  scale: ScaleState;
  skew: SkewState;
  translate: TranslateState;
}
export type TransformStateUnion = TransformState[keyof TransformState];
export type MatrixStateUnion = MatrixState[keyof MatrixState];

export { OriginState, RotateState, ScaleState, SkewState, TranslateState, StateFactory };
export default StateManager;
