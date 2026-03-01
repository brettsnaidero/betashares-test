"use client";

import cn from "classnames";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  label?: string;
}

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const checkbox = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(styles.root, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        {props.indeterminate ? (
          <Minus size={14} strokeWidth={3} />
        ) : (
          <Check size={14} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label) {
    return (
      <label className={cn(styles.label, props.disabled && styles.disabled)}>
        {checkbox}
        <span>{label}</span>
      </label>
    );
  }

  return checkbox;
}

export { Checkbox };
export type { CheckboxProps };
