import React, { memo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { ColorToken, SpacingToken, theme, ZIndicesToken } from "../theme";

export interface BoxProps extends ViewProps {
  flex?: number;
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  justifyContent?:
    | "flex-start"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  spacing?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingLeft?: SpacingToken;
  marginTop?: SpacingToken;
  marginLeft?: SpacingToken;
  marginBottom?: SpacingToken;
  marginRight?: SpacingToken;
  backgroundColor?: ColorToken;
  zIndex?: ZIndicesToken;
  Separator?: React.ElementType;
}

export const Box = memo(
  ({
    flex,
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
    spacing,
    marginTop,
    marginLeft,
    marginBottom,
    marginRight,
    backgroundColor,
    zIndex,
    children,
    style,
    Separator,
    ...rest
  }: BoxProps) => {
    let spacedChildren = children;

    const isWrapped =
      flexWrap === "wrap" ||
      flexWrap === "wrap-reverse" ||
      (style &&
        ["wrap", "wrap-reverse"].includes(
          StyleSheet.flatten(style).flexWrap || "",
        ));

    const isRow =
      flexDirection === "row" ||
      (style && StyleSheet.flatten(style).flexDirection === "row");

    //  Apply some spacing between this component's children if the "spacing" prop exists
    if (spacing || !!Separator) {
      //  Required to remove "null" from children
      const childArray = React.Children.toArray(children);

      //  Go through each of the child elements...
      spacedChildren = React.Children.map(childArray, (child, index) => {
        if (!child) return null;

        //  Apply bottom margin if the container is not flex row or wrapping content
        const childMarginBottom =
          isWrapped || (!isRow && index < childArray.length - 1)
            ? spacing
            : undefined;

        //  Apply right margin if the container is flex row or wrapping content
        const childMarginRight =
          isWrapped || (isRow && index < childArray.length - 1)
            ? spacing
            : undefined;

        //  Determine wether we need to display a seperator component
        const shouldAddSeperator = !!Separator && index < childArray.length - 1;

        //  Add the margins directly to the child if it is a Box element
        if ((child as React.ReactElement).type === Box) {
          return (
            <>
              {React.cloneElement(child as React.ReactElement, {
                marginBottom: childMarginBottom,
                marginRight: childMarginRight,
              })}
              {shouldAddSeperator ? (
                <Box
                  marginBottom={childMarginBottom}
                  marginRight={childMarginRight}>
                  <Separator />
                </Box>
              ) : null}
            </>
          );
        }

        //  Otherwise, create a new Box element around the child component
        return (
          <>
            <Box
              marginBottom={childMarginBottom}
              marginRight={childMarginRight}>
              {child}
            </Box>
            {shouldAddSeperator ? (
              <Box
                marginBottom={childMarginBottom}
                marginRight={childMarginRight}>
                <Separator />
              </Box>
            ) : null}
          </>
        );
      });
    }

    return (
      <View
        style={[
          {
            flex,
            flexDirection,
            alignItems,
            flexWrap,
            justifyContent,
            backgroundColor: backgroundColor
              ? theme.colors[backgroundColor]
              : "transparent",
            paddingTop: paddingTop ? theme.spacing[paddingTop] : 0,
            paddingBottom: paddingBottom ? theme.spacing[paddingBottom] : 0,
            paddingLeft: paddingLeft ? theme.spacing[paddingLeft] : 0,
            paddingRight: paddingRight ? theme.spacing[paddingRight] : 0,
            zIndex: zIndex ? theme.zIndices[zIndex] : 1,
            marginTop: marginTop ? theme.spacing[marginTop] : 0,
            marginLeft: marginLeft ? theme.spacing[marginLeft] : 0,
            marginBottom:
              isWrapped && spacing
                ? -theme.spacing[spacing]
                : marginBottom
                  ? theme.spacing[marginBottom]
                  : 0,
            marginRight:
              isWrapped && spacing
                ? -theme.spacing[spacing]
                : marginRight
                  ? theme.spacing[marginRight]
                  : 0,
          },
          style,
        ]}
        {...rest}>
        {spacedChildren}
      </View>
    );
  },
);
