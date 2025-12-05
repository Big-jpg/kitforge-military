// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About KitForge Military</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-stone-300">
            <p className="text-xl text-stone-400 leading-relaxed">
              KitForge Military brings the world of military modeling into the modern age with
              innovative 3D-printed kit cards that combine precision engineering with accessible
              maker technology.
            </p>

            <h2 className="text-2xl font-bold text-stone-100 mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that everyone should have access to high-quality military models without
              the complexity and expense of traditional plastic model kits. Our kit cards are
              designed to be printed on standard FDM 3D printers, making detailed military vehicles
              accessible to hobbyists, collectors, and educators worldwide.
            </p>

            <h2 className="text-2xl font-bold text-stone-100 mt-8 mb-4">What Makes Us Different</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Flat Pack Design:</strong> All parts print on a single card-sized sprue,
                minimizing print time and material waste
              </li>
              <li>
                <strong>No Glue Required:</strong> Precision snap-fit connections make assembly
                clean and reversible
              </li>
              <li>
                <strong>Custom Liveries:</strong> Choose from multiple authentic camouflage
                patterns and paint schemes
              </li>
              <li>
                <strong>Detailed Engineering:</strong> Each model is carefully designed with
                accurate proportions and authentic details
              </li>
              <li>
                <strong>Display Ready:</strong> Includes integrated display stands for desktop
                presentation
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-100 mt-8 mb-4">Quality & Licensing</h2>
            <p>
              All our designs are created in-house by experienced 3D modelers and military
              enthusiasts. We hold commercial licenses for our designs and ensure that each kit
              meets our high standards for printability, accuracy, and assembly experience.
            </p>

            <h2 className="text-2xl font-bold text-stone-100 mt-8 mb-4">Get in Touch</h2>
            <p>
              Have questions about our kits or want to suggest a new model? We'd love to hear from
              you. Contact us through our social channels or email us directly.
            </p>

            <div className="mt-8 p-6 bg-stone-900 border border-stone-800 rounded-lg">
              <p className="text-center text-stone-400">
                <strong className="text-stone-100">Ready to start building?</strong>
                <br />
                Browse our catalog and download your first kit today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
