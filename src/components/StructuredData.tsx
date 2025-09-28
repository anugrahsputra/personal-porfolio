"use client";

import { useEffect } from "react";

interface ResumeData {
  name: string;
  location: string;
  email: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  skills: {
    technologies: string[];
    tools: string[];
    soft_skills: string[];
    languages: string[];
  };
  experience: Array<{
    company: string;
    position: string;
    period: string;
    location: string;
  }>;
  education: {
    institution: string;
    degree: string;
    graduation_date: string;
  };
}

const StructuredData = () => {
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch("/json/AnugrahSuryaPutra_resume.json");
        const data: ResumeData = await response.json();

        // Person Schema
        const personSchema = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: data.name,
          jobTitle: "Mobile Engineer",
          description: data.summary,
          url: "https://itsyourboyputra.vercel.app/",
          email: data.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: data.location,
            addressCountry: "Indonesia",
          },
          sameAs: [data.linkedin],
          knowsAbout: data.skills.technologies,
          alumniOf: {
            "@type": "EducationalOrganization",
            name: data.education.institution,
          },
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: data.education.degree,
            credentialCategory: "degree",
            recognizedBy: {
              "@type": "Organization",
              name: data.education.institution,
            },
          },
          worksFor: data.experience.map((exp) => ({
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
            name: data.name,
            jobTitle: "Mobile Engineer",
            description: data.summary,
            url: "https://itsyourboyputra.vercel.app/",
            email: data.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: data.location,
              addressCountry: "Indonesia",
            },
            sameAs: [data.linkedin],
            knowsAbout: data.skills.technologies,
          },
          url: "https://itsyourboyputra.vercel.app/",
          name: `${data.name} - Mobile Engineer Portfolio`,
          description: data.summary,
        };

        // Website Schema
        const websiteSchema = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: `${data.name} - Mobile Engineer Portfolio`,
          url: "https://itsyourboyputra.vercel.app/",
          description: data.summary,
          author: {
            "@type": "Person",
            name: data.name,
          },
          inLanguage: "en-US",
          copyrightYear: "2024",
          copyrightHolder: {
            "@type": "Person",
            name: data.name,
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
            name: data.name,
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
            name: data.name,
            jobTitle: "Mobile Engineer",
            address: {
              "@type": "PostalAddress",
              addressLocality: data.location,
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

        // Add schemas to page
        const schemas = [personSchema, profileSchema, websiteSchema, organizationSchema, serviceSchema];
        
        schemas.forEach((schema, index) => {
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.id = `structured-data-${index}`;
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        });

        return () => {
          // Cleanup function to remove schemas when component unmounts
          schemas.forEach((_, index) => {
            const existingScript = document.getElementById(`structured-data-${index}`);
            if (existingScript) {
              existingScript.remove();
            }
          });
        };
      } catch (error) {
        console.error("Error fetching resume data for structured data:", error);
      }
    };

    fetchResumeData();
  }, []);

  return null; // This component doesn't render anything visible
};

export default StructuredData;