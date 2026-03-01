"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Combobox.module.css";
import { LoadingIllustration, LoadingSpinner } from "../Loading";

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
  /** Default value for the input field. */
  defaultInputValue?: string;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Message shown when no items match. */
  emptyMessage?: string;
  /** Whether an error occurred (e.g. failed fetch). */
  isError?: boolean;
  /** Message shown when isError is true. */
  errorMessage?: string;
  /** When true, the popup can open even if the input is empty (e.g. for popular suggestions). */
  showOnEmpty?: boolean;
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
  defaultInputValue = "",
  placeholder = "Search…",
  emptyMessage = "No results found",
  isError = false,
  errorMessage = "Something went wrong",
  showOnEmpty = false,
  icon,
  className,
  "aria-label": ariaLabel,
  ...rest
}: ComboboxProps<T>) {
  const items = "items" in rest && rest.items ? rest.items : [];
  const groups = "groups" in rest && rest.groups ? rest.groups : [];
  const hasItems = items.length > 0 || groups.some((g) => g.items.length > 0);
  const inputValueRef = useRef(defaultInputValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const wasLoadingRef = useRef(false);

  useEffect(() => {
    if (isLoading) {
      wasLoadingRef.current = true;
    } else if (wasLoadingRef.current) {
      wasLoadingRef.current = false;
      setIsLoadingComplete(true);
    }
  }, [isLoading]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open && (showOnEmpty || inputValueRef.current.trim() !== ""));
    },
    [showOnEmpty]
  );

  const handleValueChange = useCallback(
    (value: T | null) => {
      onValueChange?.(value);
    },
    [onValueChange]
  );

  const handleInputValueChange = useCallback(
    (value: string) => {
      inputValueRef.current = value;
      setIsOpen(showOnEmpty || value.trim() !== "");
      setIsLoadingComplete(false);
      wasLoadingRef.current = false;
      onInputValueChange(value);
    },
    [onInputValueChange, showOnEmpty]
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
      defaultInputValue={defaultInputValue}
      onValueChange={handleValueChange}
      onInputValueChange={handleInputValueChange}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div className={cn(styles.root, className)}>
        <div className={styles.inputWrapper}>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
          <ComboboxPrimitive.Input
            className={cn(styles.input, {
              [styles.inputWithIcon]: !!icon,
              [styles.inputWithSpinner]: isLoading,
            })}
            placeholder={placeholder}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
          />
          {/* Small loading indicator for updates */}
          <AnimatePresence>
            {isOpen &&
            hasItems &&
            inputValueRef.current.trim() !== "" &&
            (isLoading || !isLoadingComplete) ? (
              <motion.span
                className={styles.inlineSpinner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                <LoadingSpinner />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <ComboboxPrimitive.Portal keepMounted>
          <ComboboxPrimitive.Positioner
            className={styles.positioner}
            sideOffset={4}
          >
            <AnimatePresence>
              {/* Loading indicator for initial load */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <ComboboxPrimitive.Popup className={styles.popup}>
                    <AnimatePresence mode="wait">
                      {isError ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div role="alert" className={styles.error}>
                            {errorMessage}
                          </div>
                        </motion.div>
                      ) : !hasItems && (isLoading || !isLoadingComplete) ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={styles.loading}
                        >
                          <LoadingIllustration
                            className={styles.loadingIllustration}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="results"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {groups.length > 0 || items.length > 0 ? (
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
                          ) : null}

                          {isLoadingComplete &&
                            !hasItems &&
                            inputValueRef.current.trim() !== "" && (
                              <ComboboxPrimitive.Empty className={styles.empty}>
                                {emptyMessage}
                              </ComboboxPrimitive.Empty>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ComboboxPrimitive.Popup>
                </motion.div>
              )}
            </AnimatePresence>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </div>
    </ComboboxPrimitive.Root>
  );
}

export { Combobox };
export type { ComboboxProps, ComboboxFlatProps, ComboboxGroupedProps };
