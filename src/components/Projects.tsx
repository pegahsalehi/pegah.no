import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from './ProjectCard';
import GlowingEffectDemo from "./ui/glowing-effect-demo";
import { useLanguage } from '@/i18n/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const projectsData = t.projects.items as Project[];

  return (
    <section id="projects" className="section-container relative">
      <h2 className="section-title mb-8">{t.projects.title}</h2>
      
      <motion.div 
        className="text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-lg text-gray-300 leading-relaxed">
          {t.projects.intro}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="section-title mb-8">{t.projects.microTitle}</h3>
        <GlowingEffectDemo />
      </div>
    </section>
  );
};

export default Projects;
