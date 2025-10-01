# GitHub Trending Repos Project

This project list the most starred Github repos that were created in the last 30 days with option to simulate rating any of the repo from the details dialog.

## Project Details

- **Purpose:** List the most starred Github repos that were created in the last 30 days.
- **Tech Stack:**  
  - **Angular**: Frontend UI.
  - **Fetch**: HTTP client for API calls.

## Choice of Libraries

Library choices are documented in the [ADR (Architecture Decision Records)](./src/docs/adr/) folder:

- **TailwindCSS**: Utilized for utility-first and responsive UI styling ([ADR-001](./src/docs/adr/001-use-tailwindcss-for-styling.md)).
- **spartan-ng-ui**: Adopted for ready-to-use Angular UI components to accelerate development ([ADR-003](./src/docs/adr/003-use-spartan-ng-ui-library.md)).
- **lucide-icon**: Used for modern, customizable SVG icons in the UI ([ADR-002](./src/docs/adr/002-use-lucide-icons.md)).

## How to Run the Project

1. **Clone the repository:**

   ```sh
   git clone https://github.com/johnniexson/github-stars.git
   cd github-stars
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend:**

   ```sh
   npm run start
   ```

4. **Access the app:**  
   Open [http://localhost:4200](http://localhost:4200) in your browser.

For more details, see the [ADR docs](./src/docs/adr/) and the [README.md](./README.md).
