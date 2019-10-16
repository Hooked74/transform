/// <reference types="node" />

declare type int = number;
declare type uint = number;
declare type float = number;
declare type ufloat = number;

declare type KeysOfUnion<T> = T extends any ? keyof T : never;
declare type PickField<T, K extends keyof T> = T[K];

declare type PromiseResolve = (value?: void | PromiseLike<void> | undefined) => void;
declare type PromiseReject = (reason?: any) => void;

declare type Constructor<T extends object> = T extends object ? new (...args: any[]) => T : never;
declare type Decorator<T, U extends T> = (Component: Constructor<T>) => Constructor<U>;

declare type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
declare type Writable<T> = { -readonly [K in keyof T]: T[K] };

declare type Handler<T = any> = (...args: any[]) => T;

declare interface Dictionary<T> {
  [key: string]: T;
}

declare interface Tuple<T> {
  [key: number]: T;
}

declare interface ReadonlyDictionary<T> {
  readonly [key: string]: T;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }

  interface Global {}
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

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

  type TransformOrder = [string, string, string, string];

  interface Options {
    transformOrder: TransformOrder;
  }
}

import H74_T = TransformCommon;
