export default function EmailChangeConfirmedPage() {
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
          Cambio de correo confirmado
        </h1>

        <p style={{ marginBottom: "8px" }}>
          Tu cambio de correo fue confirmado correctamente.
        </p>

        <p>
          Ya podés regresar a ORBIT e iniciar sesión con tu nuevo correo.
        </p>
      </div>
    </main>
  );
}