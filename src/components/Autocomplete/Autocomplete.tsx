"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Autocomplete.module.css";
import { LoadingIllustration, LoadingSpinner } from "../Loading";

export interface AutocompleteGroup<T> {
  label: string;
  items: T[];
}

interface AutocompleteBaseProps<T> {
  /** Called when the user types in the input. Consumer handles debouncing/fetching. */
  onInputValueChange: (value: string) => void;
  /** Extracts a display label from an item. */
  getItemLabel: (item: T) => string;
  /** Extracts a unique value string from an item. */
  getItemValue: (item: T) => string;
  /** Optional custom renderer for each item. Receives the current input value as the second argument. */
  renderItem?: (item: T, inputValue: string) => ReactNode;
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

type AutocompleteFlatProps<T> = AutocompleteBaseProps<T> & {
  /** Flat list of items (no groups). */
  items: T[];
  groups?: never;
};

type AutocompleteGroupedProps<T> = AutocompleteBaseProps<T> & {
  /** Grouped items with section labels. */
  groups: AutocompleteGroup<T>[];
  items?: never;
};

type AutocompleteProps<T> =
  | AutocompleteFlatProps<T>
  | AutocompleteGroupedProps<T>;

function Autocomplete<T>({
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
}: AutocompleteProps<T>) {
  const items = "items" in rest && rest.items ? rest.items : [];
  const groups = "groups" in rest && rest.groups ? rest.groups : [];

  const hasItems = items.length > 0 || groups.some((g) => g.items.length > 0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputValueRef = useRef(defaultInputValue);
  const wasLoadingRef = useRef(false);

  // Track if we just submitted/selected to suppress popup reopening
  const dismissedRef = useRef(false);

  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

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
      const shouldOpen =
        open && (showOnEmpty || inputValueRef.current.trim() !== "");
      setIsOpen(shouldOpen);
      // Trigger a search when opening with existing text (e.g. clicking input
      // that already has a value) so suggestions load immediately
      if (shouldOpen && inputValueRef.current.trim() !== "") {
        // If we already have items and aren't loading, mark as complete
        // to avoid showing the spinner for cached/existing results
        if (!isLoading && hasItems) {
          setIsLoadingComplete(true);
        }
        onInputValueChange(inputValueRef.current);
      }
    },
    [showOnEmpty, onInputValueChange, isLoading, hasItems]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      inputValueRef.current = value;
      setInputValue(value);
      if (dismissedRef.current) {
        dismissedRef.current = false;
      } else {
        setIsOpen(showOnEmpty || value.trim() !== "");
      }
      setIsLoadingComplete(false);
      wasLoadingRef.current = false;
      onInputValueChange(value);
    },
    [onInputValueChange, showOnEmpty]
  );

  const handleItemClick = useCallback(
    (item: T) => {
      dismissedRef.current = true;
      inputRef.current?.blur();
      onValueChange?.(item);
    },
    [onValueChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onSubmit) {
        dismissedRef.current = true;
        const input = event.currentTarget;
        input.blur();
        onSubmit(input.value);
      }
    },
    [onSubmit]
  );

  const renderItemNode = (item: T) => {
    const value = getItemValue(item);

    return (
      <BaseAutocomplete.Item
        key={value}
        value={item}
        className={styles.item}
        onClick={() => handleItemClick(item)}
      >
        {renderItem
          ? renderItem(item, inputValueRef.current)
          : getItemLabel(item)}
      </BaseAutocomplete.Item>
    );
  };

  return (
    <BaseAutocomplete.Root
      value={inputValue}
      onValueChange={handleValueChange}
      open={isOpen}
      onOpenChange={handleOpenChange}
      mode="none"
      openOnInputClick
      itemToStringValue={getItemValue}
    >
      <div className={cn(styles.root, className)}>
        <div className={styles.inputWrapper}>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
          <BaseAutocomplete.Input
            ref={inputRef}
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

        <BaseAutocomplete.Portal keepMounted>
          <BaseAutocomplete.Positioner
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
                  <BaseAutocomplete.Popup className={styles.popup}>
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
                            <BaseAutocomplete.List className={styles.list}>
                              {groups.length > 0
                                ? groups.map((group) =>
                                    group.items.length > 0 ? (
                                      <BaseAutocomplete.Group
                                        key={group.label}
                                        className={styles.group}
                                      >
                                        <BaseAutocomplete.GroupLabel
                                          className={styles.groupLabel}
                                        >
                                          {group.label}
                                        </BaseAutocomplete.GroupLabel>
                                        {group.items.map(renderItemNode)}
                                      </BaseAutocomplete.Group>
                                    ) : null
                                  )
                                : items.map(renderItemNode)}
                            </BaseAutocomplete.List>
                          ) : null}

                          {isLoadingComplete &&
                            !hasItems &&
                            inputValueRef.current.trim() !== "" && (
                              <BaseAutocomplete.Empty className={styles.empty}>
                                {emptyMessage}
                              </BaseAutocomplete.Empty>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </BaseAutocomplete.Popup>
                </motion.div>
              )}
            </AnimatePresence>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      </div>
    </BaseAutocomplete.Root>
  );
}

export { Autocomplete };
export type {
  AutocompleteProps,
  AutocompleteFlatProps,
  AutocompleteGroupedProps,
};
