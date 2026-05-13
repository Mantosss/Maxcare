import { Badge, Star, Users } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"


const Doctors = () => {
  return (
      <div>
           {/* ── DOCTORS ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-cyan-500 rounded-3xl p-8 text-white space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Book Doctor
              </Badge>
              <h2 className="text-2xl font-bold">
                Doctors Date Available, Book Now!
              </h2>
              <p className="text-cyan-100 text-sm">
                Choose from our network of specialists and get an appointment
                that fits your schedule.
              </p>
              <div className="space-y-3">
                <Input
                  placeholder="Your Name"
                  className="bg-white/20 border-white/30 text-white placeholder:text-cyan-200 rounded-xl"
                />
                <Input
                  placeholder="Department"
                  className="bg-white/20 border-white/30 text-white placeholder:text-cyan-200 rounded-xl"
                />
                <Input
                  type="date"
                  className="bg-white/20 border-white/30 text-white rounded-xl"
                />
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold">
                  Book Appointment
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-white mb-6">
                <Badge className="bg-white/10 text-cyan-300 border-white/20 mb-2">
                  Our Doctors
                </Badge>
                <h2 className="text-2xl font-bold">
                  Explore Our Comprehensive Healthcare Solutions
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Dr. Laura Phillips",
                    specialty: "Cardiologist",
                    rating: 4.9,
                  },
                  {
                    name: "Dr. John Smith",
                    specialty: "Neurologist",
                    rating: 4.8,
                  },
                  {
                    name: "Dr. Thomas Eric",
                    specialty: "Orthopedic",
                    rating: 4.7,
                  },
                  {
                    name: "Dr. Olivia Philips",
                    specialty: "Pediatrician",
                    rating: 4.9,
                  },
                ].map((doc) => (
                  <Card
                    key={doc.name}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-cyan-400/30 rounded-full flex items-center justify-center mb-3">
                        <Users className="w-6 h-6 text-cyan-300" />
                      </div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-cyan-300 text-xs">{doc.specialty}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-300">
                          {doc.rating}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Doctors