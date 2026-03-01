"use client";

import cn from "classnames";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import buttonStyles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "mediumSmall" | "large";
type ButtonPadding = "compact" | "standard" | "spacious" | "none";

interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  padding?: ButtonPadding;
}

function Button({
  className,
  variant = "primary",
  size = "medium",
  padding = "standard",
  render,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonStyles.button,
        buttonStyles[variant],
        buttonStyles[size],
        buttonStyles[padding],
        className
      )}
      render={render}
      nativeButton={!render}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonPadding };
