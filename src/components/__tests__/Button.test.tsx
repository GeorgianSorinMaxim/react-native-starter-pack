import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "../Button";

describe("Button", () => {
  it("calls onPress when pressed", async () => {
    const onPress = jest.fn();
    await render(<Button title="Log in" onPress={onPress} />);

    await fireEvent.press(screen.getByText("Log in"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("still renders the title when disabled", async () => {
    await render(<Button title="Log in" onPress={jest.fn()} disabled />);

    expect(screen.getByText("Log in")).toBeOnTheScreen();
  });
});
