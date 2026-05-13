import { Input } from './ui/input'
import { Button } from './ui/button'

const Appoinment = () => {
  return (
      <div>
        {/* ── APPOINTMENT BANNER ─────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h2 className="text-2xl font-bold">Book an Appointment</h2>
            <p className="text-cyan-100 text-sm mt-1">
              Connect with our specialists and start your journey to better
              health today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Your Email"
              className="bg-white/20 border-white/30 text-white placeholder:text-cyan-200 rounded-xl w-52"
            />
            <Button className="bg-white text-cyan-600 hover:bg-cyan-50 rounded-xl font-semibold whitespace-nowrap">
              Get Appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Appoinment