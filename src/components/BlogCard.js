'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Heart, User } from 'lucide-react';

export default function BlogCard({ blog }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blogs/${blog._id}`}>
      <div className="group h-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Featured Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          {blog.featuredImage ? (
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
              <span className="text-4xl">🚁</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
            {blog.category}
          </span>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {/* Author */}
              <div className="flex items-center gap-1">
                {blog.authorId?.image ? (
                  <Image
                    src={blog.authorId.image}
                    alt={blog.authorId.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="ml-1">{blog.authorId?.name || 'Anonymous'}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime || 5} min</span>
              </div>
            </div>

            {/* Like Count */}
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>{blog.likeCount || blog.likes?.length || 0}</span>
            </div>
          </div>

          {/* Date */}
          <p className="mt-2 text-xs text-gray-400">
            {formatDate(blog.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

