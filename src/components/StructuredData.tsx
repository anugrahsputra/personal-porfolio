"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
        const { data, error } = await supabase
          .from("resumes")
          .select(
            `
            *,
            experience:experiences (*),
            projects (*),
            skills (*)
          `
          )
          .single();

        if (error) {
          throw error;
        }

        const transformedData = {
          ...data,
          skills: data.skills[0],
        } as ResumeData;

        // Person Schema
        const personSchema = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: transformedData.name,
          jobTitle: "Mobile Engineer",
          description: transformedData.summary,
          url: "https://itsyourboiputra.is-a.dev/",
          email: transformedData.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: transformedData.location,
            addressCountry: "Indonesia",
          },
          sameAs: [transformedData.linkedin],
          knowsAbout: transformedData.skills.technologies,
          alumniOf: {
            "@type": "EducationalOrganization",
            name: transformedData.education.institution,
          },
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: transformedData.education.degree,
            credentialCategory: "degree",
            recognizedBy: {
              "@type": "Organization",
              name: transformedData.education.institution,
            },
          },
          worksFor: transformedData.experience.map((exp) => ({
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
            name: transformedData.name,
            jobTitle: "Mobile Engineer",
            description: transformedData.summary,
            url: "https://itsyourboiputra.is-a.dev/",
            email: transformedData.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: transformedData.location,
              addressCountry: "Indonesia",
            },
            sameAs: [transformedData.linkedin],
            knowsAbout: transformedData.skills.technologies,
          },
          url: "https://itsyourboiputra.is-a.dev/",
          name: `${transformedData.name} - Mobile Engineer Portfolio`,
          description: transformedData.summary,
        };

        // Website Schema
        const websiteSchema = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: `${transformedData.name} - Mobile Engineer Portfolio`,
          url: "https://itsyourboiputra.is-a.dev/",
          description: transformedData.summary,
          author: {
            "@type": "Person",
            name: transformedData.name,
          },
          inLanguage: "en-US",
          copyrightYear: "2024",
          copyrightHolder: {
            "@type": "Person",
            name: transformedData.name,
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
            name: transformedData.name,
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
            name: transformedData.name,
            jobTitle: "Mobile Engineer",
            address: {
              "@type": "PostalAddress",
              addressLocality: transformedData.location,
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