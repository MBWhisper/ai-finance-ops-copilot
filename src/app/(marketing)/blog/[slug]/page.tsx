import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OptimizedImage } from '@/components/OptimizedImage'
import { notFound } from 'next/navigation'

interface Frontmatter {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  coverImage: string
  slug: string
}

const POSTS_DIR = path.join(process.cwd(), 'src/app/(marketing)/blog/_posts')

function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

function getPost(slug: string): { frontmatter: Frontmatter; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  return { frontmatter: data as Frontmatter, content }
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const { frontmatter } = post
  const url = `https://aifinanceops.app/blog/${slug}`
  return {
    title: `${frontmatter.title} | AI Finance Ops`,
    description: frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${frontmatter.title} | AI Finance Ops`,
      description: frontmatter.description,
      url,
      type: 'article',
      images: [
        {
          url: frontmatter.coverImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { content: mdxContent, frontmatter } = post

  const { content } = await compileMDX({
    source: mdxContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      img: (props) => (
        <OptimizedImage
          src={props.src || ''}
          alt={props.alt || ''}
          className="w-full rounded-xl my-8 aspect-video object-cover"
          width={800}
          height={450}
        />
      ),
      a: (props) => {
        const href = props.href || ''
        if (href.startsWith('/')) {
          return (
            <Link
              href={href}
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              {props.children}
            </Link>
          )
        }
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            {props.children}
          </a>
        )
      },
      table: (props) => (
        <div className="overflow-x-auto my-8">
          <table className="w-full text-left text-sm border-collapse" {...props} />
        </div>
      ),
      th: (props) => (
        <th className="border-b border-slate-700 px-4 py-3 font-semibold text-slate-200" {...props} />
      ),
      td: (props) => (
        <td className="border-b border-slate-800 px-4 py-3 text-slate-300" {...props} />
      ),
    },
  })

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const wordCount = mdxContent.split(/\s+/).length
  const readTime = Math.max(1, Math.round(wordCount / 200))

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: frontmatter.title,
            datePublished: frontmatter.date,
            author: {
              "@type": "Person",
              name: "Mo",
            },
            publisher: {
              "@type": "Organization",
              name: "AI Finance Ops",
              url: "https://aifinanceops.app",
            },
          }),
        }}
      />
      <article className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-400 transition-colors mb-6"
          >
            &larr; Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            {frontmatter.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 capitalize"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
            <span className="text-xs text-slate-500">{formatDate(frontmatter.date)}</span>
            <span className="text-xs text-slate-500">&middot; {readTime} min read</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {frontmatter.description}
          </p>
        </div>

        <OptimizedImage
          src={frontmatter.coverImage}
          alt={`Cover image for ${frontmatter.title}`}
          className="w-full rounded-xl mb-12 aspect-video object-cover"
          width={1200}
          height={630}
          priority
        />

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-headings:mt-10 prose-headings:mb-4 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 prose-li:text-slate-300 prose-code:text-emerald-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-pre:p-4 prose-strong:text-slate-200 prose-hr:border-slate-800 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-semibold">
          {content}
        </div>

        <div className="mt-16 border-t border-slate-800 pt-10 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Track Your SaaS Metrics for Free
          </h3>
          <p className="text-slate-400 mb-6">
            AI Finance Ops automatically tracks MRR, churn, runway, and more.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-all"
          >
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  )
}
