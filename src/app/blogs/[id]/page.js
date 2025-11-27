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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <span className="text-2xl">🚁</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">Blog post not found</p>
          <p className="mt-2 text-gray-600">The post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blogs"
            className="mt-6 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button - Fixed at top */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Content Card */}
        <article className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
          {/* Header Section with Image on Left */}
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Featured Image - Left Side */}
            {blog.featuredImage && (
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-gray-200">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for better text visibility on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
              </div>
            )}

            {/* Post Header - Right Side */}
            <div className={`p-8 lg:p-10 flex flex-col justify-center ${!blog.featuredImage ? 'lg:col-span-2' : ''}`}>
              {/* Category Badge */}
              <span className="self-start rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                {blog.category}
              </span>

              {/* Title */}
              <h1 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{blog.excerpt}</p>

              {/* Author Card */}
              <div className="mt-8 flex items-center gap-4 pb-6 border-b border-gray-100">
                {blog.authorId?.image ? (
                  <Image
                    src={blog.authorId.image}
                    alt={blog.authorId.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-orange-100"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white ring-2 ring-orange-100">
                    <User className="h-7 w-7" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {blog.authorId?.name || 'Anonymous'}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
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
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleLike}
                  disabled={liking}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all ${
                    isLiked
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-600 hover:from-red-100 hover:to-orange-100'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
                  />
                  <span className="font-semibold">{blog.likeCount || blog.likes?.length || 0}</span>
                  <span className="hidden sm:inline">{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-200"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Content */}
          <div className="border-t border-gray-100 p-8 lg:p-10">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="border-t border-gray-100 p-8 lg:p-10">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Explore More Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
