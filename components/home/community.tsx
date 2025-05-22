"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react"

// Mock community posts data
const communityPosts = [
  {
    id: "1",
    title: "My urban garden transformation",
    excerpt: "I transformed my small balcony into a thriving urban garden. Here's how I did it...",
    image: "/placeholder.svg?height=300&width=400&text=Urban+Garden",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PS",
    },
    likes: 128,
    comments: 32,
    shares: 14,
  },
  {
    id: "2",
    title: "DIY compost bin from recycled materials",
    excerpt: "Check out my weekend project - a compost bin made entirely from recycled materials!",
    image: "/placeholder.svg?height=300&width=400&text=DIY+Compost",
    author: {
      name: "Rahul Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RP",
    },
    likes: 95,
    comments: 27,
    shares: 8,
  },
  {
    id: "3",
    title: "Harvested my first batch of organic tomatoes",
    excerpt: "After months of care, I finally harvested my first batch of organic tomatoes. The taste is incredible!",
    image: "/placeholder.svg?height=300&width=400&text=Organic+Tomatoes",
    author: {
      name: "Ananya Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AG",
    },
    likes: 156,
    comments: 41,
    shares: 22,
  },
]

export default function Community() {
  const router = useRouter()

  const handleJoinCommunity = () => {
    router.push("/community")
  }

  const handleViewPost = (postId: string) => {
    router.push(`/community/post/${postId}`)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Community Highlights</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our growing community of eco-enthusiasts sharing their sustainable living journeys
            </p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={handleJoinCommunity}>
            Join The Community
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author.name}</span>
                </div>

                <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span>{post.shares}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => handleViewPost(post.id)}>
                  View Post
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
