import { getAllProducts } from "@/lib/api";
import Link from 'next/link';

export default async function ProductsPage() {
    const products = await getAllProducts();

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="text-center mb-lg">
                <h1>Catálogo de Productos</h1>
                <p>Encuentra la solución de seguridad perfecta para ti.</p>
            </div>

            <div className="grid grid-cols-3 gap-lg">
                {products.map((product: any) => (
                    <Link href={`/productos/${product.slug}`} key={product.slug} className="card" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ height: '240px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1rem', background: '#334155' }}>
                            {product.image && <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.category}</div>
                        <h3>{product.title}</h3>
                        <p style={{ fontSize: '0.9rem', height: '3rem', overflow: 'hidden' }}>{product.description}</p>
                        <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--white)' }}>${product.price}</span>
                            <span className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Ver Detalle</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
