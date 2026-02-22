import React from "react";
import projectsData from "../../../../public/json/projects.json";

const ProjectsStructuredData = () => {
  // Projects Collection Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Development Projects by Anugrah Surya Putra",
    description:
      "A collection of mobile development projects showcasing expertise in Flutter, Kotlin Multiplatform, and clean architecture",
    numberOfItems: projectsData.projects.length,
    itemListElement: projectsData.projects.map((project, index) => ({
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
          "@type": project.company.includes("Personal")
            ? "Person"
            : "Organization",
          name: project.company.includes("Personal")
            ? "Anugrah Surya Putra"
            : project.company,
        },
        isAccessibleForFree: true,
        offers: project.liveDemo
          ? {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "InStock",
            }
          : undefined,
      },
    })),
  };

  // Featured Projects Schema
  const featuredProjects = projectsData.projects.filter(
    (project) => project.isFeatured
  );
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
        about: project.techStacks.map((tech) => ({
          "@type": "Thing",
          name: tech,
        })),
      },
    })),
  };

  // Portfolio Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: "Anugrah Surya Putra - Mobile Development Portfolio",
    description:
      "Complete portfolio of mobile development projects showcasing Flutter, Kotlin Multiplatform, and cross-platform expertise",
    creator: {
      "@type": "Person",
      name: "Anugrah Surya Putra",
      jobTitle: "Mobile Engineer",
      url: "https://downormal.dev/",
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
    hasPart: projectsData.projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: project.github,
    })),
  };

  const schemas = [itemListSchema, featuredProjectsSchema, portfolioSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`projects-structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default ProjectsStructuredData;
