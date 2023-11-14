export const plans = [
  {
    id: import.meta.env.VITE_STRIPE_PLAN_STARTER_ID,
    type: "STARTER",
    description: "Para startups e profissionais individuais",
    resources: [
      "2 Fluxos", 
      "2 Agendas", 
      "1.000 Leads", 
      "R$15,00 a cada 100 Leads adicionais",
      "1 Integração Google Calendar",
      "1 Integração Whatsapp"
    ],
    price: 197
  },
  {
    id: import.meta.env.VITE_STRIPE_PLAN_PRO_ID,
    type: "PRO",
    description: "Para empresas em crescimento",
    resources: [
      "5 Fluxos", 
      "5 Agendas", 
      "3.000 Leads",
      "R$10,00 a cada 100 Leads adicionais",
      "2 Integrações Google Calendar",
      "2 Integrações Whatsapp"
    ],
    price: 297
  },
  {
    id: import.meta.env.VITE_STRIPE_PLAN_ENTERPRISE_ID,
    type: "ENTERPRISE",
    description: "Para grandes empresas",
    resources: [
      "10 Fluxos", 
      "10 Agendas", 
      "10.000 Leads",
      "R$5,00 a cada 100 Leads adicionais",
      "5 Integrações Google Calendar",
      "5 Integrações Whatsapp"
    ],
    price: 497
  },
]