export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <path
          d="M8 9C8 8.44772 8.44772 8 9 8H23C23.5523 8 24 8.44772 24 9V23C24 23.5523 23.5523 24 23 24H9C8.44772 24 8 23.5523 8 23V9Z"
          fill="white"
        />
        <path d="M12 16H20M16 12V20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-bold text-gray-900">ProductHub</span>
    </div>
  )
}

