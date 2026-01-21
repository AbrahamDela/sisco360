'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaWhatsapp, FaSearch } from 'react-icons/fa';
import SearchModal from './SearchModal';

export default function Navbar({ contact }: { contact?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const whatsappLink = contact?.phone_link ? `https://wa.me/${contact.phone_link}` : 'https://wa.me/50584827719';

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center" style={{ padding: '1rem' }}>
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--white)', fontWeight: 'bold', fontSize: '1.5rem' }}>SISC</span>
          <img src="/images/centro_sisco360.svg" alt="O" style={{ height: '25px', margin: '0 1px' }} />
          <span style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize: '1.5rem' }}>360</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu flex gap-lg items-center">
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/paquetes">Paquetes</Link>
          <Link href="/vlogs">Blog</Link>
          <Link href="/contacto">Contacto</Link>

          <button onClick={() => setIsSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <FaSearch size={18} />
          </button>

          <a href={whatsappLink} target="_blank" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <FaWhatsapp /> Cotizar
          </a>
        </div>

        {/* Mobile Toggle & Search */}
        <div className="flex items-center gap-md mobile-actions">
          <button onClick={() => setIsSearchOpen(true)} className="mobile-search-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', marginRight: '1rem' }}>
            <FaSearch size={20} />
          </button>
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link href="/" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link href="/productos" onClick={() => setIsOpen(false)}>Productos</Link>
          <Link href="/paquetes" onClick={() => setIsOpen(false)}>Paquetes</Link>
          <Link href="/vlogs" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
          <a href={whatsappLink} target="_blank" className="btn whatsapp-btn-mobile" onClick={() => setIsOpen(false)}>
            <FaWhatsapp /> Cotizar con Asesor
          </a>
        </div>
      </div>

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      <style jsx>{`
        .navbar {
          background-color: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }
        .desktop-menu {
          display: flex;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
        }
        .mobile-search-btn {
          display: none;
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none; }
          .mobile-toggle { display: block; }
          .mobile-search-btn { display: block; }

          .mobile-menu {
            display: block;
            position: fixed;
            top: 73px; /* Height of navbar */
            left: 0;
            width: 100%;
            height: calc(100vh - 73px);
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(15px);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            z-index: 99;
            padding: 2rem;
            border-top: 1px solid var(--glass-border);
          }
          .mobile-menu.open {
            transform: translateX(0);
          }
          .mobile-menu-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            height: 100%;
            overflow-y: auto;
          }
          .mobile-menu a {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--text-muted);
            text-decoration: none;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid transparent;
            transition: all 0.3s;
          }
          .mobile-menu a:hover, .mobile-menu a:active {
            color: var(--secondary);
            padding-left: 10px;
          }
          .whatsapp-btn-mobile {
            margin-top: 1rem;
            background: var(--primary);
            color: white !important;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem !important;
            border-radius: var(--radius-md);
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </nav>
  );
}
