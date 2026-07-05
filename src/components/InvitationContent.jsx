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

export default function InvitationContent() {
  return (
    <section className="invitation-content" id="invitacion">
      <header className="invitation-welcome">
        <Leaf />
        <p className="eyebrow">Nuestra historia continúa</p>
        <blockquote>
          “Y de pronto, todas las canciones de amor hablaban de nosotros.”
        </blockquote>
        <p className="welcome-copy">
          Con inmensa alegría queremos compartir contigo el comienzo de nuestra vida juntos.
        </p>
        <div className="monogram" aria-label="Brian y Luisa">B <span>&</span> L</div>
        <Leaf flip />
      </header>

      <section className="date-card" aria-labelledby="save-date-title">
        <p className="eyebrow light">Reserva la fecha</p>
        <h2 id="save-date-title">Octubre</h2>
        <div className="date-lockup">
          <span>Sábado</span>
          <strong>10</strong>
          <span>2026</span>
        </div>
        <p>Un día para recordar, una historia para siempre.</p>
      </section>

      <section className="details-section">
        <p className="eyebrow">Acompáñanos</p>
        <h2>El gran día</h2>
        <div className="ornament"><span />♥<span /></div>

        <article className="detail-card">
          <Icon>♙</Icon>
          <h3>Ceremonia</h3>
          <p>Pronto compartiremos contigo la hora y el lugar de nuestra ceremonia.</p>
          <button type="button" disabled>Ver ubicación</button>
        </article>

        <article className="detail-card">
          <Icon>♢</Icon>
          <h3>Recepción</h3>
          <p>Después del “sí”, celebraremos juntos. Los detalles llegarán muy pronto.</p>
          <button type="button" disabled>Ver ubicación</button>
        </article>
      </section>

      <section className="timeline-section">
        <p className="eyebrow light">Nuestro itinerario</p>
        <h2>Momentos del día</h2>
        <div className="timeline">
          <div><time>01</time><span>La ceremonia</span></div>
          <div><time>02</time><span>Brindis y recepción</span></div>
          <div><time>03</time><span>Cena</span></div>
          <div><time>04</time><span>Fiesta</span></div>
        </div>
        <p className="pending-note">Los horarios se confirmarán en la invitación final.</p>
      </section>

      <section className="recommendations">
        <Leaf />
        <p className="eyebrow">Para tener en cuenta</p>
        <h2>Detalles especiales</h2>
        <div className="recommendation-grid">
          <article>
            <Icon>♟</Icon>
            <h3>Código de vestimenta</h3>
            <p>Elegante</p>
          </article>
          <article>
            <Icon>♡</Icon>
            <h3>Con cariño</h3>
            <p>Esperamos contar con tu presencia en este día tan especial.</p>
          </article>
        </div>
        <p className="closing-script">¡Te esperamos!</p>
        <p className="couple-signature">Brian <span>&</span> Luisa</p>
        <Leaf flip />
      </section>
    </section>
  );
}
