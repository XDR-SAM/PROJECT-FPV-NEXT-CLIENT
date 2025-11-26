export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">About FPV</h1>
        <div className="space-y-6 rounded-lg bg-white p-8 shadow-sm">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">What is FPV?</h2>
            <p className="text-gray-700 leading-relaxed">
              FPV (First Person View) drones are remote-controlled aircraft equipped with cameras
              that transmit live video feed to goggles or a screen, giving pilots a real-time
              view from the drone's perspective. This immersive experience allows pilots to fly
              as if they were sitting in the cockpit.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">The FPV Community</h2>
            <p className="text-gray-700 leading-relaxed">
              The FPV community is a vibrant and passionate group of pilots, builders, and
              enthusiasts who share a love for aerial exploration and technical innovation.
              From freestyle flying to racing, cinematic footage to technical builds, the FPV
              world offers endless possibilities for creativity and skill development.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Why Project FPV?</h2>
            <p className="text-gray-700 leading-relaxed">
              Project FPV was created to provide a platform where pilots can share their
              experiences, learn from each other, and celebrate the amazing world of FPV
              drone flying. Whether you're a beginner or an experienced pilot, this platform
              is your space to document your journey, share tips, and connect with fellow
              enthusiasts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

