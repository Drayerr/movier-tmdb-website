export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-2 z-10 liquid-glass">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-text-light/60 dark:text-text-dark/60 transition-colors duration-300">
          © {currentYear} Gabriel's 3035-tech-test. All Rights Reserved.
        </p>
        <p className="text-xs mt-1 text-text-light/40 dark:text-text-dark/40">
          Built with React, Vite, and TypeScript.
        </p>
      </div>
    </footer>
  );
}
