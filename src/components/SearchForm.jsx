import { useState } from 'react';

const SearchForm = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-secondary-500/10 rounded-3xl blur-3xl"></div>

      <div className="relative glass-effect rounded-3xl shadow-large p-8 mb-8 border border-white/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mb-4 shadow-colored animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-3 text-shadow">
            Book Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover your next great read from millions of books worldwide
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
                What are you looking for?
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter book title, author, or subject..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl custom-focus bg-white/90 backdrop-blur-sm placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="lg:w-48">
              <label htmlFor="searchType" className="block text-sm font-semibold text-gray-700 mb-3">
                Search Category
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl custom-focus bg-white/90 backdrop-blur-sm"
                disabled={isLoading}
              >
                <option value="title">📖 Title</option>
                <option value="author">✍️ Author</option>
                <option value="subject">🎯 Subject</option>
                <option value="q">🔍 All Fields</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="btn-primary text-lg px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching<span className="loading-dots"></span>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Books
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;