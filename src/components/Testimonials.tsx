import { Badge, Star } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const Testimonials = () => {
  return (
      <div>
          {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 mb-3">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold text-blue-900">
                What Our Greatest Customers Say About Us
              </h2>
            </div>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 rounded-full hidden md:flex"
            >
              See All Reviews
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Tonya Varel",
                text: "The doctors here are incredibly caring. I felt heard throughout my treatment and the staff was always ready to help. Truly a world-class experience.",
                rating: 5,
              },
              {
                name: "Henry Harrison",
                text: "I was nervous about my surgery but the team made me feel at ease. The post-op care was excellent and my recovery was faster than expected.",
                rating: 5,
              },
              {
                name: "Heather Glover",
                text: "Outstanding medical care and a very clean, modern facility. Scheduling was easy and I never had to wait long. Highly recommend!",
                rating: 5,
              },
              {
                name: "Angeline Brooks",
                text: "Great experience from check-in to discharge. The nurses were attentive and the doctor explained everything thoroughly.",
                rating: 4,
              },
            ].map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400">Verified Patient</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials