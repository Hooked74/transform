import { TransformStateUnion } from ".";

export default class StateFactory {
  private static decoratedProperties: string[] = ["x", "y", "angle"];

  public static create<T extends TransformStateUnion>(
    State: Constructor<T>,
    onChange?: Handler
  ): T {
    return typeof onChange === "function"
      ? (new (StateFactory.decorate(State, onChange))() as T)
      : (new State() as T);
  }

  private static decorate<T extends TransformStateUnion>(
    State: Constructor<T>,
    onChange: Handler
  ): Constructor<T> {
    const ObservedState: Constructor<T> = class extends (State as any) {} as Constructor<T>;
    for (const property of StateFactory.decoratedProperties) {
      const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(
        State.prototype,
        property
      );

      if (descriptor) {
        Object.defineProperty(ObservedState.prototype, property, {
          ...descriptor,
          set(value: float): void {
            if (descriptor.get.call(this) !== value) {
              descriptor.set.call(this, value);
              onChange(this);
            }
          }
        });
      }
    }

    return ObservedState;
  }
}
