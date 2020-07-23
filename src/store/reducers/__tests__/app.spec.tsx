import { ActionTypes } from "../../actions/app";
import { app } from "../app";

describe("App reducer", () => {
  it("default", () => {
    const state = app(undefined, {
      type: ActionTypes.DATA_FETCHED_FAILURE,
      payload: []
    });

    expect(state).toEqual({
      data: [],
    });
  });

  it("DATA_FETCHED_SUCCESS", () => {
    const payload = ["mock"];

    const state = app(undefined, {
      type: ActionTypes.DATA_FETCHED_SUCCESS,
      payload
    });

    expect(state).toEqual({ data: ['mock'] });
  });

  it("DATA_FETCHED_FAILURE", () => {
    const payload = [];

    const state = app(undefined, {
      type: ActionTypes.DATA_FETCHED_FAILURE,
      payload
    });

    expect(state).toEqual({ data: [] });
  });
});
