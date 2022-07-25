import { cloneableGenerator } from "@redux-saga/testing-utils";

import { dataActions } from "../../actions/data";
import { onFetchData } from "../data";

jest.mock("react-native-config");

describe("Data sagas", () => {
  describe("fetchData", () => {
    it("should dispatch DATA_FETCHED_FAILURE", () => {
      const action = dataActions.fetchDataFailure([]);

      // @ts-ignore
      const generator = cloneableGenerator(onFetchData)(action);

      generator.next();

      expect(generator.next({ payload: { data: [] } }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            payload: [],
            type: "DATA_FETCHED_FAILURE",
          },
          channel: undefined,
        },
        type: "PUT",
      });
    });

    it("should dispatch DATA_FETCHED_SUCCESS", () => {
      const action = dataActions.fetchDataFailure([
        { name: "mock", url: "mock" },
      ]);

      // @ts-ignore
      const generator = cloneableGenerator(onFetchData)(action);

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
            type: "DATA_FETCHED_SUCCESS",
          },
          channel: undefined,
        },
        type: "PUT",
      });
    });
  });
});
