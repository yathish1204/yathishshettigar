import { getProfile } from '@/services/profile';
import { getPublishedProjects } from '@/services/projects';
import { getExperiences } from '@/services/experience';
import { getSkills } from '@/services/skills';
import { getCertifications } from '@/services/certifications';
import { getEducation } from '@/services/education';
import { getHobbies } from '@/services/hobbies';
import { HeroSection } from '@/sections/HeroSection';
import { SelectedWorkSection } from '@/sections/SelectedWorkSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { CertificationsSection } from '@/sections/CertificationsSection';
import { HobbiesSection } from '@/sections/HobbiesSection';
import { ContactSection } from '@/sections/ContactSection';

export const revalidate = 60; // Revalidate static data every 60 seconds

export default async function HomePage() {
  const profile = await getProfile();
  const projects = await getPublishedProjects();
  const experiences = await getExperiences();
  const skills = await getSkills();
  const certifications = await getCertifications();
  const education = await getEducation();
  const hobbies = await getHobbies();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} education={education} />
      <SkillsSection skills={skills} />
      <SelectedWorkSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <HobbiesSection hobbies={hobbies} />
      <ContactSection profile={profile} />
    </>
  );
}