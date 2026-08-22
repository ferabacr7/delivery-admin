export const translations = {
  es: {
    home: {
      title: "Delivery App",
      createOrder: "Crear Pedido",
      myOrders: "Mis Pedidos",
      slogan: "Lo que necesités,\nlo pedís.",
      description:
        "Compras, comida, mandados y servicios locales desde una sola app.",
      question: "¿Qué necesitás?",
      shopping: "Compras",
      food: "Comida",
      errands: "Mandados",
      services: "Servicios",
      makeOrder: "Hacer Pedido",
    },

    login: {
      title: "Iniciar Sesión",
      email: "Correo Electrónico",
      password: "Contraseña",
      button: "Ingresar",
      noAccount: "¿No tenés cuenta?",
      register: "Registrarse",
      createAccount: "Crear cuenta",
      requiredTitle: "Campos requeridos",
      requiredMessage: "Ingresá correo y contraseña.",
      errorTitle: "Error de Login",
    },

    register: {
      title: "Crear Cuenta",
      email: "Correo Electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      button: "Crear Cuenta",
      subtitle:
        "Registrate para hacer pedidos y dar seguimiento a tus entregas.",

      requiredTitle: "Campos requeridos",
      requiredMessage: "Ingresá email y contraseña.",

      errorTitle: "Error al registrarse",

      successTitle: "Registro exitoso",
      successMessage: "Usuario creado correctamente.",

      registerButton: "Registrarme",

      backHome: "Volver al inicio",
    },

    profile: {
      title: "Mi Perfil",
      email: "Correo",
      userId: "ID de Usuario",
      profileName: "Nombre del Perfil",
      status: "Estado",
      logout: "Cerrar sesión",
      loading: "Cargando...",
      noUser: "No hay usuario autenticado.",
      notFound: "Perfil no encontrado o bloqueado por RLS.",
      noName: "Sin nombre",
      loaded: "Perfil cargado correctamente.",
      notAvailable: "No disponible",
      language: "Idioma",
      spanish: "Español",
      english: "Inglés",
    },

    orders: {
      title: "Mis Pedidos",
      empty: "Todavía no tenés pedidos registrados.",
      order: "Pedido",
      accepted: "Aceptado",
      rejected: "Rechazado",
      pending: "Pendiente",
    },

    createOrder: {
      title: "Crear Pedido",
      placeholder: "¿Qué necesitás que te traigamos?",
      button: "Enviar Pedido",
      successTitle: "Pedido creado",
      successMessage: "Tu pedido fue enviado correctamente.",
      errorTitle: "Error",
      errorMessage: "No se pudo crear el pedido.",
      subtitle: "Contanos qué necesitás y lo resolvemos por vos.",
      question: "¿Qué necesitás?",
      required: "Por favor escribí tu pedido.",
      optionalDetails: "Detalles opcionales",
      referencePhoto: "Foto de referencia",
      deliveryAddress: "Dirección de entrega",
      additionalNotes: "Notas adicionales",
      creating: "Creando...",
    },

    orderDetail: {
      title: "Detalle del Pedido",
      accepted: "🟢 Pedido Aceptado",
      rejected: "🔴 Pedido Rechazado",
      pending: "🟡 Cotización Pendiente",
      quoteReceived: "Cotización Recibida",
      quoteStatus: "Estado",
      description: "Descripción del pedido",
      createdAt: "Fecha de creación",
      accept: "Aceptar",
      reject: "Rechazar",
      waitingTitle: "Cotización pendiente",
      waitingQuote:
        "Estamos revisando tu pedido. Pronto recibirás una cotización.",
      acceptedMessage: "Tu pedido fue confirmado.",
      rejectedMessage: "Este pedido fue cancelado.",
      processingMessage: "Estamos procesando tu solicitud.",
      backHome: "Volver al inicio",
      currentStatus: "Estado actual",
      quoteAcceptedTitle: "Cotización aceptada",
      quoteRejectedTitle: "Cotización rechazada",
      rejectError: "No se pudo rechazar la cotización.",
      notFound: "No se encontró el pedido.",
    },

    common: {
      accept: "Aceptar",
      reject: "Rechazar",
      back: "Volver",
      loading: "Cargando...",
      error: "Error",
    },

    dashboardTitle: "Panel Administrativo",
    dashboardSubtitle: "Resumen operativo de ORBIT.",
    dashboardEyebrow: "Panel operativo",

    headerGreeting: "¡Hola, Admin! 👋",
    headerSubtitle: "Bienvenido al panel administrativo de ORBIT.",
    today: "Hoy",

    statsNewOrders: "Pedidos nuevos",
    statsNewOrdersDescription: "Esperando revisión",

    statsQuotes: "Cotizaciones",
    statsQuotesDescription: "Pendientes de respuesta",

    statsInPreparation: "En preparación",
    statsInPreparationDescription: "Pedidos aceptados",

    statsOnRoute: "En ruta",
    statsOnRouteDescription: "Pedidos activos",

    recentOrdersTitle: "Pedidos recientes",
    recentOrdersEmptyTitle: "No hay pedidos todavía.",
    recentOrdersEmptyDescription:
      "Cuando un cliente cree un pedido, aparecerá aquí.",
    recentOrdersDescription: "Gestiona rápidamente los pedidos más recientes.",
    recentOrdersNumber: "# Pedido",
    recentOrdersShowing: "Mostrando",
    recentOrdersShowingSuffix: "pedidos recientes",
    recentOrdersViewAll: "Ver todos los pedidos",

    tableCustomer: "Cliente",
    tableOrder: "Pedido",
    tableStatus: "Estado",
    tableTotal: "Total",
    tableAction: "Acción",

    customerWithoutName: "Cliente sin nombre",
    customerWithoutPhone: "Sin teléfono",
    orderWithoutAddress: "Sin dirección",
    orderWithoutQuote: "Sin cotización",

    statusValidation: "Validación",
    statusQuoted: "Cotizado",
    statusAccepted: "Aceptado",
    statusRejected: "Rechazado",
    statusInProgress: "En preparación",
    statusOnRoute: "En ruta",
    statusDelivered: "Entregado",
    statusCancelled: "Cancelado",

    activityTitle: "Recent Activity",

    activityNewOrder: "New order received",
    activityPendingQuote: "Quote pending approval",
    activityAcceptedOrder: "Order accepted by customer",
    activityReadyDelivery: "Delivery ready to start",

    quoteFormTitle: "Crear cotización",
    quoteSubtotalLabel: "Subtotal",
    quoteSubtotalPlaceholder: "Ej: 5000",
    quoteDeliveryFeeLabel: "Tarifa de entrega",
    quoteDeliveryFeePlaceholder: "Ej: 2000",
    quoteNotesLabel: "Notas",
    quoteNotesPlaceholder: "Ej: Tiempo estimado 35 minutos.",
    quoteTotalLabel: "Total",
    quoteCreatingButton: "Creando cotización",
    quoteSubmitButton: "Enviar cotización",
    quoteCreateError: "No se pudo crear la cotización.",

    noAction: "Sin acción",
    updating: "Actualizando",
    workflowUpdateError: "No se pudo actualizar el estado del pedido.",
    actionStartPreparation: "Iniciar preparación",
    actionSendOnRoute: "Enviar en ruta",
    actionMarkDelivered: "Marcar entregado",

    sidebarDashboard: "Dashboard",
    sidebarOrders: "Pedidos",
    sidebarCustomers: "Clientes",
    sidebarDeliveries: "Entregas",
    sidebarSettings: "Configuración",
    sidebarLogout: "Cerrar sesión",
    comingSoon: "Próximamente",
    betaVersion: "Versión beta",
    sidebarNavigation: "Navegación",
    sidebarBetaDescription: "Panel administrativo — versión Beta.",
    sidebarLoggingOut: "Cerrando sesión...",
    sidebarLogoutError: "No se pudo cerrar la sesión. Inténtalo nuevamente.",

    operationalSummaryTitle: "Resumen operativo",
    latestOrderReceived: "Último pedido recibido",
    latestQuoteSent: "Última cotización enviada",
    deliveredOrders: "Pedidos entregados",
    activeOrders: "Pedidos activos",
    noRecentOrders: "Sin pedidos recientes",
    noQuotesYet: "Sin cotizaciones todavía",
    operationalSummaryDescription: "Información clave de la operación actual.",
    totalOrdersToday: "Total de pedidos hoy",
    totalOrdersTodayDescription: "Pedidos registrados durante el día.",
    totalSalesToday: "Total de ventas hoy",
    totalSalesTodayDescription: "Monto total cotizado durante el día.",
    ordersDeliveredToday: "Pedidos entregados hoy",
    ordersCancelledRejectedToday: "Cancelados / rechazados hoy",

    // Admin Order Detail
    adminOrderBackDashboard: "Volver al dashboard",
    adminOrderOperationalManagement: "Gestión operativa",
    adminOrderDetailTitle: "Detalle del pedido",
    adminOrderNumber: "Pedido",

    adminOrderCustomer: "Cliente",
    adminOrderCustomerInformation: "Información del cliente",
    adminOrderName: "Nombre",
    adminOrderNoName: "Sin nombre",
    adminOrderPhone: "Teléfono",
    adminOrderNoPhone: "Sin teléfono",

    adminOrderRequest: "Solicitud",
    adminOrderInformation: "Información del pedido",
    adminOrderDescription: "Descripción",
    adminOrderCreatedAt: "Fecha de creación",

    adminOrderDestination: "Destino",
    adminOrderDeliveryAddress: "Dirección de entrega",
    adminOrderLabel: "Etiqueta",
    adminOrderNoLabel: "Sin etiqueta",
    adminOrderAddress: "Dirección",
    adminOrderNoAddress: "Sin dirección",
    adminOrderReference: "Referencia",
    adminOrderNoReference: "Sin referencia",

    adminOrderOperation: "Operación",
    adminOrderDeliveryInformation: "Información de entrega",
    adminOrderAssignDriverDescription:
      "Asigna el repartidor responsable de esta entrega.",

    adminOrderFinances: "Finanzas",
    adminOrderQuote: "Cotización",
    adminOrderSubtotal: "Subtotal",
    adminOrderDeliveryFee: "Tarifa de entrega",
    adminOrderTotal: "Total",
    adminOrderNoQuote: "Sin cotización",

    adminOrderNotProvided: "No indicado",
    adminOrderEstimatedPurchaseAmount: "Monto estimado de compra",
    adminOrderPaymentMethod: "Método de pago",
    adminOrderCash: "Efectivo",
    adminOrderPayingWith: "Paga con",
    adminOrderServiceFee: "Tarifa de servicio",
    adminOrderCommission: "Comisión",
    adminOrderSurcharges: "Cargos adicionales",

    // Admin Notes
    adminNotesInternal: "Interno",
    adminNotesTitle: "Notas administrativas",
    adminNotesDescription: "Observaciones internas del pedido.",
    adminNotesPlaceholder: "Escribe una nota...",
    adminNotesSaving: "Guardando...",
    adminNotesSave: "Guardar nota",
    adminNotesSaveSuccess: "Nota guardada correctamente.",
    adminNotesSaveError: "No se pudo guardar la nota.",

    // Settings
    settingsEyebrow: "Configuración",
    settingsTitle: "Configuración operativa",
    settingsDescription:
      "Administra los valores utilizados por ORBIT durante la operación.",

    exchangeRatePair: "USD → CRC",
    exchangeRateTitle: "Tipo de cambio",
    exchangeRateDescription:
      "Define cuántos colones equivalen a un dólar para las cotizaciones de ORBIT.",
    exchangeRateCurrent: "Tipo de cambio vigente",
    exchangeRateNotConfigured:
      "Todavía no existe un tipo de cambio configurado.",
    exchangeRateNew: "Nuevo tipo de cambio",
    exchangeRateNewDescription:
      "Ingresá el valor en colones correspondiente a 1 USD.",
    exchangeRateInvalid: "Ingresá un tipo de cambio válido.",
    exchangeRateLoadError: "No se pudo cargar el tipo de cambio.",
    exchangeRateSaveError: "No se pudo guardar el tipo de cambio.",
    exchangeRateSaveSuccess: "Tipo de cambio actualizado correctamente.",
    exchangeRateSaving: "Guardando...",
    exchangeRateSave: "Guardar tipo de cambio",
    exchangeRateFooter:
      "La nueva tasa será utilizada por las próximas cotizaciones.",

    // Driver Assignment
    driverAssignmentTitle: "Asignación de repartidor",
    driverAssignmentDescription:
      "Selecciona la persona responsable de esta entrega.",
    driverAssignmentAssigned: "Repartidor asignado",
    driverAssignmentPending: "Pendiente de asignación",
    driverAssignmentOrderMustBeAccepted:
      "La orden debe estar aceptada antes de asignar un repartidor.",
    driverAssignmentError: "No se pudo asignar el repartidor.",
    driverAssignmentSuccess: "Repartidor asignado correctamente.",
    driverAssignmentToDelivery: "fue asignado correctamente a esta entrega.",
    driverAssignmentUnexpectedError:
      "Ocurrió un error inesperado al guardar la asignación.",
    driverAssignmentNoActiveDrivers: "No hay repartidores activos",
    driverAssignmentNoActiveDriversDescription:
      "Activa o registra un perfil con el rol de repartidor para continuar.",
    driverAssignmentDriver: "Repartidor",
    driverAssignmentSelectDriver: "Selecciona un repartidor",
    driverAssignmentNoPhone: "Sin teléfono registrado",
    driverAssignmentAlreadyAssigned:
      "Este repartidor ya está asignado a la entrega.",
    driverAssignmentWillBeAssigned:
      "Este repartidor será asignado al guardar los cambios.",
    driverAssignmentSaving: "Guardando...",
    driverAssignmentSave: "Guardar asignación",

    // Delivery Management
    deliveryManagementDelivered: "Entregada",
    deliveryManagementInProgress: "En progreso",
    deliveryManagementPendingStart: "Pendiente de inicio",
    deliveryManagementNoActiveDelivery: "Sin entrega activa",
    deliveryManagementUnavailable: "No disponible",
    deliveryManagementTitle: "Monitoreo de entrega",
    deliveryManagementDescription:
      "Supervisa el estado operativo de la entrega asignada.",
    deliveryManagementCurrentStatus: "Estado actual",
    deliveryManagementAssignDriverWarning:
      "Debes asignar un repartidor para continuar con el flujo operativo.",
    deliveryManagementWaitingDriver:
      "La entrega está esperando que el repartidor la inicie desde su aplicación.",
    deliveryManagementDriver: "Repartidor",
    deliveryManagementNoDriver: "Sin repartidor asignado",
    deliveryManagementDeliveryStart: "Inicio de entrega",
    deliveryManagementDeliveryCompleted: "Entrega completada",
    deliveryManagementPending: "Pendiente",
    deliveryManagementFooter:
      "El inicio y la finalización de la entrega se realizan desde la aplicación del repartidor. El panel administrativo se utiliza para asignar y supervisar la operación.",

    // Delivery Tracking
    deliveryTrackingNoInformation: "Sin información",
    deliveryTrackingFinished: "Tracking finalizado",
    deliveryTrackingActive: "Tracking activo",
    deliveryTrackingNoSignal: "Sin señal",
    deliveryTrackingLiveGps: "GPS en vivo",
    deliveryTrackingRealtimeTracking: "Seguimiento en tiempo real",
    deliveryTrackingDeliveredLocation:
      "Última ubicación registrada durante la entrega.",
    deliveryTrackingCurrentLocation:
      "Última ubicación reportada por el repartidor.",
    deliveryTrackingNoTrackingTitle:
      "Todavía no hay información de seguimiento",
    deliveryTrackingNoTrackingDescription:
      "La ubicación aparecerá aquí cuando el repartidor inicie la entrega desde su aplicación y comience a transmitir su posición.",
    deliveryTrackingPendingCreation: "Entrega pendiente de creación",
    deliveryTrackingLastUpdate: "Última actualización",
    deliveryTrackingSpeed: "Velocidad",
    deliveryTrackingGpsAccuracy: "Precisión GPS",

    orderTimelineProgress: "Progreso",
    orderTimelineDeliveryStatus: "Estado de la entrega",

    adminNotesSavedLabel: "Saved note",

    // Orders Page
    ordersPageEyebrow: "Gestión operativa",
    ordersPageTitle: "Pedidos",
    ordersPageDescription:
      "Consulta, filtra y administra todos los pedidos registrados.",
    ordersPageSearchPlaceholder:
      "Buscar por pedido, cliente, teléfono, dirección...",
    ordersPageFilter: "Estado",
    ordersPageAllStatuses: "Todos los estados",
    ordersPageShowing: "Mostrando",
    ordersPageOf: "de",
    ordersPageOrders: "pedidos",
    ordersPageClearFilters: "Limpiar filtros",
    ordersPageNoOrdersTitle: "No hay pedidos registrados",
    ordersPageNoOrdersDescription:
      "Los pedidos creados por los clientes aparecerán aquí.",
    ordersPageNoResultsTitle: "No encontramos pedidos",
    ordersPageNoResultsDescription:
      "Probá cambiando la búsqueda o los filtros seleccionados.",
    ordersPageViewDetail: "Ver detalle",

    // Header
    headerOpenMenu: "Abrir menú",
    headerOpenCalendar: "Abrir calendario",
    headerPreviousMonth: "Mes anterior",
    headerNextMonth: "Mes siguiente",
    headerGoToday: "Ir a hoy",
    headerNotifications: "Notificaciones",
    headerNewOrdersReceived: "Pedidos nuevos recibidos",
    headerNoNewNotifications: "No hay notificaciones nuevas",
    headerNewOrdersAppearHere: "Los nuevos pedidos aparecerán aquí.",
    headerNewOrder: "Nuevo pedido",
    headerViewOrder: "Ver pedido",
    headerUserUnavailable: "Usuario no disponible",
    headerAdministrator: "Administrador",
  },

  en: {
    home: {
      title: "Delivery App",
      createOrder: "Create Order",
      myOrders: "My Orders",
      slogan: "Whatever you need,\njust order it.",
      description: "Shopping, food, errands, and local services from one app.",
      question: "What do you need?",
      shopping: "Shopping",
      food: "Food",
      errands: "Errands",
      services: "Services",
      makeOrder: "Place Order",
    },

    login: {
      title: "Sign In",
      email: "Email",
      password: "Password",
      button: "Sign In",
      noAccount: "Don't have an account?",
      register: "Register",
      createAccount: "Create Account",
      requiredTitle: "Required Fields",
      requiredMessage: "Please enter email and password.",
      errorTitle: "Login Error",
    },

    register: {
      title: "Create Account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      button: "Create Account",
      subtitle: "Register to place orders and track your deliveries.",

      requiredTitle: "Required Fields",
      requiredMessage: "Please enter email and password.",

      errorTitle: "Registration Error",

      successTitle: "Registration Successful",
      successMessage: "User created successfully.",

      registerButton: "Register",

      backHome: "Back to Home",
    },

    profile: {
      title: "My Profile",
      email: "Email",
      userId: "User ID",
      profileName: "Profile Name",
      status: "Status",
      logout: "Sign Out",
      loading: "Loading...",
      noUser: "No authenticated user.",
      notFound: "Profile not found or blocked by RLS.",
      noName: "No name",
      loaded: "Profile loaded successfully.",
      notAvailable: "Not available",
      language: "Language",
      spanish: "Spanish",
      english: "English",
    },

    orders: {
      title: "My Orders",
      empty: "You don't have any orders yet.",
      order: "Order",
      accepted: "Accepted",
      rejected: "Rejected",
      pending: "Pending",
    },

    createOrder: {
      title: "Create Order",
      placeholder: "What do you need us to bring?",
      button: "Submit Order",
      successTitle: "Order Created",
      successMessage: "Your order was submitted successfully.",
      errorTitle: "Error",
      errorMessage: "The order could not be created.",
      subtitle: "Tell us what you need and we will take care of it.",
      question: "What do you need?",
      required: "Please enter your order.",
      optionalDetails: "Optional details",
      referencePhoto: "Reference photo",
      deliveryAddress: "Delivery address",
      additionalNotes: "Additional notes",
      creating: "Creating...",
    },

    orderDetail: {
      title: "Order Details",
      accepted: "🟢 Order Accepted",
      rejected: "🔴 Order Rejected",
      pending: "🟡 Quote Pending",
      quoteReceived: "Quote Received",
      quoteStatus: "Status",
      description: "Description",
      createdAt: "Created at",
      accept: "Accept",
      reject: "Reject",
      waitingTitle: "Quote pending",
      waitingQuote:
        "We are reviewing your order. You will receive a quote soon.",
      acceptedMessage: "Your order was confirmed.",
      rejectedMessage: "This order was cancelled.",
      processingMessage: "We are processing your request.",
      backHome: "Back to Home",
      currentStatus: "Current status",
      quoteAcceptedTitle: "Quote accepted",
      quoteRejectedTitle: "Quote rejected",
      rejectError: "The quote could not be rejected.",
      notFound: "Order not found.",
    },

    common: {
      accept: "Accept",
      reject: "Reject",
      back: "Back",
      loading: "Loading...",
      error: "Error",
    },

    dashboardTitle: "Admin Dashboard",
    dashboardSubtitle: "Operational summary of ORBIT.",
    dashboardEyebrow: "Operations panel",

    headerGreeting: "Hello, Admin! 👋",
    headerSubtitle: "Welcome to the ORBIT admin panel.",
    today: "Today",

    statsNewOrders: "New Orders",
    statsNewOrdersDescription: "Waiting for review",

    statsQuotes: "Quotes",
    statsQuotesDescription: "Pending response",

    statsInPreparation: "In Preparation",
    statsInPreparationDescription: "Accepted orders",

    statsOnRoute: "On Route",
    statsOnRouteDescription: "Active orders",

    recentOrdersTitle: "Recent Orders",
    recentOrdersEmptyTitle: "No orders yet.",
    recentOrdersEmptyDescription:
      "When a customer creates an order, it will appear here.",
    recentOrdersDescription: "Quickly manage the most recent orders.",
    recentOrdersNumber: "# Order",
    recentOrdersShowing: "Showing",
    recentOrdersShowingSuffix: "recent orders",
    recentOrdersViewAll: "View all orders",

    tableCustomer: "Customer",
    tableOrder: "Order",
    tableStatus: "Status",
    tableTotal: "Total",
    tableAction: "Action",

    customerWithoutName: "Unnamed customer",
    customerWithoutPhone: "No phone",
    orderWithoutAddress: "No address",
    orderWithoutQuote: "No quote",

    statusValidation: "Validation",
    statusQuoted: "Quoted",
    statusAccepted: "Accepted",
    statusRejected: "Rejected",
    statusInProgress: "In preparation",
    statusOnRoute: "On route",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",

    activityTitle: "Recent Activity",

    activityNewOrder: "New order received",
    activityPendingQuote: "Quote pending approval",
    activityAcceptedOrder: "Order accepted by customer",
    activityReadyDelivery: "Delivery ready to start",

    quoteFormTitle: "Create Quote",
    quoteSubtotalLabel: "Subtotal",
    quoteSubtotalPlaceholder: "Ex: 5000",
    quoteDeliveryFeeLabel: "Delivery Fee",
    quoteDeliveryFeePlaceholder: "Ex: 2000",
    quoteNotesLabel: "Notes",
    quoteNotesPlaceholder: "Ex: Estimated time 35 minutes.",
    quoteTotalLabel: "Total",
    quoteCreatingButton: "Creating quote",
    quoteSubmitButton: "Send quote",
    quoteCreateError: "The quote could not be created.",

    noAction: "No action",
    updating: "Updating",
    workflowUpdateError: "The order status could not be updated.",
    actionStartPreparation: "Start preparation",
    actionSendOnRoute: "Send on route",
    actionMarkDelivered: "Mark delivered",

    sidebarDashboard: "Dashboard",
    sidebarOrders: "Orders",
    sidebarCustomers: "Customers",
    sidebarDeliveries: "Deliveries",
    sidebarSettings: "Settings",
    sidebarLogout: "Log out",
    comingSoon: "Soon",
    betaVersion: "Beta version",
    sidebarNavigation: "Navigation",
    sidebarBetaDescription: "Administrative dashboard — Beta version.",
    sidebarLoggingOut: "Signing out...",
    sidebarLogoutError: "Unable to sign out. Please try again.",

    operationalSummaryTitle: "Operational Summary",
    latestOrderReceived: "Latest order received",
    latestQuoteSent: "Latest quote sent",
    deliveredOrders: "Delivered orders",
    activeOrders: "Active orders",
    noRecentOrders: "No recent orders",
    noQuotesYet: "No quotes yet",
    operationalSummaryDescription:
      "Key information about the current operation.",
    totalOrdersToday: "Total orders today",
    totalOrdersTodayDescription: "Orders registered today.",
    totalSalesToday: "Total sales today",
    totalSalesTodayDescription: "Total quoted amount today.",
    ordersDeliveredToday: "Orders delivered today",
    ordersCancelledRejectedToday: "Cancelled / rejected today",

    // Admin Order Detail
    adminOrderBackDashboard: "Back to dashboard",
    adminOrderOperationalManagement: "Operations management",
    adminOrderDetailTitle: "Order Details",
    adminOrderNumber: "Order",

    adminOrderCustomer: "Customer",
    adminOrderCustomerInformation: "Customer Information",
    adminOrderName: "Name",
    adminOrderNoName: "No name",
    adminOrderPhone: "Phone",
    adminOrderNoPhone: "No phone",

    adminOrderRequest: "Request",
    adminOrderInformation: "Order Information",
    adminOrderDescription: "Description",
    adminOrderCreatedAt: "Created at",

    adminOrderDestination: "Destination",
    adminOrderDeliveryAddress: "Delivery Address",
    adminOrderLabel: "Label",
    adminOrderNoLabel: "No label",
    adminOrderAddress: "Address",
    adminOrderNoAddress: "No address",
    adminOrderReference: "Reference",
    adminOrderNoReference: "No reference",

    adminOrderOperation: "Operation",
    adminOrderDeliveryInformation: "Delivery Information",
    adminOrderAssignDriverDescription:
      "Assign the driver responsible for this delivery.",

    adminOrderFinances: "Finances",
    adminOrderQuote: "Quote",
    adminOrderSubtotal: "Subtotal",
    adminOrderDeliveryFee: "Delivery fee",
    adminOrderTotal: "Total",
    adminOrderNoQuote: "No quote",

    adminOrderNotProvided: "Not provided",
    adminOrderEstimatedPurchaseAmount: "Estimated purchase amount",
    adminOrderPaymentMethod: "Payment method",
    adminOrderCash: "Cash",
    adminOrderPayingWith: "Paying with",
    adminOrderServiceFee: "Service fee",
    adminOrderCommission: "Commission",
    adminOrderSurcharges: "Surcharges",

    // Admin Notes
    adminNotesInternal: "Internal",
    adminNotesTitle: "Administrative Notes",
    adminNotesDescription: "Internal notes for this order.",
    adminNotesPlaceholder: "Write a note...",
    adminNotesSaving: "Saving...",
    adminNotesSave: "Save note",
    adminNotesSaveSuccess: "Note saved successfully.",
    adminNotesSaveError: "The note could not be saved.",

    // Settings
    settingsEyebrow: "Settings",
    settingsTitle: "Operational Settings",
    settingsDescription: "Manage the values used by ORBIT during operations.",

    exchangeRatePair: "USD → CRC",
    exchangeRateTitle: "Exchange rate",
    exchangeRateDescription:
      "Define how many Costa Rican colones are equivalent to one US dollar for ORBIT quotes.",
    exchangeRateCurrent: "Current exchange rate",
    exchangeRateNotConfigured: "No exchange rate has been configured yet.",
    exchangeRateNew: "New exchange rate",
    exchangeRateNewDescription:
      "Enter the amount in Costa Rican colones corresponding to 1 USD.",
    exchangeRateInvalid: "Enter a valid exchange rate.",
    exchangeRateLoadError: "The exchange rate could not be loaded.",
    exchangeRateSaveError: "The exchange rate could not be saved.",
    exchangeRateSaveSuccess: "Exchange rate updated successfully.",
    exchangeRateSaving: "Saving...",
    exchangeRateSave: "Save exchange rate",
    exchangeRateFooter: "The new rate will be used for upcoming quotes.",

    // Driver Assignment
    driverAssignmentTitle: "Driver assignment",
    driverAssignmentDescription:
      "Select the person responsible for this delivery.",
    driverAssignmentAssigned: "Driver assigned",
    driverAssignmentPending: "Pending assignment",
    driverAssignmentOrderMustBeAccepted:
      "The order must be accepted before assigning a driver.",
    driverAssignmentError: "The driver could not be assigned.",
    driverAssignmentSuccess: "Driver assigned successfully.",
    driverAssignmentToDelivery: "was successfully assigned to this delivery.",
    driverAssignmentUnexpectedError:
      "An unexpected error occurred while saving the assignment.",
    driverAssignmentNoActiveDrivers: "No active drivers",
    driverAssignmentNoActiveDriversDescription:
      "Activate or register a profile with the driver role to continue.",
    driverAssignmentDriver: "Driver",
    driverAssignmentSelectDriver: "Select a driver",
    driverAssignmentNoPhone: "No phone registered",
    driverAssignmentAlreadyAssigned:
      "This driver is already assigned to the delivery.",
    driverAssignmentWillBeAssigned:
      "This driver will be assigned when you save the changes.",
    driverAssignmentSaving: "Saving...",
    driverAssignmentSave: "Save assignment",

    // Delivery Management
    deliveryManagementDelivered: "Delivered",
    deliveryManagementInProgress: "In progress",
    deliveryManagementPendingStart: "Pending start",
    deliveryManagementNoActiveDelivery: "No active delivery",
    deliveryManagementUnavailable: "Not available",
    deliveryManagementTitle: "Delivery monitoring",
    deliveryManagementDescription:
      "Monitor the operational status of the assigned delivery.",
    deliveryManagementCurrentStatus: "Current status",
    deliveryManagementAssignDriverWarning:
      "You must assign a driver before continuing with the operational flow.",
    deliveryManagementWaitingDriver:
      "The delivery is waiting for the driver to start it from the app.",
    deliveryManagementDriver: "Driver",
    deliveryManagementNoDriver: "No driver assigned",
    deliveryManagementDeliveryStart: "Delivery start",
    deliveryManagementDeliveryCompleted: "Delivery completed",
    deliveryManagementPending: "Pending",
    deliveryManagementFooter:
      "The driver starts and completes the delivery from the driver app. The administrative panel is used to assign and monitor the operation.",

    // Delivery Tracking
    deliveryTrackingNoInformation: "No information",
    deliveryTrackingFinished: "Tracking finished",
    deliveryTrackingActive: "Tracking active",
    deliveryTrackingNoSignal: "No signal",
    deliveryTrackingLiveGps: "Live GPS",
    deliveryTrackingRealtimeTracking: "Real-time tracking",
    deliveryTrackingDeliveredLocation:
      "Last location recorded during the delivery.",
    deliveryTrackingCurrentLocation: "Latest location reported by the driver.",
    deliveryTrackingNoTrackingTitle: "No tracking information yet",
    deliveryTrackingNoTrackingDescription:
      "The location will appear here when the driver starts the delivery from the app and begins transmitting their position.",
    deliveryTrackingPendingCreation: "Delivery pending creation",
    deliveryTrackingLastUpdate: "Last update",
    deliveryTrackingSpeed: "Speed",
    deliveryTrackingGpsAccuracy: "GPS accuracy",

    orderTimelineProgress: "Progress",
    orderTimelineDeliveryStatus: "Delivery status",

    adminNotesSavedLabel: "Saved note",

    // Orders Page
    ordersPageEyebrow: "Operations management",
    ordersPageTitle: "Orders",
    ordersPageDescription: "View, filter, and manage all registered orders.",
    ordersPageSearchPlaceholder: "Search by order, customer, phone, address...",
    ordersPageFilter: "Status",
    ordersPageAllStatuses: "All statuses",
    ordersPageShowing: "Showing",
    ordersPageOf: "of",
    ordersPageOrders: "orders",
    ordersPageClearFilters: "Clear filters",
    ordersPageNoOrdersTitle: "No orders registered",
    ordersPageNoOrdersDescription:
      "Orders created by customers will appear here.",
    ordersPageNoResultsTitle: "No orders found",
    ordersPageNoResultsDescription:
      "Try changing your search or selected filters.",
    ordersPageViewDetail: "View details",

    // Header
    headerOpenMenu: "Open menu",
    headerOpenCalendar: "Open calendar",
    headerPreviousMonth: "Previous month",
    headerNextMonth: "Next month",
    headerGoToday: "Go to today",
    headerNotifications: "Notifications",
    headerNewOrdersReceived: "New orders received",
    headerNoNewNotifications: "No new notifications",
    headerNewOrdersAppearHere: "New orders will appear here.",
    headerNewOrder: "New order",
    headerViewOrder: "View order",
    headerUserUnavailable: "User unavailable",
    headerAdministrator: "Administrator",
  },
};

export type Language = keyof typeof translations;
