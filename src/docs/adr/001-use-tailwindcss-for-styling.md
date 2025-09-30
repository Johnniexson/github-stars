
# ADR 001: Use Tailwind CSS for Styling

## Status

Accepted

## Context

We need a robust, maintainable, and scalable approach to styling our application. Traditional CSS and component-scoped styles can become difficult to manage as the project grows. We want to ensure consistency, rapid development, and easy customization.

## Decision

We will use Tailwind CSS as our primary utility-first CSS framework for styling the application.

## Consequences

- Developers will use utility classes in HTML templates for styling, reducing the need for custom CSS.
- The build process will include Tailwind’s PostCSS plugin to purge unused styles and optimize the final CSS bundle.
- Team members must become familiar with Tailwind’s utility classes and configuration.
- Custom design tokens and themes can be managed via Tailwind’s configuration file.
- The project will benefit from rapid prototyping, consistent design, and easier maintenance.
