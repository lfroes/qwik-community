# Qwik Community Application

A modern community application built with Qwik, TypeScript, and GraphQL, featuring a responsive design and dark mode support.

## 🚀 Features

- **Posts Management**

  - List and view posts from GraphQL API
  - Create new posts (stored in local state)
  - Individual post views with detailed information
  - Search functionality across all posts
  - Pagination support

- **UI/UX**

  - Responsive design using Tailwind CSS
  - Dark/Light theme toggle
  - Loading states and skeleton loading
  - Clean and modern interface

- **Technical Features**
  - GraphQL integration with proper queries
  - State management using Qwik Context
  - TypeScript for type safety
  - Reusable components architecture
  - Client-side search and filtering

## 🛠️ Technology Stack

- [Qwik](https://qwik.dev/) - Framework for building instant web applications
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [GraphQL](https://graphql.org/) - API query language
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

## 📦 Installation

Make sure you have Node.js installed (^18.17.0 || ^20.3.0 || >=21.0.0)

```bash
# Clone the repository
git clone https://github.com/lfroes/qwik-community.git

# Navigate to project directory
cd qwik-community

# Install dependencies
pnpm install

# Start the development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run linting
npm run lint

# Format code
pnpm run fmt
```

## Project Structure

```bash
src/
├── components/        # Reusable UI components
├── routes/           # Application routes
├── lib/
│   ├── graphql/     # GraphQL queries & client
│   ├── store/       # State management
│   └── utils/       # Utility functions
└── global.css       # Global styles
```

## Core Components

### Posts List

- Main component for displaying paginated posts
- Implements infinite scroll pagination
- Handles both API and local posts seamlessly
- Real-time search integration

### Post View

- Individual post display with detailed information
- Dynamic routing with post ID
- Handles both remote and local posts
- Preserves state during navigation

### Search Bar

- Real-time search functionality
- Term highlighting in results
- Debounced search implementation
- Case-insensitive searching

### Theme Toggle

- Dark/Light mode switcher
- Persistent theme preference
- Smooth transition animations
- System preference detection

### Pagination

- Dynamic page navigation
- Configurable items per page
- State-preserved pagination
- SEO-friendly URL updates

## State Management

The application leverages Qwik's Context API for efficient state management:

### Posts Context

```typescript
interface PostsStore {
  posts: Post[]; // Remote posts
  localPosts: Post[]; // Locally created posts
  searchPosts: Post[]; // Filtered search results
  combinedPosts: Post[]; // Combined local and remote posts
  currentPosts: Post[]; // Currently displayed posts
  searchTerm: string; // Current search query
  currentPage: number; // Active page number
  totalPages: number; // Total available pages
}
```

### Key Features

- Centralized state management
- Optimized re-renders
- Persistent local state
- Efficient data updates

## Styling

### Tailwind Integration

- Utility-first CSS approach
- Custom theme configuration
- Responsive design utilities
- Component-specific styles

### Theme System

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... other theme variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme overrides */
}
```

### Design Principles

- Mobile-first approach
- Consistent spacing system
- Accessible color contrast
- Smooth transitions

## Performance Optimizations

### State Updates

- Granular component updates
- Memoized computations
- Efficient context usage
- Optimized re-render triggers

### Data Handling

- Paginated data fetching
- Search debouncing
- Cached results
- Optimistic updates

### Loading States

- Skeleton loading
- Progressive enhancement
- Smooth transitions
- Error boundaries

## Browser Support

Tested and optimized for:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- [Luiz Froes](<https://github.co>
