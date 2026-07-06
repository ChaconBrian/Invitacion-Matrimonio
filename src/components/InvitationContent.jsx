import SpotifyPlayer from "./SpotifyPlayer";
import RsvpSection from "./RsvpSection";

const Leaf = ({ flip = false }) => (
  <svg className={`leaf-branch ${flip ? "is-flipped" : ""}`} viewBox="0 0 150 120" aria-hidden="true">
    <path d="M8 112 C45 88 65 52 136 14" />
    <ellipse cx="43" cy="83" rx="19" ry="9" transform="rotate(-35 43 83)" />
    <ellipse cx="72" cy="57" rx="21" ry="10" transform="rotate(28 72 57)" />
    <ellipse cx="102" cy="35" rx="18" ry="9" transform="rotate(-34 102 35)" />
    <ellipse cx="126" cy="18" rx="14" ry="7" transform="rotate(28 126 18)" />
  </svg>
);

const Icon = ({ children }) => <span className="detail-icon" aria-hidden="true">{children}</span>;

const DressCodeIcon = () => (
  <svg className="dress-code-icon" viewBox="0 0 180 118" aria-hidden="true">
    <g className="dress-silhouette">
      <path d="M42 14c7 0 12 5 12 12 0 6-3 10-7 13l4 17 24 46H9l24-46 4-17c-4-3-7-7-7-13 0-7 5-12 12-12Z" />
      <path d="M33 42h18M23 86h38" />
    </g>
    <line x1="90" y1="10" x2="90" y2="108" />
    <g className="suit-silhouette">
      <circle cx="134" cy="22" r="10" />
      <path d="M119 38l15 10 15-10 12 10-7 26-5-8v39h-12l-3-30-3 30h-12V66l-5 8-7-26 12-10Z" />
      <path d="M128 43l6 9 6-9M134 52v17" />
    </g>
  </svg>
);

const ceremonyMap = "https://www.google.com/maps/place/Parroquia+Juan+Pablo+II/@4.5207554,-75.7126913,21z/data=!4m6!3m5!1s0x8e38f5f5387b5ab9:0x30ea1c22a7425d38!8m2!3d4.5207013!4d-75.712592!16s%2Fg%2F11cn343df1?entry=ttu";
const receptionMap = "https://www.google.com/maps/place/Banquetes+Sazon+Gourmet-banquetes,+reuniones+familiares,+eventos/@4.5361425,-75.6781407,18z/data=!4m6!3m5!1s0x8e38f5244f754a93:0x6775d7e079236103!8m2!3d4.5362998!4d-75.6769654!16s%2Fg%2F11t2ybvhy6?entry=ttu";
const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio%20Brian%20%26%20Luisa&dates=20261010/20261011&location=Armenia%2C%20Quind%C3%ADo&details=Acomp%C3%A1%C3%B1anos%20a%20celebrar%20nuestro%20matrimonio";

export default function InvitationContent() {
  return (
    <section className="invitation-content" id="invitacion">
      <SpotifyPlayer />

      <header className="invitation-welcome">
        <Leaf />
        <p className="eyebrow">Nos casamos</p>
        <h2 className="editorial-names">Brian <i>&</i> Luisa</h2>
        <div className="editorial-rule"><span>10</span><b>•</b><span>10</span><b>•</b><span>26</span></div>
        <blockquote>
          “Y de pronto, todas las canciones de amor hablaban de nosotros”
        </blockquote>
        <p className="welcome-copy">
          Con inmensa alegría queremos compartir contigo el comienzo de nuestra vida juntos.
        </p>
        <div className="monogram" aria-label="Brian y Luisa">B <span>&</span> L</div>
        <Leaf flip />
      </header>

      <figure className="story-photo story-photo-primary">
        <div className="photo-mat">
          <img
            src="/photos/01-amor-actual.jpeg"
            alt="Brian y Luisa juntos, mostrando el anillo de compromiso"
          />
        </div>
        <figcaption>
          <span>Nuestro amor, nuestra historia</span>
          <small>B · L</small>
        </figcaption>
      </figure>

      <section className="date-card" aria-labelledby="save-date-title">
        <p className="eyebrow light">Save the date</p>
        <h2 id="save-date-title">Octubre</h2>
        <div className="date-lockup">
          <span>Sábado</span>
          <strong>10</strong>
          <span>2026</span>
        </div>
        <p>Un día para recordar, una historia para siempre.</p>
        <a className="calendar-button" href={calendarUrl} target="_blank" rel="noreferrer">
          Agregar al calendario
        </a>
      </section>

      <figure className="relationship-memory">
        <div className="relationship-frame">
          <div className="relationship-brush">
            <img
              src="/photos/02-primer-foto-novios.jpeg"
              alt="Brian y Luisa el día en que comenzaron su relación"
              loading="lazy"
            />
          </div>
        </div>
        <figcaption>
          <p className="eyebrow">Nuestro comienzo</p>
          <strong>El día en que comenzó nuestro nosotros</strong>
          <small>Un recuerdo que siempre llevaremos con nosotros</small>
        </figcaption>
      </figure>

      <section className="details-section">
        <p className="eyebrow">Dónde y cuándo</p>
        <h2>El gran día</h2>
        <div className="ornament"><span />◇<span /></div>

        <article className="detail-card">
          <Icon>♙</Icon>
          <h3>Ceremonia</h3>
          <p className="event-time">4:00 p. m.</p>
          <p><strong>Parroquia Juan Pablo II</strong><br />Armenia, Quindío</p>
          <a href={ceremonyMap} target="_blank" rel="noreferrer">Ver ubicación</a>
        </article>

        <article className="detail-card">
          <Icon>♢</Icon>
          <h3>Recepción</h3>
          <p className="event-time">7:00 p. m. — 2:00 a. m.</p>
          <p><strong>Banquetes Sazón Gourmet</strong><br />Armenia, Quindío</p>
          <a href={receptionMap} target="_blank" rel="noreferrer">Ver ubicación</a>
        </article>
      </section>

      <figure className="story-photo story-photo-paris">
        <div className="photo-mat">
          <img
            src="/photos/03-pedida-mano.jpeg"
            alt="La Torre Eiffel durante la pedida de mano de Brian y Luisa en París"
            loading="lazy"
          />
        </div>
        <figcaption>
          <p className="eyebrow">París</p>
          <strong>Donde comenzó nuestro para siempre</strong>
          <small>La pedida de mano</small>
        </figcaption>
      </figure>

      <figure className="paris-memory paris-memory-kiss">
        <div className="paris-memory-copy">
          <span>Después del sí</span>
          <strong>Nuestra primera foto comprometidos</strong>
          <small>el comienzo de una nueva etapa juntos</small>
        </div>
        <div className="paris-memory-frame">
          <img
            src="/photos/04-primer-foto-comprometidos.jpeg"
            alt="Primera fotografía de Brian y Luisa después de comprometerse en París"
            loading="lazy"
          />
        </div>
      </figure>

      <section className="timeline-section">
        <p className="eyebrow">Nuestro itinerario</p>
        <h2>Momentos del día</h2>
        <div className="timeline">
          <div><time>4:00</time><span>Ceremonia</span></div>
          <div><time>7:00</time><span>Inicio de la recepción</span></div>
          <div><time>2:00</time><span>Fin de la celebración</span></div>
        </div>
        <p className="pending-note">Muy pronto revelaremos el itinerario completo.</p>
      </section>

      <section className="recommendations">
        <Leaf />
        <p className="eyebrow">Información importante</p>
        <h2>Detalles para celebrar</h2>
        <div className="recommendation-grid">
          <article>
            <DressCodeIcon />
            <h3>Código de vestimenta</h3>
            <p className="dress-formality">Formal</p>
            <div className="reserved-palette">
              <div className="dress-group">
                <strong>Novia</strong>
                <div className="color-row forbidden-colors" aria-label="Color reservado para la novia">
                  <span style={{ "--swatch": "#ffffff" }} title="Blanco" />
                </div>
                <small>Blanco y tonos similares.</small>
              </div>
              <div className="dress-group groom-reserved">
                <strong>Novio</strong>
                <div className="color-row forbidden-colors" aria-label="Color reservado para el novio">
                  <span style={{ "--swatch": "#d7c4a5" }} title="Beige" />
                </div>
                <small>Beige.</small>
              </div>
              <div className="dress-group">
                <strong>Damas de honor</strong>
                <div className="color-row forbidden-colors" aria-label="Color reservado para las damas de honor">
                  <span style={{ "--swatch": "#efe3a2" }} title="Amarillo claro" />
                </div>
                <small>Amarillo claro.</small>
              </div>
              <div className="dress-group">
                <strong>Caballeros de honor</strong>
                <div className="color-row forbidden-colors" aria-label="Color reservado para los caballeros de honor">
                  <span style={{ "--swatch": "#65513b" }} title="Café oscuro caqui" />
                </div>
                <small>Café oscuro caqui.</small>
              </div>
            </div>
            <p className="reserved-note">Agradecemos a nuestros invitados evitar estos colores, reservados para los novios y su corte de honor.</p>
            <div className="dress-group">
              <strong>Caballeros</strong>
              <p className="suggested-label">Paleta sugerida:</p>
              <div className="color-row" aria-label="Colores sugeridos para los caballeros">
                <span style={{ "--swatch": "#1d2430" }} title="Azul oscuro" />
                <span style={{ "--swatch": "#303238" }} title="Gris carbón" />
                <span style={{ "--swatch": "#111111" }} title="Negro" />
              </div>
              <small>Azul oscuro, gris carbón o negro.</small>
            </div>
          </article>
          <article>
            <Icon>✉</Icon>
            <h3>Lluvia de sobres</h3>
            <p>Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, tendremos lluvia de sobres.</p>
          </article>
        </div>
        <RsvpSection />
        <p className="closing-script">¡Te esperamos!</p>
        <p className="couple-signature">Brian <span>&</span> Luisa</p>
        <Leaf flip />
      </section>
    </section>
  );
}
