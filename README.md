# betashares-test

A TypeScript boilerplate NextJS app with Vite, Storybook, and Vitest.

## Features

- **Next.js 16**: React framework for production
- **TypeScript**: Type-safe development
- **Vite**: Fast development server and build tool
- **Storybook**: Component development and documentation
- **Vitest**: Fast unit testing with React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Storybook

Run Storybook for component development:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

### Testing

Run unit tests with Vitest:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Generate coverage report:

```bash
npm run test:coverage
```

### Building

Build the Next.js application:

```bash
npm run build
```

Build Storybook:

```bash
npm run build-storybook
```

## Project Structure

```
.
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Card.tsx         # Component implementation
│   ├── Card.test.tsx    # Component tests
│   ├── Card.stories.tsx # Storybook stories
│   └── Card.module.css  # Component styles
├── stories/             # Default Storybook examples
├── .storybook/          # Storybook configuration
├── public/              # Static assets
├── vitest.config.ts     # Vitest configuration
├── vite.config.ts       # Vite configuration
├── next.config.ts       # Next.js configuration
└── tsconfig.json        # TypeScript configuration
```

## Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application
- `npm start` - Start production server
- `npm test` - Run Vitest tests
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Vitest Documentation](https://vitest.dev/)

