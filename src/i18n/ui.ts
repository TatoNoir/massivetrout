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
  usContact: {
    name: "Bill Johnson",
    roleEn: "US Contact",
    roleEs: "Contacto en EE.UU.",
    phone: "973-452-0115",
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
