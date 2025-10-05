# OpenSox Frontend

OpenSox is a frontend application built with Next.js, TypeScript, and Tailwind CSS that integrates with an Express backend for open-source discovery and gamification. This application provides a user-friendly interface to explore repositories, contributors, issues, pull requests, and more.

## Features

- **Search Repositories**: Quickly find repositories using the search functionality.
- **Project Details**: View detailed information about specific repositories, including contributors, issues, pull requests, and releases.
- **Good First Issues**: Discover repositories that have good first issues for new contributors.
- **Difficulty Filter**: Filter repositories based on difficulty levels.
- **Contributors Sort**: Sort repositories by the number of contributors.
- **Pull Requests Sort**: Sort repositories by the number of pull requests.
- **Camp Organization Filter**: Filter repositories based on participation in various camp organizations.
- **Contribution Cartography**: Visualize contributions for specific users.
- **Gamified Dashboard**: Track contributions, streaks, badges, and milestones for users.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/opensox-frontend.git
   cd opensox-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add your backend API URL:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/github
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm start
# or
yarn start
```

## Folder Structure

```
opensox-frontend
├── app                   # Next.js application pages
│   ├── layout.tsx       # Main layout with Navbar and Footer
│   ├── page.tsx         # Landing page
│   ├── search            # Search functionality
│   ├── project           # Project details and related pages
│   ├── good-first-issue  # Good first issues page
│   ├── difficulty        # Difficulty filter page
│   ├── contributors-sort  # Contributors sort page
│   ├── prs-sort          # Pull requests sort page
│   ├── camp-org          # Camp organization filter page
│   ├── cartography       # Contribution cartography page
│   ├── gamify            # Gamified dashboard page
│   └── not-found.tsx     # 404 error page
├── components            # Reusable components
├── lib                   # API utility functions
├── styles                # Global styles
├── public                # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.