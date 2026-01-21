import { NextResponse } from 'next/server';
import { getAllProducts, getAllPackages, getAllPosts } from '@/lib/api';

export async function GET() {
    const products = await getAllProducts();
    const packages = await getAllPackages();
    const posts = await getAllPosts(['slug', 'title', 'excerpt', 'category', 'date']);

    const searchData = [
        ...products.map(p => ({
            type: 'Producto',
            title: p.title,
            description: p.description,
            slug: `/productos/${p.slug}`,
            image: p.image,
            category: p.category
        })),
        ...packages.map(p => ({
            type: 'Paquete',
            title: p.title,
            description: p.description,
            slug: `/paquetes`,
            image: p.image,
            category: p.type
        })),
        ...posts.map(p => ({
            type: 'Blog',
            title: p.title,
            description: p.excerpt,
            slug: `/vlogs/${p.slug}`,
            image: p.thumbnail,
            category: p.category
        }))
    ];

    return NextResponse.json(searchData);
}
