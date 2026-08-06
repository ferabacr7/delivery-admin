"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError || !user) {
        setErrorMessage("El correo o la contraseña son incorrectos.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        setErrorMessage(
          "No se encontró un perfil válido para este usuario."
        );
        return;
      }

      if (profile.role !== "admin") {
        await supabase.auth.signOut();
        setErrorMessage(
          "Esta cuenta no tiene permisos para acceder al panel administrativo."
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      setErrorMessage(
        "No fue posible iniciar sesión. Inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Correo electrónico
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          placeholder="admin@delivery.com"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-soft disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Contraseña
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          placeholder="Ingresa tu contraseña"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-soft disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}