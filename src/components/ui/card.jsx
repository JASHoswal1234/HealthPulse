// src/components/ui/card.jsx
import { forwardRef } from 'react'

const Card = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      rounded-2xl lg:rounded-3xl 
      border border-gray-100 
      bg-white 
      shadow-sm hover:shadow-xl 
      transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'

const CardHeader = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-4 lg:p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef(({ className = '', children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`
      text-lg lg:text-xl font-bold 
      leading-none tracking-tight 
      text-gray-900
      ${className}
    `}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef(({ className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-gray-600 ${className}`}
    {...props}
  >
    {children}
  </p>
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef(({ className = '', children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`p-4 lg:p-6 pt-0 ${className}`} 
    {...props}
  >
    {children}
  </div>
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-4 lg:p-6 pt-0 ${className}`}
    {...props}
  >
    {children}
  </div>
))
CardFooter.displayName = 'CardFooter'

// Glass Card Variant
const GlassCard = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      rounded-2xl lg:rounded-3xl 
      bg-white/80 backdrop-blur-xl 
      border border-white/50 
      shadow-lg hover:shadow-2xl 
      transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
))
GlassCard.displayName = 'GlassCard'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, GlassCard }