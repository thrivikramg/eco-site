'use client'

import React from "react"

export default function FloraFaunaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Flora & Fauna</h1>
      <p className="text-lg text-gray-700 mb-6">
        The Earth's biodiversity is made up of millions of species of flora (plants) and fauna (animals). These living organisms are essential for the stability and sustainability of our ecosystems.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What is Flora?</h2>
        <p className="text-gray-700">
          Flora refers to all plant life in a particular region or period. This includes native plants, trees, grasses, fungi, and even algae. Healthy flora contributes to clean air, climate regulation, and a balanced ecosystem.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What is Fauna?</h2>
        <p className="text-gray-700">
          Fauna encompasses all animal life, from tiny insects to large mammals and marine creatures. Each species plays a role in the food chain and ecological balance of its habitat.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Why Biodiversity Matters</h2>
        <p className="text-gray-700">
          Biodiversity ensures natural sustainability for all life forms. It supports ecosystem productivity, where each species has an important role. The loss of any plant or animal species can disrupt ecosystems and lead to long-term environmental damage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Conservation Efforts</h2>
        <p className="text-gray-700">
          Conservation of flora and fauna is crucial. Efforts include establishing protected areas like national parks and sanctuaries, planting native species, reducing pollution, and spreading awareness about wildlife protection laws.
        </p>
      </section>
    </main>
  )
}
