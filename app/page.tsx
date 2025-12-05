// app/page.tsx

import Link from "next/link";
import { ArrowRight, ShoppingCart, Wrench, Package, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 36px),
                             repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 36px)`
          }} />
        </div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Military Kit Cards for{" "}
              <span className="text-amber-500">Makers</span> and{" "}
              <span className="text-amber-500">Collectors</span>
            </h1>
            <p className="text-xl text-stone-400 mb-8">
              Precision-engineered flat pack models that assemble into detailed military vehicles.
              Receive, snap, assemble, and display.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-stone-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Browse Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-stone-800 text-stone-100 font-semibold rounded-lg border border-stone-700 hover:border-amber-500 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-stone-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full mb-4">
                <ShoppingCart className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Order</h3>
              <p className="text-stone-400">
                Choose your kit and livery, then place your order
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full mb-4">
                <Package className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Snap</h3>
              <p className="text-stone-400">
                Carefully remove parts from the flat sprue card
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full mb-4">
                <Wrench className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Assemble</h3>
              <p className="text-stone-400">
                Follow instructions to build your detailed military vehicle
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Display</h3>
              <p className="text-stone-400">
                Show off your completed model with included display stand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-stone-900 border-t border-stone-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Aircraft", type: "plane", icon: "✈️" },
              { name: "Helicopters", type: "helicopter", icon: "🚁" },
              { name: "Tanks", type: "tank", icon: "🛡️" },
              { name: "Light Vehicles", type: "light-vehicle", icon: "🚙" },
              { name: "Destroyers", type: "destroyer", icon: "🚢" },
              { name: "Submarines", type: "submarine", icon: "🔱" },
            ].map((category) => (
              <Link
                key={category.type}
                href={`/catalog?type=${category.type}`}
                className="p-6 bg-stone-800 border border-stone-700 rounded-lg hover:border-amber-500 transition-all text-center group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
