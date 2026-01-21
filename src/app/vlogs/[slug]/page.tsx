import { getPostBySlug, getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = await getAllPosts(['slug']);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug, ['title', 'date', 'slug', 'author', 'content', 'thumbnail', 'excerpt']);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.thumbnail ? [`https://sisco360.com${post.thumbnail}`] : [],
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": post.date,
        "description": post.excerpt
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center mb-lg">
                <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>{new Date(post.date).toLocaleDateString()} — {post.author}</div>
                <h1 style={{ fontSize: '3rem' }}>{post.title}</h1>
            </div>

            {post.thumbnail && (
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '3rem' }}>
                    <img src={post.thumbnail} alt={post.title} style={{ width: '100%' }} />
                </div>
            )}

            <article className="prose" style={{ lineHeight: '1.8' }}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>


        </div>
    );
}
