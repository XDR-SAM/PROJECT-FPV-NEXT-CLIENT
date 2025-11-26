'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { blogAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Heart, 
  Clock, 
  User, 
  Calendar, 
  ArrowLeft,
  Share2,
  Eye
} from 'lucide-react';

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, mongoUser } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await blogAPI.getById(params.id);
        setBlog(data.blog);
        // Check if current user has liked the post
        if (mongoUser?.id && data.blog.likes) {
          setIsLiked(data.blog.likes.includes(mongoUser.id));
        }
      } catch (error) {
        toast.error('Failed to load blog post');
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [params.id, mongoUser]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      router.push('/login');
      return;
    }

    setLiking(true);
    try {
      const result = await blogAPI.like(params.id);
      setIsLiked(result.liked);
      setBlog((prev) => ({
        ...prev,
        likeCount: result.likeCount,
        likes: result.liked
          ? [...(prev.likes || []), mongoUser?.id]
          : prev.likes?.filter((id) => id !== mongoUser?.id) || [],
      }));
      toast.success(result.liked ? 'Liked!' : 'Unliked');
    } catch (error) {
      toast.error('Failed to like post');
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Blog post not found</p>
          <Link
            href="/blogs"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      {blog.featuredImage && (
        <div className="relative h-64 w-full overflow-hidden bg-gray-200 md:h-96">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Post Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          {/* Category Badge */}
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-6 text-lg text-gray-600">{blog.excerpt}</p>

          {/* Author Card */}
          <div className="mb-6 flex items-center gap-4 border-t border-gray-100 pt-6">
            {blog.authorId?.image ? (
              <Image
                src={blog.authorId.image}
                alt={blog.authorId.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User className="h-6 w-6" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {blog.authorId?.name || 'Anonymous'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime || 5} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {blog.viewCount || 0} views
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${
                isLiked
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
              />
              <span className="font-semibold">{blog.likeCount || blog.likes?.length || 0}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>

        {/* Full Content */}
        <article className="rounded-lg bg-white p-6 shadow-sm">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
