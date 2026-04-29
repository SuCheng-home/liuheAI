import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: '茉莉智创 · 六合区AI教育智能体共创平台',
  description:
    '茉莉智创 — 南京市六合区AI教育智能体共创平台。汇聚区域优质教育智能体，搭建师生共创、共享、共赛的人工智能教育生态。',
  keywords: [
    '六合区',
    '茉莉智创',
    '茉莉慧学',
    'AI 教育',
    '人工智能',
    '智能体共创',
    '智能体中心',
    '竞赛活动',
    '南京市六合区教育局',
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#3f8a5e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body
        className={`${notoSansSC.variable} ${notoSerifSC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
