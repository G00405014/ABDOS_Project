# Contributing to ABDOS

Thank you for your interest in contributing to ABDOS! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Write or update tests as needed
5. Update documentation as needed
6. Submit a pull request

### Prerequisites

- Node.js 16.x or higher
- PostgreSQL 13.x or higher
- Git

### Setting Up the Development Environment

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ABDOS_Project.git
   cd ABDOS_Project
   ```

2. Install dependencies:
   ```bash
   cd frontend/web
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request from your fork to our main repository

### Pull Request Guidelines

- Provide a clear description of the changes
- Include any relevant issue numbers
- Update documentation if needed
- Add tests for new features
- Ensure all tests pass
- Follow the existing code style

### Testing

Run the test suite:
```bash
npm test
```

### Documentation

- Update README.md if you change functionality
- Comment your code where necessary
- Update API documentation for any endpoint changes

## Project Structure

```
frontend/web/
├── components/     # React components
├── pages/         # Next.js pages and API routes
├── public/        # Static assets
├── styles/        # Global styles
├── prisma/        # Database schema and migrations
└── tests/         # Test files
```

## Getting Help

- Create an issue for bugs or feature requests
- Join our community discussions
- Read our [documentation](docs/)

## License

By contributing to ABDOS, you agree that your contributions will be licensed under the MIT License. See [LICENSE](LICENSE) for details. 