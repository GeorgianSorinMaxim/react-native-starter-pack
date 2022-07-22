export type Action<T extends string> = {
  type: T;
};
type ActionCreator<T extends string> = {
  type: T;
  (): Action<T>;
};

export function actionCreator<T extends string>(type: T): ActionCreator<T> {
  const actionCreator = () => ({
    type,
  });
  actionCreator.type = type;
  return actionCreator;
}

export type ActionWithPayload<T extends string, P> = { type: T; payload: P };
type ActionCreatorWithPayload<T extends string, P, TArgs extends Array<any>> = {
  type: T;
  (...args: TArgs): ActionWithPayload<T, P>;
};

export function actionCreatorWithPayload<
  T extends string,
  P,
  TArgs extends Array<any>,
>(
  type: T,
  payloadGenerator: (...args: TArgs) => P,
): ActionCreatorWithPayload<T, P, TArgs> {
  const actionCreator = (...args: TArgs) => ({
    type,
    payload: payloadGenerator(...args),
  });
  actionCreator.type = type;
  return actionCreator;
}

/** This is required if we don't want to specify the action name twice
 * https://github.com/microsoft/TypeScript/issues/26242 */
export function payloadType<T>() {
  return (value: T) => value;
}

export type DefaultAction = Action<"DefaultAction">;
