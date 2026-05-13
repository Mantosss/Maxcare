import { Badge, Facebook, Linkedin, Twitter, Users } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const Team = () => {
  return (
      <div>
          {/* ── TEAM ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 mb-3">
              Our Team
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900">
              Meet Our Amazing Team Members
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Amelia Turner",
                role: "Cardiologist",
                exp: "12 Years Exp.",
              },
              {
                name: "Charlotte Harrison",
                role: "Neurologist",
                exp: "10 Years Exp.",
              },
              {
                name: "William Carter",
                role: "Orthopedic Surgeon",
                exp: "15 Years Exp.",
              },
            ].map((member) => (
              <Card
                key={member.name}
                className="text-center hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-52 bg-gradient-to-b from-cyan-100 to-blue-100 flex items-center justify-center">
                  <Users className="w-20 h-20 text-blue-400 opacity-50" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-blue-900 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-cyan-500 text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{member.exp}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-cyan-500 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Icon className="w-3 h-3 text-gray-500" />
                      </div>
                    ))}
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

export default Team