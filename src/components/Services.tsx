import { ArrowRight, Baby, Badge, Bone, Brain,  Eye,  Heart, Stethoscope} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  return (
    <div>
      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 mb-3">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900">
              Have a Look on Our Amazing Medical Services
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
              Comprehensive healthcare services tailored to your individual
              needs.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {[
              {
                icon: <Heart className="w-7 h-7" />,
                label: "Cardiology",
                color: "from-red-50 to-pink-50",
                iconColor: "text-red-400",
              },
              {
                icon: <Brain className="w-7 h-7" />,
                label: "Neurology",
                color: "from-purple-50 to-indigo-50",
                iconColor: "text-purple-400",
              },
              {
                icon: <Eye className="w-7 h-7" />,
                label: "Ophthalmology",
                color: "from-blue-50 to-cyan-50",
                iconColor: "text-blue-400",
              },
              {
                icon: <Bone className="w-7 h-7" />,
                label: "Orthopedics",
                color: "from-orange-50 to-amber-50",
                iconColor: "text-orange-400",
              },
              {
                icon: <Baby className="w-7 h-7" />,
                label: "Pediatrics",
                color: "from-green-50 to-teal-50",
                iconColor: "text-green-400",
              },
              {
                icon: <Stethoscope className="w-7 h-7" />,
                label: "General Medicine",
                color: "from-cyan-50 to-blue-50",
                iconColor: "text-cyan-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className={s.iconColor}>{s.icon}</div>
                <span className="text-xs font-semibold text-center text-gray-700">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "General Surgery",
                desc: "Expert surgical procedures performed by our certified surgeons using the latest techniques.",
              },
              {
                title: "Internal Medicine",
                desc: "Comprehensive diagnosis and treatment for complex adult diseases and conditions.",
              },
              {
                title: "Obstetrics & Gynecology",
                desc: "Dedicated women's health services from routine exams to high-risk pregnancies.",
              },
            ].map((card) => (
              <Card
                key={card.title}
                className="overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center">
                  <Stethoscope className="w-16 h-16 text-blue-400 opacity-60" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-blue-900 mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                  <button className="mt-3 text-cyan-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
