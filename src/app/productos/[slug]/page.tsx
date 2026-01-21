import { getProductBySlug, getAllProducts, getContactSettings } from "@/lib/api";
import { notFound } from "next/navigation";
import { FaCheck, FaWhatsapp } from 'react-icons/fa';

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product: any) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const contact = await getContactSettings();
    const whatsappLink = contact?.phone_link ? `https://wa.me/${contact.phone_link}` : 'https://wa.me/50584827719';

    if (!product) {
        notFound();
    }

    // Schema LD-JSON
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.image ? [`https://sisco360.com${product.image}`] : [],
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "SISCO360"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://sisco360.com/productos/${slug}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="grid grid-cols-2 gap-lg" style={{ alignItems: 'start' }}>
                {/* Gallery */}
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                    {product.image && (
                        <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
                    )}
                </div>

                {/* Info */}
                <div>
                    <div style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>{product.category}</div>
                    <h1 style={{ marginBottom: '1rem' }}>{product.title}</h1>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--white)' }}>${product.price}</div>

                    <p className="text-xl" style={{ marginBottom: '2rem' }}>{product.description}</p>

                    <div style={{ marginBottom: '2rem' }}>
                        <a href={`${whatsappLink}?text=Hola, me interesa el producto: ${product.title}`} target="_blank" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <FaWhatsapp size={20} /> Comprar por WhatsApp
                        </a>
                    </div>

                    {product.specs && (
                        <div className="card" style={{ marginTop: '2rem' }}>
                            <h3>Características Técnicas</h3>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: product.contentHtml }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
