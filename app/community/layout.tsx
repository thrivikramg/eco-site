import CommunitySidebar from "@/components/community/community-sidebar"

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="hidden md:block md:col-span-1">
                    <CommunitySidebar />
                </div>
                <div className="md:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    )
}
