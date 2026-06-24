import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ticksol Corporate Travel & Tours | Premium Travel Solutions',
  description: 'Premium corporate travel and global tour solutions. 30+ years of trusted travel excellence. Flights, Visas, Hajj & Umrah, Hotel Bookings, and Custom Tour Packages.',
  keywords: 'corporate travel, tour packages, visa processing, hajj umrah, flight booking, hotel reservation, Pakistan travel agency',
  openGraph: {
    title: 'Ticksol Corporate Travel & Tours',
    description: 'Premium Corporate Travel & Global Tour Solutions - 30+ Years of Excellence',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ticksol Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ticksol Corporate Travel & Tours',
    description: 'Premium Corporate Travel & Global Tour Solutions',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 31, 48, 0.95)',
              color: '#f0f0f0',
              border: '1px solid rgba(230, 175, 26, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            },
            success: { iconTheme: { primary: '#e6af1a', secondary: '#040a12' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#040a12' } },
          }}
        />
      </body>
    </html>
  );
}
