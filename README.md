# 🚀 Professional Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-blue)

A modern, responsive portfolio website showcasing professional experience, projects, and technical expertise in a clean and interactive interface.

</div>

## ✨ Features

- 🎨 **Responsive Design**: Optimized for all screen sizes and devices
- 💫 **Modern UI/UX**: Clean and professional interface with smooth animations
- 🎮 **Interactive Components**: Engaging user interactions and transitions
- 📝 **Blog System**: Integrated blog platform with markdown support
- 🏆 **Project Showcase**: Dynamic project display with detailed information
- 📬 **Contact Section**: Professional contact form with validation
- 🤖 **AI Lab**: Interactive AI demonstration section
- 🌙 **Dark Mode**: Elegant dark theme optimized for readability

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Query
- **Routing**: React Router
- **Animations**: Framer Motion
- **UI Components**: Custom components with shadcn/ui
- **Markdown Support**: React Markdown
- **Icons**: Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pegahsalehi/pegah.no.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pegah.no
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://192.168.1.8:8080/](http://192.168.1.8:8080/) in your browser.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions and data
│   ├── styles/        # Global styles and Tailwind config
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## 🎨 Customization

### Adding Projects
Edit the project data in `src/lib/project-data.ts` to add or modify projects.

### Modifying Blog Posts
Update blog content in `src/lib/blog-data.ts` to manage blog posts.

### Styling
The project uses Tailwind CSS for styling. Custom styles can be added in:
- `src/styles/globals.css`
- `tailwind.config.js`

## 📦 Deployment

The project can be deployed to any static hosting service:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your preferred hosting service.

### Static rendering and crawler verification

`npm run build` builds the browser assets, prerenders the existing React portfolio into
`dist/index.html`, generates `dist/404.html`, and verifies the output. Run this full
command for deployments; running `vite build` directly only produces the HTML shell.
No production rendering server or additional dependencies are required.

Netlify uses the checked-in `netlify.toml` to run `npm run build`, publish `dist`,
and retain the existing `netlify/functions` backend. The sitemap contains only `/`:
section fragments and the English/Norwegian preference are not separate page URLs.

```bash
npm run typecheck
npm run lint
npm run build
npm run verify:build
npm run preview -- --host 127.0.0.1 --port 4173
# In another terminal: verify real HTTP responses without executing JavaScript.
npm run verify:build -- --url http://127.0.0.1:4173/
# After an approved deployment, the same check can target production.
npm run verify:build -- --url https://pegah.no/
```

See [the crawler accessibility audit](docs/crawler-accessibility.md) for the verified
production findings, file list, HTML examples, and existing check failures.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any inquiries or suggestions, please reach out through the contact form on the portfolio website.
