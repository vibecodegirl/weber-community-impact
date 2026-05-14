// Contact page content.

import contactTeamMemberPhoto from "@/assets/contact-team-member.jpg";

export const contact = {
  hero: {
    eyebrow: "Contact",
    title: "Let's talk.",
    body: "Whether you'd like to give, partner, volunteer, or just learn more — we'd love to hear from you.",
    teamMember: {
      enabled: true,
      photo: contactTeamMemberPhoto,
      name: "Madeline McDonald",
      title: "Foundation Director",
      email: "madelinemc@weberhs.org",
      phone: "(801) 778-6834",
      phoneHref: "+18017786834",
    },
  },

  cards: {
    emailLabel: "Email",
    phoneLabel: "Phone",
    serviceAreaLabel: "Service area",
  },

  crisis: {
    title: "In crisis? Get help now.",
    body: "If you or someone you love is in crisis, you don't have to wait.",
  },

  form: {
    title: "Send us a message",
    nameLabel: "Full name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Your message",
    submitLabel: "Send message",
    successLabel: "Thank you — we'll respond soon!",
  },
};
