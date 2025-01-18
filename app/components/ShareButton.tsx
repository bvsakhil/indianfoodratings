'use client'

import { Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Indian Food Ratings',
          text: 'Check out these Indian food ratings!',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent('Check out these Indian food ratings!')
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    }
  }

  return (
    <Button onClick={handleShare} variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
      <Share2 className="h-4 w-4" />
    </Button>
  )
}

