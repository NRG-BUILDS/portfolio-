import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Emmanuel Omolaju: Portfolio',
  description: 'Projects built by NRG',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        
          <script src="https://kit.fontawesome.com/dfd5b6faa1.js" crossOrigin='anonymous'></script>
      </body>
    </html>
  )
}
