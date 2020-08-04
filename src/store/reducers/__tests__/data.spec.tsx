import { ActionTypes } from "../../actions/data";
import { data } from "../data";

describe("Data reducer", () => {
  it("default", () => {
    const state = data(undefined, {
      type: ActionTypes.DATA_FETCHED_FAILURE,
      payload: []
    });

    expect(state).toEqual({
      data: [],
    });
  });

  it("DATA_FETCHED_SUCCESS", () => {
    const payload = ["mock"];

    const state = data(undefined, {
      type: ActionTypes.DATA_FETCHED_SUCCESS,
      payload
    });

    expect(state).toEqual({ data: ['mock'] });
  });

  it("DATA_FETCHED_FAILURE", () => {
    const payload = [];

    const state = data(undefined, {
      type: ActionTypes.DATA_FETCHED_FAILURE,
      payload
    });

    expect(state).toEqual({ data: [] });
  });
});
