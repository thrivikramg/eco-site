"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, Calendar, MapPin, Clock } from "lucide-react"

export default function Feed() {
  const [activeTab, setActiveTab] = useState("latest")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Community Feed</h2>
        <Button>Create Post</Button>
      </div>

      <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          {posts
            .sort((a, b) => b.likes - a.likes)
            .map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {posts
            .filter((post) => post.type === "event")
            .map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          {posts
            .filter((post) => post.type === "question")
            .map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-6">
          {posts
            .filter((post) => post.author.isFollowing)
            .map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PostCard({ post }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{post.author.name}</span>
                {post.author.isVerified && (
                  <span className="ml-1 inline-flex items-center">
                    <svg
                      className="h-4 w-4 text-green-500 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                      />
                    </svg>
                  </span>
                )}
                <span className="text-gray-500 text-sm ml-2">{post.timeAgo}</span>
              </div>
              <Badge variant={getBadgeVariant(post.type)}>{post.type}</Badge>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>

              {post.image && (
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}

              {post.type === "event" && (
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{post.event.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{post.event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{post.event.location}</span>
                  </div>
                  <Button size="sm" className="mt-2">
                    RSVP
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getBadgeVariant(type) {
  switch (type) {
    case "discussion":
      return "outline"
    case "question":
      return "secondary"
    case "event":
      return "default"
    case "tip":
      return "success"
    default:
      return "outline"
  }
}

const posts = [
  {
    title: "Just harvested my first batch of organic tomatoes!",
    content:
      "After months of care, I finally harvested my first batch of organic tomatoes from my balcony garden. The taste is incredible compared to store-bought ones. Has anyone else had success with balcony vegetable gardens?",
    image: "/placeholder.svg?height=400&width=600&text=Organic+Tomatoes",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      isVerified: true,
      isFollowing: true,
    },
    type: "discussion",
    likes: 42,
    comments: 18,
    timeAgo: "2 hours ago",
  },
  {
    title: "Upcoming Workshop: DIY Natural Cleaning Products",
    content:
      "Join us for a hands-on workshop where you'll learn to make effective, non-toxic cleaning products using simple ingredients. Perfect for those looking to reduce plastic waste and harmful chemicals in their home.",
    author: {
      name: "EcoGrow Team",
      avatar: "/placeholder.svg?height=40&width=40&text=EG",
      isVerified: true,
      isFollowing: false,
    },
    type: "event",
    event: {
      date: "June 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "EcoGrow Community Center, Chennai",
    },
    likes: 35,
    comments: 8,
    timeAgo: "1 day ago",
  },
  {
    title: "How do I prevent aphids on my pepper plants without chemicals?",
    content:
      "My pepper plants are being attacked by aphids and I don't want to use chemical pesticides. I've tried neem oil but it doesn't seem to be working well. Any natural solutions that have worked for you?",
    author: {
      name: "Arjun Mehta",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      isVerified: false,
      isFollowing: true,
    },
    type: "question",
    likes: 18,
    comments: 24,
    timeAgo: "3 days ago",
  },
  {
    title: "Quick tip: Use coffee grounds as fertilizer",
    content:
      "Don't throw away your used coffee grounds! They make excellent fertilizer for acid-loving plants like roses, azaleas, and blueberries. Just sprinkle them around the base of your plants or add to your compost pile. They're rich in nitrogen and help improve soil structure.",
    author: {
      name: "Lakshmi Nair",
      avatar: "/placeholder.svg?height=40&width=40&text=LN",
      isVerified: true,
      isFollowing: false,
    },
    type: "tip",
    likes: 56,
    comments: 12,
    timeAgo: "5 days ago",
  },
]
