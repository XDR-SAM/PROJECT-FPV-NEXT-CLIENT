'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { blogAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Eye, 
  Heart, 
  Calendar, 
  Trash2, 
  ExternalLink,
  FileText,
  Plus
} from 'lucide-react';

function MyBlogsContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const data = await blogAPI.getMyPosts();
        setBlogs(data.blogs || []);
        setStats(data.stats);
      } catch (error) {
        toast.error('Failed to load your blog posts');
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await blogAPI.delete(id);
      toast.success('Blog post deleted successfully');
      setBlogs(blogs.filter((blog) => blog._id !== id));
      // Update stats
      if (stats) {
        const deletedBlog = blogs.find((b) => b._id === id);
        setStats({
          ...stats,
          totalPosts: stats.totalPosts - 1,
          totalLikes: stats.totalLikes - (deletedBlog?.likeCount || 0),
          totalViews: stats.totalViews - (deletedBlog?.viewCount || 0),
        });
      }
    } catch (error) {
      toast.error('Failed to delete blog post');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage My Blog Posts</h1>
          <p className="mt-2 text-gray-600">View and manage all your published blog posts</p>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts || 0}</p>
                  <p className="text-sm text-gray-600">Total Posts</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-200 text-red-600">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLikes || 0}</p>
                  <p className="text-sm text-gray-600">Total Likes</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-600">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews || 0}</p>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create New Button */}
        <div className="mb-6">
          <Link
            href="/create-blog"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Create New Blog Post
          </Link>
        </div>

        {/* Blog Posts List */}
        {blogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm border border-gray-100">
            <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              You haven&apos;t published any blogs yet
            </h3>
            <p className="mt-2 text-gray-600">
              Start sharing your FPV adventures with the community!
            </p>
            <Link
              href="/create-blog"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Create Your First Blog Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-orange-200"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gray-200 md:h-28 md:w-40 flex-shrink-0">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
                        <span className="text-2xl">🚁</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{blog.title}</h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              blog.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {blog.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{blog.excerpt}</p>

                        {/* Meta Info */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(blog.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            {blog.likeCount || blog.likes?.length || 0} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {blog.viewCount || 0} views
                          </span>
                          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-orange-700 font-medium">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Link
                          href={`/blogs/${blog._id}`}
                          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          disabled={deletingId === blog._id}
                          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-all hover:bg-red-50 hover:border-red-300 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyBlogsPage() {
  return (
    <ProtectedRoute>
      <MyBlogsContent />
    </ProtectedRoute>
  );
}
