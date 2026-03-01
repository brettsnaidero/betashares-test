# Betashares Test

A Next.js project with TypeScript, CSS Modules, Base UI, Storybook, and Vitest.

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling
- **Base UI** - UI component primitives
- **Storybook** - Component UI demos
- **Vitest** - Unit testing
- **Testing Library** - Component testing utilities

## Key features/improvements

### Search bar accessibility

I have developed the search bar to use a [combobox UI pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), leveraging the `Combobox` primitive from [Base UI](https://base-ui.com/) to simplify the implementation and handle basic keyboard navigation management and other accessibility concerns.

### Animation

Subtle animations have been implemented to enhance the usability and general sense of quality of the experience, with feedback states for loading and transition states that clearly communicate what is occuring to the user.

## Things that could be improved next

### Type safety

In this implementation I have manually typed the Search API's filter options and response shape. If the endpoint has some documentation available (e.g. Swagger) we could autogenerate the Typescript types for more specific type safety.

### Semantic token system

I've created a basic variable system of styling values (colours, spacings, typography), but this would be difficult to scale and adapt. A mapping of the basic brand attributes to a semantic system of tokens would allow for easier maintenance (e.g. rolling out branding changes) and enable theming and other opportunties.

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Storybook

Run Storybook for component development:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser.

### Testing

Run tests:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── Button/       # Example component with tests and stories
├── styles/           # Global styles
├── hooks/            # React hooks
├── lib/              # Libraries (e.g. services)
└── test/             # Test setup and utilities
```
