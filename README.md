# Repolist
![CI](https://github.com/dianhan8/repolist/actions/workflows/deploy.yml/badge.svg)


### Web URL
https://dianhan8.github.io/repolist/

### Tech Stack
- **React** - Frontend framework
- **TypeScript** - Type safety
- **react-hook-form** - Form handling
- **yup** - Schema validation
- **axios** - HTTP client
- **vitest** - Unit testing
- **Vite** - Build tool

### Prerequisites
- Node.js version 20 or higher
- npm or yarn package manager

### Setup Project
1. Clone this project into your computer
```bash
git clone <repositoryurl>
```

2. Navigate to project directory
```bash
cd repolist
```

3. Install all packages
```bash
npm install
```

4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests

### Setup for Testing
1. Install additional packages for Playwright
```bash
npx playwright install
```

2. Run tests
```bash
npm run test        # Unit tests
```

### Project Structure
```
src/
├── assets/        # contain all assets
├── components/    # Reusable UI components
├── pages/         # Page components
├── context/       # custom react context
├── services/      # services for call api
├── hooks/         # Custom React hooks
└── tests/         # Test files
```

### License
This project is licensed under the MIT License.