"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ChevronRight, ArrowRight, Search, Users,
  Facebook, Twitter, Linkedin, Instagram,
} from "lucide-react";

const posts = [
  {
    date: "September 17, 2025",
    author: "Maxim Arnold",
    title: "How to Improve Immunity Naturally: Expert Backed Tips",
    excerpt: "A strong immune system is your body's first line of defense against infections, viruses, and...",
    bg: "from-blue-100 to-cyan-100",
  },
  {
    date: "September 17, 2025",
    author: "Maxim Arnold",
    title: "Doctor Recommended: Simple Tips to Improve Immunity",
    excerpt: "A strong immune system is your body's first line of defense against infections, viruses, and...",
    bg: "from-teal-100 to-blue-100",
  },
  {
    date: "September 16, 2025",
    author: "Maxim Arnold",
    title: "Build Strong Immunity Naturally: Proven Health Tips",
    excerpt: "A strong immune system is your body's first line of defense against infections, viruses, and...",
    bg: "from-cyan-100 to-indigo-100",
  },
  {
    date: "September 17, 2025",
    author: "Maxim Arnold",
    title: "Enhance Your Body's Defenses: Doctor Approved Ways",
    excerpt: "A strong immune system is your body's first line of defense against infections, viruses, and...",
    bg: "from-blue-200 to-cyan-100",
  },
  {
    date: "September 17, 2025",
    author: "Maxim Arnold",
    title: "Natural Ways to Boost Immunity: Doctor's Guidance",
    excerpt: "A strong immune system is your body's first line of defense against infections, viruses, and...",
    bg: "from-indigo-100 to-blue-100",
  },
];

const recentPosts = [
  { date: "September 17, 2025", title: "How to Improve Immunity Naturally: Expert Backed Tips", bg: "from-blue-200 to-cyan-100" },
  { date: "September 17, 2025", title: "Doctor Recommended: Tips to Improve Immunity", bg: "from-teal-100 to-blue-200" },
  { date: "September 17, 2025", title: "Build Strong Immunity Naturally: Proven Health Tips", bg: "from-cyan-100 to-blue-100" },
];

const categories = [
  { name: "CARDIOLOGY", count: 3 },
  { name: "HEMATOLOGY", count: 3 },
  { name: "IMMUNITY", count: 3 },
];

const tags = ["CONSULTATION", "LABORATORY", "MIGRAIN", "PATHOLOGY", "PSYCHOLOGY", "REHABILITATION", "SURGERY"];

export default function BlogStandardPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="font-sans">

      {/* ── HERO BREADCRUMB ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <svg className="absolute right-0 top-0 h-full opacity-20" viewBox="0 0 300 200" preserveAspectRatio="none">
            <path d="M300,0 Q200,100 300,200" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
            <path d="M300,20 Q180,110 300,180" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <path d="M300,40 Q160,120 300,160" stroke="#3b82f6" strokeWidth="0.8" fill="none" />
          </svg>
          <div className="absolute top-6 right-32 opacity-10 grid grid-cols-8 gap-2">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">Blog Standard</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">Blog Standard</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[1fr_300px] gap-10 items-start">

          {/* ── LEFT: BLOG POSTS ───────────────────────────────────────── */}
          <div className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {posts.map((post, i) => (
              <div key={i} className="flex gap-5 p-6 hover:bg-gray-50 transition-colors group">

                {/* Thumbnail */}
                <div className={`w-44 h-32 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${post.bg} flex items-center justify-center`}>
                  <Users className="w-10 h-10 text-blue-400 opacity-30" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="font-bold text-blue-900 text-base leading-snug group-hover:text-cyan-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{post.excerpt}</p>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-cyan-500 group-hover:gap-2.5 transition-all pt-1">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-6 bg-white">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-500 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              {[1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-100"
                      : "border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-500"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-500 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ──────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Author card */}
            <div className="border border-gray-100 rounded-2xl p-6 text-center shadow-sm space-y-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-blue-400 opacity-50" />
              </div>
              <div>
                <p className="font-bold text-blue-900 text-base">Dr. Jenifer Olivia</p>
                <p className="text-cyan-500 text-xs mt-0.5">Cardiologist, Maxcare Hospital</p>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-cyan-500 transition-colors flex items-center justify-center cursor-pointer group"
                  >
                    <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search Here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full border-gray-200 h-11 pr-12 text-sm"
              />
              <button className="absolute right-1 top-1 w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Recent Posts */}
            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h4 className="font-bold text-blue-900 text-base">Recent Posts</h4>
                <div className="w-8 h-0.5 bg-cyan-500 rounded-full mt-1.5" />
              </div>
              <div className="space-y-4">
                {recentPosts.map((post, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                    <div className={`w-14 h-14 shrink-0 rounded-lg bg-gradient-to-br ${post.bg} flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-blue-400 opacity-40" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-400">{post.date}</p>
                      <p className="text-xs font-semibold text-blue-900 leading-snug group-hover:text-cyan-500 transition-colors">
                        {post.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h4 className="font-bold text-blue-900 text-base">Categories</h4>
                <div className="w-8 h-0.5 bg-cyan-500 rounded-full mt-1.5" />
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 cursor-pointer group"
                  >
                    <span className="text-xs font-semibold text-gray-600 group-hover:text-cyan-500 transition-colors tracking-wide">
                      {cat.name}
                    </span>
                    <span className="text-xs font-bold text-gray-400">({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h4 className="font-bold text-blue-900 text-base">Tag Cloud</h4>
                <div className="w-8 h-0.5 bg-cyan-500 rounded-full mt-1.5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="text-xs font-semibold text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all tracking-wide"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
