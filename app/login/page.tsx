import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Delivery Admin
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Ingresa con tu cuenta administrativa
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}