'use client'
import Header from "../components/header/Header";
import { ThemeProvider } from "../hooks/useTheme";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <Header />
        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}