# Betashares Test

A Next.js project with TypeScript, CSS Modules, Base UI, Storybook, and Vitest.

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling
- **Base UI** - Unstyled UI components
- **Storybook** - Component development
- **Vitest** - Unit testing
- **Testing Library** - Component testing utilities

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

Run tests with coverage:

```bash
npm run test:coverage
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── Button/       # Example component with tests and stories
├── styles/           # Global styles
└── test/             # Test setup and utilities
```

