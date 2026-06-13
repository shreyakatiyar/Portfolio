import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-[#0F172A] text-[#F8FAFC] antialiased">
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
