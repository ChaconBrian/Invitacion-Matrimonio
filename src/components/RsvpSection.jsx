import { useEffect, useMemo, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbzemP9pnlRunGcB2iROcy2uUReg3sbBzwzu6Xqx78r7WsifR1aUcGtsn8CPW6x6T30/exec";

function loadInvitation(token) {
  return new Promise((resolve, reject) => {
    const callback = `rsvp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");

    const clean = () => {
      delete window[callback];
      script.remove();
    };

    window[callback] = (result) => {
      clean();
      result?.ok ? resolve(result) : reject(new Error(result?.error || "No pudimos abrir esta invitación."));
    };
    script.onerror = () => {
      clean();
      reject(new Error("No pudimos conectar con la lista de invitados."));
    };
    script.src = `${API_URL}?token=${encodeURIComponent(token)}&callback=${callback}`;
    document.body.appendChild(script);
  });
}

export default function RsvpSection() {
  const token = useMemo(() => new URLSearchParams(window.location.search).get("familia")?.trim(), []);
  const [invitation, setInvitation] = useState(null);
  const [responses, setResponses] = useState({});
  const [status, setStatus] = useState(token ? "loading" : "missing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    loadInvitation(token)
      .then((data) => {
        setInvitation(data);
        setResponses(Object.fromEntries(data.members.map((member) => [member.id, member.status])));
        setStatus("ready");
      })
      .catch((error) => {
        setMessage(error.message);
        setStatus("error");
      });
  }, [token]);

  const members = invitation?.members || [];
  const answered = members.filter((member) => responses[member.id] && responses[member.id] !== "Pendiente").length;
  const complete = members.length > 0 && answered === members.length;

  const selectResponse = (id, nextStatus) => {
    setResponses((current) => ({
      ...current,
      [id]: current[id] === nextStatus ? "Pendiente" : nextStatus
    }));
    setStatus("ready");
    setMessage("");
  };

  const save = async () => {
    if (!complete || status === "saving") return;
    setStatus("saving");
    setMessage("");

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          token,
          responses: members.map((member) => ({ id: member.id, status: responses[member.id] }))
        })
      });
      setStatus("saved");
      setMessage("¡Gracias! La respuesta de tu grupo quedó registrada.");
    } catch {
      setStatus("ready");
      setMessage("No pudimos guardar la respuesta. Revisa tu conexión e inténtalo nuevamente.");
    }
  };

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-title">
      <p className="eyebrow">Confirmar asistencia</p>
      <h2 id="rsvp-title">Queremos celebrar contigo</h2>

      {status === "missing" && (
        <div className="rsvp-empty">
          <p>La confirmación se abre desde el enlace personal enviado a cada familia o invitado.</p>
          <small>Si recibiste la invitación sin tu enlace, escríbenos y te lo compartiremos.</small>
        </div>
      )}

      {status === "loading" && <p className="rsvp-loading">Buscando tu invitación…</p>}

      {status === "error" && (
        <div className="rsvp-empty rsvp-error">
          <p>{message}</p>
          <small>Verifica que estés usando el enlace completo que te enviamos.</small>
        </div>
      )}

      {invitation && !["loading", "error"].includes(status) && (
        <div className="rsvp-card">
          <p className="rsvp-family">{invitation.family}</p>
          <p className="rsvp-help">Selecciona una respuesta para cada integrante.</p>

          <div className="rsvp-members">
            {members.map((member) => (
              <article className="rsvp-member" key={member.id}>
                <strong>{member.name}</strong>
                <div className="rsvp-options" role="group" aria-label={`Asistencia de ${member.name}`}>
                  <button
                    type="button"
                    className={responses[member.id] === "Asistiré" ? "is-selected" : ""}
                    aria-pressed={responses[member.id] === "Asistiré"}
                    onClick={() => selectResponse(member.id, "Asistiré")}
                  >
                    Sí asistiré
                  </button>
                  <button
                    type="button"
                    className={responses[member.id] === "No asistiré" ? "is-selected is-declined" : ""}
                    aria-pressed={responses[member.id] === "No asistiré"}
                    onClick={() => selectResponse(member.id, "No asistiré")}
                  >
                    No podré asistir
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="rsvp-progress">{answered} de {members.length} respuestas seleccionadas</p>
          <button className="rsvp-submit" type="button" disabled={!complete || status === "saving"} onClick={save}>
            {status === "saving" ? "Guardando…" : status === "saved" ? "Respuesta enviada" : "Confirmar respuestas"}
          </button>
          {message && <p className={`rsvp-message ${status === "saved" ? "is-success" : ""}`} role="status">{message}</p>}
        </div>
      )}
    </section>
  );
}
