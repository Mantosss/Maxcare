import { Badge, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import teamPhoto from "../../public/Rectangle 3.png";
 
const Comprehensive = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 text-xs">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900">
              Improving Lives Through Comprehensive Healthcare
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We integrate the latest medical technology with compassionate
              human care. Our multidisciplinary teams collaborate to deliver
              outcomes that make a real difference in patients' lives.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "World-Class Facilities",
                "Experienced Physicians",
                "Modern Equipment",
                "24/7 Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0" />{" "}
                  {item}
                </div>
              ))}
            </div>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6">
              Discover More
            </Button>
          </div>
 
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-80 relative">
              <Image
                src={teamPhoto}
                alt="Medical team"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-cyan-500 text-white rounded-2xl p-4 shadow-lg text-center">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-xs">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default Comprehensive;