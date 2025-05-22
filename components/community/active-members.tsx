import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActiveMembers() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Active Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-gray-500">{member.expertise}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Follow
            </Button>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View All Members
        </Button>
      </CardContent>
    </Card>
  )
}

const activeMembers = [
  {
    name: "Dr. Rajesh Kumar",
    expertise: "Organic Farming Expert",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
  },
  {
    name: "Meera Patel",
    expertise: "Zero Waste Advocate",
    avatar: "/placeholder.svg?height=40&width=40&text=MP",
  },
  {
    name: "Vikram Singh",
    expertise: "Permaculture Designer",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
  },
  {
    name: "Ananya Desai",
    expertise: "Sustainable Living Coach",
    avatar: "/placeholder.svg?height=40&width=40&text=AD",
  },
  {
    name: "Sanjay Gupta",
    expertise: "Urban Gardening Specialist",
    avatar: "/placeholder.svg?height=40&width=40&text=SG",
  },
]
