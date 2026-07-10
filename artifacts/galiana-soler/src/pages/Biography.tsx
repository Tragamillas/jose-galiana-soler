import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import padresImg from '@assets/original_images/padres.jpg';
import cenicientaImg from '@assets/original_images/cenicienta.jpg';
import secuestradoImg from '@assets/original_images/secuestrado.jpg';
import damaelcheImg from '@assets/original_images/damaelche.jpg';
import retrato28Img from '@assets/original_images/retrato28.jpg';
import templometropolitanoImg from '@assets/original_images/templometropolitano.jpg';
import plazareinaImg from '@assets/original_images/plazareina.jpg';
import escorialImg from '@assets/original_images/escorial.jpg';
import iglesiafachadaImg from '@assets/original_images/iglesiafachada.jpg';
import albarracin1Img from '@assets/original_images/albarracin1.jpg';
import albarracin2Img from '@assets/original_images/albarracin2.jpg';
import catedralgoticaImg from '@assets/original_images/catedralgotica.jpg';
import basilicaanteproyectoImg from '@assets/original_images/basilicaanteproyecto.jpg';
import basilicareforma1Img from '@assets/original_images/basilicareforma1.jpg';
import basilicareforma2Img from '@assets/original_images/basilicareforma2.jpg';
import basilicaplanta1929Img from '@assets/original_images/basilicaplanta1929.jpg';
import portadapublicacionImg from '@assets/original_images/portadapublicacion.jpg';
import palacioexposicionImg from '@assets/original_images/palacioexposicion.jpg';
import glorietaplanImg from '@assets/original_images/glorietaplan.jpg';
import glorietacroquisImg from '@assets/original_images/glorietacroquis.jpg';
import valenciaatraccionImg from '@assets/original_images/valenciaatraccion.jpg';
import guiaturistaImg from '@assets/original_images/guiaturista.jpg';
import torrepisaromaImg from '@assets/original_images/torrepisaroma.jpg';
import villararzobispoImg from '@assets/original_images/villararzobispo.jpg';
import plazareina1948Img from '@assets/original_images/plazareina1948.jpg';
import micaletImg from '@assets/original_images/micalet.jpg';
import celebracionfamiliarImg from '@assets/original_images/celebracionfamiliar.jpg';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'presentacion', label: 'Para el alumnado' },
  { id: 'cronologia', label: 'Cronología' },
  { id: 'origenes', label: 'Orígenes' },
  { id: 'juventud', label: 'Juventud' },
  { id: 'catedral', label: 'La Catedral' },
  { id: 'viajes', label: 'Viajes' },
  { id: 'proyectos-catedral', label: 'La Basílica' },
  { id: 'escritor', label: 'Escritor' },
  { id: 'urbanismo', label: 'Urbanismo' },
  { id: 'turismo', label: 'Turismo' },
  { id: 'vida-social', label: 'Vida social' },
  { id: 'mecenas', label: 'Mecenas' },
  { id: 'vida-privada', label: 'Vida privada' },
  { id: 'ultimos-anos', label: 'Legado' },
  { id: 'glosario', label: 'Glosario' },
  { id: 'aula', label: 'Para el aula' },
];

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

function Biography() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page">
      <nav className="sidenav">
        <div className="brand">
          J. E. Galiana Soler<br />
          <span style={{ fontSize: '.7rem', fontWeight: 400, color: 'var(--ink-faint)' }}>
            Archivo biográfico
          </span>
        </div>
        <Link href="/" className="back-home-link">
          ← La abuela de mi abuela
        </Link>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={activeSection === s.id ? 'active' : ''}
          >
            {s.label}
          </a>
        ))}
      </nav>
      <main>
        <section id="inicio" className="hero">
          <FadeUp className="hero-inner">
            <p className="eyebrow">Biografía · Valencia, 1894–1966</p>
            <h1>José E. Galiana Soler</h1>
            <p className="subtitle">
              Una vida llena de amor a Valencia a través de su obra gráfica y literaria
            </p>
            <p className="author">por José Luis Galiana Puchades</p>
          </FadeUp>
        </section>

        <section id="presentacion" className="content">
          <FadeUp>
            <span className="tag-didactico">Recurso para el aula · Historia de Valencia</span>
            <h2><span className="num">·</span> Una figura para conocer la Valencia del siglo XX</h2>
            <p>
              José Enrique Galiana Soler (Valencia, 1894–1966) es un personaje poco conocido fuera del
              ámbito familiar y, sin embargo, resulta muy revelador para entender la Valencia de la primera
              mitad del siglo XX: cómo se debatía el urbanismo en torno a la Catedral, cómo nació el
              turismo moderno en la ciudad, y cómo un funcionario "de a pie" podía dedicar su vida
              entera, de forma desinteresada, a defender el patrimonio de su tierra.
            </p>
            <p>
              Este sitio reúne su biografía a partir de documentos, dibujos y postales de archivo
              familiar, y añade herramientas pensadas para el alumnado: una cronología, cajas de reflexión
              en varias secciones, un glosario de términos históricos y una propuesta de actividades para
              el aula (apartado <a href="#aula">Para el aula</a>).
            </p>

            <div className="facetas-grid">
              <div className="faceta-card">
                <span className="num">01</span>
                <h3>Miembro de la familia Galiana</h3>
                <p>Heredero de una saga de la pequeña burguesía valenciana vinculada al arte, el derecho y la arquitectura.</p>
              </div>
              <div className="faceta-card">
                <span className="num">02</span>
                <h3>Dibujante apasionado</h3>
                <p>Cultivó el dibujo desde joven, dejando decenas de bocetos, apuntes del natural y láminas de temática valenciana.</p>
              </div>
              <div className="faceta-card">
                <span className="num">03</span>
                <h3>Aparejador del Catastro</h3>
                <p>Ejerció como funcionario técnico del catastro urbano, primero en Teruel y después en Valencia.</p>
              </div>
              <div className="faceta-card">
                <span className="num">04</span>
                <h3>Escritor sobre arte valenciano</h3>
                <p>Publicó artículos y folletos sobre monumentos y arte de Valencia y Teruel en numerosas cabeceras.</p>
              </div>
              <div className="faceta-card">
                <span className="num">05</span>
                <h3>Defensor del patrimonio</h3>
                <p>Elaboró proyectos y propuestas para la Catedral, la Basílica de la Virgen y el trazado urbano histórico.</p>
              </div>
              <div className="faceta-card">
                <span className="num">06</span>
                <h3>Editor de <em>Valencia Atracción</em></h3>
                <p>Redactor jefe de la revista de la Sociedad Valenciana para el Fomento del Turismo desde 1926.</p>
              </div>
              <div className="faceta-card">
                <span className="num">07</span>
                <h3>Impulsor del turismo</h3>
                <p>Creador de la marca "Ciudad de las flores" y autor de la Guía del turista en Valencia (1929).</p>
              </div>
              <div className="faceta-card">
                <span className="num">08</span>
                <h3>Amante de las bellas artes</h3>
                <p>Mecenas y coleccionista: donó obras y objetos a los museos de Cerámica, Prehistoria y al Ayuntamiento.</p>
              </div>
            </div>

            <p style={{ marginTop: '1.6rem' }}><strong>Qué vas a aprender recorriendo este sitio:</strong></p>
            <ul className="objetivos">
              <li>A relacionar la trayectoria de una persona concreta con procesos históricos más amplios: la transformación urbana de Valencia, el nacimiento del turismo moderno y la defensa del patrimonio en el siglo XX.</li>
              <li>A identificar y contrastar fuentes primarias (dibujos, postales, folletos, expedientes municipales) usadas para reconstruir una biografía.</li>
              <li>A situar en su contexto histórico conceptos como catastro, aparejador, mecenazgo o sociedad de fomento del turismo.</li>
              <li>A valorar el papel de figuras "menores" —no siempre recogidas en los libros de texto— en la construcción de la identidad cultural de una ciudad.</li>
            </ul>
          </FadeUp>
        </section>

        <section id="cronologia" className="content alt">
          <FadeUp>
            <span className="tag-didactico">Línea de tiempo</span>
            <h2><span className="num">·</span> Cronología esencial</h2>
            <ul className="timeline">
              <li><span className="year">1894</span><span className="event">Nace en Valencia, el 24 de mayo, en el seno de una familia de la pequeña burguesía.</span></li>
              <li><span className="year">1913–1914</span><span className="event">Primeras obras plásticas conocidas: "La Cenicienta" y sus apuntes de la Dama de Elche y de la Catedral.</span></li>
              <li><span className="year">1918</span><span className="event">Obtiene plaza de aparejador en el catastro urbano; sus primeros destinos son en Teruel.</span></li>
              <li><span className="year">1922–1929</span><span className="event">Redacta sucesivos proyectos de ampliación de la Basílica de la Virgen de los Desamparados.</span></li>
              <li><span className="year">1925</span><span className="event">Elabora el "Proyecto de gran plaza de la Glorieta" para la reforma urbanística de Valencia.</span></li>
              <li><span className="year">1926</span><span className="event">Se incorpora como redactor jefe de la revista <em>Valencia Atracción</em>, de la Sociedad Valenciana para el Fomento del Turismo.</span></li>
              <li><span className="year">1929</span><span className="event">Acuña la marca "Ciudad de las flores" y publica la <em>Guía del turista en Valencia</em>, declarada oficial por el Ayuntamiento.</span></li>
              <li><span className="year">Años 60</span><span className="event">Realiza donaciones al Museo de Cerámica, al Museo de Prehistoria y, en 1966, veinte cuadros de la familia al Ayuntamiento (Colección Galiana Soler).</span></li>
              <li><span className="year">1966</span><span className="event">Fallece en Valencia. Su funeral reúne a numerosas personalidades de la vida valenciana, entre ellas el alcalde Rincón de Arellano.</span></li>
            </ul>
          </FadeUp>
        </section>

        <section id="origenes" className="content">
          <FadeUp>
            <h2><span className="num">01</span> Orígenes y familia</h2>
            <p>Nació en Valencia un 24 de mayo de 1894, en el seno de una cultivada familia de la pequeña burguesía. Durante su vida fue aparejador, escritor, dibujante, coleccionista, promotor turístico e investigador amante del arte y la historia.</p>
            <p>De su madre, Enriqueta, heredó las dotes como dibujante. Su padre, José Luis, que era abogado, le mostró las habilidades para el arte de escribir. El matrimonio aparece retratado en la siguiente fotografía.</p>
            
            <figure className="fig">
              <img src={padresImg} alt="Enriqueta y José Luis, padres de José E. Galiana" loading="lazy" />
              <figcaption>El matrimonio formado por Enriqueta y José Luis, padres de José E. Galiana Soler.</figcaption>
            </figure>
            
            <p>Además, el abuelo paterno, Salvador, había sido maestro de obras, y así prosiguió el camino de la arquitectura. Por la otra rama, su abuelo materno, Antonio, le transmitió el amor a Valencia y al arte. Y su abuela materna, Vicenta, le dejó las vivencias de Picaña y los recuerdos de la sombrerería sita en la calle de la Abadía de San Martín.</p>
          </FadeUp>
        </section>

        <section id="juventud" className="content alt">
          <FadeUp>
            <h2><span className="num">02</span> Formación y primeras obras</h2>
            <p>Realizó estudios en el Instituto Luis Vives y estudió Arquitectura Técnica en la Universidad de Valencia. Entre sus obras plásticas de juventud destaca <em>"La Cenicienta"</em>, un dibujo al carbón del año 1913.</p>
            
            <figure className="fig">
              <img src={cenicientaImg} alt="La Cenicienta, dibujo al carbón, 1913" loading="lazy" />
              <figcaption>“La Cenicienta”, dibujo al carbón, 1913.</figcaption>
            </figure>
            
            <p><em>"Un secuestrado"</em>, dibujo a pluma, copia de una obra de Mariano Fortuny.</p>
            
            <figure className="fig">
              <img src={secuestradoImg} alt="Un secuestrado, dibujo a pluma" loading="lazy" />
              <figcaption>“Un secuestrado”, dibujo a pluma, copia de Mariano Fortuny.</figcaption>
            </figure>
            
            <p>En la parte inferior de una de sus láminas, la Dama de Elche —escultura capital de la civilización ibérica— en un apunte realizado por José E. Galiana en 1914.</p>
            
            <figure className="fig">
              <img src={damaelcheImg} alt="Apunte de la Dama de Elche, 1914" loading="lazy" />
              <figcaption>Apunte de la Dama de Elche, realizado por José E. Galiana en 1914.</figcaption>
            </figure>
            
            <figure className="fig">
              <img src={retrato28Img} alt="Retrato de José E. Galiana a los 28 años" loading="lazy" />
              <figcaption>José E. Galiana retratado a los 28 años (T. Prawdzik, Valencia, 1922).</figcaption>
            </figure>
          </FadeUp>
        </section>

        <section id="catedral" className="content">
          <FadeUp>
            <h2><span className="num">03</span> El entorno catedralicio</h2>
            <p>Estuvo centrado en el entorno catedralicio durante su vida. Prueba de ello son los diseños y propuestas para este espacio urbano plasmados en distintos proyectos que se sucedieron durante cuatro décadas. Podemos conocer sus actividades plásticas gracias a la colección de láminas de la Biblioteca Valenciana.</p>
            <p>En 1914, José Enrique había cumplido 20 años y ofrece un repertorio creativo particularmente fructífero. Realiza, por una parte, un estudio de la catedral con la "Planta del Templo Metropolitano", delineado en marzo. A esto se añade un proyecto de actuación urbanística en este ámbito espacial, diseñado en septiembre de 1914.</p>
            
            <figure className="fig">
              <img src={templometropolitanoImg} alt="Planta del Templo Metropolitano, 1914" loading="lazy" />
              <figcaption>“Planta del Templo Metropolitano”, delineado en marzo de 1914.</figcaption>
            </figure>
            
            <blockquote>
              <p>Un dibujo que trataba de prefigurar —en perspectiva— la actual plaza de la Reina. Por su calidad, verosimilitud y alcance, la propuesta urbanística implícita en el proyecto interpretaba las trazas definidas por F. Aymami en su Plano general de reforma interior de la ciudad de Valencia, aprobado por real orden de 21 de agosto de 1911.</p>
              <cite>Piñón, J. L. “Cuando Valencia quiso imitar a Napoleón III”, Levante: el Mercantil Valenciano, 24 dic. 1989.</cite>
            </blockquote>
            
            <p>Se ha señalado que este proyecto de reforma urbana guardaba ciertas concomitancias con las intervenciones propiciadas por Napoleón III, perdiendo el efecto barroco de sorpresa a favor de una idea de fondo con perspectiva clasicista. A principios del siglo XX, la antigua trama urbana de la Plaza de la Reina era completamente distinta: la puerta barroca de la catedral se descubría entonces a través de la calle de Zaragoza.</p>
            
            <figure className="fig">
              <img src={plazareinaImg} alt="Proyecto de Reforma de la Plaza de la Reina" loading="lazy" />
              <figcaption>Postal “Valencia. Proyecto de Reforma de la Plaza de la Reina”.</figcaption>
            </figure>
            
            <div className="pensar">
              <span className="eyebrow">Para pensar</span>
              <ul>
                <li>¿Por qué crees que a comienzos del siglo XX se planteaban reformas urbanas inspiradas en modelos como el de París (Napoleón III)? ¿Qué se buscaba conseguir en las ciudades españolas de la época?</li>
                <li>Compara el plano de la Plaza de la Reina de 1914 con su aspecto actual. ¿Qué elementos del proyecto original reconoces y cuáles no se llegaron a construir?</li>
              </ul>
            </div>
          </FadeUp>
        </section>

        <section id="viajes" className="content alt">
          <FadeUp>
            <h2><span className="num">04</span> Viajes de juventud y primeros destinos</h2>
            <p>Durante aquellos años de juventud realiza unos dibujos que son testimonio de un viaje veraniego al Monasterio de El Escorial, en julio de 1916: la fachada principal, la iglesia y la planta general.</p>
            
            <figure className="fig">
              <img src={escorialImg} alt="Monasterio de El Escorial" loading="lazy" />
              <figcaption>Monasterio de El Escorial, dibujo de julio de 1916.</figcaption>
            </figure>
            
            <p>En mayo de 1918 obtuvo una plaza de aparejador en el catastro urbano. Fueron sus inicios como funcionario del catastro, y su destino laboral estuvo en Teruel. Durante aquel verano de 1922 dibujó en Chelva la "Fachada y campanario de la Iglesia Parroquial".</p>
            
            <figure className="fig">
              <img src={iglesiafachadaImg} alt="Fachada y campanario de iglesia, boceto" loading="lazy" />
              <figcaption>Boceto de fachada y campanario de una iglesia, realizado durante sus años como aparejador del catastro.</figcaption>
            </figure>
            
            <p>De su paso por las tierras turolenses queda una tarjeta postal: "Calle Mayor de Albarracín, 1924".</p>
            
            <figure className="fig">
              <img src={albarracin1Img} alt="Calle Mayor de Albarracín, 1924" loading="lazy" />
              <figcaption>Tarjeta postal “Calle Mayor de Albarracín, 1924”.</figcaption>
            </figure>
            
            <figure className="fig">
              <img src={albarracin2Img} alt="Vista de una calle de Albarracín" loading="lazy" />
              <figcaption>Otra vista de una calle de Albarracín.</figcaption>
            </figure>
          </FadeUp>
        </section>

        <section id="proyectos-catedral" className="content">
          <FadeUp>
            <h2><span className="num">05</span> Bocetos y proyectos para la Catedral y la Basílica</h2>
            <p>Ese mismo año estuvo realizando bocetos de la "Catedral Metropolitana, portada gótica y cimborio", en octubre de 1922.</p>
            
            <figure className="fig">
              <img src={catedralgoticaImg} alt="Catedral Metropolitana, portada gótica y cimborio" loading="lazy" />
              <figcaption>Boceto de la Catedral Metropolitana, portada gótica y cimborio, octubre de 1922.</figcaption>
            </figure>
            
            <p>Uno de sus proyectos más conocidos fue la ampliación de la Basílica de los Desamparados hacia el sur, sobre los solares de la Almoina. Se conservan tarjetas postales que recrean esa ampliación de la Capilla.</p>
            
            <figure className="fig">
              <img src={basilicaanteproyectoImg} alt="Anteproyecto de Basílica para Ntra. Sra. de los Desamparados" loading="lazy" />
              <figcaption>“Valencia. Ante-proyecto de Basílica para Ntra. Sra. de los Desamparados”, autor José E. Galiana.</figcaption>
            </figure>
            
            <p>Entre estos proyectos para la reforma de la Basílica de la Virgen se conservan dos bocetos fechados entre 1922 y 1924.</p>
            
            <figure className="fig">
              <img src={basilicareforma1Img} alt="Boceto de reforma de la Basílica de la Virgen" loading="lazy" />
              <figcaption>Boceto de reforma de la Basílica de la Virgen, 1922.</figcaption>
            </figure>
            
            <figure className="fig">
              <img src={basilicareforma2Img} alt="Segundo boceto de reforma de la Basílica de la Virgen" loading="lazy" />
              <figcaption>Segundo boceto de reforma de la Basílica de la Virgen, 1924.</figcaption>
            </figure>
            
            <blockquote>
              <p>Una nueva idea, ésta de José E. Galiana, era partidaria de ampliar la Capilla hacia el sur, sobre los solares de la Almoina. En 1925, la junta general de la Antigua y Real Cofradía acordó llevar a la práctica el proyecto de Basílica. En 1927 la Cofradía había reunido tres millones de pesetas —toda una fortuna— para su construcción.</p>
            </blockquote>
            
            <p>En 1929, el arquitecto Juan Guardiola redactó un proyecto de Basílica capaz de albergar a 150.000 personas. Otro proyecto lo elaboró el arquitecto Eduardo Burgos Bosch, y un tercero, ese mismo año, lo presentó José E. Galiana Soler. Se sumaron colaboraciones como la de Mariano Benlliure. Se abrió concurso público a comienzos de 1931, con diez anteproyectos presentados, que ganó el arquitecto castellonense Vicente Traver Tomás. El 14 de abril fue proclamada la República y todos los proyectos quedaron paralizados.</p>
            
            <figure className="fig">
              <img src={basilicaplanta1929Img} alt="Planta de ampliación de la Basílica, mayo de 1929" loading="lazy" />
              <figcaption>Segundo proyecto gráfico de José E. Galiana para ampliar la Basílica de la Virgen: planta, mayo de 1929.</figcaption>
            </figure>
            
            <blockquote>
              <p>Vino la guerra civil y la posguerra, y hasta 1975 no volvería a moverse el viejísimo deseo de ampliar la Basílica. El 7 de mayo, el Ayuntamiento firmó las escrituras de compra y las expropiaciones para ampliar la plaza. En los años 80 aparecieron los restos arqueológicos de la Almoina y se paralizó todo: ya nunca más se construiría el templo.</p>
            </blockquote>
            
            <p>En la actualidad, ese espacio está habilitado como museo arqueológico, confirmando las hipótesis sobre la ubicación de la Valencia romana que defendía el historiador Julián San Valero Aparisi en los años sesenta.</p>
          </FadeUp>
        </section>

        <section id="escritor" className="content alt">
          <FadeUp>
            <h2><span className="num">06</span> El escritor y divulgador</h2>
            <p>José E. Galiana escribió numerosos artículos de prensa sobre el arte de las provincias de Teruel y Valencia. Su trabajo en el catastro le ocupaba las mañanas, y por las tardes se entregaba a su pasión por la escritura. Colaboró con las revistas <em>Construcción Arquitectónica</em>, <em>Germania</em>, <em>Valencia Atracción</em>, <em>La Voz Valenciana</em>, <em>Gaceta del Viajero</em>, <em>La Voz del Comercio</em>, <em>Sucrona</em>, <em>Pensat i Fet</em> y <em>La Semana Gráfica</em>.</p>
            <p>Entre sus publicaciones destaca la <em>Guía descriptiva de la Lonja de Valencia</em> (Tipo-Litografía y Relieves de Estanislao Machi, 1922), con una segunda edición ampliada en 1930.</p>
            
            <figure className="fig">
              <img src={portadapublicacionImg} alt="Portada de la guía de la Lonja, El Arte en Valencia" loading="lazy" />
              <figcaption>Portada de una de sus publicaciones sobre el arte de Valencia.</figcaption>
            </figure>
            
            <p>Otro folleto a destacar versa sobre <em>El Palacio Municipal de la Exposición</em> (Imprenta Valderrobres, 1923).</p>
            
            <figure className="fig">
              <img src={palacioexposicionImg} alt="El Palacio Municipal de la Exposición" loading="lazy" />
              <figcaption>El Palacio Municipal de la Exposición, ilustración de José E. Galiana, 1923.</figcaption>
            </figure>
            
            <div className="pensar">
              <span className="eyebrow">Para pensar</span>
              <ul>
                <li>Galiana compaginaba su trabajo de aparejador por las mañanas con la escritura por las tardes. ¿Qué nos dice esto sobre cómo se ejercía la divulgación cultural antes de que existieran los medios de comunicación actuales?</li>
                <li>Busca en qué consistía cada una de las revistas para las que escribió. ¿Qué tipo de público leía este tipo de publicaciones en los años veinte y treinta?</li>
              </ul>
            </div>
          </FadeUp>
        </section>

        <section id="urbanismo" className="content">
          <FadeUp>
            <h2><span className="num">07</span> Proyectos urbanísticos para Valencia</h2>
            <p>Entre sus propuestas para la reforma de la ciudad de Valencia se conserva el "Proyecto de gran plaza de la Glorieta", de diciembre de 1925.</p>
            
            <figure className="fig">
              <img src={glorietaplanImg} alt="Proyecto de gran plaza de la Glorieta" loading="lazy" />
              <figcaption>Ilustración del plan urbanístico “Proyecto de gran plaza de la Glorieta”, diciembre de 1925.</figcaption>
            </figure>
            
            <figure className="fig">
              <img src={glorietacroquisImg} alt="Croquis planimétrico de la reforma de la Glorieta" loading="lazy" />
              <figcaption>Croquis planimétrico de la reforma radical de la Glorieta para dar lugar a una gran plaza.</figcaption>
            </figure>
          </FadeUp>
        </section>

        <section id="turismo" className="content alt">
          <FadeUp>
            <h2><span className="num">08</span> Redactor jefe y promotor turístico</h2>
            <p>Su afición por la escritura, unida a su espíritu apasionado por la cultura valenciana, le involucró plenamente en la labor de difusión de la revista <em>Valencia Atracción</em>, en la que actuaba como redactor jefe. Esta publicación fue el órgano de la Sociedad Valenciana para el Fomento del Turismo, entidad fundada en 1919 por Manuel Feliu, el conde Trenor y otros intelectuales. Fue en septiembre de 1926 cuando la SVFT plasmó sus iniciativas en la revista, con el objetivo de servir de propaganda y guía para visitantes y excursionistas.</p>
            <p>Gracias a los esfuerzos de José E. Galiana, José Sanchis Sivera, Teodoro Llorente, Carlos Sarthou Carreres y José Rico de Estasen —a los que pronto se sumaron Maximiliano Thous, Carles Salvador, Francesc Almela i Vives y Emili Beüt i Berenguer— la promoción de la imagen turística de Valencia consiguió pronto apoyos institucionales del Ayuntamiento.</p>
            
            <figure className="fig">
              <img src={valenciaatraccionImg} alt="Revista Valencia Atracción" loading="lazy" />
              <figcaption>La revista Valencia Atracción, órgano de la Sociedad Valenciana para el Fomento del Turismo.</figcaption>
            </figure>
            
            <p>La primera marca turística oficial de Valencia pasa por ser la acuñada por José E. Galiana en 1929: <em>"Ciudad de las flores"</em>, arropada con símbolos costumbristas —el escudo de la ciudad, la Senyera, la figura de Jaume I— producto de una marketización que recurría a atributos vinculados a la herencia del siglo XIX.</p>
            <p>En este contexto aparece su obra más conocida, la <em>"Guía del turista en Valencia"</em>, reconocida como oficial de la ciudad por el Ayuntamiento en 1929. Su propósito era contribuir a que desapareciera la incomprensible ignorancia que hasta entonces se había tenido de Valencia desde el punto de vista turístico. Constituyó un referente para el visitante por el amplio corpus de información que contenía: fiestas, costumbres, itinerarios turísticos y recursos culturales.</p>
            
            <figure className="fig">
              <img src={guiaturistaImg} alt="Guía del turista en Valencia" loading="lazy" />
              <figcaption>Portada de la “Guía del turista en Valencia”, obra más conocida de José E. Galiana.</figcaption>
            </figure>
            
            <p>Hay que destacar el compromiso y el afecto del autor, ya que José Enrique fue quien, desinteresadamente, publicó la guía, erigiéndose en un ejemplo de ciudadano tal y como refleja su prologuista, Don José Candela, presidente de la Sociedad de Fomento del Turismo en aquellos años.</p>
            
            <div className="pensar">
              <span className="eyebrow">Para pensar</span>
              <ul>
                <li>¿Qué elementos escogió Galiana para representar Valencia como "Ciudad de las flores" (escudo, Senyera, Jaume I)? ¿Qué tipo de imagen de la ciudad se quería transmitir a los visitantes?</li>
                <li>Compara esta primera marca turística de 1929 con la imagen que hoy se da de Valencia a los turistas. ¿Qué ha cambiado y qué se mantiene?</li>
                <li>¿Por qué crees que instituciones como el Ayuntamiento decidieron apoyar económicamente estas iniciativas de promoción turística?</li>
              </ul>
            </div>
          </FadeUp>
        </section>

        <section id="vida-social" className="content">
          <FadeUp>
            <h2><span className="num">09</span> Vida social y amor por Valencia</h2>
            <p>Enamorado de Valencia, frecuentaba el Ateneo, el Círculo de Bellas Artes y Lo Rat Penat. Su personalidad se erigió en una figura de su época a través de numerosos artículos de estudio y difusión del patrimonio cultural y monumental.</p>
            <p>Disfrutó de un viaje a Italia, del que queda esta tarjeta postal: "Torre románica en el trayecto Pisa-Roma", apunte del natural desde el tren, 1934.</p>
            
            <figure className="fig">
              <img src={torrepisaromaImg} alt="Torre románica, apunte desde el tren, Pisa-Roma, 1934" loading="lazy" />
              <figcaption>“Torre románica en el trayecto Pisa-Roma”: apunte del natural desde el tren, 1934.</figcaption>
            </figure>
            
            <p>En mayo de 1936 recreó en una lámina "Dos aspectos de la plaza de la Fuente Villar del Arzobispo".</p>
            
            <figure className="fig">
              <img src={villararzobispoImg} alt="Dos aspectos de la plaza de la Fuente, Villar del Arzobispo" loading="lazy" />
              <figcaption>“Dos aspectos de la plaza de la Fuente”, Villar del Arzobispo, mayo de 1936.</figcaption>
            </figure>
            
            <p>Tras la Guerra Civil, retomó el proyecto de remodelación de la Plaza de la Reina con algunas modificaciones: "Un segundo proyecto gráfico de la plaza de la Reina", detalle, mayo de 1948.</p>
            
            <figure className="fig">
              <img src={plazareina1948Img} alt="Segundo proyecto de la Plaza de la Reina, 1948" loading="lazy" />
              <figcaption>“Un segundo proyecto gráfico de la Plaza de la Reina”. Detalle, mayo de 1948.</figcaption>
            </figure>
            
            <p>En 1963 prosigue con la idea de un Miguelete coronado por un pináculo, en un boceto para la terminación del "Micalet".</p>
            
            <figure className="fig">
              <img src={micaletImg} alt="Boceto para la terminación del Micalet, 1963" loading="lazy" />
              <figcaption>Boceto para la terminación del “Micalet”, 1963.</figcaption>
            </figure>
          </FadeUp>
        </section>

        <section id="mecenas" className="content alt">
          <FadeUp>
            <h2><span className="num">10</span> Mecenas y coleccionista</h2>
            <p>Fue mecenas de arte y amigo de González Martí. En los años sesenta realizó varias donaciones al Museo de Cerámica: barajas de naipes, cajas de cerillas con imágenes del Quijote, un cuadro con retrato de niña y un dibujo a plumilla sobre papel, algunos de ellos dedicados. Su trabajo en el catastro le puso en contacto con la cerámica, y su interés por la conservación de este legado coincidió con el de muchos intelectuales de su época.</p>
            <p>A esto hay que añadir la donación realizada al Museo de Prehistoria de Valencia: ocho croquis originales del arquitecto Muguruza sobre la restauración ideal de diversos monumentos romanos de la ciudad de Sagunto.</p>
            <p>El caso más señalado fue la donación de veinte cuadros de la familia al Ayuntamiento de Valencia, que solo comunicó a su hermano Luis durante la celebración de las bodas de plata de este, en el Club Náutico. Aquella noticia causó sorpresa entre los comensales, ya que se trataba de patrimonio familiar: cuadros reunidos gracias a las buenas relaciones que su abuelo materno, Antonio Soler, mantuvo con los pintores de sus tertulias, en su mayoría retratos de la familia Soler Moreno.</p>
            
            <blockquote>
              <p>Vecino de Valencia y enamorado de su patria, por cuya cultura ha venido colaborando toda su vida atentamente: que siguiendo la huella de otras personalidades y continuando sus propias donaciones en libros y elementos decorativos... aparte del afecto hacia la ciudad de su cuna que supuso la "Guía del Turista Valenciano"...</p>
              <cite>Del expediente de la donación Galiana Soler, Ayuntamiento de Valencia.</cite>
            </blockquote>
            
            <p>Esta donación se denominó Colección Galiana Soler y se conserva en el Museo de la Ciudad. La forman obras de Joaquín Agrasot, Daniel Cortina, José Genovés Llansol, Vicente Castells, Miguel Parra, Juan Peiró, Manuel Jiménez Aranda, José Roger y Agustín Almar, además de unas tablas anónimas de los siglos XV, XVI y XVII. La noticia se publicó en varios diarios a finales de octubre de 1966, entre ellos el ABC del 22 de octubre.</p>
            
            <div className="pensar">
              <span className="eyebrow">Para pensar</span>
              <ul>
                <li>¿Qué diferencia hay entre "coleccionar" y "hacer mecenazgo"? ¿En qué acciones de Galiana ves cada una de estas dos actitudes?</li>
                <li>¿Por qué crees que decidió donar el patrimonio familiar a instituciones públicas en lugar de conservarlo para su familia?</li>
              </ul>
            </div>
          </FadeUp>
        </section>

        <section id="vida-privada" className="content">
          <FadeUp>
            <h2><span className="num">11</span> Vida privada y carácter</h2>
            <p>Durante su juventud, José Enrique se enamoró, aunque tuvo mala fortuna: su novia murió desangrada a consecuencia de una operación de amigdalitis. Posteriormente lo quisieron casar con otra persona, pero él no quiso, y faltando pocas semanas para el enlace, su hermano Luis tuvo que devolver los regalos de boda.</p>
            <p>Su familia residía en la Gran Vía Marqués del Turia nº 36, en la vivienda que llamaban "la casa de los pajaritos". Trabajó muchos años como aparejador junto a José Cort Botí, arquitecto del catastro. Según el testimonio de Ana Cort Climent: no presumía de su descreimiento religioso, pero tampoco lo ocultaba, aunque muchas tardes acudía a la Basílica a rendir pleitesía a la Mare de Déu, por quien sentía un amor de locura —el mismo que sentía por todo lo valenciano. Su bilingüismo era perfecto, tenía buena cultura, y sus amistades pertenecían, como él, a Lo Rat Penat.</p>
            <p>Le gustaba hablar en valenciano, en unos años en que socialmente estaba mal visto usar la lengua vernácula, debido a la idiosincrasia impuesta por el régimen franquista. Era republicano y antimonárquico, y su relación con su nuera Emilia, defensora del régimen imperante, no fue siempre afortunada.</p>
            <p>Tenía un carácter abierto y sociable, muy distinto al de su hermano Luis, hombre austero y de pocas palabras. Con el paso de los años, la relación con su sobrino José Luis y su esposa María Vicenta creció y se hizo entrañable; a José Enrique aquella jovencita le recordaba a su añorada hermana Vicenta.</p>
            <p>A su muerte, dejó la herencia en su totalidad a su sobrino José Luis, quien la rechazó por respeto a la familia y se la entregó a su padre Luis. Con los años, la herencia volvió finalmente al hogar de su sobrino.</p>
          </FadeUp>
        </section>

        <section id="ultimos-anos" className="content alt">
          <FadeUp>
            <h2><span className="num">12</span> Últimos años y legado</h2>
            <p>En sus últimos años fue cuidado gracias a las relaciones que había cultivado toda su vida: Josefina, que había limpiado en su casa durante años, y su marido Vicente, que perdió la vista y acabó viviendo en la casa de los pajaritos haciéndole compañía. Tras la muerte de ambos, el marido de su hija Pepita, cocinero en el restaurante Navarro, le cuidaba por las noches.</p>
            <p>José Enrique Galiana Soler acabó siendo un personaje peculiar y querido dentro de la sociedad valenciana, y tuvo un gran reconocimiento en su funeral, al que acudió, entre muchas otras personas, su amigo el alcalde de Valencia, Rincón de Arellano.</p>
            
            <figure className="fig">
              <img src={celebracionfamiliarImg} alt="Fotografía familiar" loading="lazy" />
              <figcaption>Fotografía de una celebración familiar.</figcaption>
            </figure>
            
            <p>La huella que ha dejado en nuestra cultura se descubre a través de los artículos que hablan de su amor a Valencia y de su espíritu altruista, que con el paso del tiempo se trasladan a los nuevos soportes de información.</p>
            
            <blockquote>
              <p>En conclusión, esa sencillez, ese amor a la humanidad, fue la herencia que recibió de su abuelo materno Antonio Bosca Soler, y fue la que él mismo nos legó.</p>
            </blockquote>
          </FadeUp>
        </section>

        <section id="glosario" className="content">
          <FadeUp>
            <span className="tag-didactico">Glosario</span>
            <h2><span className="num">·</span> Términos para entender la época</h2>
            <dl className="glosario">
              <dt>Aparejador</dt>
              <dd>Técnico de la construcción, hoy equivalente al actual arquitecto técnico, encargado de dirigir y supervisar obras y de realizar levantamientos y mediciones. Galiana ejerció esta profesión al servicio del catastro.</dd>
              
              <dt>Catastro urbano</dt>
              <dd>Registro administrativo que describe y valora los bienes inmuebles de un municipio. Los técnicos del catastro medían y documentaban gráficamente edificios y solares, lo que explica la habilidad de Galiana como dibujante técnico.</dd>
              
              <dt>Sociedad Valenciana para el Fomento del Turismo (SVFT)</dt>
              <dd>Entidad fundada en 1919 por iniciativa de particulares —entre ellos Manuel Feliu y el conde Trenor— para promocionar Valencia como destino turístico, en un momento en que el turismo aún no era gestionado por instituciones públicas.</dd>
              
              <dt>Lo Rat Penat</dt>
              <dd>Asociación cultural valenciana fundada en 1878 para la defensa y promoción de la lengua y la cultura valencianas, frecuentada por Galiana y por buena parte de la burguesía culta de la época.</dd>
              
              <dt>Mecenazgo</dt>
              <dd>Apoyo desinteresado a la conservación o creación artística y cultural, habitualmente mediante donaciones. Se diferencia del coleccionismo en que su finalidad última es poner el patrimonio al servicio de la comunidad.</dd>
              
              <dt>Plano de reforma interior</dt>
              <dd>Instrumento de planeamiento urbanístico, habitual desde finales del siglo XIX, destinado a reformar el trazado de una ciudad histórica (ensanchar calles, abrir plazas) inspirándose a menudo en modelos como la reforma de París del siglo XIX.</dd>
            </dl>
          </FadeUp>
        </section>

        <section id="aula" className="content alt">
          <FadeUp>
            <span className="tag-didactico">Recursos docentes</span>
            <h2><span className="num">·</span> Para el aula</h2>
            <p>Propuesta de actividades para trabajar esta biografía en clase de Historia de Valencia, individualmente o en grupo:</p>
            <ol className="actividades">
              <li><strong>Retrato de una época a través de una vida.</strong> Elabora una línea del tiempo personal que cruce los datos biográficos de Galiana con acontecimientos históricos generales de Valencia y España entre 1894 y 1966 (Dictadura de Primo de Rivera, República, Guerra Civil, primeros años del franquismo).</li>
              <li><strong>Analizar una fuente primaria.</strong> Elige una de las imágenes del sitio (dibujo, postal o folleto) y describe qué información histórica puede extraerse de ella: ¿qué representa?, ¿quién y para qué la hizo?, ¿qué nos dice sobre la Valencia de su tiempo?</li>
              <li><strong>Debate: patrimonio y desarrollo urbano.</strong> A partir de los proyectos de la Plaza de la Reina y la Glorieta, debatid en grupos: ¿debe una ciudad histórica transformar su trazado antiguo para modernizarse, o priorizar la conservación? Buscad ejemplos actuales similares en Valencia.</li>
              <li><strong>De la "Ciudad de las flores" a hoy.</strong> Investigad la evolución de la promoción turística de Valencia desde 1929 hasta la actualidad (carteles, eslóganes, campañas). ¿Qué continuidades y qué rupturas encontráis?</li>
              <li><strong>Microhistoria.</strong> Redactad un breve texto explicando qué aporta estudiar la vida de una persona "corriente" —ni artista consagrado ni político célebre— para comprender la historia de una ciudad.</li>
            </ol>
            <p style={{ marginTop: '1.6rem' }}>
              <strong>Para saber más:</strong> este sitio se basa en «José E. Galiana Soler: una vida llena de amor a Valencia a través de su obra gráfica y literaria», de José Luis Galiana Puchades, y en fotografías, dibujos y postales del archivo familiar y de la colección de láminas de la Biblioteca Valenciana (ver referencia completa al pie de esta página).
            </p>
          </FadeUp>
        </section>

        <footer>
          <p>Basado en «José E. Galiana Soler: una vida llena de amor a Valencia a través de su obra gráfica y literaria», por José Luis Galiana Puchades.</p>
          <p>Fotografías, dibujos y postales procedentes del archivo familiar y de la colección de láminas de la Biblioteca Valenciana.</p>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/">← Volver a «La abuela de mi abuela: un salto en la imaginación»</Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Biography;