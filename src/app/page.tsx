import { getPageContent, getAllProducts, getAllPosts, getAllPackages } from "@/lib/api";
import Link from 'next/link';
import { FaShieldAlt, FaWarehouse, FaHome, FaTools } from 'react-icons/fa';

export default async function Home() {
  const pageData = await getPageContent('home');
  const products = await getAllProducts();
  const posts = await getAllPosts(['slug', 'title', 'excerpt', 'thumbnail', 'category', 'date']);
  const allPackages = await getAllPackages();

  // Featured Packages Logic
  const featuredPackageSlugs = pageData?.featured_packages || [];
  const featuredPackages = allPackages.filter((pkg: any) => featuredPackageSlugs.includes(pkg.slug));

  // Filter latest 3 products/posts
  const recentProducts = products.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${pageData?.hero_image || '/images/hero-placeholder.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #00a8cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {pageData?.hero_title || 'Seguridad Inteligente'}
          </h1>
          <p className="text-xl" style={{ maxWidth: '800px', margin: '0 auto 2.5rem', color: '#cbd5e1' }}>
            {pageData?.hero_subtitle || 'La mejor tecnología en vigilancia para Nicaragua.'}
          </p>
          <div className="flex justify-center gap-md">
            <Link href="/contacto" className="btn">Solicitar Cotización</Link>
            <Link href="/productos" className="btn" style={{ background: 'transparent', border: '1px solid var(--white)' }}>Ver Catálogo</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container section-padding" style={{ padding: '6rem 1rem' }}>
        <h2 className="text-center">Nuestros Servicios</h2>
        <p className="text-center mb-lg">Soluciones integrales para cada necesidad en Nicaragua.</p>

        <div className="grid grid-cols-3 gap-lg">
          <div className="card text-center">
            <FaHome size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3>Residenciales</h3>
            <p>Convierte tu hogar en una casa inteligente y segura con cámaras de acceso remoto, cerraduras inteligentes, smart switches y control IR.</p>
          </div>
          <div className="card text-center">
            <FaWarehouse size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3>Empresariales</h3>
            <p>Protege y gestiona tu empresa con cámaras de seguridad HD, monitoreo de flotas con GPS en tiempo real y control de asistencia del personal.</p>
          </div>
          <div className="card text-center">
            <FaTools size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3>Soporte Técnico</h3>
            <p>Instalación y soporte técnico para garantizar el correcto funcionamiento de todos nuestros sistemas.</p>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      {
        featuredPackages.length > 0 && (
          <section className="container section-padding" style={{ padding: '6rem 1rem' }}>
            <div className="flex justify-between items-center mb-lg">
              <div className="text-center w-full">
                <h2>Paquetes Destacados</h2>
                <p>Soluciones completas seleccionadas para ti.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-lg">
              {featuredPackages.map((pkg: any) => (
                <div key={pkg.slug} className="card flex flex-col">
                  <div style={{ position: 'relative', height: '250px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: '#334155' }}>
                    {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--secondary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {pkg.type}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem' }}>{pkg.title}</h3>
                  <p className="text-xl" style={{ color: 'var(--white)', fontWeight: 'bold' }}>${pkg.price}</p>
                  <p>{pkg.description}</p>

                  <div style={{ marginTop: '1.5rem' }}>
                    <Link href="/paquetes" className="btn w-full text-center" style={{ display: 'block', background: 'transparent', border: '1px solid var(--primary)' }}>
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }

      {/* Featured Products */}
      <section style={{ background: 'var(--bg-card)', padding: '6rem 0' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-lg">
            <h2>Productos Destacados</h2>
            <Link href="/productos" style={{ color: 'var(--secondary)' }}>Ver todos &rarr;</Link>
          </div>

          <div className="grid grid-cols-3 gap-lg">
            {recentProducts.map((product: any) => (
              <Link href={`/productos/${product.slug}`} key={product.slug} className="card" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1rem', background: '#334155' }}>
                  {product.image && <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <h3>{product.title}</h3>
                <p style={{ fontSize: '0.9rem', height: '4.5rem', overflow: 'hidden' }}>{product.description}</p>
                <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--white)' }}>${product.price}</span>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Ver detalles</span>
                </div>
              </Link>
            ))}
            {recentProducts.length === 0 && <p>No hay productos destacados aún.</p>}
          </div>
        </div>
      </section>


    </>
  );
}
