'use client';

import { Users, MessageSquare, Share2, BookOpen, Star, Globe, ArrowRight, Youtube, Instagram, Twitter, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-red-700 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative blurs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-600/30 blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🌍 Global FPV Community
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Connect With Pilots
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
              Join thousands of FPV enthusiasts sharing their passion for flight,
              building, and pushing the limits of what's possible.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="group rounded-xl bg-white px-8 py-4 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl hover:scale-105"
              >
                Join the Community
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/blogs"
                className="rounded-xl border-2 border-white/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white"
              >
                Browse Posts
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

      {/* Why Join Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Community Benefits
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Join Our Community?
            </h2>
            <p className="mt-4 text-gray-600">
              Connect with FPV pilots from around the world and grow together
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Share2,
                title: 'Share Your Stories',
                description: 'Document your flights, builds, and experiences. Inspire others with your unique perspective and adventures.',
                color: 'orange',
              },
              {
                icon: MessageSquare,
                title: 'Engage & Discuss',
                description: 'Comment on posts, share tips, and participate in discussions with fellow pilots who share your passion.',
                color: 'red',
              },
              {
                icon: BookOpen,
                title: 'Learn From Experts',
                description: 'Access tutorials, build guides, and tips from experienced pilots. Accelerate your learning journey.',
                color: 'orange',
              },
              {
                icon: Star,
                title: 'Showcase Your Builds',
                description: 'Share your drone builds, modifications, and upgrades. Get feedback and inspire others.',
                color: 'red',
              },
              {
                icon: Users,
                title: 'Find Local Pilots',
                description: 'Connect with FPV pilots in your area. Organize group flights and meetups.',
                color: 'orange',
              },
              {
                icon: Globe,
                title: 'Global Network',
                description: 'Be part of a worldwide community spanning 50+ countries and growing every day.',
                color: 'red',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-orange-200"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  item.color === 'orange' 
                    ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600' 
                    : 'bg-gradient-to-br from-red-100 to-red-200 text-red-600'
                } mb-6 transition-transform group-hover:scale-110`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                How to Get Involved
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Getting started with the Project FPV community is easy. Here's how you can 
                begin your journey and make the most of our platform.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Create your free account',
                  'Share your first blog post or story',
                  'Engage with other pilots\' content',
                  'Learn from expert builders and flyers',
                  'Participate in community discussions',
                  'Showcase your builds and flights',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg"
              >
                Create Your Account
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="relative">
              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white shadow-xl">
                  <p className="text-4xl font-bold">50+</p>
                  <p className="mt-2 text-orange-100">Countries</p>
                </div>
                <div className="rounded-3xl bg-white border border-gray-100 p-8 shadow-lg mt-8">
                  <p className="text-4xl font-bold text-gray-900">1000+</p>
                  <p className="mt-2 text-gray-600">Pilots</p>
                </div>
                <div className="rounded-3xl bg-white border border-gray-100 p-8 shadow-lg">
                  <p className="text-4xl font-bold text-gray-900">500+</p>
                  <p className="mt-2 text-gray-600">Blog Posts</p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 p-8 text-white shadow-xl mt-8">
                  <p className="text-4xl font-bold">24/7</p>
                  <p className="mt-2 text-orange-100">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Stay Connected
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Follow Us on Social Media
            </h2>
            <p className="mt-4 text-gray-600">
              Stay up to date with the latest FPV content, community highlights, and announcements
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-red-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">YouTube</p>
                <p className="text-sm text-gray-500">Watch & Subscribe</p>
              </div>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Discord</p>
                <p className="text-sm text-gray-500">Join the Chat</p>
              </div>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-pink-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all">
                <Instagram className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Instagram</p>
                <p className="text-sm text-gray-500">Follow Us</p>
              </div>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-sky-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Twitter / X</p>
                <p className="text-sm text-gray-500">Get Updates</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-red-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Take Off?</h2>
          <p className="mt-4 text-lg text-orange-100">
            Join the Project FPV community today and start sharing your adventures.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl bg-white px-10 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
