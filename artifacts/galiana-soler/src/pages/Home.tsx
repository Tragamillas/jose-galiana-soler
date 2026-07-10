import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useListInvestigations, useListResources } from '@workspace/api-client-react';

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`fade-up-element ${className}`}>
      {children}
    </div>
  );
}

const PERIODS = [
  {
    range: 'Segles XV–XVI',
    title: 'La Corona d\'Aragó i el règim foral',
    text: 'El Regne de València, sota la Corona d\'Aragó, va gaudir d\'una notable autonomia constitucional a través dels seus Furs. Aquest període veié l\'esplendor del Segle d\'Or valencià i les revoltes de les Germanies, empremtes que encara es rastregen en els llinatges familiars de la ciutat i de la seua horta.',
  },
  {
    range: '1609 · Segle XVII',
    title: "L'expulsió dels moriscos i les seues conseqüències",
    text: "L'expulsió de més de 130.000 moriscos entre 1609 i 1614 va reestructurar radicalment la tinença de la terra, la demografia i l'ordre social del Regne. Moltes genealogies valencianes tenen en aquest esdeveniment un punt d'inflexió documental.",
  },
  {
    range: '1707 · Guerra de Successió',
    title: 'Els Decrets de Nova Planta',
    text: 'La derrota d\'Almansa i l\'abolició dels furs valencians el 1707 van suposar la fi de l\'autogovern del Regne i la seua incorporació administrativa a la Corona de Castella, reconfigurant institucions, arxius i formes de propietat.',
  },
  {
    range: 'Segle XIX',
    title: 'Desamortització, industrialització i Renaixença',
    text: 'Les desamortitzacions eclesiàstiques, el creixement de la burgesia industrial i comercial, i el moviment cultural de la Renaixença valenciana marquen la formació de les famílies que protagonitzaran el segle XX.',
  },
  {
    range: '1931–1939',
    title: 'República, Guerra Civil i primer franquisme',
    text: 'La Segona República, la Guerra Civil i la immediata postguerra van transformar de manera abrupta la vida institucional, urbana i cultural de Valencia, deixant una empremta profunda en la memòria de moltes famílies.',
  },
  {
    range: '1975–actualitat',
    title: 'Transició democràtica i Comunitat Valenciana',
    text: 'La recuperació de les llibertats i l\'autogovern des de l\'Estatut d\'Autonomia de 1982 obri un període de recuperació patrimonial i memòria activa, en el qual s\'inscriu aquest mateix projecte de recerca.',
  },
];

function Home() {
  const { data: investigationsData, isLoading: investigationsLoading, isError: investigationsError } =
    useListInvestigations();
  const { data: resourcesData } = useListResources();

  const INVESTIGATIONS = investigationsData ?? [];
  const RESOURCES = (resourcesData ?? []).slice(0, 4);

  const [query, setQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState('Todos');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const PERIOD_FILTERS = useMemo(
    () => ['Todos', ...Array.from(new Set(INVESTIGATIONS.map((i) => i.period)))],
    [INVESTIGATIONS]
  );

  const allTags = useMemo(
    () => Array.from(new Set(INVESTIGATIONS.flatMap((i) => i.tags))).sort(),
    [INVESTIGATIONS]
  );

  const filteredInvestigations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVESTIGATIONS.filter((inv) => {
      const matchesQuery =
        q.length === 0 ||
        inv.title.toLowerCase().includes(q) ||
        inv.role.toLowerCase().includes(q) ||
        inv.text.toLowerCase().includes(q) ||
        inv.tags.some((t) => t.toLowerCase().includes(q));
      const matchesPeriod = periodFilter === 'Todos' || inv.period === periodFilter;
      const matchesTag = !tagFilter || inv.tags.includes(tagFilter);
      return matchesQuery && matchesPeriod && matchesTag;
    });
  }, [INVESTIGATIONS, query, periodFilter, tagFilter]);

  const hasActiveFilters = query.trim().length > 0 || periodFilter !== 'Todos' || !!tagFilter;

  return (
    <div className="page home-page">
      <nav className="topnav">
        <div className="topnav-inner">
          <span className="topnav-brand">La abuela de mi abuela</span>
          <div className="topnav-links">
            <a href="#proyecto">El proyecto</a>
            <a href="#investigaciones">Investigaciones</a>
            <a href="#marco-historico">Marco histórico</a>
            <Link href="/recursos">Recursos</Link>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </nav>

      <main>
        <section id="inicio" className="hero home-hero">
          <FadeUp className="hero-inner">
            <p className="eyebrow">Iniciativa de recerca acadèmica · Comunitat Valenciana i Espanya</p>
            <h1>
              La abuela de mi abuela<br />
              <span className="hero-sub-title">un salto en la imaginación</span>
            </h1>
            <p className="subtitle">
              Un proyecto de investigación que enllaça biografies familiars amb els grans processos
              històrics de València i Espanya — perquè cap vida individual és aliena al seu temps.
            </p>
            <div className="hero-cta">
              <a href="#investigaciones" className="btn btn-primary">Explorar las investigaciones</a>
              <Link href="/recursos" className="btn btn-outline">Recursos educativos</Link>
            </div>
          </FadeUp>
        </section>

        <section id="proyecto" className="content home-content">
          <FadeUp>
            <span className="tag-didactico">Presentación del proyecto</span>
            <h2><span className="num">·</span> Cuando la genealogía particular ilumina la historia colectiva</h2>
            <p>
              <strong>"La abuela de mi abuela: un salto en la imaginación"</strong> es una iniciativa de
              investigación de carácter académico dedicada a documentar, con rigor archivístico, las
              trayectorias vitales de familias vinculadas al territorio valenciano, situándolas en el marco
              de los grandes procesos históricos que han conformado la Comunitat Valenciana y España desde
              la Edad Moderna hasta la actualidad.
            </p>
            <p>
              El proyecto parte de una premisa metodológica sencilla pero poderosa: ninguna vida individual
              transcurre al margen de su tiempo. Cada trayectoria personal —un funcionario, una comerciante,
              un artesano, una maestra— es también un testimonio indirecto de las transformaciones políticas,
              sociales, urbanas y culturales de su época. Reconstruir una biografía familiar con rigor exige,
              por tanto, cruzar fuentes primarias (archivos notariales, registros parroquiales, padrones
              municipales, prensa histórica, fondos fotográficos) con la historiografía general del período.
            </p>
            <p>
              <em>A leap of imagination</em>, en efecto: partir de lo concreto —un nombre, una fecha, una
              fotografía familiar— para reconstruir, con método histórico, el mundo que ese nombre habitó.
              Este sitio reúne las investigaciones biográficas del proyecto, un marco histórico de referencia
              y una selección de recursos educativos sobre la historia de Valencia y España, pensados tanto
              para investigadores como para docentes y público general interesado en la historia local.
            </p>
          </FadeUp>
        </section>

        <section id="investigaciones" className="content home-content alt">
          <FadeUp>
            <span className="tag-didactico">Investigaciones biográfico-históricas</span>
            <h2><span className="num">·</span> Estudios de caso</h2>
            <p>
              Cada investigación del proyecto adopta la forma de una biografía documentada, acompañada de
              su aparato de fuentes y de herramientas didácticas (cronología, glosario, actividades de aula).
              La primera investigación completada y publicada es la de José E. Galiana Soler, presentada aquí
              como estudio insignia del proyecto.
            </p>

            <div className="bio-filters">
              <div className="bio-search">
                <label htmlFor="bio-search-input" className="sr-only">Buscar investigaciones</label>
                <input
                  id="bio-search-input"
                  type="search"
                  placeholder="Buscar por familia, tema o periodo…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="bio-filter-group">
                <span className="bio-filter-label" id="periodo-filter-label">Periodo</span>
                <div className="bio-filter-chips" role="group" aria-labelledby="periodo-filter-label">
                  {PERIOD_FILTERS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`bio-chip${periodFilter === p ? ' bio-chip--active' : ''}`}
                      onClick={() => setPeriodFilter(p)}
                      aria-pressed={periodFilter === p}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bio-filter-group">
                <span className="bio-filter-label" id="tema-filter-label">Tema</span>
                <div className="bio-filter-chips" role="group" aria-labelledby="tema-filter-label">
                  <button
                    type="button"
                    className={`bio-chip${!tagFilter ? ' bio-chip--active' : ''}`}
                    onClick={() => setTagFilter(null)}
                    aria-pressed={!tagFilter}
                  >
                    Todos
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`bio-chip${tagFilter === tag ? ' bio-chip--active' : ''}`}
                      onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                      aria-pressed={tagFilter === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {hasActiveFilters
                ? filteredInvestigations.length === 0
                  ? 'No se encontraron investigaciones con los filtros aplicados.'
                  : `${filteredInvestigations.length} investigación${filteredInvestigations.length === 1 ? '' : 'es'} encontrada${filteredInvestigations.length === 1 ? '' : 's'}.`
                : ''}
            </p>

            {investigationsLoading && <p>Cargando investigaciones…</p>}
            {investigationsError && (
              <p role="alert">
                No se han podido cargar las investigaciones en este momento. Inténtalo de nuevo más
                tarde.
              </p>
            )}

            <div className="bio-grid">
              {filteredInvestigations.map((inv) => (
                <Link
                  key={inv.slug}
                  href={inv.href}
                  className={`bio-card${inv.featured ? ' bio-card--featured' : ''}`}
                >
                  <span className="period">{inv.periodLabel}</span>
                  <h3>{inv.title}</h3>
                  <span className="role">{inv.role}</span>
                  <p>{inv.text}</p>
                  {inv.tags.map((tag) => (
                    <span key={tag} className="bio-tag">{tag}</span>
                  ))}
                  <span className="resource-link">Leer la investigación completa</span>
                </Link>
              ))}

              {!hasActiveFilters && (
                <div className="bio-card bio-card--placeholder">
                  <span className="period">Próxima investigación</span>
                  <h3>Nuevos estudios de caso</h3>
                  <span className="role">En proceso de documentación</span>
                  <p>
                    El proyecto tiene vocación de crecimiento: futuras investigaciones ampliarán el corpus
                    biográfico a otras familias y trayectorias vinculadas a la historia de Valencia y España.
                    Los investigadores interesados en proponer o colaborar en un nuevo estudio pueden ponerse
                    en contacto a través del apartado <a href="#contacto">Contacto</a>.
                  </p>
                </div>
              )}

              {hasActiveFilters && filteredInvestigations.length === 0 && (
                <div className="bio-card bio-card--empty">
                  <span className="period">Sin resultados</span>
                  <h3>No se encontraron investigaciones</h3>
                  <p>
                    Prueba con otro término de búsqueda o restablece los filtros de periodo y tema.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setQuery('');
                      setPeriodFilter('Todos');
                      setTagFilter(null);
                    }}
                  >
                    Restablecer filtros
                  </button>
                </div>
              )}
            </div>
          </FadeUp>
        </section>

        <section id="marco-historico" className="content home-content">
          <FadeUp>
            <span className="tag-didactico">Marco histórico</span>
            <h2><span className="num">·</span> Períodos de referencia</h2>
            <p>
              Las biografías del proyecto se interpretan a la luz de seis grandes períodos de la historia
              valenciana y española, que constituyen el marco analítico común de todas las investigaciones.
            </p>
            <ul className="timeline">
              {PERIODS.map((p) => (
                <li key={p.range}>
                  <span className="year">{p.range}</span>
                  <span className="event">
                    <strong>{p.title}.</strong> {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </section>

        <section id="recursos" className="content home-content alt">
          <FadeUp>
            <span className="tag-didactico">Recursos educativos</span>
            <h2><span className="num">·</span> Fuentes, instituciones y cursos de referencia</h2>
            <p>
              Selección de archivos, bibliotecas, instituciones y experiencias de aprendizaje —incluido
              un curso interactivo de historia familiar— recomendada como punto de partida para
              investigadores, docentes y estudiantes.
            </p>
            <div className="facetas-grid resource-grid">
              {RESOURCES.map((r) => (
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
            <div className="hero-cta" style={{ marginTop: '1.5rem' }}>
              <Link href="/recursos" className="btn btn-primary">Ver todos los recursos educativos →</Link>
            </div>
          </FadeUp>
        </section>

        <section id="contacto" className="content home-content">
          <FadeUp>
            <span className="tag-didactico">Sobre el proyecto</span>
            <h2><span className="num">·</span> Misión, fuentes y colaboración</h2>
            <div className="about-grid">
              <div>
                <p>
                  Este proyecto nace de la convicción de que la microhistoria familiar constituye una vía
                  de acceso privilegiada al conocimiento histórico general. Su misión es doble: por un lado,
                  preservar y documentar con rigor archivístico trayectorias familiares valencianas que, de
                  otro modo, corren el riesgo de perderse; por otro, ofrecer a la comunidad académica y
                  educativa un conjunto de estudios de caso que ilustren, de manera concreta, los grandes
                  procesos de la historia de Valencia y España.
                </p>
                <p>
                  El proyecto se sostiene sobre un compromiso metodológico con la contrastación documental:
                  cada afirmación biográfica se apoya, siempre que es posible, en fuentes primarias
                  identificables —archivos notariales y parroquiales, prensa histórica, fondos fotográficos
                  y testimonios de archivo familiar— y se sitúa explícitamente en relación con la
                  historiografía académica del período correspondiente.
                </p>
              </div>
              <div className="contact-box">
                <h3>Contacto y colaboración</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-soft)', marginBottom: '1.2rem' }}>
                  Investigadores, docentes, archiveros y descendientes de familias valencianas interesados
                  en colaborar, aportar fuentes o proponer nuevas investigaciones pueden dirigirse al equipo
                  del proyecto.
                </p>
                <p style={{ fontFamily: "'Special Elite', monospace", fontSize: '.8rem', color: 'var(--ink)' }}>
                  contacto@laabueladmiabuela.org
                </p>
                <p style={{ fontFamily: "'Special Elite', monospace", fontSize: '.78rem', color: 'var(--ink-faint)', marginTop: '.4rem' }}>
                  Grupo de investigación en historia familiar de Valencia
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        <footer>
          <p><strong>La abuela de mi abuela: un salto en la imaginación</strong> — proyecto de investigación en historia familiar de Valencia y España.</p>
          <p>Investigación insignia: «José E. Galiana Soler: una vida llena de amor a Valencia a través de su obra gráfica y literaria», por José Luis Galiana Puchades. <Link href="/galiana-soler">Leer la biografía completa →</Link></p>
        </footer>
      </main>
    </div>
  );
}

export default Home;
