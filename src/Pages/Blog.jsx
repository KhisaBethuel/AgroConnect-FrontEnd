/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Search, TrendingUp, BookOpen, Leaf } from "lucide-react";
import BlogCard from "../Components/BlogCard";
import React from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    per_page: 6,
    pages: 0,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `https://agritech-backend-lbq8.onrender.com/blogs?page=${pagination.page}&per_page=${pagination.per_page}`
        );
        const data = await response.json();
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
        setPagination({
          total: data.total,
          page: data.page,
          per_page: data.per_page,
          pages: data.pages,
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [pagination.page, pagination.per_page]);

  useEffect(() => {
    let results = blogs;
    if (searchTerm) {
      results = results.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBlogs(results);
  }, [searchTerm, blogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  const handlePaginationChange = (newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const getFeaturedBlogs = () => {
    return blogs.sort((a, b) => b.views - a.views).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[4.5rem]">
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
                                         transition-colors duration-200">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-600" />
            All Articles
          </h2>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
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

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => handlePaginationChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400">
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => handlePaginationChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
