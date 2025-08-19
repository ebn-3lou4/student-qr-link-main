# Student QR Link

A modern React-based project for generating QR codes that display student profiles with parent contact information. Built with the latest frontend technologies for responsive web applications.

## 🚀 Features

- **React 18** - Latest React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TypeScript** - Type-safe JavaScript for better development experience
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **shadcn/ui** - Beautiful and accessible UI components built with Radix UI
- **QR Code Generation** - Dynamic QR codes with student data and contact info
- **Local Storage** - Persistent form data and saved student records
- **Responsive Design** - Mobile-first design that works on all devices
- **WhatsApp Integration** - Direct WhatsApp messaging with proper country codes
- **Image Support** - Optional student photo integration in QR codes

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

## 🛠️ Installation

Install dependencies:

```bash
npm install
# or
yarn install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
student-qr-link-main/
├── public/                 # Static assets and Netlify config
│   ├── _redirects         # SPA routing for Netlify
│   └── favicon.ico       # Site favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── StudentForm.tsx      # Student data input form
│   │   ├── StudentProfile.tsx   # Student profile display
│   │   └── QRCodeDisplay.tsx    # QR code generation
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Main page with form
│   │   ├── StudentView.tsx      # Student profile view
│   │   └── NotFound.tsx  # 404 error page
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and Tailwind configuration
├── netlify.toml          # Netlify deployment configuration
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `App.tsx` file:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/student" element={<StudentView />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </BrowserRouter>
);
```

## 🎨 Styling

This project uses Tailwind CSS for styling with custom CSS variables for theming:

- **Custom Color System** - HSL-based color palette with light/dark mode support
- **Component Variants** - Consistent button, card, and form styling
- **Responsive Utilities** - Mobile-first responsive design
- **Animation Classes** - Smooth transitions and hover effects
- **Gradient Utilities** - Beautiful gradient backgrounds and buttons

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints and custom container utilities.

## 🔧 Key Features

### Student Management
- Create and edit student profiles
- Store parent contact information
- Generate unique QR codes for each student
- Local storage for data persistence

### QR Code Features
- Compact URL parameters for smaller QR codes
- Gender-based color theming
- Optional student photo integration
- Optimized for ID sticker printing

### Contact Integration
- Direct phone calling
- WhatsApp messaging with +20 country code
- Contact information display
- Responsive contact cards

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

### Netlify Deployment
- Build command: `npm run build`
- Publish directory: `dist`
- Automatic deployments on Git push
- SPA routing configured via `netlify.toml`

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ebn-3lou4/student-qr-link-main.git
   cd student-qr-link-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080`

## 🎯 Usage

1. **Fill out the student form** with name, class, school, and parent contact info
2. **Select gender** for appropriate theming
3. **Generate QR code** - automatically saved to local storage
4. **Scan QR code** to view student profile
5. **Contact parents** directly via phone or WhatsApp

## 🛠️ Development

- **Form Validation** - Built-in validation for required fields
- **Error Handling** - Toast notifications for user feedback
- **State Management** - React hooks for local state
- **Type Safety** - Full TypeScript support

## 🙏 Acknowledgments

- Powered by React 18 and Vite
- Styled with Tailwind CSS
- UI Components by shadcn/ui
- Built with ❤️ by [noureldeen 3lou4](https://github.com/ebn-3lou4)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
