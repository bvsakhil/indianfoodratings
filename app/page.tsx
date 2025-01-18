import FoodLeaderboard from './components/FoodLeaderboard'
import ShareButton from './components/ShareButton'

const cities = [
    { id: '1', name: 'City A' },
    { id: '2', name: 'City B' },
    { id: '3', name: 'City C' },
];

export default function Home() {
    return (
        <main className="container mx-auto p-4 max-w-md">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-mono text-gray-800">/indianfoodratings</h1>
                        <p className="text-sm text-gray-600 font-mono">city wise ratings of food in India</p>
                    </div>
                    <ShareButton />
                </div>
                <div className="p-4 bg-white">
                    <FoodLeaderboard cities={cities} />
                </div>
                <div className="bg-gray-100 p-2 text-center text-xs text-gray-500 border-t border-gray-200 font-mono">
                    Thank you for your votes!
                </div>
            </div>
        </main>
    )
}

