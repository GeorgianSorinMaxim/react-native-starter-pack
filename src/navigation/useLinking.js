import { useLinking } from "@react-navigation/native";

import { RESTAURANTS, LINKS } from "./routes";

export default (containerRef) => {
  return useLinking(containerRef, {
    prefixes: ["/"],
    config: {
      Root: {
        path: "root",
        screens: {
          Restaurants: RESTAURANTS,
          Links: LINKS,
        },
      },
    },
  });
};
