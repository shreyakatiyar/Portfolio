import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Shreya Katiyar — Frontend Developer',
  description:
    'Frontend Developer specializing in React.js and Next.js. Building beautiful, performant web experiences that users love.',
  keywords: [
    'Shreya Katiyar',
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'Shreya Katiyar' }],
  openGraph: {
    title: 'Shreya Katiyar — Frontend Developer',
    description:
      'Frontend Developer specializing in React.js and Next.js. Building beautiful, performant web experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreya Katiyar — Frontend Developer',
    description: 'Frontend Developer specializing in React.js and Next.js.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://shreyakatiyar.dev'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      {/* Runs before React hydrates — sets the correct theme class instantly to prevent FOUC */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.classList.add('light')}else{d.classList.remove('light');d.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            {children}
            <ThemeToggle />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
