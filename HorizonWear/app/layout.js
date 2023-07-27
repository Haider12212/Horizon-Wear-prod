import './globals.css'
import { Inter } from 'next/font/google'
import SessionProviders from '../context/AuthProvider'
import Navbar from './components/Navbar'
import { CartProvider } from '@/context/CartContext'
import Footer from './components/Footer'
const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head'

export const metadata = {
  title: 'Horizon Wear',
  description: 'Horizon Wear: Elevating Your Style Beyond Boundaries!',
  icon: "/favicon.ico" // Check if the path is correct and the file exists in the correct location
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href={metadata.icon} type="image/x-icon" />
      </Head>
      <body className={inter.className}>
        <SessionProviders>
          <CartProvider>
            <Navbar />
            {/* <Slider /> */}
            <div>
              {children}
            </div>
            <Footer />
          </CartProvider>
        </SessionProviders>
      </body>
    </html>
  )
}
