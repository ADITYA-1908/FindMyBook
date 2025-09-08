import BookCard from './BookCard';

const BookGrid = ({ books, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Searching for books</h3>
          <p className="text-gray-600">Please wait while we find the perfect matches<span className="loading-dots"></span></p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="glass-effect border border-red-200 rounded-3xl p-10 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {error}
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
            💡 <strong>Tip:</strong> Check your internet connection and try again in a moment.
          </p>
        </div>
      </div>
    );
  }

  if (hasSearched && (!books || books.length === 0)) {
    return (
      <div className="text-center py-20">
        <div className="glass-effect border border-gray-200 rounded-3xl p-10 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            No books found
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We couldn't find any books matching your search criteria.
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-3">
              <strong>💡 Try these suggestions:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Check your spelling</li>
              <li>• Use different keywords</li>
              <li>• Try searching by author instead of title</li>
              <li>• Remove some filters</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-20">
        <div className="glass-effect border border-primary-200 rounded-3xl p-10 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-gentle">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Ready to discover amazing books?
          </h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Search by title, author, or subject to find your next great read from millions of books worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-semibold text-primary-800">Academic Texts</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">📖</div>
              <div className="text-sm font-semibold text-purple-800">Fiction Novels</div>
            </div>
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🔬</div>
              <div className="text-sm font-semibold text-secondary-800">Research Papers</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book, index) => (
        <div key={`${book.key}-${index}`} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookGrid;