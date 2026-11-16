import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070809",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://perfectmesh.in"),
  title: "Perfect Mesh Solutions | Premium Architectural Mosquito Mesh & Aluminium Fabrication",
  description:
    "High-end mosquito mesh systems and custom aluminium fabrication for modern luxury residences in Bengaluru and South India. 6063-T6 aerospace alloys, 316 marine-grade stainless micro-mesh, and free in-home laser measurement.",
  keywords: [
    "mosquito mesh Bengaluru",
    "sliding mosquito mesh doors",
    "pleated accordion retractable screens",
    "magnetic window screens",
    "architectural aluminium fabrication",
    "stainless steel insect screen",
    "balcony mesh partition",
    "zero gap laser measurement",
  ],
  authors: [{ name: "Perfect Mesh Solutions" }],
  creator: "Perfect Mesh Solutions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://perfectmesh.in",
    siteName: "Perfect Mesh Solutions",
    title: "Perfect Mesh Solutions | Invisible Protection. Maximum Comfort.",
    description:
      "Bespoke mosquito mesh installations and precision architectural aluminium fabrication for modern homes.",
    images: [
      {
        url: "/house.jpg",
        width: 1200,
        height: 630,
        alt: "Perfect Mesh Solutions - Architectural Insect Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Mesh Solutions | Architectural Insect Defense",
    description:
      "Bespoke mosquito mesh installations and precision aluminium fabrication for luxury residences.",
    images: ["/house.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Perfect Mesh Solutions",
  image: "https://perfectmesh.in/house.jpg",
  "@id": "https://perfectmesh.in",
  url: "https://perfectmesh.in",
  telephone: "+91-7012715025",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indiranagar 100ft Road",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.6412,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "City", name: "Mysuru" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-zinc-200 selection:text-black relative bg-[#070809] text-[#f4f4f5]">
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
