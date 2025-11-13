import './SeccionNoticias.css';

export default function SeccionNoticias({ noticias }) {
  return (
    <main className="noticias-main">
      <section className="noticias-section">
        <div className="noticias-grid">
          {noticias.map((n, idx) => (
            n.redireccion_url ? (
              <a
                key={idx}
                href={n.redireccion_url}
                target="_blank"
                rel="noopener noreferrer"
                className="noticia-card"
              >
                <img
                  src={n.image_url}
                  alt={n.title || 'Noticia'}
                  className="noticia-image"
                />
                <div className="noticia-content">
                  <div className="noticia-title">{n.title}</div>
                  {n.category ? (
                    <div className="noticia-category">{n.category}</div>
                  ) : null}
                </div>
              </a>
            ) : (
              <div
                key={idx}
                className="noticia-card"
              >
                <img
                  src={n.image_url}
                  alt={n.title || 'Noticia'}
                  className="noticia-image"
                />
                <div className="noticia-content">
                  <div className="noticia-title">{n.title}</div>
                  {n.category ? (
                    <div className="noticia-category">{n.category}</div>
                  ) : null}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </main>
  );
}
