export function degToRad(deg: float): float {
  return (deg * Math.PI) / 180;
}

export function style(element: H74_T.Element, property: string, value?: string): string | void {
  const propertyWithPrefix: string = property
    .split("-")
    .map((chunk: string) => chunk[0].toUpperCase() + chunk.slice(1))
    .join("");
  const propertyWithoutPrefix: string =
    propertyWithPrefix[0].toLowerCase() + propertyWithPrefix.slice(1);

  if (typeof value === "undefined") {
    const style: CSSStyleDeclaration = getComputedStyle(element);

    return (
      style[`webkit${propertyWithPrefix}` as keyof CSSStyleDeclaration] ||
      style[`moz${propertyWithPrefix}` as keyof CSSStyleDeclaration] ||
      style[`ms${propertyWithPrefix}` as keyof CSSStyleDeclaration] ||
      style[`o${propertyWithPrefix}` as keyof CSSStyleDeclaration] ||
      style[propertyWithoutPrefix as keyof CSSStyleDeclaration]
    );
  } else {
    element.style[`webkit${propertyWithPrefix}` as any] = value;
    element.style[`moz${propertyWithPrefix}` as any] = value;
    element.style[`ms${propertyWithPrefix}` as any] = value;
    element.style[`o${propertyWithPrefix}` as any] = value;
    element.style[propertyWithoutPrefix as any] = value;
  }
}

export function roundTo(num: float, digits: int): float {
  const tenToPow: int = Math.pow(10, digits);
  return Math.round(num * tenToPow) / tenToPow;
}

export function omit<T>(obj: T, properties: Array<keyof T>): Partial<T> {
  const shallowCopy: T = { ...obj };

  for (const property of properties) {
    delete shallowCopy[property];
  }

  return shallowCopy;
}
