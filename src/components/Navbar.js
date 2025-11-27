'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, User, LogOut, FileText, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Logged out successfully');
    } else {
      toast.error('Failed to logout');
    }
    setIsUserMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-md' 
        : 'border-b border-gray-200 bg-white shadow-sm'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Project FPV"
              width={40}
              height={40}
              className="object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Project FPV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
            >
              About FPV
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
            >
              Community
            </Link>

            {/* Auth Buttons */}
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 transition-all hover:border-orange-300 hover:shadow-sm"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="border-b border-gray-100 p-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/create-blog"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Plus className="h-4 w-4" />
                        Create Blog Post
                      </Link>
                      <Link
                        href="/my-blogs"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        My Blog Posts
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About FPV
            </Link>
            <Link
              href="/community"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            {user ? (
              <>
                <Link
                  href="/create-blog"
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Blog Post
                </Link>
                <Link
                  href="/my-blogs"
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Blog Posts
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full py-2 text-left text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="mt-2 block rounded-md bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-center text-sm font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
