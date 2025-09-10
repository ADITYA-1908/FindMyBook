import { useCallback, useMemo, useState } from 'react';
import BookGrid from './components/BookGrid';
import FilterBar from './components/FilterBar';
import LoadMoreButton from './components/LoadMoreButton';
import SearchForm from './components/SearchForm';
import { searchBooks } from './services/bookService';
import Footer from './components/Footer';

function App() {
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSearchType, setCurrentSearchType] = useState('title');
  const [filters, setFilters] = useState({
    language: '',
    publishYear: '',
    sort: 'relevance'
  });

  // Apply filters to books
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Client-side filtering for better UX
    if (filters.language && filters.language !== '') {
      filtered = filtered.filter(book =>
        book.language && book.language.includes(filters.language)
      );
    }

    // Sort books
    switch (filters.sort) {
      case 'new':
        filtered.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
        break;
      case 'old':
        filtered.sort((a, b) => (a.first_publish_year || 9999) - (b.first_publish_year || 9999));
        break;
      case 'editions':
        filtered.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [books, filters]);

  const handleSearch = useCallback(async (query, searchType) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentQuery(query);
    setCurrentSearchType(searchType);
    setCurrentPage(1);

    try {
      const result = await searchBooks(query, searchType, {
        page: 1,
        limit: 20,
        language: filters.language,
        publishYear: filters.publishYear,
        sort: filters.sort
      });

      setBooks(result.books);
      setTotalResults(result.totalResults);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err.message);
      setBooks([]);
      setTotalResults(0);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleLoadMore = useCallback(async () => {
    if (!currentQuery || isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      const result = await searchBooks(currentQuery, currentSearchType, {
        page: nextPage,
        limit: 20,
        language: filters.language,
        publishYear: filters.publishYear,
        sort: filters.sort
      });

      setBooks(prevBooks => [...prevBooks, ...result.books]);
      setCurrentPage(nextPage);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentQuery, currentSearchType, currentPage, filters, isLoading]);

  const handleFilterChange = useCallback((filterType, value) => {
    if (filterType === 'clear') {
      setFilters({
        language: '',
        publishYear: '',
        sort: 'relevance'
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }

    // Re-search with new filters if we have a current query
    if (currentQuery) {
      handleSearch(currentQuery, currentSearchType);
    }
  }, [currentQuery, currentSearchType, handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-accent-600/20 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-primary-600/20 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <SearchForm
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {hasSearched && totalResults > 0 && (
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            totalResults={totalResults}
          />
        )}

        <BookGrid
          books={filteredBooks}
          isLoading={isLoading && currentPage === 1}
          error={error}
          hasSearched={hasSearched}
        />

        {hasSearched && !error && filteredBooks.length > 0 && (
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            isLoading={isLoading && currentPage > 1}
            hasMore={hasMore}
            currentCount={books.length}
            totalCount={totalResults}
          />
        )}

        {/* Footer */}
       <Footer/>
      </div>
    </div>
  );
}

export default App;