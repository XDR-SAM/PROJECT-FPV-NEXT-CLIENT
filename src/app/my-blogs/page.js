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
  FileText
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
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage My Blog Posts</h1>
          <p className="mt-2 text-gray-600">View and manage all your published blog posts</p>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts || 0}</p>
                  <p className="text-sm text-gray-600">Total Posts</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLikes || 0}</p>
                  <p className="text-sm text-gray-600">Total Likes</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Eye className="h-5 w-5" />
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
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <FileText className="h-4 w-4" />
            Create New Blog Post
          </Link>
        </div>

        {/* Blog Posts List */}
        {blogs.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              You haven&apos;t published any blogs yet
            </h3>
            <p className="mt-2 text-gray-600">
              Start sharing your FPV adventures with the community!
            </p>
            <Link
              href="/create-blog"
              className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Create Your First Blog Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200 md:h-24 md:w-32">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
                        <span className="text-2xl">🚁</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              blog.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {blog.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{blog.excerpt}</p>

                        {/* Meta Info */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(blog.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {blog.likeCount || blog.likes?.length || 0} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {blog.viewCount || 0} views
                          </span>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="ml-4 flex flex-col gap-2">
                        <Link
                          href={`/blogs/${blog._id}`}
                          className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          disabled={deletingId === blog._id}
                          className="flex items-center gap-1 rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
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
