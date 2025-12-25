"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Users } from "lucide-react"
import Feed from "@/components/community/feed"
import { toast } from "@/components/ui/use-toast"

interface CommunityDetails {
    _id: string
    name: string
    slug: string
    description: string
    icon?: string
    memberCount: number
    isMember: boolean
}

export default function CommunityPage() {
    const params = useParams()
    const { data: session } = useSession()
    const [community, setCommunity] = useState<CommunityDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [joining, setJoining] = useState(false)

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const res = await fetch(`/api/community/groups/${params.slug}`)
                const data = await res.json()
                if (res.ok) {
                    setCommunity(data.community)
                }
            } catch (error) {
                console.error("Error fetching community:", error)
            } finally {
                setLoading(false)
            }
        }

        if (params.slug) {
            fetchCommunity()
        }
    }, [params.slug])

    const handleJoin = async () => {
        if (!session) {
            toast({
                title: "Authentication required",
                description: "Please sign in to join this community",
                variant: "destructive",
            })
            return
        }

        if (!community) return

        setJoining(true)
        try {
            const res = await fetch(`/api/community/groups/${community._id}/join`, {
                method: "POST",
            })
            const data = await res.json()

            if (res.ok) {
                setCommunity({
                    ...community,
                    isMember: data.isMember,
                    memberCount: data.memberCount,
                })
                toast({
                    title: data.isMember ? "Joined Community" : "Left Community",
                    description: data.isMember ? `You are now a member of ${community.name}` : `You have left ${community.name}`,
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update membership",
                variant: "destructive",
            })
        } finally {
            setJoining(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!community) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Community not found</h2>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card className="bg-green-50/50 border-green-100">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                <AvatarImage src={community.icon} alt={community.name} />
                                <AvatarFallback className="text-xl bg-green-100 text-green-700">
                                    {community.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold text-emerald-900">{community.name}</h1>
                                <p className="text-gray-600 max-w-xl">{community.description}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <Users className="h-4 w-4" />
                                    <span>{community.memberCount} members</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleJoin}
                            disabled={joining}
                            variant={community.isMember ? "outline" : "default"}
                        >
                            {joining ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : community.isMember ? (
                                "Joined"
                            ) : (
                                "Join Community"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Feed communityId={community._id} />
        </div>
    )
}
