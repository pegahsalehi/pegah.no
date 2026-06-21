import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Clapperboard,
  type LucideIcon,
} from 'lucide-react';

type TechItem = {
  name: string;
  docs: string;
  icon?: string;
  Icon?: LucideIcon;
  imageClassName?: string;
  iconClassName?: string;
};

type TechGroup = {
  label: string;
  items: TechItem[];
};

const techGroups: TechGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', docs: 'https://docs.python.org/3/' },
      { name: 'SQL', icon: '/icons/SOL.png', docs: 'https://www.w3schools.com/sql/' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', docs: 'https://isocpp.org/std/the-standard' },
      { name: 'MATLAB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg', docs: 'https://www.mathworks.com/help/matlab/' },
      { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', docs: 'https://en.cppreference.com/w/c' },
      { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', docs: 'https://cran.r-project.org/manuals.html' },
    ],
  },
  {
    label: 'AI/ML & LLM Tools',
    items: [
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', docs: 'https://pytorch.org/docs/stable/index.html' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', docs: 'https://www.tensorflow.org/learn' },
      { name: 'Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg', docs: 'https://keras.io/' },
      { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', docs: 'https://scikit-learn.org/stable/user_guide.html' },
      { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E', docs: 'https://huggingface.co/docs' },
      { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/FFFFFF', docs: 'https://python.langchain.com/docs/' },
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', docs: 'https://numpy.org/doc/' },
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/FFFFFF', docs: 'https://pandas.pydata.org/docs/' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', docs: 'https://learn.microsoft.com/azure/' },
      { name: 'Azure AI Services', icon: '/icons/Azure_AI_Services.png', docs: 'https://learn.microsoft.com/azure/ai-services/' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', docs: 'https://docs.docker.com/' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', imageClassName: 'brightness-0 invert opacity-95', docs: 'https://docs.github.com/' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', docs: 'https://git-scm.com/doc' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', docs: 'https://www.kernel.org/doc/html/latest/' },
      { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/openapiinitiative/6BA539', docs: 'https://restfulapi.net/' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', docs: 'https://kubernetes.io/docs/' },
    ],
  },
  {
    label: 'Generative Vision & Avatars',
    items: [
      { name: 'NVIDIA Audio2Face', icon: 'https://cdn.simpleicons.org/nvidia/76B900', docs: 'https://docs.omniverse.nvidia.com/audio2face/latest/' },
      { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', docs: 'https://docs.opencv.org/' },
      { name: 'Unreal Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg', imageClassName: 'brightness-0 invert opacity-95', docs: 'https://docs.unrealengine.com/' },
      { name: 'MetaHuman', icon: '/icons/metahuman.svg', docs: 'https://dev.epicgames.com/documentation/en-us/metahuman/' },
      { name: 'Google Veo', Icon: Clapperboard, iconClassName: 'text-blue-300', docs: 'https://deepmind.google/models/veo/' },
      { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', imageClassName: 'brightness-0 invert opacity-95', docs: 'https://docs.unity3d.com/' },
      { name: 'Meta Quest', icon: 'https://cdn.simpleicons.org/meta/0081FB', docs: 'https://developer.oculus.com/documentation/' },
      { name: 'SALSA LipSync', icon: '/icons/SALSA.png', docs: 'https://crazyminnowstudio.com/docs/salsa-lip-sync/modules/overview/' },
    ],
  },
  {
    label: 'Product & Web Tools',
    items: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', docs: 'https://help.figma.com/' },
      { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', imageClassName: 'brightness-0 invert opacity-95', docs: 'https://wordpress.org/documentation/' },
      { name: 'Elementor', icon: 'https://cdn.simpleicons.org/elementor/92003B', docs: 'https://elementor.com/help/' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', docs: 'https://react.dev/' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', docs: 'https://nextjs.org/docs' },
      { name: 'BuddyBoss', icon: '/icons/buddyboss.svg', docs: 'https://www.buddyboss.com/resources/docs/' },
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', docs: 'https://developer.mozilla.org/docs/Web/HTML' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', docs: 'https://developer.mozilla.org/docs/Web/CSS' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
    },
  },
};

const Technologies = () => {
  const { t } = useLanguage();
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (techName: string) => {
    setImageErrors(prev => ({ ...prev, [techName]: true }));
  };

  return (
    <section id="technologies" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">
          {t.technologies.title}
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t.technologies.subtitle}
        </p>
      </motion.div>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-16 gap-x-12">
        {techGroups.map((group, groupIndex) => (
          <div key={group.label} className="flex flex-col items-center h-full">
            <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              {t.technologies.groupLabels[groupIndex]}
            </h3>
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {group.items.map((tech) => {
                const Icon = tech.Icon;

                return (
                  <motion.a
                    key={tech.name}
                    href={tech.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group no-underline"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.08,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div className="relative p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.08)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                      {Icon ? (
                        <motion.div
                          className={`w-10 h-10 flex items-center justify-center relative z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 ${tech.iconClassName ?? 'text-blue-300'}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          aria-hidden="true"
                        >
                          <Icon className="w-8 h-8" strokeWidth={1.8} />
                        </motion.div>
                      ) : tech.icon && !imageErrors[tech.name] ? (
                        <motion.img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className={`w-10 h-10 object-contain relative z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 ${tech.imageClassName ?? ''}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          onError={() => handleImageError(tech.name)}
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-500/40 rounded-lg bg-black/30 text-blue-400 font-bold text-lg z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                          {tech.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <motion.span 
                      className="mt-1 text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
