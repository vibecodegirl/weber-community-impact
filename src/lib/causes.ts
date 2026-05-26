import employee from "@/assets/employee-care.jpg";
import aging from "@/assets/aging.jpg";
import mental from "@/assets/mental-health.jpg";
import prevention from "@/assets/prevention.jpg";
import substance from "@/assets/substance.jpg";

export type Cause = {
  slug: "employee-care" | "aging-services" | "mental-health" | "prevention" | "substance-abuse";
  title: string;
  tagline: string;
  image: string;
  description: string;
  outcomes: { label: string; value: string }[];
  programs: string[];
};

export const CAUSES: Cause[] = [
  {
    slug: "employee-care",
    title: "Employee Care Fund",
    tagline: "Caring for those who care for our community.",
    image: employee,
    description:
      "The people of Weber Human Services walk alongside our community in its hardest moments. The Employee Care Fund supports staff facing personal hardship — medical emergencies, housing instability, or unexpected loss — so they can keep showing up for the families that depend on them.",
    outcomes: [
      { label: "Staff supported in 2025", value: "62" },
      { label: "Average grant", value: "$1,250" },
      { label: "Requests funded within 7 days", value: "94%" },
    ],
    programs: [
      "Emergency hardship grants",
      "Mental wellness stipends for caregivers",
      "Continuing education scholarships",
    ],
  },
  {
    slug: "aging-services",
    title: "Aging Services",
    tagline: "Dignity, connection, and care for our elders.",
    image: aging,
    description:
      "We fund programs that help older adults remain independent, connected, and well — from in-home support and caregiver respite to social engagement programs that combat isolation.",
    outcomes: [
      { label: "Seniors served", value: "1,400+" },
      { label: "Caregiver respite hours funded", value: "8,200" },
      { label: "Home visits last year", value: "3,100" },
    ],
    programs: ["Caregiver respite & support", "In-home wellness checks", "Social engagement & meal programs"],
  },
  {
    slug: "mental-health",
    title: "Mental Health",
    tagline: "Healing minds. Restoring hope.",
    image: mental,
    description:
      "We bridge the gaps Medicaid and Medicare leave behind — funding therapy, crisis stabilization, and supportive housing so no one in our community is turned away from the help they need.",
    outcomes: [
      { label: "Therapy sessions funded", value: "5,600" },
      { label: "Crisis interventions supported", value: "320" },
      { label: "Clients served", value: "2,100" },
    ],
    programs: ["Therapy access scholarships", "Crisis stabilization support", "Supportive housing assistance"],
  },
  {
    slug: "prevention",
    title: "Prevention",
    tagline: "Stopping harm before it starts.",
    image: prevention,
    description:
      "Prevention works. We fund youth education, family resilience programs, and community outreach that keep our neighbors — especially young people — out of crisis to begin with.",
    outcomes: [
      { label: "Youth reached", value: "4,800" },
      { label: "Schools partnered", value: "27" },
      { label: "Family workshops", value: "140" },
    ],
    programs: ["Youth resilience curriculum", "Parent education workshops", "Community awareness campaigns"],
  },
  {
    slug: "substance-abuse",
    title: "Substance Use Recovery",
    tagline: "Recovery is possible. Together.",
    image: substance,
    description:
      "We support evidence-based recovery — peer support, sober living, and the wraparound services that help individuals and families rebuild lives free from addiction.",
    outcomes: [
      { label: "People in recovery supported", value: "780" },
      { label: "Peer-support hours funded", value: "12,400" },
      { label: "Sober-living scholarships", value: "95" },
    ],
    programs: ["Peer recovery coaching", "Sober-living scholarships", "Family recovery support"],
  },
];

export function getCause(slug: string) {
  return CAUSES.find((c) => c.slug === slug);
}
