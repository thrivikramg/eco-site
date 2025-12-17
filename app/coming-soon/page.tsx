import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft, Rocket } from "lucide-react"

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/50">
                <div className="mb-6 flex justify-center">
                    <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                        <Rocket className="h-10 w-10 text-emerald-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon!</h1>
                <p className="text-gray-600 mb-8">
                    We are working hard to bring you the best eco-friendly shopping experience.
                    This feature is currently under development.
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <div className="flex items-center gap-3 text-emerald-800 font-medium justify-center">
                            <Construction className="h-5 w-5" />
                            <span>Under Construction</span>
                        </div>
                        <p className="text-sm text-emerald-600 mt-1">
                            Check back soon for updates!
                        </p>
                    </div>

                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Watonezz LLP. All rights reserved.</p>
            </div>
        </div>
    )
}
