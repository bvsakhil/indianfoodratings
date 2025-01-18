import { useState } from 'react'
import { Star } from 'lucide-react'

interface CityItemProps {
  city: string
  rank: number
  foodItem: string
  votes: number
  voteCount: number
  onVote: (rating: number) => void
  userVoted: boolean
}

export default function CityItem({ city, rank, foodItem, votes, voteCount, onVote, userVoted }: CityItemProps) {
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleVote = (rating: number) => {
    if (!userVoted) {
      onVote(rating)
      setHoveredRating(0)
    }
  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-300 last:border-b-0">
      <div className="flex items-center space-x-3">
        <span className="font-mono text-sm text-gray-500">#{rank}</span>
        <h3 className="text-sm font-medium text-gray-700">{city}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">
          {votes > 0 ? `${(votes / 10).toFixed(1)}` : '0.0'}
        </span>
        <span className="text-xs text-gray-400">({voteCount})</span>
        {!userVoted && (
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 cursor-pointer transition-colors ${
                  star <= hoveredRating ? 'text-gray-600' : 'text-gray-300'
                }`}
                fill={star <= hoveredRating ? 'currentColor' : 'none'}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleVote(star * 2)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

