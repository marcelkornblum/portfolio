# Marcel Kornblum's Portfolio Website

This is my personal portfolio website, built to showcase my skills, experience, projects, and passions.

## Description

This website serves as a central hub for my professional information. It's designed to be visually engaging and informative, providing visitors with a clear overview of my background and capabilities.

## Features

- **Home Page:** Introduces me and provides a brief summary.
- **Experience Timeline:** A visual timeline showcasing my professional experience.
- **Skills Page:** A detailed list of my skills, with evidence points and links to related experiences.
- **Projects Page:** A showcase of my projects.
- **Awards Page:** A list of my awards.
- **Interests Page:** A page dedicated to my interests, hobbies, and passions.
- **Contact Page:** A page with my contact information and a more detailed "about me" section.
- **Responsive Design:** The website is designed to look great on all devices.
- **Global Navigation:** A navigation bar that is present on all pages.

## Technologies Used

- **Next.js:** A React framework for building server-rendered and statically generated web applications.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Sanity.io:** A headless CMS for managing content.
- **Geist:** A font library.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd portfolio
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4.  **Set up Sanity:**
    - Create a Sanity account and project.
    - Install the Sanity CLI: `npm install -g @sanity/cli`
    - Log in to Sanity: `sanity login`
    - Navigate to the sanity studio folder: `cd sanity/studio-portfolio`
    - Start the studio: `sanity start`
    - Copy the project ID and dataset name from your Sanity project settings.
    - Create a `.env.local` file in the root of your Next.js project and add the following:
      ```
      NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
      NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
      ```
5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
6.  **Open your browser:** Go to `http://localhost:3000`.

## Usage Instructions

- **Content Management:** Use the Sanity Studio to manage the content of the website (e.g., experiences, skills, projects, awards, passions, about, contact).
- **Navigation:** Use the navigation bar to navigate between the different pages.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

Marcel Kornblum - marcel.kornblum@gmail.com
