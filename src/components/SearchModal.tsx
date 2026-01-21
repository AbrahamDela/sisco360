'use client';

import { useState, useMemo } from 'react';
import { FaSearch, FaTimes, FaSpinner, FaArrowRight } from 'react-icons/fa';
import Fuse from 'fuse.js';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function SearchModal({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState('');
    const { data, error, isLoading } = useSWR('/api/search', fetcher);

    const fuse = useMemo(() => {
        if (!data) return null;
        return new Fuse(data, {
            keys: ['title', 'description', 'category', 'type'],
            threshold: 0.3, // 0.0 require exact match, 1.0 match anything
            includeScore: true
        });
    }, [data]);

    const results = useMemo(() => {
        if (!query || !fuse) return [];
        return fuse.search(query).map(result => result.item).slice(0, 5); // Limit to 5 results
    }, [query, fuse]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            paddingTop: '5rem'
        }} onClick={onClose}>
            <div style={{
                width: '90%',
                maxWidth: '600px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Header / Input */}
                <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <FaSearch color="var(--text-muted)" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar productos, paquetes, blogs..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--white)',
                            fontSize: '1.1rem'
                        }}
                    />
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Results */}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {isLoading && (
                        <div className="flex justify-center items-center" style={{ padding: '2rem' }}>
                            <FaSpinner className="spin" size={24} color="var(--primary)" />
                        </div>
                    )}

                    {!isLoading && query && results.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No se encontraron resultados para "{query}"
                        </div>
                    )}

                    {!isLoading && !query && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Escribe para comenzar a buscar...
                        </div>
                    )}

                    {results.map((item: any, index) => (
                        <Link href={item.slug} key={index} onClick={onClose} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            borderBottom: '1px solid var(--glass-border)',
                            textDecoration: 'none',
                            transition: 'background 0.2s'
                        }} className="search-result-item">
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: 'var(--radius-sm)',
                                background: '#334155',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.1rem 0.4rem',
                                        borderRadius: '1rem'
                                    }}>
                                        {item.type}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</span>
                                </div>
                                <h4 style={{ color: 'var(--white)', margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</p>
                            </div>
                            <FaArrowRight color="var(--text-muted)" size={14} />
                        </Link>
                    ))}
                </div>

            </div>
            <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .search-result-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </div>
    );
}
