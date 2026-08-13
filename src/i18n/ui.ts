export type Lang = "en" | "es";

export const langLabels: Record<Lang, string> = {
  en: "English",
  es: "Español",
};

export const siteConfig = {
  name: "Massive Trout Fly Fishing",
  domain: "massivetroutflyfishing.com",
  email: "info@massivetroutflyfishing.com",
  emailAlt: "mtroutff@gmail.com",
  phoneInternational: "+5492944574963",
  phoneDisplay: "+54 9 2944 57 49 63",
  phone2Display: "+54 9 2944 66 55 88",
  whatsapp: "https://wa.me/5492944574963",
  gtagId: "G-YFWWP1ZFFS",
  owner: {
    name: "Julian Cabral",
    roleEn: "Owner/Lead Guide",
    roleEs: "Dueño/Guía Principal",
    email: "mtroutff@gmail.com",
  },
  social: {
    facebook: "https://www.facebook.com/massivetroutflyfishing/",
    instagram: "https://www.instagram.com/massive_trout/?hl=es-la",
    tripadvisor:
      "https://www.tripadvisor.com.ar/Attraction_Review-g312848-d15098716-Reviews-Massive_Trout_Fly_Fishing-San_Carlos_de_Bariloche_Province_of_Rio_Negro_Patagoni.html",
    linkedin: "https://www.linkedin.com/in/julian-cabral-193650173/",
  },
} as const;

export const ui = {
  en: {
    "nav.programs": "Programs",
    "nav.destinations": "Destinations",
    "nav.story": "Story",
    "nav.lodges": "Lodges & Lodging",
    "nav.contact": "Contact",
    "nav.language": "Language",
    "nav.faqs": "FAQs",
    "nav.book": "Book your trip",
    "booking.heroTitle": "Book your trip",
    "booking.subtitle": "REQUEST YOUR TRIP",
    "booking.step1Title": "Choose your adventure",
    "booking.step2Title": "Program details",
    "booking.select": "Select",
    "booking.selected": "Selected",
    "booking.back": "Back to programs",
    "booking.yourData": "Your details",
    "booking.fullName": "Full name",
    "booking.email": "Email",
    "booking.phone": "Phone",
    "booking.season": "Travel season",
    "booking.dates": "Travel dates",
    "booking.datesHint": "Season runs November to May.",
    "booking.passengers": "Number of passengers",
    "booking.send": "Check availability",
    "booking.sent":
      "Request received! We will get back to you shortly to confirm availability.",
    "booking.error": "There was a problem sending your request. Please try again.",
    "topbar.contact": "Contact Us!",
    "contact.title": "Contact Us",
    "contact.subtitle": "FOR A SALUTATION OR INFORMATION!",
    "contact.yourName": "Your name",
    "contact.yourEmail": "Your email",
    "contact.yourPhone": "Your phone",
    "contact.reason": "Reason for contacting",
    "contact.message": "Message",
    "contact.send": "Submit",
    "contact.question": "Question",
    "contact.feedback": "Feedback",
    "contact.general": "General Message",
    "contact.newsletter": "Subscribe for newsletter",
    "contact.sent":
      "Your message was sent successfully. We will get back to you shortly.",
    "contact.error": "There was a problem sending your message. Please try again.",
    "newsletter.title": "Join Our Newsletter",
    "newsletter.text":
      "Receive information about upcoming hosted trips, scouting reports, and the latest destination updates.",
    "newsletter.placeholder": "Your email address",
    "newsletter.subscribe": "Subscribe",
    "footer.copyright": "All rights reserved.",
    "footer.argentineContact": "Argentinean Contact",
    "footer.phone": "Phone",
    "footer.mobile": "Mobile",
    "footer.outsideArg": "Outside Arg.",
  },
  es: {
    "nav.programs": "Programas",
    "nav.destinations": "Destinos",
    "nav.story": "Quiénes somos",
    "nav.lodges": "Lodges y Alojamiento",
    "nav.contact": "Contacto",
    "nav.language": "Idioma",
    "nav.faqs": "FAQs",
    "nav.book": "Reservá tu viaje",
    "booking.heroTitle": "Reservá tu viaje",
    "booking.subtitle": "SOLICITÁ TU VIAJE",
    "booking.step1Title": "Elegí tu aventura",
    "booking.step2Title": "Detalle del programa",
    "booking.select": "Seleccionar",
    "booking.selected": "Seleccionado",
    "booking.back": "Volver a los programas",
    "booking.yourData": "Tus datos",
    "booking.fullName": "Nombre completo",
    "booking.email": "Email",
    "booking.phone": "Teléfono",
    "booking.season": "Época de viaje",
    "booking.dates": "Fechas de viaje",
    "booking.datesHint": "La temporada va de noviembre a mayo.",
    "booking.passengers": "Cantidad de pasajeros",
    "booking.send": "Consultar disponibilidad",
    "booking.sent":
      "¡Solicitud recibida! Te contactaremos en breve para confirmar disponibilidad.",
    "booking.error": "Hubo un problema al enviar tu solicitud. Intentá de nuevo.",
    "topbar.contact": "¡Contáctenos!",
    "contact.title": "Contáctenos",
    "contact.subtitle": "¡PARA SALUDAR O PEDIR INFORMACIÓN!",
    "contact.yourName": "Tu nombre",
    "contact.yourEmail": "Tu email",
    "contact.yourPhone": "Tu teléfono",
    "contact.reason": "Motivo de contacto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar",
    "contact.question": "Consulta",
    "contact.feedback": "Comentario",
    "contact.general": "Mensaje general",
    "contact.newsletter": "Suscribirme al newsletter",
    "contact.sent": "¡Tu mensaje fue enviado correctamente! Te contactaremos en breve.",
    "contact.error": "Hubo un problema al enviar tu mensaje. Intentá de nuevo.",
    "newsletter.title": "Únete a nuestro Newsletter",
    "newsletter.text":
      "Recibí información sobre viajes próximos, reportes de pesca y actualizaciones de destinos.",
    "newsletter.placeholder": "Tu dirección de email",
    "newsletter.subscribe": "Suscribirme",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.argentineContact": "Contacto Argentina",
    "footer.phone": "Teléfono",
    "footer.mobile": "Móvil",
    "footer.outsideArg": "Desde el extranjero",
  },
} as const;

export function getUi(lang: Lang) {
  return ui[lang];
}

export interface BookingProgram {
  id: string;
  title: string;
  img: string;
  icon: string;
  detail: string;
}

export interface BookingCategory {
  id: string;
  title: string;
  subtitle?: string;
  img: string;
  season: "nov-may" | "may-oct" | "all";
  seasons: string[];
  programs: BookingProgram[];
}

export const bookingCategories: Record<Lang, BookingCategory[]> = {
  en: [
    {
      id: "patagonia",
      title: "Fly fishing in Patagonia",
      subtitle: "Season runs November to May.",
      img: "/images/03_destinations/circles/fonck_destinations.png",
      season: "nov-may",
      seasons: [
        "November – December (Spring)",
        "January – February (Summer)",
        "March – April (Autumn)",
        "May (Late season)",
      ],
      programs: [
        {
          id: "daily",
          title: "Daily Trips",
          img: "/images/02_programs/programs_01.jpg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Daily or half day excursions, no more than 40 minutes from Bariloche downtown, on rivers and lakes of the Nahuel Huapi National Park with plenty of wild trout. Best bilingual guides, full and hot lunch with the best Red Wine.",
        },
        {
          id: "overnight",
          title: "Overnight Programs",
          img: "/images/02_programs/programs_02.jpg",
          icon: "/images/02_programs/icons/overnight_blue.svg",
          detail:
            "Glamping in the middle of nowhere: at least 15 km per day of wild and clear water, fishing more than 10 hours a day, luxurious camp fully prepared ahead of time. For all kinds of fishermen: beginner, intermediate, advanced.",
        },
        {
          id: "allinclusive",
          title: "All Inclusive Programs",
          img: "/images/02_programs/programs_03.jpg",
          icon: "/images/02_programs/icons/lodges_blue.svg",
          detail:
            "Fishing lodging, meals and services in one rate. We recommend places to stay depending on the needs of each group: luxurious fishing lodges, cabins or hotels. The best of each destination at your fingertips.",
        },
      ],
    },
    {
      id: "wyoming",
      title: "Fly fishing in Wyoming",
      subtitle: "Season runs May to October.",
      img: "",
      season: "may-oct",
      seasons: [
        "May – June (Spring)",
        "July – August (Summer)",
        "September – October (Autumn)",
      ],
      programs: [
        {
          id: "wyoming-grey-reef",
          title: "Grey Reef",
          img: "/images/08- booking/wyoming-gray-reef.jpeg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Daily or half day excursions, no more than 40 minutes from Bariloche downtown, on rivers and lakes of the Nahuel Huapi National Park with plenty of wild trout. Best bilingual guides, full and hot lunch with the best Red Wine.",
        },
        {
          id: "wyoming-miracle-mile",
          title: "Miracle Mile",
          img: "/images/08- booking/wyoming-miracle-mile.jpeg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Daily or half day excursions, no more than 40 minutes from Bariloche downtown, on rivers and lakes of the Nahuel Huapi National Park with plenty of wild trout. Best bilingual guides, full and hot lunch with the best Red Wine.",
        },
      ],
    },
    {
      id: "dorado",
      title: "Dorado Fly Fishing",
      img: "",
      season: "all",
      seasons: [
        "September – November (Spring)",
        "December – February (Summer)",
        "March – May (Autumn)",
        "June – August (Winter)",
      ],
      programs: [
        {
          id: "dorado-lodging",
          title: "Fishing and Lodging",
          img: "/images/08- booking/dorado-daily-trip.jpeg",
          icon: "/images/02_programs/icons/lodges_blue.svg",
          detail:
            "Fishing lodging, meals and services in one rate. We recommend places to stay depending on the needs of each group: luxurious fishing lodges, cabins or hotels. The best of each destination at your fingertips.",
        },
      ],
    },
  ],
  es: [
    {
      id: "patagonia",
      title: "Pesca con mosca en Patagonia",
      subtitle: "Temporada de noviembre a mayo.",
      img: "/images/03_destinations/circles/fonck_destinations.png",
      season: "nov-may",
      seasons: [
        "Noviembre – Diciembre (Primavera)",
        "Enero – Febrero (Verano)",
        "Marzo – Abril (Otoño)",
        "Mayo (Fin de temporada)",
      ],
      programs: [
        {
          id: "daily",
          title: "Excursiones diarias",
          img: "/images/02_programs/programs_01.jpg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Excursiones diarias o de medio día, a no más de 40 minutos del centro de Bariloche, en ríos y lagos del Parque Nacional Nahuel Huapi repletos de truchas salvajes. Los mejores guías bilingües, almuerzo completo y caliente con el mejor vino tinto.",
        },
        {
          id: "overnight",
          title: "Expediciones",
          img: "/images/02_programs/programs_02.jpg",
          icon: "/images/02_programs/icons/overnight_blue.svg",
          detail:
            "Glamping en el medio de la nada: al menos 15 km por día de agua salvaje y cristalina, más de 10 horas de pesca diarias, campamento de lujo preparado con anticipación. Para todo tipo de pescador: principiante, intermedio o avanzado.",
        },
        {
          id: "allinclusive",
          title: "Excursiones All Inclusive",
          img: "/images/02_programs/programs_03.jpg",
          icon: "/images/02_programs/icons/lodges_blue.svg",
          detail:
            "Alojamiento, comidas y servicios de pesca en una sola tarifa. Recomendamos dónde hospedarse según las necesidades de cada grupo: lodges de pesca de lujo, cabañas u hoteles. Lo mejor de cada destino a tu alcance.",
        },
      ],
    },
    {
      id: "wyoming",
      title: "Pesca con mosca en Wyoming",
      subtitle: "Temporada de mayo a octubre.",
      img: "",
      season: "may-oct",
      seasons: [
        "Mayo – Junio (Primavera)",
        "Julio – Agosto (Verano)",
        "Septiembre – Octubre (Otoño)",
      ],
      programs: [
        {
          id: "wyoming-grey-reef",
          title: "Grey Reef",
          img: "/images/08- booking/wyoming-gray-reef.jpeg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Excursiones diarias o de medio día, a no más de 40 minutos del centro de Bariloche, en ríos y lagos del Parque Nacional Nahuel Huapi repletos de truchas salvajes. Los mejores guías bilingües, almuerzo completo y caliente con el mejor vino tinto.",
        },
        {
          id: "wyoming-miracle-mile",
          title: "Miracle Mile",
          img: "/images/08- booking/wyoming-miracle-mile.jpeg",
          icon: "/images/02_programs/icons/daytrip_blue.svg",
          detail:
            "Excursiones diarias o de medio día, a no más de 40 minutos del centro de Bariloche, en ríos y lagos del Parque Nacional Nahuel Huapi repletos de truchas salvajes. Los mejores guías bilingües, almuerzo completo y caliente con el mejor vino tinto.",
        },
      ],
    },
    {
      id: "dorado",
      title: "Pesca del Dorado",
      img: "",
      season: "all",
      seasons: [
        "Septiembre – Noviembre (Primavera)",
        "Diciembre – Febrero (Verano)",
        "Marzo – Mayo (Otoño)",
        "Junio – Agosto (Invierno)",
      ],
      programs: [
        {
          id: "dorado-lodging",
          title: "Excursiones All Inclusive",
          img: "/images/08- booking/dorado-daily-trip.jpeg",
          icon: "/images/02_programs/icons/lodges_blue.svg",
          detail:
            "Alojamiento, comidas y servicios de pesca en una sola tarifa. Recomendamos dónde hospedarse según las necesidades de cada grupo: lodges de pesca de lujo, cabañas u hoteles. Lo mejor de cada destino a tu alcance.",
        },
      ],
    },
  ],
};
