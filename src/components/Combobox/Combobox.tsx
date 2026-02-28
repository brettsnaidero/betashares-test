"use client";

import { type ReactNode, useCallback, useRef } from "react";
import cn from "classnames";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import styles from "./Combobox.module.css";
import { LoadingSpinner } from "../LoadingSpinner";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ComboboxGroup<T> {
  label: string;
  items: T[];
}

interface ComboboxBaseProps<T> {
  /** Called when the user types in the input. Consumer handles debouncing/fetching. */
  onInputValueChange: (value: string) => void;
  /** Extracts a display label from an item. */
  getItemLabel: (item: T) => string;
  /** Extracts a unique value string from an item. */
  getItemValue: (item: T) => string;
  /** Optional custom renderer for each item. */
  renderItem?: (item: T) => ReactNode;
  /** Called when the user selects an item. */
  onValueChange?: (value: T | null) => void;
  /** Called when the user presses Enter while the input is focused. */
  onSubmit?: (inputValue: string) => void;
  /** Whether suggestions are currently loading. */
  isLoading?: boolean;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Message shown when no items match. */
  emptyMessage?: string;
  /** Icon rendered on the left side of the input. */
  icon?: ReactNode;
  /** Additional class name for the root wrapper. */
  className?: string;
  /** aria-label for the input */
  "aria-label"?: string;
}

type ComboboxFlatProps<T> = ComboboxBaseProps<T> & {
  /** Flat list of items (no groups). */
  items: T[];
  groups?: never;
};

type ComboboxGroupedProps<T> = ComboboxBaseProps<T> & {
  /** Grouped items with section labels. */
  groups: ComboboxGroup<T>[];
  items?: never;
};

type ComboboxProps<T> = ComboboxFlatProps<T> | ComboboxGroupedProps<T>;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function Combobox<T>({
  onInputValueChange,
  getItemLabel,
  getItemValue,
  renderItem,
  onValueChange,
  onSubmit,
  isLoading = false,
  placeholder = "Search…",
  emptyMessage = "No results found",
  icon,
  className,
  "aria-label": ariaLabel,
  ...rest
}: ComboboxProps<T>) {
  const items = "items" in rest && rest.items ? rest.items : [];
  const groups = "groups" in rest && rest.groups ? rest.groups : [];
  const hasItems = items.length > 0 || groups.some((g) => g.items.length > 0);
  const inputValueRef = useRef("");

  const handleValueChange = useCallback(
    (value: T | null) => {
      onValueChange?.(value);
    },
    [onValueChange]
  );

  const handleInputValueChange = useCallback(
    (value: string) => {
      inputValueRef.current = value;
      onInputValueChange(value);
    },
    [onInputValueChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onSubmit) {
        const input = event.currentTarget;
        onSubmit(input.value);
      }
    },
    [onSubmit]
  );

  function renderItemNode(item: T) {
    const value = getItemValue(item);
    return (
      <ComboboxPrimitive.Item key={value} value={item} className={styles.item}>
        {renderItem ? renderItem(item) : getItemLabel(item)}
      </ComboboxPrimitive.Item>
    );
  }

  return (
    <ComboboxPrimitive.Root
      value={null}
      onValueChange={handleValueChange}
      onInputValueChange={handleInputValueChange}
    >
      <div className={cn(styles.root, className)}>
        <div className={styles.inputWrapper}>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
          <ComboboxPrimitive.Input
            className={cn(styles.input, { [styles.inputWithIcon]: !!icon })}
            placeholder={placeholder}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
          />
        </div>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            className={styles.positioner}
            sideOffset={4}
          >
            <ComboboxPrimitive.Popup className={styles.popup}>
              {isLoading && !hasItems ? (
                <div className={styles.loading}>
                  <LoadingSpinner size={24} className={styles.loadingSpinner} />
                </div>
              ) : (
                <>
                  <ComboboxPrimitive.List className={styles.list}>
                    {groups.length > 0
                      ? groups.map((group) =>
                          group.items.length > 0 ? (
                            <ComboboxPrimitive.Group
                              key={group.label}
                              className={styles.group}
                            >
                              <ComboboxPrimitive.GroupLabel
                                className={styles.groupLabel}
                              >
                                {group.label}
                              </ComboboxPrimitive.GroupLabel>
                              {group.items.map(renderItemNode)}
                            </ComboboxPrimitive.Group>
                          ) : null
                        )
                      : items.map(renderItemNode)}
                  </ComboboxPrimitive.List>

                  {!isLoading &&
                    !hasItems &&
                    inputValueRef.current.trim() !== "" && (
                      <ComboboxPrimitive.Empty className={styles.empty}>
                        {emptyMessage}
                      </ComboboxPrimitive.Empty>
                    )}
                </>
              )}
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </div>
    </ComboboxPrimitive.Root>
  );
}

export { Combobox };
export type { ComboboxProps, ComboboxFlatProps, ComboboxGroupedProps };
