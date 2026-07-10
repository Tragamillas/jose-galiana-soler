import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { useListResources } from '@workspace/api-client-react';

function Resources() {
  const { data: resources, isLoading, isError } = useListResources();
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set((resources ?? []).map((r) => r.category)))],
    [resources]
  );

  const filteredResources = useMemo(() => {
    if (!resources) return [];
    if (categoryFilter === 'Todos') return resources;
    return resources.filter((r) => r.category === categoryFilter);
  }, [resources, categoryFilter]);

  const featured = filteredResources.filter((r) => r.featured);
  const rest = filteredResources.filter((r) => !r.featured);

  return (
    <div className="page home-page">
      <nav className="topnav">
        <div className="topnav-inner">
          <Link href="/" className="topnav-brand">La abuela de mi abuela</Link>
          <div className="topnav-links">
            <Link href="/#proyecto">El proyecto</Link>
            <Link href="/#investigaciones">Investigaciones</Link>
            <Link href="/#marco-historico">Marco histórico</Link>
            <Link href="/recursos">Recursos</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero home-hero">
          <div className="hero-inner">
            <p className="eyebrow">Recursos educativos</p>
            <h1>Fuentes, instituciones y cursos para el estudio de la historia familiar</h1>
            <p className="subtitle">
              Una selección curada de archivos, bibliotecas y experiencias de aprendizaje sobre la
              historia de Valencia y España, pensada para investigadores, docentes, estudiantes y
              cualquier persona interesada en reconstruir su propia historia familiar.
            </p>
            <div className="hero-cta">
              <Link href="/" className="btn btn-outline">← Volver al inicio</Link>
            </div>
          </div>
        </section>

        <section className="content home-content">
          <div className="bio-filters">
            <div className="bio-filter-group">
              <span className="bio-filter-label" id="categoria-filter-label">Categoría</span>
              <div className="bio-filter-chips" role="group" aria-labelledby="categoria-filter-label">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`bio-chip${categoryFilter === c ? ' bio-chip--active' : ''}`}
                    onClick={() => setCategoryFilter(c)}
                    aria-pressed={categoryFilter === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading && <p>Cargando recursos…</p>}
          {isError && (
            <p role="alert">
              No se han podido cargar los recursos educativos en este momento. Inténtalo de nuevo más
              tarde.
            </p>
          )}

          {!isLoading && !isError && filteredResources.length === 0 && (
            <p>No se encontraron recursos con esta categoría.</p>
          )}

          {featured.length > 0 && (
            <>
              <span className="tag-didactico">Destacado</span>
              <div className="facetas-grid resource-grid">
                {featured.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faceta-card resource-card bio-card--featured"
                  >
                    <span className="period">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                    {r.tags.map((tag) => (
                      <span key={tag} className="bio-tag">{tag}</span>
                    ))}
                    <span className="resource-link">Visitar el sitio web ↗</span>
                  </a>
                ))}
              </div>
            </>
          )}

          {rest.length > 0 && (
            <>
              <span className="tag-didactico" style={{ marginTop: '2rem', display: 'block' }}>
                Archivos e instituciones
              </span>
              <div className="facetas-grid resource-grid">
                {rest.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faceta-card resource-card"
                  >
                    <span className="period">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                    <span className="resource-link">Visitar el sitio web ↗</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </section>

        <footer>
          <p><strong>La abuela de mi abuela: un salto en la imaginación</strong> — proyecto de investigación en historia familiar de Valencia y España.</p>
          <p><Link href="/">← Volver al inicio</Link></p>
        </footer>
      </main>
    </div>
  );
}

export default Resources;
