import { ArrowRight, Badge, Heart } from "lucide-react"
import { Button } from "./ui/button"


const Wellness = () => {
  return (
      <div>
          {/* ── WELLNESS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-100 to-blue-100 h-72 flex items-center justify-center">
              <Heart className="w-24 h-24 text-cyan-400 opacity-50" />
            </div>
          </div>
          <div className="space-y-5">
            <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 text-xs">
              Wellness
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900">
              Discover a Healthier You with Our Comprehensive Wellness
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our wellness programs are designed to help you achieve optimal
              health through preventive care, nutrition guidance, and
              personalized treatment plans.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6">
              Explore More <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Wellness