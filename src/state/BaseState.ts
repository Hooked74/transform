export default abstract class BaseState<T = any> implements H74_T.Loader<T> {
  public static from<S extends BaseState, T>(state: T): S {
    const newState: S = new (this as any)() as S;
    newState.load(state);
    return newState;
  }

  public abstract load(state: T): void;
  public abstract toString(): string;
}
