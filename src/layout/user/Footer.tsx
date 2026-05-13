import { ChevronRight, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-blue-950 text-blue-200 pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-xl font-bold text-white">Maxcare</span>
              </div>
              <p className="text-sm leading-relaxed text-blue-300">
                Committed to providing exceptional healthcare services to our community with compassion and excellence.
              </p>
              <div className="flex gap-3 mt-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-800 hover:bg-cyan-500 transition-colors flex items-center justify-center cursor-pointer">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Surgery"].map((s) => (
                  <li key={s}>
                    <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-sm">
                {["Find a Doctor", "Book Appointment", "Patient Portal", "Medical Records", "Insurance"].map((s) => (
                  <li key={s}>
                    <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Mon – Fri: 8:00am – 8:00pm</li>
                <li>Saturday: 9:00am – 6:00pm</li>
                <li>Sunday: 10:00am – 4:00pm</li>
              </ul>
              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-3 h-3 text-cyan-400" /> +123-456-7890</p>
                <p className="flex items-center gap-2"><Mail className="w-3 h-3 text-cyan-400" /> info@maxcare.com</p>
                <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-cyan-400" /> 123 Medical Drive, NY</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-blue-400 gap-2">
            <p>© 2024 Maxcare. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400">Terms of Service</a>
              <a href="#" className="hover:text-cyan-400">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer