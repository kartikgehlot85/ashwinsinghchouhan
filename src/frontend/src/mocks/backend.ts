import type { backendInterface } from "../backend";

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

  deleteItem: async (_token, _id) => ({
    __kind__: "ok",
    ok: true,
  }),

  getContacts: async (_token) => ({
    __kind__: "ok",
    ok: [
      {
        id: BigInt(1),
        subject: "Collaboration Inquiry",
        name: "Dr. Jane Doe",
        submittedAt: BigInt(Date.now()),
        email: "jane.doe@university.edu",
        message: "I would love to collaborate on your latest research.",
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

  updateItem: async (_token, _req) => ({
    __kind__: "ok",
    ok: true,
  }),

  verifyToken: async (_token) => true,
};
