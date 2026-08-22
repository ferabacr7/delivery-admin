export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            ORBIT
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Política de Privacidad
          </h1>

          <p className="mt-3 text-xl font-semibold text-neutral-300">
            Privacy Policy
          </p>

          <p className="mt-5 text-sm text-neutral-500">
            Última actualización / Last updated: August 22, 2026
          </p>
        </header>

        {/* ESPAÑOL */}

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold">
              1. Acerca de esta política
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Esta Política de Privacidad explica cómo ORBIT recopila,
              utiliza, almacena, comparte y protege información cuando
              utilizás la aplicación móvil ORBIT y los servicios
              relacionados.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT es un servicio de entrega y mensajería que opera
              inicialmente en Guanacaste, Costa Rica.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Para consultas relacionadas con privacidad o datos
              personales podés escribir a{" "}
              <a
                href="mailto:admin@orbit-cr.com?subject=ORBIT%20-%20Privacy%20Request"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              2. Información que recopilamos
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Dependiendo de cómo utilicés ORBIT, podemos recopilar las
              siguientes categorías de información:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>
                <strong>Información de cuenta:</strong> dirección de
                correo electrónico y credenciales necesarias para crear
                y proteger tu cuenta.
              </li>

              <li>
                <strong>Información de perfil:</strong> nombre y número
                de teléfono proporcionados por vos.
              </li>

              <li>
                <strong>Información de dirección:</strong> dirección de
                entrega, referencias, etiqueta de dirección y, cuando
                corresponda, coordenadas geográficas asociadas.
              </li>

              <li>
                <strong>Información de ubicación:</strong> ubicación
                necesaria para funciones relacionadas con direcciones,
                entregas y seguimiento del servicio cuando otorgás los
                permisos correspondientes.
              </li>

              <li>
                <strong>Información de pedidos:</strong> tipo de
                servicio solicitado, lugares de retiro y entrega,
                instrucciones, detalles necesarios para realizar el
                servicio, estados del pedido y datos relacionados con
                cotizaciones y entregas.
              </li>

              <li>
                <strong>Información relacionada con pagos:</strong>
                método de pago seleccionado, como efectivo o SINPE, y
                montos necesarios para gestionar el pedido. ORBIT no
                solicita ni almacena números completos de tarjetas de
                crédito mediante la funcionalidad actualmente
                disponible en la aplicación.
              </li>

              <li>
                <strong>Información operativa de entrega:</strong>
                información necesaria para asignar, gestionar y
                completar entregas, incluyendo datos de seguimiento y
                ubicación del repartidor durante una entrega activa.
              </li>

              <li>
                <strong>Información técnica:</strong> información
                técnica necesaria para autenticación, seguridad,
                funcionamiento de la aplicación y diagnóstico de
                errores.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              3. Cómo recopilamos la información
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Recopilamos información directamente cuando creás una
              cuenta, completás tu perfil, registrás una dirección,
              realizás un pedido, seleccionás un método de pago,
              actualizás tu información o utilizás otras funciones de
              ORBIT.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Algunos datos, como la ubicación, pueden obtenerse desde
              tu dispositivo únicamente cuando la funcionalidad
              correspondiente lo requiere y sujeto a los permisos
              disponibles en tu dispositivo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              4. Cómo utilizamos tu información
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Utilizamos la información recopilada para:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>Crear, autenticar y administrar tu cuenta.</li>
              <li>Procesar y gestionar solicitudes de entrega.</li>
              <li>Preparar y mostrar cotizaciones.</li>
              <li>Asignar pedidos a repartidores.</li>
              <li>
                Permitir la recogida, transporte y entrega de pedidos.
              </li>
              <li>
                Mostrar información de seguimiento y estado de una
                entrega.
              </li>
              <li>
                Facilitar la comunicación necesaria para completar un
                servicio.
              </li>
              <li>
                Gestionar pagos y montos relacionados con pedidos.
              </li>
              <li>
                Brindar soporte y responder consultas.
              </li>
              <li>
                Mantener la seguridad, prevenir abuso o fraude y
                proteger ORBIT y sus usuarios.
              </li>
              <li>
                Diagnosticar problemas y mantener el funcionamiento del
                servicio.
              </li>
              <li>
                Cumplir obligaciones legales, contables o regulatorias
                aplicables.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              5. Ubicación y seguimiento
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT puede utilizar información de ubicación para
              facilitar direcciones, calcular rutas y distancias,
              gestionar entregas y proporcionar funciones de
              seguimiento relacionadas con pedidos.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Durante una entrega activa, la ubicación del repartidor
              puede ser procesada y mostrada al cliente para permitir
              el seguimiento del pedido. El acceso a información
              relacionada con una entrega se limita según el rol del
              usuario y el estado operativo del pedido.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Podés administrar los permisos de ubicación desde la
              configuración de tu dispositivo. Algunas funciones que
              dependen directamente de la ubicación pueden no estar
              disponibles si el permiso correspondiente no es
              otorgado.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              6. Proveedores y terceros
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT utiliza proveedores tecnológicos para operar
              determinadas funciones del servicio. Esto puede incluir:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>
                <strong>Supabase:</strong> infraestructura de
                autenticación, base de datos, funciones de backend y
                servicios relacionados.
              </li>

              <li>
                <strong>Google Maps Platform / Google Routes:</strong>
                funciones relacionadas con mapas, rutas, distancias y
                tiempos estimados de viaje.
              </li>

              <li>
                <strong>Vercel:</strong> alojamiento de servicios web
                relacionados con ORBIT.
              </li>

              <li>
                <strong>Apple y Google:</strong> cuando corresponda,
                distribución de la aplicación y servicios propios de
                sus respectivas plataformas.
              </li>
            </ul>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT limita el acceso de terceros a la información
              necesaria para prestar los servicios correspondientes y
              exige que la información sea tratada con protecciones
              adecuadas y de acuerdo con los requisitos aplicables.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT no vende información personal de sus usuarios.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              7. Seguridad de los datos
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT utiliza medidas técnicas y organizativas destinadas
              a proteger la información contra acceso, uso,
              modificación o divulgación no autorizados.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Entre estas medidas se incluyen controles de
              autenticación, restricciones de acceso según roles,
              políticas de seguridad de base de datos y separación de
              operaciones privilegiadas del cliente móvil.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Ningún sistema puede garantizar seguridad absoluta, pero
              trabajamos para utilizar medidas razonables y apropiadas
              para proteger la información tratada por ORBIT.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              8. Conservación de datos
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Conservamos información personal únicamente durante el
              tiempo necesario para proporcionar los servicios,
              mantener la seguridad, resolver disputas y cumplir
              obligaciones comerciales, contables o legales
              aplicables.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Algunos registros operativos o transaccionales pueden
              conservarse después de eliminar una cuenta cuando exista
              una necesidad legítima relacionada con obligaciones
              legales, contabilidad, seguridad, prevención de fraude o
              resolución de disputas. Cuando corresponda, la
              información personal asociada se elimina o anonimiza.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              9. Eliminación de cuenta y datos
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Podés solicitar la eliminación permanente de tu cuenta
              directamente desde la aplicación:
            </p>

            <p className="mt-4 font-semibold text-neutral-200">
              Perfil → Seguridad → Eliminar cuenta
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              También podés consultar las instrucciones públicas de
              eliminación de cuenta en{" "}
              <a
                href="/account-deletion"
                className="font-semibold text-orange-500 hover:underline"
              >
                la página de eliminación de cuenta de ORBIT
              </a>
              .
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Al procesarse la eliminación, se elimina la cuenta de
              autenticación y los datos personales asociados se
              eliminan o anonimizan según corresponda. Ciertos registros
              que deban conservarse por motivos legítimos pueden
              permanecer de forma anonimizada o limitada según sea
              necesario.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Por razones operativas y de seguridad, una cuenta no
              puede eliminarse mientras exista un pedido activo. El
              pedido debe completarse o cancelarse antes de procesar la
              eliminación.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              10. Tus opciones y permisos
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Podés actualizar determinada información personal desde
              ORBIT y administrar permisos del dispositivo, como el
              acceso a ubicación, desde la configuración del sistema
              operativo.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              También podés solicitar información o asistencia
              relacionada con privacidad, corrección o eliminación de
              datos escribiendo a{" "}
              <a
                href="mailto:admin@orbit-cr.com?subject=ORBIT%20-%20Privacy%20Request"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              11. Menores de edad
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT no está diseñado específicamente para recopilar
              conscientemente información personal de menores de edad
              sin la autorización que pueda requerir la legislación
              aplicable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              12. Cambios a esta política
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Podemos actualizar esta Política de Privacidad cuando sea
              necesario para reflejar cambios en ORBIT, nuestros
              proveedores, nuestras prácticas o los requisitos
              aplicables.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              La fecha de la última actualización se mostrará al inicio
              de esta página.
            </p>
          </div>
        </section>

        {/* ENGLISH */}

        <div className="my-16 border-t border-neutral-800" />

        <section className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold">
              Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              This Privacy Policy explains how ORBIT collects, uses,
              stores, shares, and protects information when you use the
              ORBIT mobile application and related services.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT is a delivery and courier service initially
              operating in Guanacaste, Costa Rica.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              For privacy or personal data inquiries, contact us at{" "}
              <a
                href="mailto:admin@orbit-cr.com?subject=ORBIT%20-%20Privacy%20Request"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              1. Information we collect
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Depending on how you use ORBIT, we may collect the
              following categories of information:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>
                <strong>Account information:</strong> email address and
                credentials necessary to create and secure your account.
              </li>

              <li>
                <strong>Profile information:</strong> your name and
                phone number.
              </li>

              <li>
                <strong>Address information:</strong> delivery address,
                references, address labels, and associated geographic
                coordinates when applicable.
              </li>

              <li>
                <strong>Location information:</strong> location used for
                address, delivery, routing, and tracking functionality
                when you grant the applicable permissions.
              </li>

              <li>
                <strong>Order information:</strong> requested service,
                pickup and delivery locations, instructions, order
                status, quotations, and delivery-related information.
              </li>

              <li>
                <strong>Payment-related information:</strong> selected
                payment method, such as cash or SINPE, and amounts
                necessary to manage the order. ORBIT does not currently
                request or store full credit card numbers through the
                available application functionality.
              </li>

              <li>
                <strong>Delivery operational information:</strong>
                information necessary to assign, manage, track, and
                complete deliveries, including driver location during
                an active delivery.
              </li>

              <li>
                <strong>Technical information:</strong> technical
                information necessary for authentication, security,
                application operation, and error diagnosis.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              2. How we collect information
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              We collect information directly when you create an
              account, complete your profile, save an address, place an
              order, select a payment method, update your information,
              or use other ORBIT features.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Certain information, such as location, may be obtained
              from your device when required by a feature and subject
              to the permissions available on your device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              3. How we use information
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>Create, authenticate, and manage accounts.</li>
              <li>Process and manage delivery requests.</li>
              <li>Prepare and display quotations.</li>
              <li>Assign orders to drivers.</li>
              <li>Facilitate pickup, transportation, and delivery.</li>
              <li>Provide delivery status and tracking.</li>
              <li>Facilitate communications necessary for service.</li>
              <li>Manage payment methods and order amounts.</li>
              <li>Provide customer support.</li>
              <li>Protect ORBIT and its users from abuse or fraud.</li>
              <li>Diagnose problems and maintain the service.</li>
              <li>
                Comply with applicable legal, accounting, or regulatory
                obligations.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              4. Location and delivery tracking
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT may use location information to facilitate
              addresses, calculate routes and distances, manage
              deliveries, and provide order tracking functionality.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              During an active delivery, a driver&apos;s location may
              be processed and displayed to the customer for order
              tracking. Access to delivery information is restricted
              according to user roles and the operational status of the
              order.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              You can manage location permissions through your device
              settings. Features that directly depend on location may
              be unavailable if the applicable permission is not
              granted.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              5. Service providers and third parties
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT uses technology providers to operate certain parts
              of the service, including:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-neutral-300">
              <li>
                <strong>Supabase</strong> for authentication, database,
                backend functions, and related infrastructure.
              </li>

              <li>
                <strong>Google Maps Platform / Google Routes</strong>{" "}
                for mapping, routing, distance, and estimated travel
                time functionality.
              </li>

              <li>
                <strong>Vercel</strong> for hosting ORBIT-related web
                services.
              </li>

              <li>
                <strong>Apple and Google</strong>, where applicable, for
                application distribution and services provided by their
                respective platforms.
              </li>
            </ul>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT limits third-party access to information necessary
              to provide the applicable services and requires
              appropriate protections for user information.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT does not sell users&apos; personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              6. Data security
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT uses technical and organizational measures intended
              to protect information against unauthorized access, use,
              alteration, or disclosure.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              These measures include authentication controls,
              role-based access restrictions, database security
              policies, and separation of privileged operations from
              the mobile client.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              7. Data retention
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              Personal information is retained only for as long as
              necessary to provide the service, maintain security,
              resolve disputes, and satisfy applicable business,
              accounting, or legal obligations.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Certain operational or transaction records may be
              retained after account deletion where legitimately
              necessary for legal compliance, accounting, security,
              fraud prevention, or dispute resolution. Associated
              personal information is removed or anonymized when
              appropriate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              8. Account and data deletion
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              You can initiate permanent account deletion directly
              inside ORBIT:
            </p>

            <p className="mt-4 font-semibold text-neutral-200">
              Profile → Security → Delete account
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              Public account deletion information is also available on{" "}
              <a
                href="/account-deletion"
                className="font-semibold text-orange-500 hover:underline"
              >
                ORBIT&apos;s account deletion page
              </a>
              .
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              When deletion is processed, the authentication account is
              deleted and associated personal information is deleted or
              anonymized as appropriate. Records that must legitimately
              be retained may remain in anonymized or limited form as
              necessary.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              An account cannot be deleted while an order is active.
              The active order must first be completed or cancelled.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              9. Your choices and permissions
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              You can update certain personal information through ORBIT
              and manage device permissions, including location
              permissions, through your operating system settings.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              For privacy, correction, or deletion inquiries, contact{" "}
              <a
                href="mailto:admin@orbit-cr.com?subject=ORBIT%20-%20Privacy%20Request"
                className="font-semibold text-orange-500 hover:underline"
              >
                admin@orbit-cr.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              10. Children
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              ORBIT is not specifically designed to knowingly collect
              personal information from children without any
              authorization required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              11. Changes to this policy
            </h2>

            <p className="mt-4 leading-7 text-neutral-300">
              We may update this Privacy Policy when necessary to
              reflect changes to ORBIT, our providers, our practices,
              or applicable requirements.
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              The latest revision date will be displayed at the top of
              this page.
            </p>
          </div>
        </section>

        <footer className="mt-16 border-t border-neutral-800 pt-8 text-sm text-neutral-500">
          <p>ORBIT Delivery</p>
          <p className="mt-1">Guanacaste, Costa Rica</p>
          <p className="mt-1">admin@orbit-cr.com</p>
        </footer>
      </div>
    </main>
  );
}