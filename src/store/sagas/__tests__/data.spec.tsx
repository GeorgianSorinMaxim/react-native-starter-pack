import { cloneableGenerator } from "@redux-saga/testing-utils";

import { ActionTypes } from "../../actions/data";
import * as data from "../data";

describe("Data sagas", () => {
  describe("fetchData", () => {
    it("should dispatch DATA_FETCHED_FAILURE", () => {
      const generator = cloneableGenerator(data.fetchData)();

      generator.next();

      expect(generator.next({ payload: { data: ["mock"] } }).value).toEqual({
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
      // @ts-ignore used because an action is accepted as a parameter
      const generator = cloneableGenerator(data.fetchData)(ActionTypes.DATA_FETCHED_SUCCESS);

      let next = generator.next();
      next = generator.next({ success: true, payload: { data: ["mock"] } });

      expect(next.value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            payload: { data: ["mock"] },
            type: "DATA_FETCHED_SUCCESS",
          },
          channel: undefined,
        },
        type: "PUT",
      });
    });
  });
});
