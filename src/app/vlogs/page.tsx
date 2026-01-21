import { getAllPosts } from "@/lib/api";
import Link from 'next/link';

export default async function VlogsPage() {
    const posts = await getAllPosts(['slug', 'title', 'date', 'excerpt', 'thumbnail', 'category']);

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="text-center mb-lg">
                <h1>Blog y Novedades</h1>
                <p>Mantente informado sobre seguridad y tecnología en Nicaragua.</p>
            </div>

            <div className="grid grid-cols-3 gap-lg">
                {posts.map((post: any) => (
                    <Link href={`/vlogs/${post.slug}`} key={post.slug} className="card" style={{ padding: 0, overflow: 'hidden', display: 'block', textDecoration: 'none' }}>
                        <div style={{ height: '200px', background: '#334155' }}>
                            {post.thumbnail && <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: 'var(--secondary)' }}>{post.category}</span>
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{post.title}</h3>
                            <p style={{ fontSize: '0.9rem' }}>{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
