// tslint:disable:no-string-literal
import Transform from ".";
import MatrixGenerator from "./MatrixGenerator";
import { MatrixState } from "./state";

let transform: Transform;
let matrixState: MatrixState;
let matrixGenerator: MatrixGenerator;
let transformOrder: H74_T.TransformOrder;
const { number: num }: PickField<Faker.FakerStatic, "random"> = fakerStatic.random;
function rewriteVariables(matrix?: string, origin?: string): void {
  const node: HTMLDivElement = document.createElement("div");

  if (matrix) node.style.transform = matrix;
  if (origin) {
    node.style.transformOrigin = origin;
    node.style.width = "100px";
    node.style.height = "100px";
  }

  transform = new Transform(node);
  matrixState = transform["stateManager"].matrixState;
  matrixGenerator = transform["matrixGenerator"];
  transformOrder = transform["options"].transformOrder;
}

export default describe("Transform", () => {
  beforeEach(() => rewriteVariables());

  it("should return the same transformation after several iterations of parsing", () => {
    transform.rotate = { angle: num(360) };
    transform.scale = { x: num(10), y: num(10) };
    transform.skew = { x: num(90), y: num(90) };
    transform.translate = { x: num(20), y: num(20) };

    rewriteVariables(matrixGenerator.generate(matrixState, transformOrder));

    const angle: int = Math.round(transform.angle);
    const scaleX: int = Math.round(transform.scaleX);
    const scaleY: int = Math.round(transform.scaleY);
    const skewX: int = Math.round(transform.skewX);
    const skewY: int = Math.round(transform.skewY);
    const x: int = Math.round(transform.x);
    const y: int = Math.round(transform.y);

    rewriteVariables(matrixGenerator.generate(matrixState, transformOrder));

    expect(Math.round(transform.angle)).toBe(angle);
    expect(Math.round(transform.scaleX)).toBe(scaleX);
    expect(Math.round(transform.scaleY)).toBe(scaleY);
    expect(Math.round(transform.skewX)).toBe(skewX);
    expect(Math.round(transform.skewY)).toBe(skewY);
    expect(Math.round(transform.x)).toBe(x);
    expect(Math.round(transform.y)).toBe(y);
  });

  describe("should update transform of the element when", () => {
    it("the scale state changes completely", () => {
      const state1: H74_T.Coord = { x: num(100), y: num(100) };
      const state2: H74_T.Coord = { x: num(100), y: num(100) };

      transform.scale = state1;
      expect(transform.scale.toString()).toBe(`scale(${state1.x}, ${state1.y})`);
      expect(matrixState.scale.toString()).toBe(`scale(${state1.x}, ${state1.y})`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));

      transform.scaleX = state2.x;
      transform.scaleY = state2.y;
      expect(transform.scale.toString()).toBe(`scale(${state2.x}, ${state2.y})`);
      expect(matrixState.scale.toString()).toBe(`scale(${state2.x}, ${state2.y})`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));
    });

    it("the translate state changes completely", () => {
      const state1: H74_T.Coord = { x: num(100), y: num(100) };
      const state2: H74_T.Coord = { x: num(100), y: num(100) };

      transform.translate = state1;
      expect(transform.translate.toString()).toBe(`translate(${state1.x}px, ${state1.y}px)`);
      expect(matrixState.translate.toString()).toBe(`translate(${state1.x}px, ${state1.y}px)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));

      transform.x = state2.x;
      transform.y = state2.y;
      expect(transform.translate.toString()).toBe(`translate(${state2.x}px, ${state2.y}px)`);
      expect(matrixState.translate.toString()).toBe(`translate(${state2.x}px, ${state2.y}px)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));
    });

    it("the skew state changes completely", () => {
      const state1: H74_T.Coord = { x: num(90), y: num(90) };
      const state2: H74_T.Coord = { x: num(90), y: num(90) };

      transform.skew = state1;
      expect(transform.skew.toString()).toBe(`skew(${state1.x}deg, ${state1.y}deg)`);
      expect(matrixState.skew.toString()).toBe(`skew(${state1.x}deg, ${state1.y}deg)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));

      transform.skewX = state2.x;
      transform.skewY = state2.y;
      expect(transform.skew.toString()).toBe(`skew(${state2.x}deg, ${state2.y}deg)`);
      expect(matrixState.skew.toString()).toBe(`skew(${state2.x}deg, ${state2.y}deg)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));
    });

    it("the rotate state changes completely", () => {
      const state1: H74_T.Rotate = { angle: num(360) };
      const state2: H74_T.Rotate = { angle: num(360) };

      transform.rotate = state1;
      expect(transform.rotate.toString()).toBe(`rotate(${state1.angle}deg)`);
      expect(matrixState.rotate.toString()).toBe(`rotate(${state1.angle}deg)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));

      transform.angle = state2.angle;
      expect(transform.rotate.toString()).toBe(`rotate(${state2.angle}deg)`);
      expect(matrixState.rotate.toString()).toBe(`rotate(${state2.angle}deg)`);
      expect(transform.styleTransform).toBe(matrixGenerator.generate(matrixState, transformOrder));
    });
  });

  it("should parse the origin", () => {
    rewriteVariables(null, "100px 50px");

    expect(transform.styleTransformOrigin).toBe("100% 50%");
    expect(transform.originX).toBe(1);
    expect(transform.originY).toBe(0.5);
  });

  it("should update transform-origin of the element when the origin state changes completely", () => {
    transform.origin = { x: 1, y: 1 };
    expect(transform.styleTransformOrigin).toBe("100% 100%");
  });
});
