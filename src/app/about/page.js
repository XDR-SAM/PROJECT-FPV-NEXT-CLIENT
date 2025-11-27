'use client';

import { Zap, Eye, Users, Rocket, Target, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
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
              🚁 About FPV Drones
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Experience Flight Like
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Never Before
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
              First Person View flying puts you in the cockpit of your drone, 
              offering an immersive experience that transforms how we see the world.
            </p>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* What is FPV Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
                The Basics
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                What is FPV?
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                FPV (First Person View) drones are remote-controlled aircraft equipped with cameras
                that transmit live video feed to goggles or a screen, giving pilots a real-time
                view from the drone's perspective.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This immersive experience allows pilots to fly as if they were sitting in the 
                cockpit, opening up incredible possibilities for exploration, creativity, and sport.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 mb-4">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Real-time Video</h3>
                  <p className="mt-2 text-sm text-gray-600">Live HD feed directly to your goggles</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Full Control</h3>
                  <p className="mt-2 text-sm text-gray-600">Precise acrobatic flight capabilities</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-400 via-red-500 to-red-600 p-1">
                <div className="h-full w-full rounded-3xl bg-white p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🚁</div>
                    <p className="text-gray-500 font-medium">FPV Drone Experience</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900">Live Feed</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 shadow-xl text-white">
                <span className="text-sm font-semibold">120+ FPS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FPV Styles Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
              Flying Styles
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Different Ways to Fly
            </h2>
            <p className="mt-4 text-gray-600">
              FPV offers diverse flying styles, each with its own community and challenges
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Freestyle',
                description: 'Express yourself through acrobatic maneuvers, flips, rolls, and creative flight patterns. The most popular style for sharing on social media.',
                color: 'orange',
              },
              {
                icon: Rocket,
                title: 'Racing',
                description: 'Compete against other pilots through challenging courses. High-speed thrills with precise control and split-second decision making.',
                color: 'red',
              },
              {
                icon: Eye,
                title: 'Cinematic',
                description: 'Capture breathtaking footage with smooth, controlled movements. Perfect for filmmaking and creating stunning visual content.',
                color: 'orange',
              },
            ].map((style, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-orange-200"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  style.color === 'orange' 
                    ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600' 
                    : 'bg-gradient-to-br from-red-100 to-red-200 text-red-600'
                } mb-6 transition-transform group-hover:scale-110`}>
                  <style.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{style.title}</h3>
                <p className="text-gray-600 leading-relaxed">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Project FPV Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <Users className="h-8 w-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Community</h4>
                    <p className="mt-1 text-sm text-gray-600">Connect with pilots worldwide</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 shadow-lg text-white">
                    <Heart className="h-8 w-8 mb-3" />
                    <h4 className="font-semibold">Share Stories</h4>
                    <p className="mt-1 text-sm text-orange-100">Document your journey</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <Target className="h-8 w-8 text-red-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Learn</h4>
                    <p className="mt-1 text-sm text-gray-600">Tips from expert pilots</p>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <Rocket className="h-8 w-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Grow</h4>
                    <p className="mt-1 text-sm text-gray-600">Improve your skills</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700 mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Project FPV?
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Project FPV was created to provide a platform where pilots can share their
                experiences, learn from each other, and celebrate the amazing world of FPV
                drone flying.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Whether you're a beginner taking your first flight or an experienced pilot 
                pushing the boundaries of what's possible, this platform is your space to 
                document your journey, share tips, and connect with fellow enthusiasts.
              </p>
              <Link
                href="/blogs"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-lg"
              >
                Explore Blog Posts
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-red-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Join the Community?</h2>
          <p className="mt-4 text-lg text-orange-100">
            Start sharing your FPV adventures and connect with pilots worldwide.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              href="/community"
              className="rounded-xl border-2 border-white/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
