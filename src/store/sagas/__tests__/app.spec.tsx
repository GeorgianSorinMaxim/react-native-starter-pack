import { cloneableGenerator } from "@redux-saga/testing-utils";

import { ActionTypes } from "../../actions/app";
import * as app from "../app";

describe("app sagas", () => {
  describe("fetchData", () => {
    it("should dispatch DATA_FETCHED_FAILURE", () => {
      const generator = cloneableGenerator(app.fetchData)();

      generator.next();

      expect(generator.next({ payload: { data: ["mock"] } }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            payload: [],
            type: "DATA_FETCHED_FAILURE"
          },
          channel: undefined
        },
        type: "PUT"
      });
    });

    it("should dispatch DATA_FETCHED_SUCCESS", () => {
      // @ts-ignore used because an action is accepted as a parameter
      const generator = cloneableGenerator(app.fetchData)(ActionTypes.DATA_FETCHED_SUCCESS);

      let next = generator.next();
      next = generator.next({ success: true, payload: { data: ["mock"] }});

      expect(next.value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        payload: {
          action: {
            payload: { data: ["mock"] },
            type: "DATA_FETCHED_SUCCESS"
          },
          channel: undefined
        },
        type: "PUT"
      });
    });
  });
});
