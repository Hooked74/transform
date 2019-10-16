import MatrixGenerator from "./MatrixGenerator";
import StateManager, { MatrixState, OriginState } from "./state";
import TransformCalculator from "./TransformCalculator";
import TransformParser from "./TransformParser";
import { style } from "./utils";

export default class Transform implements H74_T.Style {
  private transformParser: TransformParser = new TransformParser();
  private transformCalculator: TransformCalculator = new TransformCalculator();
  private matrixGenerator: MatrixGenerator = new MatrixGenerator();
  private stateManager: StateManager = new StateManager();

  private options: H74_T.Options = Object.seal({
    transformOrder: ["skew", "scale", "rotate", "translate"]
  });

  constructor(private node: H74_T.Element, options?: H74_T.Options) {
    Object.assign(this.options, options);
    this.stateManager.attach(this.update);
    this.prepare();
  }

  get width(): float {
    return parseFloat(this.getStyleProperty("width"));
  }

  set width(width: float) {
    this.setStyleProperty("width", `${width}px`);
  }

  get height(): float {
    return parseFloat(this.getStyleProperty("height"));
  }

  set height(height: float) {
    this.setStyleProperty("height", `${height}px`);
  }

  get styleTransform(): string {
    return this.getStyleProperty("transform");
  }

  set styleTransform(transform: string) {
    this.setStyleProperty("transform", transform);
  }

  get styleTransformOrigin(): string {
    return (style(this.node, "transform-origin") as string) || "";
  }

  set styleTransformOrigin(origin: string) {
    style(this.node, "transform-origin", origin);
  }

  get rotate(): H74_T.Rotate {
    return this.stateManager.get("rotate");
  }

  set rotate(state: H74_T.Rotate) {
    this.stateManager.get("rotate").load(state);
  }

  get angle(): float {
    return this.stateManager.get("rotate").angle;
  }

  set angle(angle: float) {
    this.stateManager.get("rotate").angle = angle;
  }

  get scale(): H74_T.Coord {
    return this.stateManager.get("scale");
  }

  set scale(state: H74_T.Coord) {
    this.stateManager.get("scale").load(state);
  }

  get scaleX(): float {
    return this.stateManager.get("scale").x;
  }

  set scaleX(scaleX: float) {
    this.stateManager.get("scale").x = scaleX;
  }

  get scaleY(): float {
    return this.stateManager.get("scale").y;
  }

  set scaleY(scaleY: float) {
    this.stateManager.get("scale").y = scaleY;
  }

  get skew(): H74_T.Coord {
    return this.stateManager.get("skew");
  }

  set skew(state: H74_T.Coord) {
    this.stateManager.get("skew").load(state);
  }

  get skewX(): float {
    return this.stateManager.get("skew").x;
  }

  set skewX(skewX: float) {
    this.stateManager.get("skew").x = skewX;
  }

  get skewY(): float {
    return this.stateManager.get("skew").y;
  }

  set skewY(skewY: float) {
    this.stateManager.get("skew").y = skewY;
  }

  get translate(): H74_T.Coord {
    return this.stateManager.get("translate");
  }

  set translate(state: H74_T.Coord) {
    this.stateManager.get("translate").load(state);
  }

  get x(): float {
    return this.stateManager.get("translate").x;
  }

  set x(x: float) {
    this.stateManager.get("translate").x = x;
  }

  get y(): float {
    return this.stateManager.get("translate").y;
  }

  set y(y: float) {
    this.stateManager.get("translate").y = y;
  }

  get origin(): H74_T.Coord {
    return this.stateManager.get("origin");
  }

  set origin(state: H74_T.Coord) {
    this.stateManager.get("origin").load(state);
  }

  get originX(): float {
    return this.stateManager.get("origin").x;
  }

  set originX(originX: float) {
    this.stateManager.get("origin").x = originX;
  }

  get originY(): float {
    return this.stateManager.get("origin").y;
  }

  set originY(originY: float) {
    this.stateManager.get("origin").y = originY;
  }

  public getStyleProperty(property: string): string {
    return (
      (this.node.hasAttribute(property)
        ? this.node.getAttribute(property)
        : style(this.node, property)) || ""
    );
  }

  public setStyleProperty(property: string, value: string): void {
    if (this.node.hasAttribute(property) || this.node instanceof SVGElement) {
      this.node.setAttribute(property, value);
    } else {
      style(this.node, property, value);
    }
  }

  public update: Handler = (isOrigin: boolean) => {
    if (isOrigin) {
      this.styleTransformOrigin = this.stateManager.originState.toString();
    } else {
      this.styleTransform = this.matrixGenerator.generate(
        this.stateManager.matrixState,
        this.options.transformOrder
      );
    }
  };

  private prepare(): void {
    let matrixState: MatrixState;
    let originState: OriginState;
    const transform: string = this.styleTransform;
    const origin: string = this.styleTransformOrigin;

    if (transform !== "" && transform !== "none") {
      const matrix: float[] = this.transformParser.parseMatrix(transform);
      matrixState = this.transformCalculator.calculate(matrix);
    }

    if (origin !== "") {
      const [x, y]: float[] = origin.split(" ").map(parseFloat);
      originState = OriginState.from({ x: x / this.width, y: y / this.height });
    }

    this.stateManager.load(StateManager.collapseState(matrixState, originState));
  }
}
