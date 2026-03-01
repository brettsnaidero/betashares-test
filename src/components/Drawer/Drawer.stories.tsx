import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Drawer } from "./index";
import { Button } from "../Button/Button";

const meta: Meta = {
  title: "Components/Drawer",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryFn = () => (
  <Drawer.Root>
    <Drawer.Trigger render={<Button variant="primary" />}>
      Open drawer
    </Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Popup>
        <Drawer.Header>
          <Drawer.Title>Default drawer</Drawer.Title>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Description>
          A basic right-anchored drawer using the BetaShares design tokens.
        </Drawer.Description>
        <Drawer.Content>
          <p>
            This drawer slides in from the right and can be dismissed by
            swiping, clicking the backdrop, or pressing the close button.
          </p>
        </Drawer.Content>
      </Drawer.Popup>
    </Drawer.Portal>
  </Drawer.Root>
);

export const LeftAnchor: StoryFn = () => (
  <Drawer.Root anchor="left">
    <Drawer.Trigger render={<Button variant="secondary" />}>
      Open left drawer
    </Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Popup>
        <Drawer.Header>
          <Drawer.Title>Navigation</Drawer.Title>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Content>
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Home", "Products", "About", "Contact"].map((item) => (
                <li key={item} style={{ padding: "12px 0" }}>
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </Drawer.Content>
      </Drawer.Popup>
    </Drawer.Portal>
  </Drawer.Root>
);

export const BottomSheet: StoryFn = () => (
  <Drawer.Root anchor="bottom">
    <Drawer.Trigger render={<Button variant="secondary" />}>
      Open bottom sheet
    </Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Popup>
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Content>
          <p>Bottom sheet content — useful for mobile-style interactions.</p>
        </Drawer.Content>
      </Drawer.Popup>
    </Drawer.Portal>
  </Drawer.Root>
);

export const Sizes: StoryFn = () => (
  <div style={{ display: "flex", gap: 12 }}>
    {(["small", "medium", "large"] as const).map((size) => (
      <Drawer.Root key={size} size={size}>
        <Drawer.Trigger render={<Button variant="secondary" />}>
          {size}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup>
            <Drawer.Header>
              <Drawer.Title>
                {size.charAt(0).toUpperCase() + size.slice(1)} drawer
              </Drawer.Title>
              <Drawer.Close />
            </Drawer.Header>
            <Drawer.Content>
              <p>This drawer uses the &quot;{size}&quot; size variant.</p>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>
    ))}
  </div>
);
