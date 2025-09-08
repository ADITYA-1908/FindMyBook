const FilterBar = ({ filters, onFilterChange, totalResults }) => {
  const currentYear = new Date().getFullYear();
  const decades = [];
  for (let year = 2020; year >= 1900; year -= 10) {
    decades.push({
      label: `${year}s`,
      value: `${year}-${year + 9}`
    });
  }

  return (
    <div className="glass-effect rounded-2xl shadow-soft p-6 mb-8 border border-white/30">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-gray-900">
              {totalResults > 0 && (
                <span className="gradient-text">
                  {totalResults.toLocaleString()} books found
                </span>
              )}
            </h2>
          </div>
          <p className="text-sm text-gray-600 mt-1 ml-5">Refine your search with filters below</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Language Filter */}
          <div className="min-w-0 sm:w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Language</label>
            <select
              value={filters.language || ''}
              onChange={(e) => onFilterChange('language', e.target.value)}
              className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl custom-focus bg-white/90 backdrop-blur-sm"
            >
              <option value="">🌍 All Languages</option>
              <option value="eng">🇺🇸 English</option>
              <option value="fre">🇫🇷 French</option>
              <option value="ger">🇩🇪 German</option>
              <option value="spa">🇪🇸 Spanish</option>
              <option value="ita">🇮🇹 Italian</option>
            </select>
          </div>
          
          {/* Year Filter */}
          <div className="min-w-0 sm:w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Published</label>
            <select
              value={filters.publishYear || ''}
              onChange={(e) => onFilterChange('publishYear', e.target.value)}
              className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl custom-focus bg-white/90 backdrop-blur-sm"
            >
              <option value="">📅 Any Year</option>
              <option value={`${currentYear - 5}-${currentYear}`}>📆 Last 5 years</option>
              {decades.map(decade => (
                <option key={decade.value} value={decade.value}>
                  🗓️ {decade.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Filter */}
          <div className="min-w-0 sm:w-44">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Sort By</label>
            <select
              value={filters.sort || 'relevance'}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl custom-focus bg-white/90 backdrop-blur-sm"
            >
              <option value="relevance">🎯 Most Relevant</option>
              <option value="new">🆕 Newest First</option>
              <option value="old">📜 Oldest First</option>
              <option value="editions">📚 Most Editions</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          {(filters.language || filters.publishYear || filters.sort !== 'relevance') && (
            <div className="flex items-end">
              <button
                onClick={() => onFilterChange('clear')}
                className="btn-secondary h-12 px-4 text-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;