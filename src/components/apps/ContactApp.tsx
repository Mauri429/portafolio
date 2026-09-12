import { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaUserCircle, FaMapMarkerAlt, FaCopy } from 'react-icons/fa';
import { profile } from '../../config/profile';
export function ContactApp() {
  const [message, setMessage] = useState('');
  const copy = async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); setMessage(`${label} copiado.`); }
    catch { setMessage(`No se pudo copiar automáticamente. Seleccioná y copiá el ${label.toLowerCase()} que aparece en la tarjeta.`); }
  };
  const whatsapp = /^https:\/\//i.test(profile.whatsapp) ? profile.whatsapp : `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`;
  return <div className="app-padding contact-card"><FaUserCircle className="contact-avatar" /><h2>{profile.name}</h2><p>{profile.title}</p><p><FaMapMarkerAlt /> {profile.location}</p><dl className="contact-fields"><div><dt>Email</dt><dd>{profile.email ? <><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="classic" aria-label="Copiar email" onClick={() => void copy(profile.email, 'Email')}><FaCopy /></button></> : 'Todavía no disponible'}</dd></div><div><dt>Teléfono</dt><dd>{profile.phone ? <><a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a><button className="classic" aria-label="Copiar teléfono" onClick={() => void copy(profile.phone, 'Teléfono')}><FaCopy /></button></> : 'Todavía no disponible'}</dd></div></dl><div className="action-row"><a className="primary" href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>{profile.linkedin && <a className="classic" href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>}{profile.whatsapp && <a className="classic" href={whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>}</div><p className="copy-status" role="status">{message}</p></div>;
}
