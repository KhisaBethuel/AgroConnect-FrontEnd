import { useEffect, useState } from "react";
import { Search, TrendingUp, BookOpen, Leaf, Filter } from "lucide-react";
import BlogCard from "../Components/BlogCard";
import blogData from "../constants/BlogData";
import Navbar from "../Components/Navbar";

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [filterBlog, setFilteredBlog] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ["all", ...new Set(blogData.map(blog => blog.category))];

    useEffect(() => {
        const blogsWithImages = blogData.filter((item) => item.image);
        setBlog(blogsWithImages);
        setFilteredBlog(blogsWithImages);
    }, []);

    useEffect(() => {
        let results = blog;
        
        if (searchTerm) {
            results = results.filter((blog) =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (selectedCategory !== "all") {
            results = results.filter((blog) => blog.category === selectedCategory);
        }
        
        setFilteredBlog(results);
    }, [searchTerm, blog, selectedCategory]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(query);
    };

    const getFeaturedBlogs = () => {
        return blog.sort((a, b) => b.views - a.views).slice(0, 3);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-[4.5rem]">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-green-700 text-white py-16">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm" />
                <div className="relative container mx-auto px-4">
                    <div className="flex items-center justify-center mb-4">
                        <Leaf className="w-12 h-12 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Agricultural Knowledge Hub
                    </h1>
                    <p className="text-xl text-center text-green-100 max-w-2xl mx-auto">
                        Discover insights, innovations, and best practices in modern farming
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search agricultural insights..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-12 rounded-full text-gray-800 bg-white/95 
                                         shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />
                            <button 
                                type="submit" 
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2
                                         bg-green-600 text-white rounded-full hover:bg-green-700 
                                         transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Featured Blogs */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                            Featured Insights
                        </h2>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg md:hidden"
                        >
                            <Filter className="w-5 h-5" />
                            Filter
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {getFeaturedBlogs().map((blog) => (
                            <BlogCard
                                key={blog.id}
                                {...blog}
                                featured={true}
                            />
                        ))}
                    </div>
                </section>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Category Filter - Desktop */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                            <div className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors duration-200
                                            ${selectedCategory === category
                                                ? 'bg-green-600 text-white'
                                                : 'text-gray-600 hover:bg-green-50'
                                            }`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filter Dialog */}
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/20" onClick={() => setIsFilterOpen(false)} />
                            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors duration-200
                                                ${selectedCategory === category
                                                    ? 'bg-green-600 text-white'
                                                    : 'text-gray-600 hover:bg-green-50'
                                                }`}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* All Blogs */}
                    <div className="lg:col-span-3">
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-green-600" />
                                All Articles
                            </h2>
                            {filterBlog.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filterBlog.map((blog) => (
                                        <BlogCard
                                            key={blog.id}
                                            {...blog}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-600 text-lg">
                                        No articles found matching your criteria.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;