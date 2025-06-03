"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  User, 
  Save, 
  Lock, 
  Unlock, 
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  Clock,
  Shield,
  Edit,
  FileText,
  Upload,
  X
} from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"

export default function ProfilePage() {
  // Mock profile data
  const [profile, setProfile] = useState({
    name: "Ananya Sharma",
    email: "ananya@ecofriendlygoods.com",
    phone: "+91 98765-43210",
    avatar: "/avatars/ananya.jpg",
    location: "Bangalore, Karnataka",
    joinedDate: "January 15, 2023",
    businessName: "EcoFriendly Goods",
    businessType: "Sole Proprietorship",
    website: "https://ecofriendlygoods.com",
    socialLinks: {
      instagram: "ecofriendly_goods",
      facebook: "EcoFriendlyGoods",
      twitter: "ecofriendly_goods"
    }
  })

  // Mock verification status
  const verificationStatus = {
    email: "verified",
    phone: "verified",
    identity: "verified",
    address: "verified",
    bankAccount: "verified",
    gst: "verified"
  }

  // Mock support tickets
  const supportTickets = [
    {
      id: "TKT-1234",
      subject: "Payment not received for order #38290",
      status: "open",
      priority: "high",
      createdAt: "2025-06-01T10:30:00Z",
      lastUpdated: "2025-06-01T14:45:00Z",
      messages: [
        { 
          sender: "user", 
          text: "I haven't received payment for order #38290 which was delivered on May 28th. Please check.", 
          timestamp: "2025-06-01T10:30:00Z" 
        },
        { 
          sender: "support", 
          text: "Thank you for bringing this to our attention. We'll investigate the payment status and get back to you shortly.", 
          timestamp: "2025-06-01T14:45:00Z" 
        }
      ]
    },
    {
      id: "TKT-1230",
      subject: "Need help with product upload",
      status: "closed",
      priority: "medium",
      createdAt: "2025-05-28T09:15:00Z",
      lastUpdated: "2025-05-29T11:20:00Z",
      messages: [
        { 
          sender: "user", 
          text: "I'm trying to upload multiple products using the bulk upload feature but getting an error.", 
          timestamp: "2025-05-28T09:15:00Z" 
        },
        { 
          sender: "support", 
          text: "Could you please share the error message you're seeing? Also, make sure your CSV file follows the template format.", 
          timestamp: "2025-05-28T15:30:00Z" 
        },
        { 
          sender: "user", 
          text: "The error says 'Invalid column format'. I'll check the template and try again.", 
          timestamp: "2025-05-29T08:45:00Z" 
        },
        { 
          sender: "support", 
          text: "Great! Let us know if you continue to have issues after reviewing the template format.", 
          timestamp: "2025-05-29T11:20:00Z" 
        }
      ]
    }
  ]

  // Mock FAQ data
  const faqItems = [
    {
      question: "How do I process refunds for orders?",
      answer: "To process a refund, go to the Orders section, find the specific order, click on the dropdown menu, and select 'Process Refund'. You can choose between partial or full refund options. Refunds typically take 5-7 business days to reflect in the customer's account."
    },
    {
      question: "How can I update my inventory in bulk?",
      answer: "You can update inventory in bulk by downloading the current inventory CSV from the Inventory page, making your changes in the spreadsheet, and then uploading the updated CSV. Make sure to keep the format consistent and only modify the stock quantities column."
    },
    {
      question: "When will I receive my payments?",
      answer: "Payments are processed every 14 days for all orders that have been delivered and are past the return period. The funds will be transferred to your registered bank account, and you can view all payment details in the Payments section."
    },
    {
      question: "How do I change my bank account details?",
      answer: "To update your bank account information, go to Store Settings > Banking tab. After updating, you'll need to verify the new account which may take 2-3 business days. All pending payments will be sent to the new account once verification is complete."
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Open</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "closed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      case "not_submitted":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Submitted</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile & Support</h1>
          <p className="text-gray-500">Manage your account and get help</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="verification" className="flex-1">Verification</TabsTrigger>
          <TabsTrigger value="support" className="flex-1">Support</TabsTrigger>
          <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Picture
                </Button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Joined {profile.joinedDate}</p>
                  <p className="text-sm text-gray-500">{profile.location}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal and business details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" value={profile.name} />
                    </div>
                    <div>
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" value={profile.businessName} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={profile.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={profile.phone} />
                    </div>
                    <div>
                      <Label htmlFor="business-type">Business Type</Label>
                      <Input id="business-type" value={profile.businessType} />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" value={profile.website} />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Social Media Links</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <Label htmlFor="instagram" className="text-xs">Instagram</Label>
                        <Input id="instagram" value={profile.socialLinks.instagram} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="facebook" className="text-xs">Facebook</Label>
                        <Input id="facebook" value={profile.socialLinks.facebook} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="twitter" className="text-xs">Twitter</Label>
                        <Input id="twitter" value={profile.socialLinks.twitter} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" value="••••••••" />
                    </div>
                    <div></div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="flex-1">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Enable
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Verification Status
              </CardTitle>
              <CardDescription>
                Track the status of your account verification process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Account Fully Verified</h3>
                      <p className="text-sm text-green-700">
                        Your account has been fully verified. You have access to all platform features.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>Email Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.email)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>Phone Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.phone)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>Identity Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.identity)}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>Address Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.address)}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>Bank Account Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.bankAccount)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>GST Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(verificationStatus.gst)}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support">
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Create New Ticket
                </Button>
                
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-medium">Contact Us</h3>
                  <p className="text-sm">
                    Email: support@ecogrow.com
                  </p>
                  <p className="text-sm">
                    Phone: +1 (800) 123-4567
                  </p>
                  <p className="text-sm">
                    Hours: Mon-Fri, 9am-6pm IST
                  </p>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-medium">Help Resources</h3>
                  <ul className="space-y-1">
                    <li>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Seller Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Video Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Knowledge Base
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Support Tickets
                </CardTitle>
                <CardDescription>
                  View and manage your support requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{new Date(ticket.lastUpdated).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {supportTickets.length > 0 && (
                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value={supportTickets[0].id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <span>{supportTickets[0].id}:</span>
                          <span>{supportTickets[0].subject}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 px-1 py-2">
                          {supportTickets[0].messages.map((message, index) => (
                            <div 
                              key={index} 
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.sender === 'user' 
                                    ? 'bg-green-50 border border-green-100' 
                                    : 'bg-gray-50 border border-gray-100'
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(message.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="mt-4 pt-4 border-t">
                            <Label htmlFor="reply">Reply</Label>
                            <Textarea 
                              id="reply" 
                              placeholder="Type your response here..." 
                              className="mt-2"
                            />
                            <div className="flex justify-end mt-2">
                              <Button className="bg-green-600 hover:bg-green-700 text-white">
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Common questions and answers to help you manage your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-2">Can't find what you're looking for?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have a question that's not covered here, you can create a support ticket or contact our team directly.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
