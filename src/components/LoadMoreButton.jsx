const LoadMoreButton = ({ onLoadMore, isLoading, hasMore, currentCount, totalCount }) => {
  if (!hasMore || currentCount >= totalCount) {
    return null;
  }

  return (
    <div className="text-center mt-12">
      <div className="inline-flex flex-col items-center space-y-4">
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-large hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading more books<span className="loading-dots"></span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Load {Math.min(20, totalCount - currentCount)} More Books
              </>
            )}
          </div>
        </button>
        
        <div className="glass-effect rounded-xl px-6 py-3 border border-white/30">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
              <span className="font-semibold text-gray-700">
                Showing {currentCount.toLocaleString()}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"></div>
              <span className="text-gray-600">
                of {totalCount.toLocaleString()} total results
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, (currentCount / totalCount) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadMoreButton;