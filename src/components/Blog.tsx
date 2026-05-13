import { ArrowRight, Badge, Stethoscope } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'


const Blog = () => {
  return (
      <div>
          {/* ── BLOG ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 mb-3">
                Latest News
              </Badge>
              <h2 className="text-3xl font-bold text-blue-900">
                Read Our Informative Blogs From Medical Professionals
              </h2>
            </div>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 rounded-full hidden md:flex"
            >
              All Blogs
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Natural Ways to Boost Immunity for Long-Term Health",
                date: "Jan 15, 2024",
                category: "Wellness",
              },
              {
                title: "Managing Blood Pressure Options: Expert Tips",
                date: "Feb 03, 2024",
                category: "Cardiology",
              },
              {
                title: "How to Identify Symptoms: Diseases & Remedies Top",
                date: "Mar 10, 2024",
                category: "General",
              },
            ].map((b) => (
              <Card
                key={b.title}
                className="overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="h-44 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative">
                  <Stethoscope className="w-16 h-16 text-blue-300 opacity-60" />
                  <Badge className="absolute top-3 left-3 bg-cyan-500 text-white border-0 text-xs">
                    {b.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{b.date}</p>
                  <h3 className="font-bold text-blue-900 text-sm leading-snug mb-3">
                    {b.title}
                  </h3>
                  <button className="text-cyan-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog