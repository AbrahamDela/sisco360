import { getContactSettings } from "@/lib/api";

export default async function ContactPage() {
    const contact = await getContactSettings();

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="text-center mb-lg">
                <h1>Contáctanos</h1>
                <p>Estamos listos para asesorarte en tu proyecto de seguridad.</p>
            </div>

            <div className="grid grid-cols-2 gap-lg">
                <div>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3>Información de Contacto</h3>
                        <p><strong>Dirección:</strong> {contact?.address || 'Km 4.5 Carretera a Masaya, Managua, Nicaragua.'}</p>
                        <p><strong>Teléfono:</strong> {contact?.phone_display || '+505 84827719'}</p>
                        <p><strong>Email:</strong> {contact?.email || 'ventas@sisco360.com'}</p>
                        <p><strong>Horario:</strong> Lunes a Viernes 8am - 5pm</p>
                    </div>

                    <iframe
                        src={contact?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124859.9482559098!2d-86.35368305000001!3d12.1362776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71560c0084347b%3A0x62913e6187748444!2sManagua%2C%20Nicaragua!5e0!3m2!1ses!2sus!4v1689600000000!5m2!1ses!2sus"}
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                        loading="lazy">
                    </iframe>
                </div>

                <form className="card" name="contact" method="POST">
                    <input type="hidden" name="form-name" value="contact" />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre Completo</label>
                        <input type="text" name="name" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} required />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" name="email" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} required />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Teléfono</label>
                        <input type="tel" name="phone" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mensaje</label>
                        <textarea name="message" rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} required></textarea>
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }}>Enviar Mensaje</button>
                </form>
            </div>
        </div>
    );
}
