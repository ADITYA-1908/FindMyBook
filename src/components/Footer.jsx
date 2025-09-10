
const Footer = () => {
    return (
        <footer className="mt-20 pt-12 border-t border-white/30">
            <div className="glass-effect rounded-2xl p-8 text-center border border-white/40">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold gradient-text">Book Finder</h3>
                </div>
                <p className="text-gray-600 mb-4">
                    Powered by{' '}
                    <a
                        href="https://openlibrary.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors duration-200"
                    >
                        Open Library
                    </a>
                </p>
                <p className="text-sm text-gray-500">
                    Built with ❤️ for students, researchers, and book lovers worldwide
                </p>
            </div>
        </footer>
    )
}

export default Footer