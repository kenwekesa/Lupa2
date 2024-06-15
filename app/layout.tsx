// Import the Metadata type from the 'next' module
import type { Metadata } from 'next'

// Import global styles from the 'globals.css' file
import './globals.css'

// Import React components for the layout
import Navbar from './components/navbar/Navbar'
import Modal from './components/Modals/Modal'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './components/providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUsers'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'
import Footer from './components/footer/Footer'
import TourModal from './components/Modals/TourModal'
import BlogModal from './components/Modals/BlogModal'
import NewsModal from './components/Modals/NewsModal'

// Define metadata for the page
export const metadata: Metadata = {
  title: {
    default: "Devanca Tours: Your Ultimate Travel and Tour Agency!",
    template: "%s - Devanca Tours: Your Ultimate Travel and Tour Agency!"
  },
  description: 'Book customized vacations, tours, and travel packages worldwide with Devanca Tours, your ultimate bespoke travel agency.',
  keywords: "Tour Travel Vacations Holidays Packages Worldwide Bespoke"
}

// RootLayout function component definition
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the current user asynchronously
  const currentUser = await getCurrentUser()

  // Return the HTML structure for the entire page layout
  return (
    <html lang="en">
      <body>
        {/* Implement a provider for displaying toasts throughout the website */}
        <ToasterProvider />

        {/* Render different modals for registration, renting, searching, and logging in */}
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <LoginModal />
        <TourModal />
        <BlogModal />
        <NewsModal />
        {/* Render the main navigation bar with the current user information */}
        <div className='layout-navbar'><Navbar currentUser={currentUser} /></div>
        {/* Main content container with top and bottom padding */}
        <div className='pb-20 pt-28'>
          {children} {/* Render the children components passed to RootLayout */}
        </div>

        <Footer />
      </body>
    </html>
  )
}

