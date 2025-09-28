"use client";

import { useEffect } from "react";

interface Project {
  title: string;
  description: string;
  techStacks: string[];
  liveDemo: string;
  github: string;
  isLive: boolean;
  isNDA: boolean;
  isFeatured: boolean;
  image: string;
  company: string;
  period: string;
  location: string;
}

interface ProjectsData {
  projects: Project[];
}

const ProjectsStructuredData = () => {
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch("/json/projects.json");
        const data: ProjectsData = await response.json();

        // Projects Collection Schema
        const itemListSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Mobile Development Projects by Anugrah Surya Putra",
          description: "A collection of mobile development projects showcasing expertise in Flutter, Kotlin Multiplatform, and clean architecture",
          numberOfItems: data.projects.length,
          itemListElement: data.projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.description,
              applicationCategory: "MobileApplication",
              operatingSystem: project.techStacks.includes("Flutter") 
                ? "Android, iOS" 
                : project.techStacks.includes("Android") 
                ? "Android" 
                : "Cross-platform",
              programmingLanguage: project.techStacks,
              author: {
                "@type": "Person",
                name: "Anugrah Surya Putra",
                jobTitle: "Mobile Engineer",
              },
              url: project.github,
              downloadUrl: project.liveDemo || project.github,
              image: project.image,
              dateCreated: project.period,
              publisher: {
                "@type": project.company.includes("Personal") ? "Person" : "Organization",
                name: project.company.includes("Personal") ? "Anugrah Surya Putra" : project.company,
              },
              isAccessibleForFree: true,
              offers: project.liveDemo ? {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "InStock",
              } : undefined,
            }
          })),
        };

        // Featured Projects Schema
        const featuredProjects = data.projects.filter(project => project.isFeatured);
        const featuredProjectsSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured Mobile Development Projects",
          description: "Top mobile development projects by Anugrah Surya Putra",
          numberOfItems: featuredProjects.length,
          itemListElement: featuredProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              creator: {
                "@type": "Person",
                name: "Anugrah Surya Putra",
              },
              url: project.github,
              image: project.image,
              dateCreated: project.period,
              keywords: project.techStacks.join(", "),
              about: project.techStacks.map(tech => ({
                "@type": "Thing",
                name: tech,
              })),
            }
          })),
        };

        // Portfolio Schema
        const portfolioSchema = {
          "@context": "https://schema.org",
          "@type": "Collection",
          name: "Anugrah Surya Putra - Mobile Development Portfolio",
          description: "Complete portfolio of mobile development projects showcasing Flutter, Kotlin Multiplatform, and cross-platform expertise",
          creator: {
            "@type": "Person",
            name: "Anugrah Surya Putra",
            jobTitle: "Mobile Engineer",
            url: "https://itsyourboyputra.vercel.app/",
          },
          about: [
            {
              "@type": "Thing",
              name: "Mobile Development",
            },
            {
              "@type": "Thing", 
              name: "Flutter",
            },
            {
              "@type": "Thing",
              name: "Kotlin Multiplatform",
            },
            {
              "@type": "Thing",
              name: "Cross-platform Development",
            },
          ],
          hasPart: data.projects.map(project => ({
            "@type": "CreativeWork",
            name: project.title,
            url: project.github,
          })),
        };

        // Add schemas to page
        const schemas = [itemListSchema, featuredProjectsSchema, portfolioSchema];
        
        schemas.forEach((schema, index) => {
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.id = `projects-structured-data-${index}`;
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        });

        return () => {
          // Cleanup function to remove schemas when component unmounts
          schemas.forEach((_, index) => {
            const existingScript = document.getElementById(`projects-structured-data-${index}`);
            if (existingScript) {
              existingScript.remove();
            }
          });
        };
      } catch (error) {
        console.error("Error fetching projects data for structured data:", error);
      }
    };

    fetchProjectsData();
  }, []);

  return null; // This component doesn't render anything visible
};

export default ProjectsStructuredData;