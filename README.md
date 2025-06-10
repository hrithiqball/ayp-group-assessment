# AYP Group Employee Management

Interview test for AYP Group Frontend Engineer position. This project is designed to manage employee information, allowing users to view, update, and manage employee records efficiently.

### Prerequisites

- **Node.js**: Version 22 or higher
- **pnpm**: Package manager (version 10.11.1 or higher)

### Installation & Setup

1. **Install dependencies** using pnpm:

   ```bash
   corepack enable pnpm
   corepack prepare pnpm@10.11.1 --activate
   ```

   Then, in the project directory, run:

   ```bash
   pnpm install
   ```

2. **Start the development server**:

   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Starts the development server with Turbopack |
| `pnpm build`        | Creates an optimized production build        |
| `pnpm start`        | Starts the production server                 |
| `pnpm lint`         | Runs ESLint to check for code issues         |
| `pnpm format`       | Formats code using Prettier                  |
| `pnpm format:check` | Checks if code is properly formatted         |


## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   └── home/             # Home page specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── employees.json        # Employee data source
```

### Notes for interviewers

- I initially setup prettier to ensure consistent code formatting. For me it is quite important to have consistent code formatting for readability and maintainability especially in a team environment
- Next step is to make reusable components using Tailwind CSS. Most of the stylinlg are copy pasted from shadcn/ui which provide clean tailwind styling
- I also installed radix-ui for accessibilty and better reusable components
- For context or side effects, I used Zustand which is a simple hooks. I also made isMobile hook to build responsive components
- Lastly, the core feature is the table, I implemented my own pagination for table since the employee data could be big. I did not use server components or server actions since the data is static hence updating the data is not a core feature. I do know and uses server components and server actions in my previous projects and understand the caching and revalidation of nextjs v14+(app router) quite well
- I do not intent to make test cases for components as I am not really a fan of testing UI components but I do make playwright tests for my current company project (which I really don't like either) also I feel like its overkill for this project
