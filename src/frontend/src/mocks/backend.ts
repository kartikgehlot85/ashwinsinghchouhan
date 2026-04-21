import type { AboutData, backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  addItem: async (_token, _req) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      title: "Sample Item",
      contentType: "research",
      date: "2026-01-01",
      createdAt: BigInt(Date.now()),
      tags: ["pharmacology"],
      description: "A sample content item.",
      fileUrl: undefined,
    },
  }),

  adminLogin: async (_password) => ({
    __kind__: "ok",
    ok: "mock-token-12345",
  }),

  deleteContact: async (_token, _contactId) => ({
    __kind__: "ok",
    ok: null,
  }),

  deleteItem: async (_token, _id) => ({
    __kind__: "ok",
    ok: true,
  }),

  getAbout: async () => ({
    bio: `Dr. Ashwin Singh Chouhan is an accomplished academician and researcher in the field of pharmaceutical sciences, currently serving as an Assistant Professor in the Department of Pharmacy at Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India. He has also completed his Ph.D. in Pharmacology from B. N. University, Udaipur, with a strong research focus on neuropharmacology and bio-guided fractionation of medicinal plants.\n\nWith a robust academic and research background, Dr. Chouhan has authored over 75 national and international research and review articles, contributing significantly to the fields of phytochemistry, ethnopharmacology, and CNS-related pharmacological studies. His research work primarily explores the therapeutic potential of plant-based compounds, particularly within the Cucurbitaceae family, emphasizing their neuroprotective, anticonvulsant, and anxiolytic activities.\n\nDr. Chouhan has extensive experience in advanced chromatographic techniques, including HPLC, TLC, column chromatography, and liquid-liquid extraction, alongside in vivo behavioral models such as elevated zero maze, actophotometer, and PTZ-induced seizure models. His interdisciplinary approach bridges traditional medicinal knowledge with modern pharmacological evaluation.\n\nRecognized for his academic excellence, he received the Best Research Paper Award at the ICTASEMP Conference in 2021. He is actively engaged in mentoring students, reviewing scientific manuscripts, and contributing to high-impact journals, reflecting his commitment to advancing pharmaceutical research and education.`,
    timeline: [
      {
        year: "2011-2014",
        description:
          "Strong foundation in pharmaceutical sciences and early research exposure.",
      },
      {
        year: "2014-2017",
        description:
          "M.Pharm in Pharmacology with specialization in CNS drug research and phytopharmacology.",
      },
      {
        year: "2017-2022",
        description:
          "Ph.D. in Pharmacology from B. N. University, Udaipur — researching neuroprotective plant compounds from the Cucurbitaceae family.",
      },
      {
        year: "2021",
        description:
          "Best Research Paper Award at ICTASEMP Conference for outstanding contributions to pharmacological research.",
      },
      {
        year: "2022–Present",
        description:
          "Assistant Professor, Department of Pharmacy, Jai Narain Vyas University (JNVU), Jodhpur — teaching, mentoring, and leading research in neuropharmacology.",
      },
    ],
  }),

  getContacts: async (_token) => ({
    __kind__: "ok",
    ok: [
      {
        id: BigInt(1),
        subject: "Collaboration on Neuroprotective Research",
        name: "Dr. Priya Sharma",
        submittedAt: BigInt(Date.now() - 2 * 60 * 60 * 1000),
        email: "priya.sharma@aiims.edu",
        message:
          "Dear Dr. Chouhan, I am deeply impressed by your work on neuroprotective compounds from the Cucurbitaceae family. I am working on a related project at AIIMS focusing on anti-convulsant mechanisms and would love to explore a potential collaboration. Please let me know if you'd be open to a discussion.",
      },
      {
        id: BigInt(2),
        subject: "Request for Research Paper — Anxiolytic Activity",
        name: "Rahul Verma",
        submittedAt: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000),
        email: "rahul.verma@manipaluni.in",
        message:
          "Hello Sir, I am a PhD student at Manipal University and have been following your publications on anxiolytic plant extracts. I could not access your 2023 paper on PTZ-induced seizure models. Could you kindly share a copy? It would be very helpful for my literature review.",
      },
      {
        id: BigInt(3),
        subject: "Invitation to Speak at ICTASEMP 2026",
        name: "Dr. Anand Mehta",
        submittedAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
        email: "anand.mehta@conference.org",
        message:
          "Dear Professor Chouhan, On behalf of the organizing committee of ICTASEMP 2026, I am delighted to invite you to deliver a keynote address in the session on Phytochemistry and Pharmacognosy. Given your expertise and your Best Research Paper Award at our 2021 conference, you would be an excellent speaker. Please let us know your availability.",
      },
    ],
  }),

  getItem: async (_id) => ({
    id: BigInt(1),
    title: "Pharmacokinetics of Novel Drug Compounds",
    contentType: "research",
    date: "2025-11-15",
    createdAt: BigInt(Date.now()),
    tags: ["pharmacokinetics", "drug-discovery"],
    description:
      "A comprehensive study on the pharmacokinetic behavior of newly synthesized drug candidates.",
    fileUrl: undefined,
  }),

  getItemsByType: async (contentType) => {
    const base = [
      {
        id: BigInt(1),
        title: "Pharmacokinetics of Novel Analgesic Compounds",
        contentType,
        date: "2025-11-15",
        createdAt: BigInt(Date.now()),
        tags: ["pharmacokinetics", "analgesics"],
        description:
          "A comprehensive study on the pharmacokinetic behavior of newly synthesized analgesic candidates targeting COX-2 pathways.",
        fileUrl: undefined,
      },
      {
        id: BigInt(2),
        title: "Molecular Docking of Anti-inflammatory Agents",
        contentType,
        date: "2025-09-05",
        createdAt: BigInt(Date.now()),
        tags: ["molecular-docking", "anti-inflammatory"],
        description:
          "In-silico analysis of binding affinities for synthetic anti-inflammatory compounds using AutoDock Vina.",
        fileUrl: undefined,
      },
      {
        id: BigInt(3),
        title: "Nanoparticle Drug Delivery Systems",
        contentType,
        date: "2025-07-22",
        createdAt: BigInt(Date.now()),
        tags: ["nanoparticles", "drug-delivery"],
        description:
          "Evaluation of polymeric nanoparticles as carriers for targeted drug delivery in oncology applications.",
        fileUrl: undefined,
      },
    ];
    return base;
  },

  submitContact: async (_req) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      subject: _req.subject,
      name: _req.name,
      submittedAt: BigInt(Date.now()),
      email: _req.email,
      message: _req.message,
    },
  }),

  updateAbout: async (_token, _data: AboutData) => ({
    __kind__: "ok",
    ok: null,
  }),

  updateItem: async (_token, _req) => ({
    __kind__: "ok",
    ok: true,
  }),

  verifyToken: async (_token) => true,
};
