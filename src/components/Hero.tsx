"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

import React from "react";

interface ResumeData {
  name: string;
  summary: string;
}

const Hero = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/json/AnugrahSuryaPutra_resume.json');
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, []);

  const downloadResume = () => {
    // Google Drive direct download URL
    const resumeUrl = "https://drive.google.com/uc?export=download&id=1dA3wkubRBOUketeYCpP8PP8_XV0eohLv";
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "AnugrahSuryaPutra_MobileDeveloper_Resume.pdf";
    link.target = "_blank";
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!resumeData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded mb-2"></div>
            <div className="h-6 bg-muted rounded mb-8"></div>
            <div className="h-10 bg-muted rounded mb-4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Name and Role */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground">
              {resumeData.name}
            </h1>
            <h2 className="text-xl sm:text-2xl text-foreground/70 font-medium">
              Mobile Engineer
            </h2>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {resumeData.summary}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get In Touch
              <svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={downloadResume}
              className="group"
            >
              <svg 
                className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
