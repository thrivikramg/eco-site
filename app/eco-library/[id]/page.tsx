import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User, ExternalLink } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { getArticleById } from "../../../lib/eco-data"

interface ArticlePageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const article = getArticleById(params.id)

    if (!article) {
        return {
            title: "Article Not Found | EcoSaro",
        }
    }

    return {
        title: `${article.title} | EcoSaro`,
        description: article.excerpt,
    }
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const article = getArticleById(params.id)

    if (!article) {
        notFound()
    }

    return (
        <div className="bg-white min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12">
                    <Link href="/eco-library" className="text-white/80 hover:text-white mb-6 flex items-center w-fit transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
                    </Link>
                    <Badge className="w-fit mb-4 bg-primary text-white border-none text-md px-3 py-1">
                        {article.category}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center text-white/90 gap-4 md:gap-8 text-sm md:text-base">
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            {article.author}
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {article.date}
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {article.readTime}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="lead text-xl md:text-2xl font-medium text-gray-900 mb-8 border-l-4 border-primary pl-6 italic">
                            {article.excerpt}
                        </p>

                        {article.content ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : (
                            <div className="space-y-6">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <h2>Understanding the Impact</h2>
                                <p>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <h2>Future Perspectives</h2>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* External Link Call to Action */}
                    {article.externalLink && (
                        <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-100 text-center">
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Want to read the original source?</h3>
                            <p className="text-gray-600 mb-6">
                                This article is curated from external sources. You can read the full original content on the publisher's website.
                            </p>
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <a href={article.externalLink} target="_blank" rel="noopener noreferrer">
                                    Read Original Article <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
