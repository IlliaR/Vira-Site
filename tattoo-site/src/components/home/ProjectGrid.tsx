import MotionWrapper from '@/components/ui/MotionWrapper';
import ProjectCard from './ProjectCard';
import type { ProjectCase } from '@/types';

interface ProjectGridProps {
  projects: ProjectCase[];
  locale: string;
  heading: string;
}

export default function ProjectGrid({ projects, locale, heading }: ProjectGridProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <MotionWrapper>
          <h2 className="font-display italic text-4xl md:text-5xl text-black mb-12 md:mb-16">{heading}</h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
          {projects.map((project, i) => (
            <div key={project.id} className="bg-white">
              <ProjectCard
                title={locale === 'de' ? project.titleDe : project.titleEn}
                description={locale === 'de' ? project.descriptionDe : project.descriptionEn}
                heroImage={project.heroImage}
                linkTarget={project.linkTarget}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
