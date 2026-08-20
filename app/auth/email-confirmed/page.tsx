export default function EmailConfirmedPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f7f7f7",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>
          Correo confirmado
        </h1>

        <p style={{ marginBottom: "8px" }}>
          Tu correo fue confirmado correctamente.
        </p>

        <p>
          Ya podés regresar a ORBIT e iniciar sesión.
        </p>
      </div>
    </main>
  );
}