import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Award, Calendar } from "lucide-react"

export default function JoinCommunity() {
  return (
    <Card className="bg-green-50 border-green-100">
      <CardHeader className="pb-3">
        <CardTitle>Join Our Community</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Connect with like-minded individuals passionate about sustainable living and eco-friendly practices.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Connect with Experts</h4>
              <p className="text-xs text-gray-600">Get advice from experienced gardeners and eco-enthusiasts</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Join Discussions</h4>
              <p className="text-xs text-gray-600">Share your experiences and learn from others</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Attend Events</h4>
              <p className="text-xs text-gray-600">Participate in workshops, webinars, and local meetups</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Earn Rewards</h4>
              <p className="text-xs text-gray-600">Get points for your contributions and redeem exclusive benefits</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create an Account</Button>
      </CardFooter>
    </Card>
  )
}
