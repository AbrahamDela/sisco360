import { FaBriefcase, FaUpload } from 'react-icons/fa';

export default function WorkWithUsPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="text-center mb-lg">
                <h1>Trabaja con Nosotros</h1>
                <p>Únete al equipo líder en seguridad electrónica de Nicaragua.</p>
            </div>

            <div className="grid grid-cols-2 gap-lg" style={{ alignItems: 'start' }}>
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--secondary)' }}>¿Por qué SISCO360?</h2>
                        <p>Somos una empresa en constante crecimiento, comprometida con la innovación y la excelencia. Buscamos talento apasionado por la tecnología y el servicio al cliente.</p>
                    </div>

                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}><FaBriefcase style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Plazas Comunes</h3>
                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>• Técnicos Instaladores de CCTV</li>
                            <li style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>• Agentes de Ventas Corporativas</li>
                            <li style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>• Soporte Técnico Especializado</li>
                            <li>• Administrativo y Logística</li>
                        </ul>
                    </div>
                </div>

                <form className="card" name="careers" method="POST" data-netlify="true" encType="multipart/form-data">
                    <input type="hidden" name="form-name" value="careers" />

                    <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Envíanos tus datos</h3>

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
                        <input type="tel" name="phone" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} required />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Área de Interés</label>
                        <select name="position" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }} required>
                            <option value="">Selecciona una opción</option>
                            <option value="tecnico">Técnico Instalador</option>
                            <option value="ventas">Ventas</option>
                            <option value="soporte">Soporte IT</option>
                            <option value="admin">Administración</option>
                            <option value="pasantia">Pasantía</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mensaje o Presentación</label>
                        <textarea name="message" rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}></textarea>
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }}>Enviar Solicitud</button>
                </form>
            </div>
        </div>
    );
}
