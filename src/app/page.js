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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-red-700 text-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-600/30 blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🚁 Welcome to the FPV Community
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Share Your FPV Drone
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Adventures
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-orange-100">
              Join the community of FPV pilots sharing their stories, tips, and flight experiences
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blogs"
                className="group rounded-xl bg-white px-8 py-4 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl hover:scale-105"
              >
                Start Reading Blogs
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/login"
                className="rounded-xl border-2 border-white/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
            Featured Content
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Blog Posts</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Discover the most popular stories from our community</p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-200"></div>
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

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg hover:scale-105"
          >
            View All Blogs
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Why FPV Blogging */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Why Join Us
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why FPV Blogging?</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Connect, learn, and grow with fellow pilots</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with FPV pilots from around the world and share experiences.',
                color: 'orange',
              },
              {
                icon: BookOpen,
                title: 'Knowledge Sharing',
                description: 'Learn from expert pilots and share your own tips and tricks.',
                color: 'red',
              },
              {
                icon: Lightbulb,
                title: 'Inspiration',
                description: 'Get inspired by amazing builds, flights, and creative content.',
                color: 'orange',
              },
              {
                icon: TrendingUp,
                title: 'Learn & Grow',
                description: 'Improve your skills through community feedback and tutorials.',
                color: 'red',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-orange-200"
              >
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  feature.color === 'orange' 
                    ? 'from-orange-100 to-orange-200 text-orange-600 group-hover:from-orange-500 group-hover:to-red-500' 
                    : 'from-red-100 to-red-200 text-red-600 group-hover:from-red-500 group-hover:to-orange-500'
                } group-hover:text-white transition-all duration-300`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Browse Topics
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Categories</h2>
            <p className="mt-3 text-gray-600">Explore content by category</p>
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
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 transition-all duration-300 group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{category}</h3>
                      <p className="text-sm text-gray-500">{count} posts</p>
                    </div>
                    <span className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Growing Together
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Community Stats</h2>
            <p className="mt-3 text-gray-600">Our growing FPV community</p>
          </div>

          {stats && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-orange-50 to-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <BookOpen className="h-7 w-7" />
                </div>
                <p className="mt-4 text-4xl font-bold text-gray-900">{stats.totalPosts || 0}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">Total Posts</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                  <Users className="h-7 w-7" />
                </div>
                <p className="mt-4 text-4xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">Active Pilots</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-red-50 to-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <p className="mt-4 text-4xl font-bold text-gray-900">{stats.totalLikes || 0}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">Likes Given</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                  <Globe className="h-7 w-7" />
                </div>
                <p className="mt-4 text-4xl font-bold text-gray-900">50+</p>
                <p className="mt-2 text-sm font-medium text-gray-600">Countries</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-red-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Share Your Story?</h2>
          <p className="mt-4 text-lg text-orange-100">
            Join thousands of FPV pilots sharing their adventures, tips, and builds.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl bg-white px-10 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
