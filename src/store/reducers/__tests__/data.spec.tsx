import { dataActions } from "../../actions/data";
import { data, University } from "../data";

describe("Data reducer", () => {
  it("default", () => {
    const state = data(undefined, {
      type: dataActions.fetchDataFailure.type,
      payload: [],
    });

    expect(state).toEqual({
      universities: [],
    });
  });

  it("DATA_FETCHED_SUCCESS", () => {
    const payload: University[] = [{ name: "mock", url: "mock" }];

    const state = data(undefined, {
      type: dataActions.fetchDataSuccess.type,
      payload,
    });

    expect(state).toEqual({ universities: [{ name: "mock", url: "mock" }] });
  });

  it("DATA_FETCHED_FAILURE", () => {
    const payload: [] = [];

    const state = data(undefined, {
      type: dataActions.fetchDataFailure.type,
      payload,
    });

    expect(state).toEqual({ universities: [] });
  });
});
