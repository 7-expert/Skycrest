import Hero from '@/components/sections/Hero';
import AboutStrip from '@/components/sections/AboutStrip';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import { getPublishedProjects } from '@/lib/projects';

export const revalidate = 0; // Dynamic server component

export default async function Home() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Hero />
      <AboutStrip />
      <Services />
      <FeaturedProjects projects={projects || []} />
      <WhyChooseUs />
    </>
  );
}
