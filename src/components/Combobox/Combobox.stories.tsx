import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Combobox } from "./Combobox";

interface Fruit {
  id: string;
  name: string;
  emoji: string;
}

const allFruits: Fruit[] = [
  { id: "1", name: "Apple", emoji: "🍎" },
  { id: "2", name: "Banana", emoji: "🍌" },
  { id: "3", name: "Cherry", emoji: "🍒" },
  { id: "4", name: "Dragon Fruit", emoji: "🐉" },
  { id: "5", name: "Elderberry", emoji: "🫐" },
  { id: "6", name: "Fig", emoji: "🫒" },
  { id: "7", name: "Grape", emoji: "🍇" },
];

const meta: Meta = {
  title: "Components/Combobox",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryFn = () => {
  const [items, setItems] = useState(allFruits);

  return (
    <div style={{ width: 400 }}>
      <Combobox<Fruit>
        items={items}
        onInputValueChange={(value) => {
          const filtered = allFruits.filter((f) =>
            f.name.toLowerCase().includes(value.toLowerCase())
          );
          setItems(filtered);
        }}
        getItemLabel={(item) => item.name}
        getItemValue={(item) => item.id}
        renderItem={(item) => (
          <span>
            {item.emoji} {item.name}
          </span>
        )}
        onValueChange={(item) => console.log("Selected:", item)}
        placeholder="Search fruits…"
        aria-label="Search fruits"
      />
    </div>
  );
};

export const Loading: StoryFn = () => (
  <div style={{ width: 400 }}>
    <Combobox
      items={[]}
      onInputValueChange={() => {}}
      getItemLabel={() => ""}
      getItemValue={() => ""}
      placeholder="Loading example…"
      aria-label="Loading example"
      isLoading
    />
  </div>
);

export const Empty: StoryFn = () => (
  <div style={{ width: 400 }}>
    <Combobox
      items={[]}
      onInputValueChange={() => {}}
      getItemLabel={() => ""}
      getItemValue={() => ""}
      placeholder="No results example…"
      aria-label="Empty example"
      emptyMessage="No fruits found — try a different search"
    />
  </div>
);

const popularFruits: Fruit[] = [
  { id: "1", name: "Apple", emoji: "🍎" },
  { id: "3", name: "Cherry", emoji: "🍒" },
  { id: "7", name: "Grape", emoji: "🍇" },
];

export const SuggestionsOnFocus: StoryFn = () => {
  const [items, setItems] = useState(popularFruits);

  return (
    <div style={{ width: 400 }}>
      <Combobox<Fruit>
        items={items}
        showOnEmpty
        onInputValueChange={(value) => {
          if (value.trim() === "") {
            setItems(popularFruits);
          } else {
            setItems(
              allFruits.filter((f) =>
                f.name.toLowerCase().includes(value.toLowerCase())
              )
            );
          }
        }}
        getItemLabel={(item) => item.name}
        getItemValue={(item) => item.id}
        renderItem={(item) => (
          <span>
            {item.emoji} {item.name}
          </span>
        )}
        onValueChange={(item) => console.log("Selected:", item)}
        placeholder="Focus to see suggestions…"
        aria-label="Search with suggestions"
        emptyMessage="No matching fruits"
      />
    </div>
  );
};

export const Error: StoryFn = () => (
  <div style={{ width: 400 }}>
    <Combobox
      items={[]}
      onInputValueChange={() => {}}
      getItemLabel={() => ""}
      getItemValue={() => ""}
      placeholder="Error example…"
      aria-label="Error example"
      isError
      errorMessage="Unable to load results — please try again"
    />
  </div>
);
