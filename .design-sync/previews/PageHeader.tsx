import { MotionGlobalConfig, PageHeader } from "downormal-ui";

if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;

export function Projects() {
  return (
    <PageHeader
      title="Projects"
      intro="What I've built at work, on my own, and at university."
    />
  );
}

export function Experience() {
  return (
    <PageHeader
      title="Experience"
      intro="Where I've worked as a mobile engineer, newest first."
    />
  );
}
