# Vercel Environment Variable Manager

This project provides a convenient way to manage and delete environment variables on Vercel. It streamlines the process, allowing users to easily select and delete environment variables associated with their Vercel projects.

## Features

- List environment variables for a specified Vercel project.
- Select and delete multiple environment variables at once.
- Simple and intuitive user interface.
- Secure handling of Vercel access tokens.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Vercel account and access to the project(s) you wish to manage.
- You have generated a Vercel access token with appropriate permissions.

## Installation and Setup

To install and run the Vercel Environment Variable Manager, follow these steps:

1. Clone the repository:

   git clone [repository URL]

2. Navigate to the project directory:

   cd [project-directory]

3. Install the necessary dependencies:

   npm install

4. Create a .env file in the root directory of the project and populate it with the following environment variables:

   ```
   VITE_PROJ_ID=[Your Vercel Project ID]
   VITE_ACCESS_TOKEN=[Your Vercel Access Token]
   VITE_VERCEL_ID=[Your Vercel User ID]
   VITE_VERCEL_ENDPOINT=https://api.vercel.com/v9/projects
   VITE_VERCEL_TEAM_ID=[Your Vercel Team ID]
   ```

   Replace the bracketed values with your actual Vercel project ID, access token, user, and team ID.

5. Run the application:

   npm run dev

   This will start the application in development mode.

## Usage

Once the application is running, navigate to the web interface where you can view and manage your Vercel environment variables. The interface allows you to:

- View a list of all environment variables for the specified project.
- Select multiple environment variables and delete them with a single action.

## License

This project is licensed under the MIT License.
