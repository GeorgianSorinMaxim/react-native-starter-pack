import React, { memo } from "react";

import { BodyText, BodyTextProps } from "./BodyText";

export interface SubheadingProps extends BodyTextProps {}

export const Subheading = memo(({ ...rest }: BodyTextProps) => (
  <BodyText color="primary" size="extraLarge" fontWeight="regular" {...rest} />
));
