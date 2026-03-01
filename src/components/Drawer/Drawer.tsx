"use client";

import { createContext, useContext, type ReactNode } from "react";
import cn from "classnames";
import { DrawerPreview as DrawerPrimitive } from "@base-ui/react";
import { X } from "lucide-react";
import styles from "./Drawer.module.css";

type DrawerSize = "small" | "medium" | "large";
type DrawerAnchor = "left" | "right" | "bottom" | "top";

const anchorToSwipeDirection = {
  left: "right",
  right: "left",
  bottom: "down",
  top: "up",
} as const;

/* ─── Internal context for forwarding size ──────────────── */

const DrawerContext = createContext<{ size: DrawerSize }>({ size: "medium" });

/* ─── Root ──────────────────────────────────────────────── */

type DrawerRootProps = Omit<DrawerPrimitive.Root.Props, "children"> & {
  anchor?: DrawerAnchor;
  size?: DrawerSize;
  children?: ReactNode;
};

function DrawerRoot({
  anchor = "right",
  size = "medium",
  children,
  ...props
}: DrawerRootProps) {
  return (
    <DrawerPrimitive.Root
      swipeDirection={anchorToSwipeDirection[anchor]}
      {...props}
    >
      <DrawerContext.Provider value={{ size }}>
        {children}
      </DrawerContext.Provider>
    </DrawerPrimitive.Root>
  );
}

/* ─── Trigger ───────────────────────────────────────────── */

const DrawerTrigger = DrawerPrimitive.Trigger;

/* ─── Backdrop ──────────────────────────────────────────── */

type DrawerBackdropProps = DrawerPrimitive.Backdrop.Props;

function DrawerBackdrop({ className, ...props }: DrawerBackdropProps) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(styles.backdrop, className)}
      {...props}
    />
  );
}

/* ─── Popup ─────────────────────────────────────────────── */

type DrawerPopupProps = DrawerPrimitive.Popup.Props;

function DrawerPopup({ className, ...props }: DrawerPopupProps) {
  const { size } = useContext(DrawerContext);
  return (
    <DrawerPrimitive.Popup
      className={cn(styles.popup, styles[size], className)}
      {...props}
    />
  );
}

/* ─── Portal ────────────────────────────────────────────── */

const DrawerPortal = DrawerPrimitive.Portal;

/* ─── Content ───────────────────────────────────────────── */

type DrawerContentProps = React.ComponentPropsWithRef<"div">;

function DrawerContent({ className, ...props }: DrawerContentProps) {
  return <div className={cn(styles.content, className)} {...props} />;
}

/* ─── Header ────────────────────────────────────────────── */

type DrawerHeaderProps = React.ComponentPropsWithRef<"div">;

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return <div className={cn(styles.header, className)} {...props} />;
}

/* ─── Title ─────────────────────────────────────────────── */

type DrawerTitleProps = DrawerPrimitive.Title.Props;

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title className={cn(styles.title, className)} {...props} />
  );
}

/* ─── Description ───────────────────────────────────────── */

type DrawerDescriptionProps = DrawerPrimitive.Description.Props;

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

/* ─── Close ─────────────────────────────────────────────── */

type DrawerCloseProps = DrawerPrimitive.Close.Props;

function DrawerClose({ className, children, ...props }: DrawerCloseProps) {
  return (
    <DrawerPrimitive.Close className={cn(styles.close, className)} {...props}>
      {children ?? <X className={styles.closeIcon} size={20} />}
    </DrawerPrimitive.Close>
  );
}

/* ─── Exports ───────────────────────────────────────────── */

export {
  DrawerRoot as Root,
  DrawerTrigger as Trigger,
  DrawerPortal as Portal,
  DrawerBackdrop as Backdrop,
  DrawerPopup as Popup,
  DrawerContent as Content,
  DrawerHeader as Header,
  DrawerTitle as Title,
  DrawerDescription as Description,
  DrawerClose as Close,
};

export type {
  DrawerRootProps,
  DrawerBackdropProps,
  DrawerPopupProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  DrawerSize,
  DrawerAnchor,
};
