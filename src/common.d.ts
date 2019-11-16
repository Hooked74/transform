declare namespace TransformCommon {
  interface Coord {
    x: float;
    y: float;
  }

  interface Rotate {
    angle: float;
  }

  interface Loader<T> {
    load(state: T): void;
  }

  interface Style {
    getStyleProperty(property: string): string;
    setStyleProperty(property: string, value: string): void;
  }

  type Element = SVGElement | HTMLElement;

  interface Options {
    transformOrder: Array<"skew" | "scale" | "rotate" | "translate">;
  }
}

import H74_T = TransformCommon;
