import React from 'react'

interface ShimmerLoadingProps {
  count: number
}

const ShimmerLoading: React.FC<ShimmerLoadingProps> = ({ count }) => {
  const shimmerCards = new Array(count).fill(null)

  return (
    <>
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="my-2 flex animate-pulse items-center rounded-lg bg-gray-700 shadow-lg"
        >
          <div className="relative h-48 w-1/3 rounded-l-lg bg-gray-600"></div>
          <div className="w-2/3 p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-600"></div>
            <div className="mb-4 h-4 w-1/4 rounded bg-gray-600"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-600"></div>
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-600"></div>
            <div className="h-4 w-1/2 rounded bg-gray-600"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ShimmerLoading
