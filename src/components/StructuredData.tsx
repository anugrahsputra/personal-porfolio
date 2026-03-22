import React from "react";
import { getResumeDataUseCase } from "@/features/resume/data/container";

const StructuredData = async () => {
  const resumeData = await getResumeDataUseCase.execute().catch(() => null);
  
  if (!resumeData) return null;

  const education = resumeData.education[0] || {};

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resumeData.name,
    jobTitle: "Mobile Engineer",
    description: resumeData.summary,
    url: "https://downormal.dev/",
    email: resumeData.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: resumeData.location,
      addressCountry: "Indonesia",
    },
    sameAs: [resumeData.linkedin],
    knowsAbout: resumeData.skills.technologies,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education.school || "University",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: education.degree || "Degree",
      credentialCategory: "degree",
      recognizedBy: {
        "@type": "Organization",
        name: education.school || "University",
      },
    },
    worksFor: resumeData.experience.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: exp.location,
        addressCountry: "Indonesia",
      },
    })),
  };

  // Professional Profile Schema
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: resumeData.name,
      jobTitle: "Mobile Engineer",
      description: resumeData.summary,
      url: "https://downormal.dev/",
      email: resumeData.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: resumeData.location,
        addressCountry: "Indonesia",
      },
      sameAs: [resumeData.linkedin],
      knowsAbout: resumeData.skills.technologies,
    },
    url: "https://downormal.dev/",
    name: `${resumeData.name} - Mobile Engineer Portfolio`,
    description: resumeData.summary,
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${resumeData.name} - Mobile Engineer Portfolio`,
    url: "https://downormal.dev/",
    description: resumeData.summary,
    author: {
      "@type": "Person",
      name: resumeData.name,
    },
    inLanguage: "en-US",
    copyrightYear: "2024",
    copyrightHolder: {
      "@type": "Person",
      name: resumeData.name,
    },
  };

  // Organization Schema for current workplace
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT. Bangun Rancang Indonesia Kita (BRIK)",
    url: "https://brik.co.id",
    employee: {
      "@type": "Person",
      name: resumeData.name,
      jobTitle: "Mobile Engineer",
      worksFor: {
        "@type": "Organization",
        name: "PT. Bangun Rancang Indonesia Kita (BRIK)",
      },
    },
  };

  // Professional Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mobile App Development Services",
    provider: {
      "@type": "Person",
      name: resumeData.name,
      jobTitle: "Mobile Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: resumeData.location,
        addressCountry: "Indonesia",
      },
    },
    serviceType: "Mobile Application Development",
    description: "Professional mobile app development services specializing in Flutter and Kotlin Multiplatform cross-platform applications",
    offers: {
      "@type": "Offer",
      description: "Flutter and Kotlin Multiplatform development, clean architecture implementation, CI/CD pipeline setup, mobile app maintenance",
    },
    areaServed: {
      "@type": "Place",
      name: "Jakarta, Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile Development Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Flutter Development",
        },
        {
          "@type": "OfferCatalog",
          name: "Kotlin Multiplatform Development",
        },
        {
          "@type": "OfferCatalog",
          name: "Clean Architecture Implementation",
        },
        {
          "@type": "OfferCatalog",
          name: "CI/CD Pipeline Setup",
        },
      ],
    },
  };

  const schemas = [
    personSchema,
    profileSchema,
    websiteSchema,
    organizationSchema,
    serviceSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
