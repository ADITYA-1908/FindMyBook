const BookCard = ({ book }) => {
  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return null;
  };
  
  const formatAuthors = (authors) => {
    if (!authors) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' & ');
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  const getLanguageLabel = (languages) => {
    if (!languages || languages.length === 0) return '';
    const langMap = {
      eng: 'English',
      fre: 'French',
      ger: 'German',
      spa: 'Spanish',
      ita: 'Italian',
    };
    return langMap[languages[0]] || languages[0].toUpperCase();
  };

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500"></div>

      {/* Card container */}
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-transform transform group-hover:-translate-y-1 duration-300">
        {/* Cover Image */}
        <div className="relative w-full h-48 overflow-hidden">
          {getCoverUrl(book) ? (
            <img
              src={getCoverUrl(book)}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => (e.target.style.display = 'none')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 text-gray-400">
              <span className="text-sm font-medium">No Cover</span>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {book.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-1">
              <span className="font-medium">by</span> {formatAuthors(book.author_name)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {book.first_publish_year && (
                <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-semibold">
                  📅 {book.first_publish_year}
                </span>
              )}

              {book.edition_count && book.edition_count > 1 && (
                <span className="inline-flex items-center px-2 py-1 bg-secondary-100 text-secondary-800 rounded-full text-xs font-semibold">
                  📚 {book.edition_count} editions
                </span>
              )}

              {getLanguageLabel(book.language) && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                  🌐 {getLanguageLabel(book.language)}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            {book.has_fulltext && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                ✅ Full Text
              </span>
            )}

            {book.key && (
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors duration-200"
              >
                View Details →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
