import React, { memo } from "react";
import { ColorSchemeName } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Subheading, Box, CustomButton } from ".";

export interface HeaderProps {
  colorScheme?: ColorSchemeName;
  backButtonLabel: string;
  handleBackButtonPress?: () => void;
}

export const Header = memo(
  ({ backButtonLabel, colorScheme, handleBackButtonPress }: HeaderProps) => {
    const navigation = useNavigation();

    const textColor = colorScheme === "dark" ? "purple" : "white";

    return (
      <CustomButton
        accessibilityLabel={`Go back to ${backButtonLabel}`}
        testID={headerTestIds.backButton}
        onPress={() => {
          if (handleBackButtonPress) {
            handleBackButtonPress();
          } else {
            navigation.goBack();
          }
        }}>
        <Box flexDirection="row" alignItems="center" spacing="extraSmall">
          {/* <Icon color={textColor} width={14} icon="arrowLeft" /> */}
          <Subheading size="small" color={textColor}>
            {backButtonLabel}
          </Subheading>
        </Box>
      </CustomButton>
    );
  },
);

export const headerTestIds = {
  backButton: "header-back-button",
};
