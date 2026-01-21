import { getAllPackages, getContactSettings } from "@/lib/api";
import Link from 'next/link';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

export default async function PackagesPage() {
    const packages = await getAllPackages();
    const contact = await getContactSettings();
    const whatsappLink = contact?.phone_link ? `https://wa.me/${contact.phone_link}` : 'https://wa.me/50584827719';

    const residential = packages.filter((pkg: any) => pkg.type === 'Residencial');
    const business = packages.filter((pkg: any) => pkg.type === 'Empresarial');

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="text-center mb-lg">
                <h1>Paquetes de Seguridad</h1>
                <p>Soluciones llave en mano diseñadas para tu hogar o negocio.</p>
            </div>

            {/* Residential Section */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Residenciales</h2>
                <div className="grid grid-cols-2 gap-lg">
                    {residential.map((pkg: any) => (
                        <div key={pkg.slug} className="card flex flex-col">
                            <div style={{ height: '250px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: '#334155' }}>
                                {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>{pkg.title}</h3>
                            <p className="text-xl" style={{ color: 'var(--white)', fontWeight: 'bold' }}>${pkg.price}</p>
                            <p>{pkg.description}</p>

                            <div style={{ margin: '1.5rem 0', flex: 1 }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Incluye:</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {pkg.items && pkg.items.map((item: string, index: number) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                                            <FaCheckCircle color="var(--primary)" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a href={`${whatsappLink}?text=Hola, me interesa el paquete ${pkg.title}`} target="_blank" className="btn w-full text-center" style={{ display: 'block' }}>
                                <div className="flex justify-center items-center gap-sm">
                                    <FaWhatsapp /> Solicitar Paquete
                                </div>
                            </a>
                        </div>
                    ))}
                    {residential.length === 0 && <p>No hay paquetes residenciales disponibles por el momento.</p>}
                </div>
            </section>

            {/* Business Section */}
            <section>
                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Empresariales</h2>
                <div className="grid grid-cols-2 gap-lg">
                    {business.map((pkg: any) => (
                        <div key={pkg.slug} className="card flex flex-col">
                            <div style={{ height: '250px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: '#334155' }}>
                                {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>{pkg.title}</h3>
                            <p className="text-xl" style={{ color: 'var(--white)', fontWeight: 'bold' }}>${pkg.price}</p>
                            <p>{pkg.description}</p>

                            <div style={{ margin: '1.5rem 0', flex: 1 }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Incluye:</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {pkg.items && pkg.items.map((item: string, index: number) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                                            <FaCheckCircle color="var(--primary)" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a href={`${whatsappLink}?text=Hola, me interesa el paquete ${pkg.title}`} target="_blank" className="btn w-full text-center" style={{ display: 'block' }}>
                                <div className="flex justify-center items-center gap-sm">
                                    <FaWhatsapp /> Solicitar Paquete
                                </div>
                            </a>
                        </div>
                    ))}
                    {business.length === 0 && <p>No hay paquetes empresariales disponibles por el momento.</p>}
                </div>
            </section>
        </div>
    );
}
