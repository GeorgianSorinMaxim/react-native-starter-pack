import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ColorSchemeName } from "react-native";

import { ColorToken, SpacingToken, theme } from "../theme";
import { Subheading } from "./Subheading";
import { Box, BoxProps } from "./Box";
import { FocusAwareStatusBar } from "./FocusAwareStatusBar";
import { Header } from "./Header";

interface ScrollWrapperProps {
  children: any;
  useScrollView: boolean;
  hasStickyHeader: boolean;
}

//  Returns the "light" or "dark" status bar style based on the given hex value
// http://www.w3.org/TR/AERT#color-contrast
export const getColorSchemeForColor = (color: string): ColorSchemeName => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "dark" : "light";
};

const ScrollWrapper = ({
  children,
  useScrollView,
  hasStickyHeader,
}: ScrollWrapperProps) =>
  useScrollView ? (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={hasStickyHeader ? [0] : undefined}
      alwaysBounceVertical={false}>
      {children}
    </KeyboardAwareScrollView>
  ) : (
    children
  );

type BackButtonOnly = {
  backButtonLabel?: string;
  title?: never;
};

type TitleOnly = {
  backButtonLabel?: never;
  title?: string;
};

type ScreenWrapperProps = BoxProps & {
  padding?: SpacingToken;
  backgroundColor?: ColorToken;
  backButtonLabel?: string;
  noBottomNav?: boolean;
  title?: string;
  footerContent?: React.ElementType;
  useScrollView?: boolean;
} & (BackButtonOnly | TitleOnly);

export const ScreenWrapper = memo(
  ({
    backgroundColor = "white",
    backButtonLabel,
    children,
    padding = "large",
    noBottomNav = false,
    title,
    footerContent,
    useScrollView = true,
    ...rest
  }: ScreenWrapperProps) => {
    const colorScheme = getColorSchemeForColor(theme.colors[backgroundColor]);

    return (
      <>
        {colorScheme ? (
          <FocusAwareStatusBar barStyle={`${colorScheme}-content`} />
        ) : null}

        <Box backgroundColor={backgroundColor} flex={1} {...rest}>
          <SafeAreaView
            edges={noBottomNav ? undefined : ["top"]}
            style={{ flex: 1 }}>
            <Box flex={1}>
              <ScrollWrapper
                useScrollView={useScrollView}
                hasStickyHeader={!!backButtonLabel}>
                {/* Back button */}
                {backButtonLabel ? (
                  <Box
                    style={{
                      backgroundColor: theme.colors[backgroundColor],
                      paddingHorizontal: theme.spacing.large,
                      paddingTop: theme.spacing.large,
                    }}>
                    <Header
                      backButtonLabel={backButtonLabel}
                      colorScheme={colorScheme}
                    />
                    <Box
                      style={{
                        height: theme.spacing.small,
                        backgroundColor: theme.colors[backgroundColor],
                        position: "absolute",
                        left: -theme.spacing.large,
                        right: -theme.spacing.large,
                        bottom: -theme.spacing.small,
                      }}
                    />
                  </Box>
                ) : null}

                {/* Main content */}
                <Box
                  spacing="large"
                  flex={1}
                  paddingTop={padding}
                  paddingBottom={padding}
                  paddingLeft={padding}
                  paddingRight={padding}>
                  {!!title && <Subheading size="small">{title}</Subheading>}
                  <Box flex={1}>{children}</Box>
                </Box>
              </ScrollWrapper>
            </Box>
            {footerContent && <>{React.createElement(footerContent)}</>}
          </SafeAreaView>
        </Box>
      </>
    );
  },
);
