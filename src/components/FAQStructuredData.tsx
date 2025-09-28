"use client";

import { useEffect } from "react";

const FAQStructuredData = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What technologies does Anugrah Surya Putra specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anugrah Surya Putra specializes in mobile development using Flutter, Kotlin Multiplatform, Android development, clean architecture, Firebase integration, REST API integration, and CI/CD pipeline development. He has 2+ years of professional experience in cross-platform mobile development."
          }
        },
        {
          "@type": "Question", 
          name: "Where is Anugrah Surya Putra currently working?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anugrah Surya Putra currently works as a Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) in South Jakarta, Indonesia. He maintains and enhances mobile applications including BRIK Hub and PaintPro Loyalty using Flutter."
          }
        },
        {
          "@type": "Question",
          name: "What kind of mobile projects has he worked on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "He has worked on diverse mobile projects including Cosmic App KIOSK Touchscreen for DPR RI, Quraani Quran Mobile App, Change Project Name CLI tool, and E-Market Mobile Applications. His projects showcase expertise in Flutter, Kotlin Multiplatform, Firebase, and clean architecture principles."
          }
        },
        {
          "@type": "Question",
          name: "Is Anugrah Surya Putra available for mobile development consulting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Anugrah Surya Putra provides mobile app development services specializing in Flutter and Kotlin Multiplatform applications. He offers services in clean architecture implementation, CI/CD pipeline setup, and mobile app maintenance for clients in Jakarta, Indonesia and beyond."
          }
        },
        {
          "@type": "Question",
          name: "What makes his mobile development approach unique?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "His approach focuses on clean architecture principles, maintainable code, performance optimization, and seamless user experiences. He specializes in cross-platform development using Flutter and Kotlin Multiplatform, allowing clients to reach both iOS and Android users with a single codebase."
          }
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-structured-data";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("faq-structured-data");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default FAQStructuredData;