import FoodLeaderboard from './components/FoodLeaderboard'
import ShareButton from './components/ShareButton'

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-md">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-mono text-gray-800">/indianfoodratings</h1>
            <p className="text-sm text-gray-600 font-mono">city wise ratings of food in india</p>
          </div>
          <ShareButton />
        </div>
        <div className="p-4 bg-white">
          <FoodLeaderboard />
        </div>
        <div className="bg-gray-100 p-2 text-center text-xs text-gray-500 border-t border-gray-200 font-mono">
          Thank you for your votes!
        </div>
      </div>
    </main>
  )
}

