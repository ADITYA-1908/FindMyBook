const BASE_URL = 'https://openlibrary.org/search.json';

export const searchBooks = async (query, searchType = 'title', options = {}) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      language, 
      publishYear, 
      sort = 'relevance' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    // Build search parameters
    const params = new URLSearchParams();
    
    // Set the search query based on type
    if (searchType === 'q') {
      params.append('q', query);
    } else {
      params.append(searchType, query);
    }
    
    // Add pagination
    params.append('offset', offset);
    params.append('limit', limit);
    
    // Add language filter
    if (language) {
      params.append('language', language);
    }
    
    // Add publish year filter
    if (publishYear) {
      if (publishYear.includes('-')) {
        const [startYear, endYear] = publishYear.split('-');
        params.append('first_publish_year', `[${startYear} TO ${endYear}]`);
      } else {
        params.append('first_publish_year', publishYear);
      }
    }
    
    // Add sorting
    switch (sort) {
      case 'new':
        params.append('sort', 'new');
        break;
      case 'old':
        params.append('sort', 'old');
        break;
      case 'editions':
        params.append('sort', 'editions');
        break;
      default:
        // Default relevance sorting
        break;
    }
    
    // Add fields to return
    params.append('fields', 'key,title,author_name,author_key,first_publish_year,edition_count,cover_i,has_fulltext,language,public_scan_b,ebook_access');
    
    const url = `${BASE_URL}?${params.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      books: data.docs || [],
      totalResults: data.numFound || 0,
      currentPage: page,
      totalPages: Math.ceil((data.numFound || 0) / limit),
      hasMore: data.docs && data.docs.length === limit && offset + limit < (data.numFound || 0)
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error(
      error.message.includes('HTTP error!') 
        ? 'Unable to connect to the book database. Please check your internet connection.'
        : 'An error occurred while searching for books. Please try again.'
    );
  }
};

export const getBookDetails = async (workKey) => {
  try {
    const url = `https://openlibrary.org${workKey}.json`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw new Error('Unable to fetch book details.');
  }
};