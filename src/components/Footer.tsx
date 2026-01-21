import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer({ contact }: { contact?: any }) {
    return (
        <footer style={{ backgroundColor: 'var(--bg-card)', padding: '4rem 0', marginTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container grid grid-cols-4" style={{ gap: '2rem' }}>
                <div>
                    <h3 style={{ color: 'var(--white)' }}>SISCO360</h3>
                    <p>Líderes en sistemas de seguridad y videovigilancia en Nicaragua.</p>
                    <div className="flex gap-md" style={{ marginTop: '1rem' }}>
                        {contact?.facebook_url && <a href={contact.facebook_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}><FaFacebook /></a>}
                        {contact?.instagram_url && <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}><FaInstagram /></a>}
                        {contact?.tiktok_url && <a href={contact.tiktok_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}><FaTiktok /></a>}
                    </div>
                </div>
                <div>
                    <h3>Enlaces</h3>
                    <div className="flex flex-col gap-sm" style={{ gap: '0.5rem' }}>
                        <a href="/">Inicio</a>
                        <a href="/productos">Productos</a>
                        <a href="/vlogs">Blog</a>
                        <a href="/contacto">Contacto</a>
                        <a href="/trabaja-con-nosotros">Trabaja con Nosotros</a>
                    </div>
                </div>
                <div>
                    <h3>Contacto</h3>
                    <p>{contact?.address || 'Managua, Nicaragua'}</p>
                    <p>{contact?.phone_display || '+505 84827719'}</p>
                    <p>{contact?.email || 'ventas@sisco360.com'}</p>
                </div>
                <div>
                    <h3>Legal</h3>
                    <p>Política de Privacidad</p>
                    <p>Términos de Servicio</p>
                </div>
            </div>
            <div className="text-center" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>&copy; {new Date().getFullYear()} SISCO360. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
