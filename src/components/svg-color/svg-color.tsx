/* eslint-disable react/display-name */
import { forwardRef } from "react";

type SvgColorProps = {
  src: string;
};

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, ...other }, ref) => (
    <span
      ref={ref}
      style={{
        width: 24,
        height: 24,
        flexShrink: 0,
        display: "inline-flex",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      {...other}
    />
  )
);
