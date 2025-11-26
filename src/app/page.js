'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogAPI, statsAPI } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import { 
  Users, 
  BookOpen, 
  Lightbulb, 
  TrendingUp,
  Zap,
  Camera,
  Wrench,
  Star,
  MessageSquare,
  Globe
} from 'lucide-react';

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogsData, statsData, categoriesData] = await Promise.all([
          blogAPI.getAll({ sortBy: 'likes', status: 'published' }),
          statsAPI.getStats(),
          statsAPI.getCategories(),
        ]);

        setFeaturedBlogs(blogsData.blogs?.slice(0, 6) || []);
        setStats(statsData.stats);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categoryIcons = {
    Freestyle: Zap,
    Racing: TrendingUp,
    Cinematic: Camera,
    Builds: Wrench,
    Reviews: Star,
    Tips: Lightbulb,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Share Your FPV Drone Adventures
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-blue-100">
              Join the community of FPV pilots sharing their stories, tips, and flight experiences
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blogs"
                className="rounded-md bg-white px-8 py-3 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
              >
                Start Reading Blogs
              </Link>
              <Link
                href="/login"
                className="rounded-md border-2 border-white px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Featured Blog Posts</h2>
          <p className="mt-2 text-gray-600">Discover the most popular stories from our community</p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            ))}
          </div>
        ) : featuredBlogs.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500">
            <p>No blog posts yet. Be the first to share your FPV adventure!</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View All Blogs
          </Link>
        </div>
      </section>

      {/* Why FPV Blogging */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why FPV Blogging?</h2>
            <p className="mt-2 text-gray-600">Connect, learn, and grow with fellow pilots</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with FPV pilots from around the world and share experiences.',
              },
              {
                icon: BookOpen,
                title: 'Knowledge Sharing',
                description: 'Learn from expert pilots and share your own tips and tricks.',
              },
              {
                icon: Lightbulb,
                title: 'Inspiration',
                description: 'Get inspired by amazing builds, flights, and creative content.',
              },
              {
                icon: TrendingUp,
                title: 'Learn & Grow',
                description: 'Improve your skills through community feedback and tutorials.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <p className="mt-2 text-gray-600">Explore content by category</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['Freestyle', 'Racing', 'Cinematic', 'Builds', 'Reviews', 'Tips'].map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              const categoryData = categories.find((c) => c._id === category);
              const count = categoryData?.count || 0;

              return (
                <Link
                  key={category}
                  href={`/blogs?category=${category}`}
                  className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                      <p className="text-sm text-gray-500">{count} posts</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Community Stats</h2>
            <p className="mt-2 text-gray-600">Our growing FPV community</p>
          </div>

          {stats && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.totalPosts || 0}</p>
                <p className="mt-2 text-sm text-gray-600">Total Posts</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                <p className="mt-2 text-sm text-gray-600">Active Pilots</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.totalLikes || 0}</p>
                <p className="mt-2 text-sm text-gray-600">Likes Given</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">50+</p>
                <p className="mt-2 text-sm text-gray-600">Countries</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
