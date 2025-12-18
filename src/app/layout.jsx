import './globals.css'
import Squares from "@/components/background/Squares";
import { TopNav } from '@/components/navigation/TopNav'
import { BottomNav } from '@/components/navigation/BottomNav'

export const metadata = {
  title: 'HealthPulse',
  description: 'Your Health Companion',
}

export const viewport = {
  themeColor: '#2DC6A8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="grammarly" content="false" />
        <meta name="grammarly-extension" content="false" />
      </head>
     <body 
  className="min-h-screen bg-gradient-to-br from-[#e8f7f7] via-[#f9fbff] to-[#d9e8ff] text-gray-900 font-sans antialiased"
  suppressHydrationWarning
>
{/* Subtle animated gradient background */}
<div className="fixed inset-0 -z-10 overflow-hidden">
  {/* Main gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 -z-10"></div>
   <div className="fixed inset-0 -z-10 opacity-60">
  <Squares 
    speed={0.6}
    squareSize={60}
    direction="down"
    borderColor="#04a8faff"
    hoverFillColor="#000000ff"
  />
</div>
  {/* Animated orbs */}
  <div className="absolute top-0 -left-20 w-96 h-96 bg-teal-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob -z-10"></div>
  <div className="absolute top-0 right-20 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 -z-10"></div>
  <div className="absolute -bottom-8 left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 -z-10"></div>
</div>
        {/* Desktop Top Navigation - Shows on lg screens and above */}
        <TopNav />

        {/* Main Content Area */}
        <div className="min-h-screen relative z-10">
          {/* Add padding-top for desktop to account for fixed nav */}
          <div className="lg:pt-20">
            {children}
          </div>
        </div>

        {/* Mobile Bottom Navigation - Shows on mobile only */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  )
}