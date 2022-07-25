import { dataActions } from "../../actions/data";
import { data, University } from "../data";

describe("Data reducer", () => {
  it("fetch - start", () => {
    const state = data(undefined, {
      type: dataActions.fetchUniversitiesStart.type,
    });

    expect(state).toEqual({
      news: [],
      universities: [],
    });
  });

  it("fetch - success", () => {
    const payload: University[] = [{ name: "mock", url: "mock" }];

    const state = data(undefined, {
      type: dataActions.fetchUniversitiesSuccess.type,
      payload,
    });

    expect(state).toEqual({
      universities: [{ name: "mock", url: "mock" }],
      news: [],
    });
  });

  it("fetch - failure", () => {
    const state = data(undefined, {
      type: dataActions.fetchUniversitiesFailure.type,
    });

    expect(state).toEqual({ universities: [], news: [] });
  });
});
