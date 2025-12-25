"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, Plus } from "lucide-react"

interface Community {
    _id: string
    name: string
    slug: string
    icon?: string
    memberCount: number
}

export default function CommunitySidebar() {
    const [communities, setCommunities] = useState<Community[]>([])
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await fetch("/api/community/groups")
                const data = await res.json()
                if (res.ok) {
                    setCommunities(data.communities)
                }
            } catch (error) {
                console.error("Error fetching communities:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCommunities()
    }, [])

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Communities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    <Button
                        variant={pathname === "/community" ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                    >
                        <Link href="/community">
                            <Users className="mr-2 h-4 w-4" />
                            All Posts
                        </Link>
                    </Button>

                    <div className="pt-2 pb-1">
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Popular
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-4">
                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                    ) : communities.length > 0 ? (
                        communities.map((community) => (
                            <Button
                                key={community._id}
                                variant={pathname === `/community/${community.slug}` ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={`/community/${community.slug}`}>
                                    <span className="mr-2 text-lg leading-none">
                                        {community.icon ? (
                                            <img src={community.icon} alt="" className="h-4 w-4 rounded-full object-cover" />
                                        ) : (
                                            "#"
                                        )}
                                    </span>
                                    {community.name}
                                </Link>
                            </Button>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                            No communities yet.
                        </div>
                    )}

                    {/* <div className="pt-2">
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/community/create">
                                <Plus className="mr-2 h-4 w-4" /> Create Community
                            </Link>
                        </Button>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    )
}
