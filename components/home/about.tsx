"use client"

import { motion } from "framer-motion"
import { Target, Heart } from "lucide-react"
import Image from "next/image"
import ShinyText from "@/components/ShinyText"

export default function About() {
    return (
        <section className="py-20 bg-white overflow-hidden" id="about">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <ShinyText text="About Us" className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-900" speed={3} />
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    EcoSaro is a one-stop eco-commerce platform bringing all green possibilities
                                    into one place. Inspired by Pasumai Puratchi, we protect the environment by
                                    promoting sustainable and conscious living.
                                </p>
                                <p>
                                    Born from one man’s dream to build a sustainable Earth, this platform took
                                    shape after two years of research and collaboration with a co-partner. Beyond
                                    eco-products, EcoSaro empowers a community-driven ecosystem where
                                    people come together to build eco wealth through shared green actions and
                                    awareness.
                                </p>
                                <p>
                                    We believe healthy lives begin with a healthy environment — clean air, clean
                                    surroundings, and responsible choices.
                                </p>
                                <p className="font-medium text-emerald-800">
                                    EcoSaro is a unit of Watonezz LLP, building a greener future for us and
                                    generations to come.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                className="p-6 bg-emerald-50 rounded-xl border border-emerald-100"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                    <Target className="h-5 w-5 text-emerald-600" />
                                </div>
                                <ShinyText text="Vision" className="text-xl font-bold mb-2 text-emerald-900" speed={3} />
                                <p className="text-emerald-700">
                                    To build a sustainable Earth where future generations can live healthy lives in
                                    a clean and green environment.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-6 bg-emerald-50 rounded-xl border border-emerald-100"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="h-5 w-5 text-emerald-600" />
                                </div>
                                <ShinyText text="Mission" className="text-xl font-bold mb-2 text-emerald-900" speed={3} />
                                <p className="text-emerald-700">
                                    To make eco-friendly living simple and accessible by bringing all green
                                    solutions into one trusted platform.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/garden.png"
                                alt="EcoSaro Community"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />

                            {/* Decorative elements */}
                            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-yellow-100 rounded-full -z-10" />
                            <div className="absolute -top-6 -right-6 h-32 w-32 bg-emerald-100 rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
