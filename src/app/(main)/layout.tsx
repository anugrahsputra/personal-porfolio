import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion";
import { getAllProjects } from "@/features/projects/api";
import { getVideos } from "@/features/videos/api";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Counts for the nav. Both fetches are cached and shared with the pages;
  // if one fails the nav just drops that count.
  const [projects, videos] = await Promise.allSettled([
    getAllProjects(),
    getVideos(),
  ]);
  const counts: Record<string, number | undefined> = {
    "/projects":
      projects.status === "fulfilled" ? projects.value.projects.length : undefined,
    "/#videos":
      videos.status === "fulfilled" ? videos.value.length || undefined : undefined,
  };

  return (
    <MotionProvider>
      <Navbar counts={counts} />
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <Footer />
    </MotionProvider>
  );
}
