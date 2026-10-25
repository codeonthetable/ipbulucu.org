import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free IP Geolocation & Network Intelligence REST API Documentation",
  description: "Working Node.js, Python and cURL examples for the public IP and approximate geolocation API. JSON responses, error handling, limits and OpenAPI schema.",
  alternates: {
    canonical: "https://ipbulucu.org/en/api-docs/",
  },
  openGraph: {
    title: "Free IP Geolocation & Network Intelligence REST API Documentation",
    description: "Working Node.js, Python and cURL examples for the public IP and approximate geolocation API. JSON responses, error handling, limits and OpenAPI schema.",
    url: "https://ipbulucu.org/en/api-docs/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
