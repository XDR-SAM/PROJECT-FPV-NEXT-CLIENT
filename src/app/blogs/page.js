'use client';

import { useState, useEffect } from 'react';
import { blogAPI, statsAPI } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await statsAPI.getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const params = {
          status: 'published',
        };

        if (searchQuery) {
          params.search = searchQuery;
        }

        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }

        if (sortBy === 'likes') {
          params.sortBy = 'likes';
        } else if (sortBy === 'views') {
          params.sortBy = 'views';
        } else {
          params.sortBy = 'latest';
        }

        const data = await blogAPI.getAll(params);
        setBlogs(data.blogs || []);
      } catch (error) {
        toast.error('Failed to load blogs');
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">FPV Drone Blog Posts</h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore stories, tips, and experiences shared by FPV pilots around the world
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4 rounded-lg bg-white p-4 shadow-sm md:flex md:items-center md:gap-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title, author, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-8 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-48"
            >
              <option value="All">All Categories</option>
              <option value="Freestyle">Freestyle</option>
              <option value="Racing">Racing</option>
              <option value="Cinematic">Cinematic</option>
              <option value="Builds">Builds</option>
              <option value="Reviews">Reviews</option>
              <option value="Tips">Tips</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-8 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-48"
            >
              <option value="latest">Latest</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Read</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          {loading ? (
            'Loading...'
          ) : (
            <>
              Found <span className="font-semibold">{blogs.length}</span> blog
              {blogs.length !== 1 ? 's' : ''}
            </>
          )}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-gray-200"></div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-gray-600">No blog posts found.</p>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

