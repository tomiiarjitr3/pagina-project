export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sobre Nosotros</h1>

      <div style={styles.content}>
        <div style={styles.left}>
          <h2>Quiénes Somos</h2>
          <p>
            Somos Tomás y Leandro, dos estudiantes de desarrollo web apasionados por la
            tecnología y la educación. Este proyecto nació de nuestra experiencia personal
            al intentar crear un sitio web para una institución educativa y enfrentar
            diversas dificultades técnicas.
          </p>
        </div>

        <div style={styles.right}>
          <h2>¿Por qué realizamos esta página?</h2>
          <p>
            Creamos esta página para facilitar a otras instituciones educativas la creación de su
            propio sitio web. Queremos que cualquier institución, sin importar su tamaño o
            recursos técnicos, pueda tener una presencia en línea profesional y funcional.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  left: {
    flex: 1,
    borderRight: "2px solid #ccc",
    paddingRight: "20px",
  },
  right: {
    flex: 1,
    paddingLeft: "20px",
  },
};
