export const profile = {
  name: 'Mauricio Santana', title: 'Técnico en Redes y Software',
  location: 'Melo, Cerro Largo, Uruguay', email: 'maurigallego99@hotmail.com', phone: '098 431 585',
  github: 'https://github.com/Mauri429', linkedin: 'https://www.linkedin.com/in/mauriciosantanagallego/', whatsapp: '', cv: 'documents/CV_MauricioSantana.pdf',
  fullName: 'Mauricio Santana Gallego',
  summary: 'Estudiante de Técnico en Redes y Software, con formación en soporte informático, redes, desarrollo web y bases de datos. Cuento además con experiencia en depósito, logística y tareas operativas. Me caracterizo por la responsabilidad, capacidad de aprendizaje y adaptación a distintos entornos de trabajo. Busco incorporarme a una empresa donde pueda aportar mis conocimientos y continuar desarrollándome profesionalmente.',
  education: [
    { date: '2025–2026', institution: 'Polo Educativo Tecnológico Melo', qualification: 'Estudiante — Técnico en Redes y Software' },
    { date: '2022', institution: 'Polo Educativo Tecnológico Rivera', qualification: 'Bachiller Tecnológico — Auxiliar IT y Redes' },
  ],
  experience: [
    { role: 'Auxiliar de Depósito', company: 'Tienda Inglesa', date: 'Zafra 2023–2024', description: 'Control y organización de stock, carga y descarga de camiones, manejo de pallets mediante apiladora, utilización de PDA y mantenimiento del orden del sector.' },
    { role: 'Auxiliar en cambio de medidores OSE', company: 'Empresa particular', date: '2021–2022', description: 'Apoyo en sustitución de medidores, conducción de vehículos, localización de puntos de trabajo, registro de información en formularios y gestión de materiales y herramientas.' },
  ],
  skills: ['Redes TCP/IP y diagnóstico de conectividad', 'Windows, Windows Server y Linux/Ubuntu', 'Soporte de hardware y software', 'JavaScript / TypeScript, React y Node.js', 'SQL, PostgreSQL y MySQL', 'Git/GitHub — Mauri429', 'Docker', 'DNS/DHCP y servicios de red'],
  additional: ['Inglés intermedio', 'Libreta de conducir Cat. A', 'Referencias laborales disponibles a solicitud.'],
  greeting: 'HOLA, SOY MAURICIO', initials: 'MS',
  introduction: 'Bienvenido a mi escritorio. Un espacio para conocer mi perfil, explorar mis proyectos y encontrar nuevas formas de conectar.',
  technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'MySQL', 'Docker', 'Git'], interests: ['Redes', 'Software', 'Tecnología'],
};
export const assetUrl = (path: string) => /^https?:\/\//i.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
