import { cloneableGenerator } from "@redux-saga/testing-utils";

import { dataActions } from "../../actions/data";
import { onFetchUniversityList } from "../data";

jest.mock("react-native-config");

describe("Data sagas", () => {
  describe("fetchData", () => {
    it("should dispatch UNIVERSITIES_FETCH_FAILURE", () => {
      const action = dataActions.fetchUniversitiesFailure();

      // @ts-ignore
      const generator = cloneableGenerator(onFetchUniversityList)(action);

      generator.next();

      expect(generator.next({ payload: { data: [] } }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            type: "UNIVERSITIES_FETCH_FAILURE",
          },
          channel: undefined,
        },
        type: "PUT",
      });
    });

    it("should dispatch UNIVERSITIES_FETCH_SUCCESS", () => {
      const action = dataActions.fetchUniversitiesSuccess([
        { name: "mock", url: "mock" },
      ]);

      // @ts-ignore
      const generator = cloneableGenerator(onFetchUniversityList)(action);

      let next = generator.next();
      next = generator.next({
        success: true,
        payload: { data: [{ name: "mock", url: "mock" }] },
      });

      expect(next.value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            payload: { data: [{ name: "mock", url: "mock" }] },
            type: "UNIVERSITIES_FETCH_SUCCESS",
          },
          channel: undefined,
        },
        type: "PUT",
      });
    });
  });
});
