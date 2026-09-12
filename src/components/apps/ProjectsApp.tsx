import { useState } from 'react';
import { FaFolderOpen, FaGithub } from 'react-icons/fa';
import { projects } from '../../data/projects';
import { assetUrl } from '../../config/profile';
function ProjectImage({ path, name }: { path: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <p className="muted">Captura no disponible</p> : <img className="project-screenshot" src={assetUrl(path)} alt={`Captura de ${name}`} loading="lazy" onError={() => setFailed(true)} />;
}
export function ProjectsApp() {
  return <div className="app-padding"><span className="eyebrow">MI TRABAJO</span><h2>Proyectos</h2>{projects.map(project => <article className="project-card" key={project.repository}><FaFolderOpen className="project-icon" /><div className="project-details"><small>{project.status}</small><h3>{project.name}</h3><p>{project.description}</p>{project.screenshot && <ProjectImage path={project.screenshot} name={project.name} />}{project.stack.length > 0 && <div className="interest-tags" aria-label="Tecnologías del proyecto">{project.stack.map(technology => <span key={technology}>{technology}</span>)}</div>}<div className="action-row">{project.url && <a className="primary" href={assetUrl(project.url)} target="_blank" rel="noreferrer">Sitio web</a>}<a className="classic" href={project.repository} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a></div></div></article>)}{projects.length === 0 && <p>Todavía no hay proyectos publicados.</p>}</div>;
}
