import type { PortfolioDocument } from '../types';
export const documents: PortfolioDocument[] = [
  {
    name: 'Manual de usuario', type: 'pdf', date: '27/09/2026', size: '1,97 MB',
    url: 'documents/onday/OnDay_Manual_de_Usuario.pdf', folder: 'OnDay',
    description: 'Guía de OnDay para organizar actividades, configurar recordatorios y guardar copias de tu agenda.',
  },
  {
    name: 'Documentación técnica', type: 'pdf', date: '27/09/2026', size: '1,03 MB',
    url: 'documents/onday/OnDay_Documentacion_Tecnica.pdf', folder: 'OnDay',
    description: 'Arquitectura, almacenamiento local, modelo de datos y funcionamiento de OnDay.',
  },
];
