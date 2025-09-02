# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, React, shadcn/ui, and Tailwind CSS. Features a clean monochrome black and white theme with smooth animations and excellent user experience.

## 🚀 Features

- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern UI**: Clean monochrome theme using shadcn/ui components
- **Smooth Navigation**: Smooth scrolling between sections
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Beautiful project cards with technology badges
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading with Next.js optimization

## 📋 Sections

1. **Navbar**: Fixed navigation with mobile menu
2. **Hero**: Compelling introduction with call-to-action buttons
3. **About**: Personal information, skills, and experience
4. **Projects**: Portfolio showcase with project details
5. **Contact**: Contact form and contact information
6. **Footer**: Social links and additional navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: SVG icons (built-in)
- **Font**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update the job title and description

2. **About Section** (`src/components/About.tsx`):
   - Update the personal description
   - Modify skills array with your skills
   - Update experience array with your work history

3. **Projects Section** (`src/components/Projects.tsx`):
   - Replace project data with your actual projects
   - Update project descriptions, technologies, and links
   - Add your project images

4. **Contact Section** (`src/components/Contact.tsx`):
   - Update email address
   - Change location
   - Update LinkedIn profile URL

5. **Footer** (`src/components/Footer.tsx`):
   - Update social media links
   - Change contact information
   - Update copyright name

### Styling

The portfolio uses a monochrome theme with shadcn/ui. To customize colors:

1. **Theme Colors**: Modify CSS variables in `src/app/globals.css`
2. **Component Styling**: Update Tailwind classes in component files
3. **Dark Mode**: The theme supports dark mode automatically

### Adding New Sections

To add new sections:

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to open an issue on GitHub.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
