import { appActions } from "../../actions/app";
import { app, DEFAULT_STATE } from "../app";

describe("app reducer", () => {
  it("returns the default state", () => {
    expect(app(undefined, { type: "@@INIT" } as never)).toEqual(DEFAULT_STATE);
  });

  it("stores the previous and new app state", () => {
    const state = app(
      DEFAULT_STATE,
      appActions.appStateUpdated({
        prevState: "active",
        newState: "background",
      }),
    );

    expect(state.state).toEqual({
      prevState: "active",
      newState: "background",
    });
  });
});
