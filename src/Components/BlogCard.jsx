/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const BlogCard = ({
  id,
  image,
  category,
  title,
  likes,
  views,
  comments = 0,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className="blog-card shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105 bg-white">
        <img
        src={image}
        alt={title}
        className="blog-image w-full h-48 object-cover cursor-pointer"
        onClick={handleNavigate}
      />

      <div className="blog-content p-4">
        <span className="category text-sm text-green-700 font-medium">
          {category}
        </span>
        <h2
          className="blog-title text-lg font-semibold mt-2 cursor-pointer hover:underline"
          onClick={handleNavigate}>
          {title}
        </h2>
        <div className="blog-stats mt-4 flex justify-between items-center text-gray-600 border-t pt-4">
          <span className="likes flex items-center space-x-1 text-gray-500">
            <i className="fas fa-heart"></i>
            <span>{likes}</span>
          </span>

          <span className="views flex items-center space-x-1 text-gray-500">
            <i className="fas fa-eye"></i>
            <span>{views}</span>
          </span>

          <span className="comments flex items-center space-x-1  text-gray-500">
            <i className="fas fa-comment"></i>
            <span>{comments}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
