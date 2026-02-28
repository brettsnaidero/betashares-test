"use client";

import cn from "classnames";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import buttonStyles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonStyles.button, buttonStyles[variant], className)}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonVariant };
