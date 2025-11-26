export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Community</h1>
        <div className="space-y-6 rounded-lg bg-white p-8 shadow-sm">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Join Our Community</h2>
            <p className="text-gray-700 leading-relaxed">
              Connect with FPV pilots from around the world! Our community is built on sharing
              knowledge, experiences, and the joy of flying. Whether you're looking for build
              advice, flight tips, or just want to share your latest flight video, you'll find
              a welcoming community here.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Get Involved</h2>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Share your blog posts and experiences</li>
              <li>Engage with other pilots' content</li>
              <li>Learn from expert builders and flyers</li>
              <li>Participate in community discussions</li>
              <li>Showcase your builds and flights</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Follow Us</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Stay connected with the Project FPV community on social media:
            </p>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                YouTube
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
              >
                Discord
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700"
              >
                Instagram
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

