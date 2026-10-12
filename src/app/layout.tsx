import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#05070A",
};

export const metadata: Metadata = {
  title: "K Dhanush Kudva | Cyber Security Student & Researcher",
  description:
    "Personal portfolio of K Dhanush Kudva, Cyber Security student at NMAMIT specializing in Kali Linux, SIEM, pentesting, threat hunting, and secure systems. Open to internships.",
  keywords: [
    "K Dhanush Kudva",
    "Cyber Security Intern",
    "NMAMIT",
    "Kali Linux",
    "SIEM",
    "Pentesting",
    "Threat Hunting",
    "Python",
    "Java",
    "Infosec Portfolio"
  ],
  authors: [{ name: "K Dhanush Kudva", url: "https://github.com/dhanushkudva" }],
  creator: "K Dhanush Kudva",
  metadataBase: new URL("https://dhanushkudva.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhanushkudva.dev",
    title: "K Dhanush Kudva | Cyber Security Student & Researcher",
    description:
      "B.Tech CSE (Cyber Security) @ NMAMIT. Focused on pentesting, threat hunting, and SIEM monitoring. Open to internships.",
    siteName: "K Dhanush Kudva Portfolio",
    images: [
      {
        url: "/certs/null-origin-ctf-2026.webp",
        width: 1200,
        height: 630,
        alt: "K Dhanush Kudva Cyber Security Credentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K Dhanush Kudva | Cyber Security Student",
    description:
      "Cyber Security Student @ NMAMIT | Kali Linux • SIEM • Python • Java | Open to Internships",
    images: ["/certs/null-origin-ctf-2026.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "K Dhanush Kudva",
    jobTitle: "Cyber Security Student & Researcher",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Karnataka",
      addressCountry: "India",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "NMAM Institute of Technology, Nitte",
      },
      {
        "@type": "EducationalOrganization",
        name: "Vivekananda PU College, Puttur",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/kdhanushkudva/",
      "https://github.com/dhanushkudva",
    ],
    knowsAbout: [
      "Cyber Security",
      "Kali Linux",
      "SIEM",
      "Penetration Testing",
      "Threat Hunting",
      "Wireshark",
      "Python",
      "Java",
      "C++",
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cyber-bg text-foreground antialiased selection:bg-[#FF2A3D] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-cyber-crimson focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white font-mono text-sm"
        >
          Skip to main content
        </a>
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
