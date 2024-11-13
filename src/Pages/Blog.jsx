import { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [filterBlog, setFilteredBlog] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("https://safarivendors-backend.vercel.app/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                const blogsWithImages = data.filter((item) => item.image); // Filter to only include items with images
                setBlog(blogsWithImages); 
                setFilteredBlog(blogsWithImages); 
            })
            .catch((error) => {
                console.error("Failed to fetch blogs:", error);
            });
    }, []);

    useEffect(() => {
        const results = blog.filter((blog) =>
            blog.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlog(results);
    }, [searchTerm, blog]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(query);
    };

    const limitedCards = filterBlog.slice(0, 12);

    return (
        <div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>

            {/* Centered Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center items-center mb-6">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded-l-md"
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded-r-md hover:bg-green-600">
                    Search
                </button>
            </form>
            
            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {limitedCards.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        image={blog.image}
                        category={blog.category}
                        title={blog.name}
                        likes={blog.likes}
                        views={blog.views}
                    />
                ))}
            </div>
        </div>
    );
}

export default Blog;
