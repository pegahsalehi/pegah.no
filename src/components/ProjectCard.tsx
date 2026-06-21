import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/i18n/LanguageContext';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  textOnlyTags?: string[];
  demoUrl?: string;
  paperUrl?: string;
  paperLabel?: string;
  privateLabel?: string;
  githubUrl?: string;
  status?: string;
  statusColor?: string;
  statusGlow?: string;
  caseStudy?: {
    problem?: string;
    solution?: string;
    result?: string;
  };
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useLanguage();
  const textOnlyTags = project.textOnlyTags ?? [];

  // small icon map for common tech tags (grayscale/minimized)
  const techIconMap: Record<string, string> = {
    React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    Stripe: 'https://seeklogo.com/images/S/stripe-logo-4C3A1E4C67-seeklogo.com.png'
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: index * 0.1
        }
      }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full group relative"
    >
      {/* Gradient shadow effect */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-500/60 via-sky-500/60 to-gray-500/60 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10 scale-110 group-hover:scale-100"></div>
      
      <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col bg-gray-900/70 border-gray-800 rounded-xl relative project-card-hover card-shadow-effect main-project-card">
        {/* Shine effect */}
        <div className="main-project-card__shine"></div>
        {/* Glow effect */}
        <div className="main-project-card__glow"></div>
        
        <div className="overflow-hidden h-48 relative main-project-card__image">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        
        {/* Status badge */}
        {project.statusGlow === 'in-progress' && (
          <div className="main-project-card__badge">{t.projects.card.inProgress}</div>
        )}
        
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2 main-project-card__title">
              {project.title}
              {project.statusGlow === 'in-progress' && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </CardTitle>
          </div>
          {/* tech logos (subtle grayscale) */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2">
              {project.tags.slice(0, 6).map((tag, i) => (
                techIconMap[tag] && !textOnlyTags.includes(tag) ? (
                  <img
                    key={i}
                    src={techIconMap[tag]}
                    alt={tag}
                    loading="lazy"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain opacity-70 grayscale"
                    aria-hidden="true"
                  />
                ) : (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-800/50 text-blue-300 border-blue-500/20">
                    {tag}
                  </Badge>
                )
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <CardDescription 
            className="text-sm text-gray-400 main-project-card__description"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {/* Case study: Problem / Solution / Result */}
          {project.caseStudy && (
            <div className="mt-4 text-sm text-gray-300 space-y-3">
              {project.caseStudy.problem && (
                  <div>
                  <div className="text-xs text-blue-400 font-semibold">{t.projects.card.problem}</div>
                  <div className="text-muted-foreground">{project.caseStudy.problem}</div>
                </div>
              )}
              {project.caseStudy.solution && (
                <div>
                  <div className="text-xs text-blue-400 font-semibold">{t.projects.card.solution}</div>
                  <div className="text-muted-foreground">{project.caseStudy.solution}</div>
                </div>
              )}
              {project.caseStudy.result && (
                <div>
                  <div className="text-xs text-blue-400 font-semibold">{t.projects.card.result}</div>
                  <div className="text-muted-foreground">{project.caseStudy.result}</div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between gap-4 pt-2">
          {project.status && !project.demoUrl && (
            <Button disabled className="w-full px-8 py-2 rounded-full main-project-card__button cursor-default border border-emerald-200/30 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 text-white shadow-[0_0_22px_rgba(16,185,129,0.32)] disabled:opacity-100">
              {project.status}
            </Button>
          )}

          {project.demoUrl && (
            <Button asChild className={`w-full px-8 py-2 rounded-full main-project-card__button ${
              project.status 
                ? project.statusColor || '' 
                : 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200'
            }`}>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                {project.status ? project.status : t.projects.card.liveDemo}
              </a>
            </Button>
          )}

          {project.paperUrl && (
            <Button asChild className="w-full px-8 py-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-2 focus:ring-gray-400 hover:shadow-xl transition duration-200 main-project-card__button">
              <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                {project.paperLabel || 'Read Paper'}
              </a>
            </Button>
          )}
          
          {project.githubUrl && (
            <Button asChild className="w-full px-8 py-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-2 focus:ring-gray-400 hover:shadow-xl transition duration-200 main-project-card__button">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                {t.projects.card.github}
              </a>
            </Button>
          )}

          {project.privateLabel && (
            <Button disabled className="w-full px-8 py-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 text-white/80 focus:ring-2 focus:ring-gray-400 main-project-card__button cursor-default opacity-80">
              {project.privateLabel}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
