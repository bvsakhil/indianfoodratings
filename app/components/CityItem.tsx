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
  remainingVotes: number
  canVote: boolean
}

export default function CityItem({ city, rank, foodItem, votes, voteCount, onVote, userVoted, remainingVotes, canVote }: CityItemProps) {
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleVote = (rating: number) => {
    if (canVote) {
      onVote(rating)
      setHoveredRating(0)
    } else if (userVoted) {
      alert(`You have already voted for ${city} in this category!`)
    } else {
      alert(`You have used all your votes for ${foodItem}. Try voting for other food items!`)
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
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 cursor-pointer transition-colors ${
                userVoted && votes / 2 >= star
                  ? 'text-gray-600'
                  : star <= hoveredRating && canVote
                  ? 'text-gray-600'
                  : 'text-gray-300'
              }`}
              fill={userVoted && votes / 2 >= star ? 'currentColor' : star <= hoveredRating && canVote ? 'currentColor' : 'none'}
              onMouseEnter={() => canVote && setHoveredRating(star)}
              onMouseLeave={() => canVote && setHoveredRating(0)}
              onClick={() => handleVote(star * 2)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

