import { ActionCreator, TypedAction } from '@ngrx/store/src/models';

export type Action = ActionCreator<string, () => TypedAction<string>>;
export type ActionWithProps<T> = ActionCreator<string, (props: T) => T & TypedAction<string>>;

export type ActionSuccess<T> = ActionCreator<string, (props: T) => T & TypedAction<string>>;
export type ActionError = ActionCreator<
  string,
  (props: { error: unknown }) => { error: unknown } & TypedAction<string>
>;
