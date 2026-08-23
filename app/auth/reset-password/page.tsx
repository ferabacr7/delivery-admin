"use client";

import {
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

function isValidPassword(password: string) {
  const hasMinimumLength =
    password.length >= 8;

  const hasLetter =
    /[A-Za-z]/.test(password);

  const hasNumber =
    /[0-9]/.test(password);

  const hasSymbol =
    /[^A-Za-z0-9\s]/.test(password);

  return (
    hasMinimumLength &&
    hasLetter &&
    hasNumber &&
    hasSymbol
  );
}

function ResetPasswordContent() {
  const searchParams =
    useSearchParams();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [isPreparing, setIsPreparing] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isReady, setIsReady] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    async function prepareRecoverySession() {
      const supabase =
        createClient();

      try {
        const code =
          searchParams.get("code");

        if (code) {
          const { error } =
            await supabase.auth
              .exchangeCodeForSession(
                code,
              );

          if (error) {
            setMessage(
              "El enlace para restablecer la contraseña no es válido o ya expiró.",
            );

            setIsReady(false);
            return;
          }
        }

        const {
          data: sessionData,
          error: sessionError,
        } =
          await supabase.auth
            .getSession();

        if (
          sessionError ||
          !sessionData.session
        ) {
          setMessage(
            "No se pudo validar tu sesión de recuperación. Solicitá un nuevo enlace desde ORBIT.",
          );

          setIsReady(false);
          return;
        }

        setIsReady(true);
      } catch (error) {
        console.error(
          "RESET PASSWORD SESSION ERROR:",
          error,
        );

        setMessage(
          "No se pudo validar el enlace de recuperación.",
        );

        setIsReady(false);
      } finally {
        setIsPreparing(false);
      }
    }

    void prepareRecoverySession();
  }, [searchParams]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");

    if (!isValidPassword(password)) {
      setMessage(
        "La contraseña debe tener al menos 8 caracteres e incluir una letra, un número y un símbolo.",
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setMessage(
        "Las contraseñas no coinciden.",
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const supabase =
        createClient();

      const { error } =
        await supabase.auth
          .updateUser({
            password,
          });

      if (error) {
        console.error(
          "RESET PASSWORD ERROR:",
          error,
        );

        setMessage(
          "No pudimos actualizar tu contraseña. Solicitá un nuevo enlace e intentá nuevamente.",
        );

        return;
      }

      await supabase.auth.signOut();

      setSuccess(true);

      setMessage(
        "Tu contraseña fue actualizada correctamente. Ya podés regresar a ORBIT e iniciar sesión.",
      );

      setPassword("");
      setConfirmPassword("");
    } finally {
      setIsSubmitting(false);
    }
  }

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
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Restablecer contraseña
        </h1>

        {isPreparing ? (
          <p
            style={{
              textAlign: "center",
            }}
          >
            Validando enlace...
          </p>
        ) : success ? (
          <p
            style={{
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        ) : !isReady ? (
          <p
            style={{
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            >
              Nueva contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              autoComplete="new-password"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #cccccc",
                marginBottom: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            >
              Confirmar contraseña
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value,
                )
              }
              autoComplete="new-password"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #cccccc",
                marginBottom: "16px",
              }}
            />

            <p
              style={{
                fontSize: "14px",
                color: "#666666",
                marginBottom: "20px",
              }}
            >
              Mínimo 8 caracteres,
              incluyendo una letra,
              un número y un símbolo.
            </p>

            {message && (
              <p
                style={{
                  marginBottom: "16px",
                  lineHeight: 1.5,
                }}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "none",
                borderRadius: "8px",
                cursor:
                  isSubmitting
                    ? "not-allowed"
                    : "pointer",
                fontWeight: 600,
              }}
            >
              {isSubmitting
                ? "Actualizando..."
                : "Actualizar contraseña"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

function ResetPasswordFallback() {
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
      <p>
        Validando enlace...
      </p>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <ResetPasswordFallback />
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}