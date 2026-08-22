export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            ORBIT
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Eliminación de cuenta
          </h1>

          <p className="mt-3 text-xl font-semibold text-neutral-300">
            Account Deletion
          </p>
        </header>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold">Cómo eliminar tu cuenta</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Podés eliminar permanentemente tu cuenta de ORBIT directamente
              desde la aplicación móvil.
            </p>

            <ol className="mt-5 list-decimal space-y-2 pl-6 text-neutral-300">
              <li>Abrí la aplicación ORBIT.</li>
              <li>Iniciá sesión en tu cuenta.</li>
              <li>Entrá a Perfil.</li>
              <li>Seleccioná Seguridad.</li>
              <li>Seleccioná Eliminar cuenta.</li>
              <li>Revisá la información mostrada.</li>
              <li>Confirmá la eliminación permanente de la cuenta.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              ¿Qué sucede cuando eliminás tu cuenta?
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Tu cuenta de autenticación de ORBIT se elimina permanentemente y
              ya no podrás iniciar sesión con ella.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              La información personal de tu perfil y la información de
              direcciones asociadas a la cuenta se elimina o anonimiza según
              corresponda.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Registros operativos</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT puede conservar ciertos registros operativos o
              transaccionales cuando sea necesario para fines comerciales
              legítimos, contables, legales, de seguridad, prevención de fraude
              o resolución de disputas. Cuando corresponda, la información
              personal asociada a esos registros será eliminada o anonimizada.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Pedidos activos</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              No es posible eliminar una cuenta mientras exista un pedido
              activo. El pedido debe completarse o cancelarse antes de procesar
              la eliminación de la cuenta.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">¿Necesitás ayuda?</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Si no podés acceder a tu cuenta o necesitás asistencia para
              solicitar su eliminación, escribinos a{" "}
              <a
                href="mailto:admin@orbit-cr.com"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>
        </section>

        <div className="my-14 border-t border-neutral-800" />

        <section className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold">Account Deletion</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              You can permanently delete your ORBIT account directly from the
              ORBIT mobile application.
            </p>

            <ol className="mt-5 list-decimal space-y-2 pl-6 text-neutral-300">
              <li>Open the ORBIT app.</li>
              <li>Sign in to your account.</li>
              <li>Open Profile.</li>
              <li>Select Security.</li>
              <li>Select Delete account.</li>
              <li>Review the information shown on screen.</li>
              <li>Confirm permanent account deletion.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              What happens when your account is deleted?
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Your ORBIT authentication account is permanently deleted and you
              will no longer be able to sign in using that account.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Personal profile information and saved address information
              associated with the account are deleted or anonymized as
              appropriate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Operational records</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Certain operational or transaction records may be retained when
              necessary for legitimate business, accounting, legal, security,
              fraud-prevention, or dispute-resolution purposes. When
              appropriate, personal information associated with those records is
              removed or anonymized.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Active orders</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              An ORBIT account cannot be deleted while an order is active. The
              active order must first be completed or cancelled before account
              deletion can be processed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Need help?</h2>

            <p className="mt-4 leading-7 text-neutral-300">
              If you cannot access your ORBIT account or need assistance with an
              account deletion request, email us at{" "}
              <a
                href="mailto:admin@orbit-cr.com"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>
        </section>

        <footer className="mt-16 border-t border-neutral-800 pt-8 text-sm text-neutral-500">
          <p>ORBIT Delivery</p>
          <p className="mt-1">Guanacaste, Costa Rica</p>
        </footer>
      </div>
    </main>
  );
}
