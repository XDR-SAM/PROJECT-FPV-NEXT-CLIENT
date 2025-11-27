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
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
            Explore
          </span>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">FPV Drone Blog Posts</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore stories, tips, and experiences shared by FPV pilots around the world
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 md:flex md:items-center md:gap-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title, author, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 py-3 pl-12 pr-10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 md:w-48 transition-all"
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
            <ArrowUpDown className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 py-3 pl-12 pr-10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 md:w-48 transition-all"
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
              Found <span className="font-semibold text-orange-600">{blogs.length}</span> blog
              {blogs.length !== 1 ? 's' : ''}
            </>
          )}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-xl bg-gray-200"></div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm border border-gray-100">
            <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">No blog posts found.</p>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
