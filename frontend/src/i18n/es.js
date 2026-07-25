// Spanish content dictionary. Sections that were English on the original site
// are intentionally reused from the English dictionary to keep the two language
// versions visually identical, while everything the original translated is
// provided in Spanish here.

import en from "./en";

const esFaqSectionTitles = [
  "Encuentre el mejor lugar para perforar un pozo de agua",
  "Evitando agua subterránea",
  "Pruebas de Resistividad",
  "Estudios",
];

const esFaqQuestions = [
  [
    "1. ¿Cual es el costo?",
    "2. ¿Qué incluye?",
    "3. ¿Cuál es el proceso?",
    "4. ¿Es posible obtener resultados negativos?",
    "5. ¿Obtendría un reembolso si el resultado es negativo?",
    "6. ¿Hay alguna garantía?",
    "7. ¿Hasta qué profundidad llegará el estudio?",
    "8. ¿Qué tan grande es el área que cubre el estudio?",
  ],
  ["1. ¿Cual es el costo?"],
  ["1. ¿Cual es el costo?"],
  ["1. ¿Cual es el costo?"],
];

const es = {
  meta: {
    home: {
      title:
        "Encuentra el mejor lugar para perforar un pozo de agua",
      description:
        "Servicios expertos en localización de aguas subterráneas. ¡Ahorra miles de dólares encontrando el lugar perfecto para perforar tu pozo de agua!",
    },
    services: {
      title: "Servicios de Localización de Agua y Estudios Geofísicos",
      description:
        "Descubra los servicios de AquaFinders: encontrar agua, evitar agua y fracturas, resistividad del suelo y estudios geofísicos para proyectos residenciales, agrícolas y comerciales.",
    },
    findWater: {
      title: "Encontrar Agua - El Mejor Lugar para Perforar",
      description:
        "Estudios geofísicos no invasivos que identifican el mejor lugar para perforar un pozo de agua productivo y reducen el riesgo de pozos secos.",
    },
    avoidWater: {
      title: "Evitar Agua y Fracturas Antes de Excavar",
      description:
        "Identifique agua y fracturas subterráneas antes de perforar cimientos profundos o infraestructura con los estudios geofísicos de AquaFinders.",
    },
    resistivity: {
      title: "Resistividad del Suelo para Proyectos de Tierra y Ambientales",
      description:
        "Estudios de resistividad eléctrica del suelo para subestaciones, vertederos y sistemas de conexión a tierra industriales, además de evaluación de contaminación.",
    },
    studies: {
      title: "Estudios Geofísicos, Mineros y Ambientales",
      description:
        "Estudios geológicos, hidrogeológicos y de resistividad para apoyar proyectos ambientales, de construcción y de minería.",
    },
    process: {
      title: "Proceso y Precios para la Localización de Pozos",
      description:
        "Conozca el proceso paso a paso y los precios transparentes de AquaFinders para estudios geológicos y de Imágenes de Resistividad Eléctrica (ERI).",
    },
    about: {
      title: "Sobre AquaFinders - Expertos en Aguas Subterráneas",
      description:
        "Un equipo especializado de geólogos e hidrogeólogos que utiliza tecnología de vanguardia para localizar los mejores lugares para pozos de agua productivos.",
    },
    contact: {
      title: "Contacte a AquaFinders",
      description:
        "Póngase en contacto con AquaFinders para encontrar la ubicación perfecta de su pozo. Hablamos español e inglés.",
    },
    faq: {
      title: "Preguntas Frecuentes",
      description:
        "Respuestas a preguntas comunes sobre los servicios de localización de pozos de agua de AquaFinders: costos, proceso, garantías y profundidad del estudio.",
    },
    gallery: {
      title: "Galería de Imágenes - Resistividad y Trabajo de Campo",
      description:
        "Una galería con resultados de imágenes de resistividad y trabajo de campo de AquaFinders.",
    },
    request: {
      title: "Comenzar ahora - Formulario de Nuevo Cliente",
      description:
        "Comience el proceso con AquaFinders. Complete nuestro formulario de nuevo cliente y nos pondremos en contacto. Sin cargos hasta firmar un contrato.",
    },
    success: {
      title: "Gracias por Contactarnos",
      description: "Su mensaje ha sido enviado con éxito.",
    },
    sitemap: {
      title: "Mapa del Sitio",
      description:
        "Mapa del sitio web de AquaFinders - encuentra todas nuestras páginas en un solo lugar.",
    },
  },

  htmlLang: "es-ES",

  nav: {
    services: "Servicios",
    pricing: "Precios",
    about: "Acerca de",
    start: "Comenzar ahora",
    faq: "Preguntas Frecuentes",
    contact: "Contacto",
    otherLanguage: "Versión en Inglés",
  },

  langSwitch: { enLabel: "English Language", esLabel: "Spanish Language" },

  common: {
    weAreInsured: "¡Estamos asegurados!",
    startNow: "Comenzar ahora",
    freeConsultation: "Consulta Gratuita",
    imageGallery: "Image Gallery",
    sampleResistivity: "Sample a resistivity imaging",
    infoProcess:
      "Haga clic aquí para obtener más información sobre nuestro proceso...",
    skipToContent: "Saltar al contenido principal",
    home: "Inicio",
  },

  hero: {
    title: "¡Encuentre el mejor lugar para perforar su pozo de agua!",
    description:
      "¡Los pozos secos o de bajo rendimiento son un gran riesgo! Aparte de arruinar su presupuesto, también pueden retrasar su proyecto de construcción. En AquaFinders, combinamos tecnología avanzada de imágenes subterráneas y análisis geológico experto para evaluar las aguas subterráneas ocultas debajo de su terreno. Le ayudaremos a seleccionar con confianza la ubicación óptima para la perforación, mejorando significativamente las posibilidades de un pozo productivo que le beneficiará por mucho tiempo.",
    audioSrc: "/podcast-es.mp4",
    audioLabel: "Podcast de introducción de AquaFinders",
  },

  explanationLead:
    "Proporcionamos a perforadores de pozos y constructores asesoramiento experto para identificar los mejores lugares donde perforar.",
  explanationStrong: "",
  explanationTail: "",

  services: {
    heading: "Nuestros Servicios",
    cards: {
      findWater: {
        title: "Encontrar Agua",
        description:
          "Utilizamos técnicas científicas avanzadas para identificar ubicaciones óptimas para la perforación de pozos - residencial, comercial y agricultural.",
      },
      avoidWater: {
        title: "Evitar Agua",
        description:
          "A veces quieres evitar el agua, como al excavar cimientos profundos, depósitos de gas, vertederos, etc. También podemos ayudarte con eso.",
      },
      resistivity: {
        title: "Resistividad Subterránea",
        description:
          "Prueba requerida para proyectos de conexión a tierra para subestaciones y sistemas de transmisión, granjas solares, plantas industriales, etc.",
      },
      studies: {
        title: "Estudios",
        description:
          "Estudios geofísicos e hidrogeofísicos de su propiedad, para asistir en el manejo de trabajos ambientales, de construcción y minería.",
      },
    },
  },

  whoHires: {
    heading: "¿Quién nos contrata?",
    items: [
      {
        title: "Residencial",
        description:
          "Propietarios que planean perforar pozos de agua en construcciones nuevas o sitios existentes.",
      },
      {
        title: "Agricultural",
        description:
          "Granjas que buscan los mejores lugares para perforar pozos de agua de alto rendimiento para riego de cultivos o consumo animal.",
      },
      {
        title: "Comercial",
        description:
          "Constructores que buscan estudiar un terreno antes de cavar, para evitar aguas y fracturas subterráneas.",
      },
    ],
  },

  about: {
    heading: "Sobre Nosotros",
    paragraphs: [
      "AquaFinders es un servicio especializado en la localización de aguas subterráneas que opera principalmente en Carolina del Norte, Carolina del Sur, Georgia, Tennessee y Kentucky, con disponibilidad de servicio en todo el país bajo solicitud. Con nuestro equipo de cinco geólogos/hidrogeólogos, un ingeniero forestal, un ingeniero agrónomo y técnicos locales, utilizamos tecnología de vanguardia para localizar los mejores lugares para perforar pozos de agua productivos.",
      "Fundados en el principio de que todos merecen acceso a agua limpia y confiable, nuestros expertos han ayudado a cientos de propietarios, agricultores y empresas a evitar el costoso error de perforar en el lugar equivocado.",
      "Nuestro enfoque científico combina análisis geofísico con imágenes hidrogeofísicas—también conocidas como Imágenes de Resistividad Eléctrica (ERI) o Tomografía de Resistividad Eléctrica (ERT)—para maximizar tus posibilidades de encontrar agua y señalar las áreas en tu sitio con la mayor probabilidad de flujo de agua fuerte.",
    ],
    closing: ["Llamanos hoy para recibir más información. ¡Tranquilidad garantizada!"],
    imageAlt: "Equipo de AquaFinders realizando un estudio de aguas subterráneas",
  },

  // Service detail pages were English on the original ES site — reuse verbatim.
  servicePages: en.servicePages,
  servicesList: {
    ...en.servicesList,
    heading: "Servicios",
  },

  process: {
    title: "Proceso y Precios",
    subtitle: "For finding the best place to drill a water well",
    intro: "Our services are divided into two parts:",
    prices: [
      {
        amount: "$150",
        muted: true,
        title: "(Opcional) Estudio Hidrogeológico",
        description:
          "Este estudio hidrogeológico preliminar opcional analiza imágenes satelitales para evaluar el potencial de agua de su propiedad. Su objetivo es ayudarle a comprender mejor su terreno y determinar si se recomiendan estudios adicionales o si ya existe un camino claro para la ubicación de su pozo de agua. En otras palabras, es ideal para aquellos que no están seguros de si necesitan los estudios más avanzados descritos a continuación. Si decide continuar con nuestro Estudio Geológico completo, el costo de este estudio preliminar se deducirá del total.",
      },
      {
        amount: "$500",
        title: "(A) Estudio Geofísico",
        description:
          "Este paso implica una evaluación integral de su propiedad a través del análisis detallado de múltiples imágenes satelitales, evaluaciones topográficas, estudios geológicos e investigaciones hidrogeológicas. Este enfoque multicapa nos permite identificar las áreas con el mayor potencial de agua. Con base en estos hallazgos, identificamos las ubicaciones exactas para las pruebas de campo (líneas geofísicas), minimizando las posibilidades de pruebas secundarias innecesarias y maximizando la eficiencia de la encuesta geofísica que realizaremos.",
      },
      {
        amount: "$700",
        title: "(B) Imágenes de Resistividad Eléctrica",
        description:
          "Estudio geofísico de campo utilizando tecnología de Imágenes de Resistividad Eléctrica (ERI), seguido de un análisis completo de datos, interpretación profesional de resultados (múltiples geólogos), generación de informes detallados y una explicación clara de los hallazgos para garantizar una comprensión total y aplicación práctica. Este informe será utilizado por su perforador de pozos/constructor en su toma de decisiones.",
      },
      {
        amount: "$725",
        amountExtra: "extra",
        muted: true,
        title: "(B.1) Possibility (in some cases)",
        description:
          "Properties on a sedimentary geological formation, may require the Schlumberger SEV survey, which is more labor intensive, and therefore requires an additional $725 fee. Contact us for more information or to discover if this feel would be applicable to your property.",
      },
    ],
    note1: "Note 1: These values do not include local taxes.",
    note2: "Note 2: The Geological Study must always be completed before an ERI survey.",
    stepsHeading: "Así es como normalmente funciona:",
    steps: [
      {
        actor: "[Customer]",
        text: "Usted completa nuestro Formulario de Nuevo Cliente",
        link: true,
      },
      {
        actor: "[AquaFinders]",
        text: "Nos ponemos en contacto con usted para conocer mejor sus necesidades",
      },
      {
        actor: "[Customer]",
        text: "Usted firma el contrato y realiza el pago ($500)",
      },
      {
        actor: "[AquaFinders]",
        text: "Comenzamos con la caracterización del acuífero y una auditoría regional de pozos, seguido de análisis geoespaciales, topográficos, geológicos e hidrogeofísicos de su propiedad",
      },
      {
        actor: "[AquaFinders]",
        text: "Presentamos su informe y le damos una recomendación clara sobre si debe proceder o no con el siguiente paso: el estudio Geofísico (ERI).",
      },
      {
        actor: "[Together]",
        text: "Según los datos recopilados, le ayudaremos a decidir si el Estudio Geofísico es la opción adecuada para usted.",
      },
      {
        actor: "[Customer]",
        text: "Usted realiza el pago para este segundo estudio ($700)",
      },
      {
        actor: "[AquaFinders]",
        text: "Realizamos el estudio geofísico en su propiedad",
      },
      {
        actor: "[AquaFinders]",
        text: "Le entregamos los resultados finales por correo electrónico, para que pueda enviárselos a su empresa perforadora de pozos o constructor.",
        final: true,
      },
    ],
    notesTitle: "Notas importantes:",
    notes: [
      "Si todo va bien, el proceso puede tomar tan solo tres semanas.",
      "El tiempo de entrega habitual es de aproximadamente cinco semanas.",
      "Ofrecemos servicios urgentes para proyectos de emergencia (pueden aplicarsen tarifas adicionales).",
      "Tenga en cuenta que el proceso y los pasos pueden variar según sus necesidades, preferencias, condiciones climáticas y condiciones de su terreno.",
      "Ofrecemos descuentos para proyectos más grandes que requieran múltiples estudios.",
      "Los impuestos de venta no están incluidos en los precios mostrados en este sitio web.",
    ],
    otherPricing:
      "Para conocer los precios de nuestros otros servicios, contáctenos.",
  },

  contact: {
    formHeading: "Formulario de Contacto",
    name: "Su Nombre",
    email: "Dirección de Correo Electrónica",
    phone: "Número de Teléfono",
    preferred: "Forma preferida de comunicación:",
    prefEmail: "Correo Electrónico",
    prefCall: "Llamada Telefónica",
    prefText: "Mensaje de Texto",
    message: "Cuéntenos sobre su proyecto o haganos sus preguntas...",
    captcha: "Captcha",
    submit: "Enviar",
    captchaAlert:
      "¡Por favor complete el campo captcha para comprovar que es humano!",
    readyTitle:
      "¿Está listo para encontrar la ubicación perfecta para perforar su pozo?",
    weSpeak: "Hablamos Español / We speak English",
    byAppointment: "Dirección física solo con cita previa.",
    phoneLabel: "Teléfono",
    phoneHours: "(9-5 PM EST)",
    emailLabel: "Correo Electrónico",
  },

  footer: {
    expertServices: "Servicios Expertos de Localización de Pozos de Agua para",
    serviceArea: "Carolina del Norte y Carolina del Sur, E.E.U.U.",
    nationwide: "con la posibilidad de servicio disponible en todo el país.",
    contactForm: "Formulario de Contacto",
    contactUs: "Contáctanos",
    whatsapp: "Contáctanos por WhatsApp",
    email: "Correo Electrónico",
    trademark: "AquaFinders ™ (Marca Registrada en Trámite)",
    allRights: "Todos los derechos reservados.",
    resultsVary: "Los resultados pueden variar según las condiciones geológicas.",
    siteMap: "Mapa del Sitio",
  },

  faq: {
    title: "Preguntas Frecuentes",
    sections: en.faq.sections.map((section, si) => ({
      ...section,
      title: esFaqSectionTitles[si],
      items: section.items.map((item, ii) => ({
        ...item,
        q: esFaqQuestions[si][ii],
      })),
    })),
    costLinkPrefix: en.faq.costLinkPrefix,
    costLinkText: en.faq.costLinkText,
    costLinkSuffix: en.faq.costLinkSuffix,
    usgsPrefix: en.faq.usgsPrefix,
    usgsText: en.faq.usgsText,
    usgsSuffix: en.faq.usgsSuffix,
    ertAlt: "Ejemplo de un informe de Tomografía de Resistividad Eléctrica (ERT)",
    importantTitle: "Importante:",
    importantText:
      "No perforamos pozos de agua. En su lugar, estudiamos las condiciones subterráneas de su propiedad para que los perforadores de pozos y las empresas de construcción puedan tomar decisiones informadas.",
  },

  gallery: {
    title: "Galería",
    imageAlts: en.gallery.imageAlts,
  },

  request: {
    title: "Comenzar ahora",
    intro:
      "¡Bienvenido a la familia AquaFinders! Este es solo un formulario preliminar para facilitar la incorporación de nuevos clientes. Una vez que recibamos su información, nos pondremos en contacto en breve para guiarle en los próximos pasos. No hay cargos hasta que firmemos un contrato.",
    iframeTitle: "Formulario de nuevo cliente de AquaFinders",
    loading: "Cargando…",
  },

  success: {
    title: "¡Gracias por Contactarnos!",
    message:
      "Su mensaje ha sido enviado con éxito. Nuestro equipo se pondrá en contacto con usted lo antes posible.",
    backHome: "Volver al Inicio",
  },

  sitemap: {
    title: "Mapa del Sitio",
    links: {
      home: "Inicio",
      ourServices: "Nuestros Servicios",
      aboutUs: "Sobre Nosotros",
      contactUs: "Contáctanos",
      startNow: "Comenzar ahora",
      pricing: "Proceso y Precios",
      faq: "Preguntas Frecuentes",
      otherLanguage: "Versión en Inglés",
      formSubmission: "Envío de Formulario",
      siteMap: "Mapa del Sitio",
    },
  },

  notFound: {
    title: "Página no encontrada",
    text: "Lo sentimos, la página que busca no existe.",
    backHome: "Volver al Inicio",
  },
};

export default es;
