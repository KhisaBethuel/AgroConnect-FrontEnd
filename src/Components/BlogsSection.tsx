import React from 'react';
import BlogsCard from './BlogsCard';


const blogs = [
  {
    title: 'Sustainable Farming Practices',
    reads: '9k',
    imageUrl: 'https://i.pinimg.com/236x/0f/60/38/0f6038f6d73287439e33aa009b686142.jpg'
  },
  {
    title: 'Pest and Pesticide Management',
    reads: '2.7k',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&h=500'
  },
  {
    title: 'fertilizers and manure',
    reads: '7.9k',
    imageUrl: 'https://i.pinimg.com/236x/fa/c1/31/fac1312a8229cc2f3eedbc1823d156d7.jpg'
  }
];

export function BlogsSection() {
  return (
    <section className="py-8 px-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">Featured blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogsCard key={blog.title} {...blog} />
        ))}
      </div>
    </section>
  );
}