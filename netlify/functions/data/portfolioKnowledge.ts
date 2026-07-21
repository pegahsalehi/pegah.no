export type PortfolioLanguage = 'en' | 'no';

export type PortfolioSection =
  | 'profile'
  | 'contact'
  | 'cv'
  | 'education'
  | 'experience'
  | 'skills'
  | 'project'
  | 'publication'
  | 'collaboration';

export type PortfolioChunk = {
  id: string;
  section: PortfolioSection;
  title: string;
  content: string;
  tags: string[];
  source: string;
};

export const portfolioKnowledge: PortfolioChunk[] = [
  {
    id: 'profile-overview',
    section: 'profile',
    title: 'Pegah Salehi profile',
    source: 'Profile',
    tags: ['pegah salehi', 'applied ai engineer', 'ai engineer', 'portfolio', 'oslo', 'norway'],
    content:
      'Pegah Salehi is an Applied AI Engineer / AI Engineer based in Oslo, Norway. Her portfolio focuses on applied AI systems, RAG pipelines, generative AI workflows, computer vision, medical image analysis, interactive avatars, and AI product implementation. Website: https://pegah.no.',
  },
  {
    id: 'contact-links',
    section: 'contact',
    title: 'Contact and profile links',
    source: 'Contact',
    tags: ['contact', 'email', 'github', 'linkedin', 'google scholar', 'oslo', 'collaboration'],
    content:
      'Pegah Salehi can be contacted by email at pghsalehi@gmail.com. Location: Oslo, Norway. GitHub: https://github.com/pegahsalehi. LinkedIn: https://www.linkedin.com/in/pghsalehi. Google Scholar: https://scholar.google.com/citations?user=0Y4lkuwAAAAJ. The portfolio invites collaborations, freelance work, and project inquiries.',
  },
  {
    id: 'cv-links',
    section: 'cv',
    title: 'CV and resume links',
    source: 'CV',
    tags: ['cv', 'resume', 'english cv', 'norwegian cv', 'download'],
    content:
      'Pegah Salehi has downloadable CV files on the portfolio. English CV: /cv/PegahResume_En.pdf. Norwegian CV: /cv/PegahResume_No.pdf. The contact section also links to both CV versions.',
  },
  {
    id: 'education-phd',
    section: 'education',
    title: 'Education',
    source: 'About / Education',
    tags: ['education', 'phd', 'uit', 'university of tromso', 'doctoral research'],
    content:
      'Education: PhD at University of Tromso / UiT The Arctic University of Norway. Doctoral research focused on applied AI, avatar-based training systems, generative visual models, and human-AI interaction. The portfolio links to Pegah Salehi\'s PhD thesis at /Pegah_PhD_Thesis.pdf.',
  },
  {
    id: 'experience-min-sone',
    section: 'experience',
    title: 'Applied AI Engineer at Min Sone AS',
    source: 'About / Timeline',
    tags: ['experience', 'min sone', 'applied ai engineer', 'rag chatbot', 'krifa', 'ago course', 'google veo'],
    content:
      'Work experience: Applied AI Engineer, Min Sone AS, Oslo, Aug 2025 - May 2026. Min Sone is an AI product company developing interactive training and digital learning solutions. Pegah built a RAG-based chatbot system for Krifa with document retrieval, LLM-powered response generation, and a user-facing chat interface. She contributed to Ago Course, a full-stack interactive training platform, with Python backend development and AI components in a Next.js/React product stack. She created AI-generated training videos with Google Veo and designed interactive course content for electrician training scenarios. She also configured a web-based community platform using WordPress, BuddyBoss, and Elementor.',
  },
  {
    id: 'experience-simulamet',
    section: 'experience',
    title: 'PhD Researcher at SimulaMet',
    source: 'About / Timeline',
    tags: ['experience', 'simulamet', 'phd researcher', 'avatar', 'vr', 'whisper', 'nerf', 'metahuman', 'audio2face'],
    content:
      'Work experience: PhD Researcher, Simula Metropolitan Center for Digital Engineering (SimulaMet), Oslo, Oct 2021 - Oct 2025. Pegah developed interactive AI-powered child avatar systems for investigative interview training by combining talking-head generation models, game-engine-based avatars, NLP, STT/TTS, and real-time interaction pipelines. She optimized NeRF-based talking-head generation with Whisper-based audio feature extraction to reduce processing time and improve low-latency avatar interaction. She built emotionally expressive avatar prototypes using Unreal Engine 5, MetaHuman, NVIDIA Omniverse Audio2Face, and Live Link. She designed and evaluated VR/avatar training prototypes using Unity 3D, Oculus Quest 2, SALSA LipSync Suite, ANOVA, mixed-effects models, and SEM.',
  },
  {
    id: 'experience-truviz',
    section: 'experience',
    title: 'AI Engineer freelance at Truviz Inc.',
    source: 'About / Timeline',
    tags: ['experience', 'truviz', 'freelance', 'ai engineer', 'talking avatar', 'gan', 'diffusion'],
    content:
      'Work experience: AI Engineer (Freelance), Truviz Inc., Remote, U.S., Sep 2024 - May 2025. Truviz is a startup developing conversational AI and avatar-based visual interaction systems. Pegah developed talking-avatar features for a conversational LLM application so generated text and audio responses could be presented through expressive AI-driven visual agents. She implemented, tested, and customized open-source GAN, diffusion, and talking-head generation models for avatar generation, facial animation, and visual response generation workflows.',
  },
  {
    id: 'core-skills',
    section: 'skills',
    title: 'Core skills and capabilities',
    source: 'Core Capabilities / Technologies',
    tags: ['skills', 'generative ai', 'computer vision', 'rag', 'llm', 'medical image analysis', 'deep learning', 'applied ai'],
    content:
      'Core skills include Generative AI for vision and avatars, Computer Vision, LLM and RAG applications, medical image analysis, deep learning, talking-head and avatar systems, human-AI training systems, and applied AI product engineering. Pegah works with Python, SQL, C++, MATLAB, C, R, PyTorch, TensorFlow, Keras, scikit-learn, Hugging Face, LangChain, NumPy, Pandas, Azure, Azure AI Services, Docker, GitHub, Git, Linux, REST APIs, Kubernetes, NVIDIA Audio2Face, OpenCV, Unreal Engine, MetaHuman, Google Veo, Unity, Meta Quest, SALSA LipSync, Figma, WordPress, Elementor, React, Next.js, BuddyBoss, HTML, and CSS.',
  },
  {
    id: 'project-pix2pix',
    section: 'project',
    title: 'Pix2Pix-based Stain-to-Stain Translation',
    source: 'Projects',
    tags: ['project', 'pix2pix', 'stain normalization', 'histopathology', 'medical image analysis', 'python', 'cgan'],
    content:
      'Project: Pix2Pix-based Stain-to-Stain Translation. A deep learning project for robust stain normalization in H&E histopathology images using conditional GANs and Pix2Pix image-to-image translation. It addressed stain variation caused by scanners and lab protocols, implemented a U-Net generator and PatchGAN discriminator, preserved tissue morphology, and achieved strong quantitative performance compared with traditional stain normalization methods. GitHub: https://github.com/pegahsalehi/Stain-to-Stain-Translation.',
  },
  {
    id: 'project-singan',
    section: 'project',
    title: 'SinGAN-Seg: Synthetic Training Data Generation',
    source: 'Projects',
    tags: ['project', 'singan', 'synthetic data', 'medical image segmentation', 'python'],
    content:
      'Project: SinGAN-Seg: Synthetic Training Data Generation. A synthetic data generation pipeline for medical image segmentation using SinGAN and single-image training. It addressed limited annotated healthcare data by generating medical images and segmentation masks from one training image. The synthetic data improved segmentation performance in low-data settings. GitHub: https://github.com/vlbthambawita/singan-seg-polyp.',
  },
  {
    id: 'project-whisper-afe',
    section: 'project',
    title: 'Whisper AFE for Real-Time Talking Portrait Synthesis',
    source: 'Projects',
    tags: ['project', 'whisper', 'audio feature extraction', 'talking portrait', 'nerf', 'real-time avatars'],
    content:
      'Project: Whisper AFE for Real-Time Talking Portrait Synthesis. A real-time talking portrait synthesis project using Whisper for faster audio feature extraction and more responsive AI avatar interactions. It integrated Whisper as an AFE module and evaluated it with RAD-NeRF and ER-NeRF against DeepSpeech, Wav2Vec, and HuBERT, reducing latency while preserving visual quality and improving lip-sync responsiveness. GitHub: https://github.com/pegahsalehi/Whisper-AFE-TalkingHeadsGen.',
  },
  {
    id: 'project-emotional-avatars',
    section: 'project',
    title: 'Emotionally Expressive Child Avatars',
    source: 'Projects',
    tags: ['project', 'avatar', 'metahuman', 'audio2face', 'unreal engine', 'hci', 'training'],
    content:
      'Project: Emotionally Expressive Child Avatars. A real-time emotionally expressive child avatar system using Unreal Engine MetaHuman and NVIDIA Audio2Face for training applications. The pipeline combined Unreal Engine 5 MetaHuman, NVIDIA Omniverse Audio2Face, TTS, LLM-based dialogue, and Live Link for real-time facial animation. A user study with 70 participants evaluated audiovisual alignment, facial morphology, voice consistency, emotion recognition, and perceived realism. GitHub: https://github.com/pegahsalehi/Emotionally_Expressive_Child_Avatars.',
  },
  {
    id: 'project-vr-training',
    section: 'project',
    title: '2D & 3D VR Training for Child Interview Skills',
    source: 'Projects',
    tags: ['project', 'vr', 'unity', 'gpt-3', 'child interview', 'training systems', 'user study'],
    content:
      'Project: 2D & 3D VR Training for Child Interview Skills. An AI-driven child interview training platform comparing 2D desktop and 3D VR environments for investigative interview skill development. The Unity-based system integrated a fine-tuned GPT-3 dialogue model, STT/TTS speech interaction, child avatars, and Oculus Quest VR. A mixed-method user study found that 3D VR improved immersion, flow, and virtual fidelity, while 2D was preferred for usability and comfort. Paper: https://ieeexplore.ieee.org/abstract/document/10634162.',
  },
  {
    id: 'project-rag-assistant',
    section: 'project',
    title: 'Advanced RAG Knowledge Assistant',
    source: 'Projects',
    tags: ['project', 'rag', 'azure openai', 'vector search', 'langchain', 'ai assistant', 'in progress'],
    content:
      'Project: Advanced RAG Knowledge Assistant. An in-progress private RAG-powered knowledge assistant for reliable document-based question answering with citations, semantic search, and LLM response generation. It is designed around document ingestion, chunking, embeddings, hybrid/vector search, semantic reranking, prompt engineering, and grounded LLM responses with source citations.',
  },
  {
    id: 'project-anar',
    section: 'project',
    title: 'Anar',
    source: 'Projects / Micro Projects',
    tags: ['project', 'micro project', 'anar', 'nutrition tracker', 'meal logging', 'calories', 'macros', 'next.js', 'typescript', 'tailwind css', 'supabase', 'postgresql', 'pwa'],
    content:
      'Micro project: Anar. A personal nutrition tracker for saving everyday meals, logging them quickly, and following calories and macros over time. Tech tags: Next.js, TypeScript, Tailwind CSS, Supabase, PostgreSQL, PWA. Live app: https://anar.pegah.no. GitHub: https://github.com/pegahsalehi/anar.',
  },
  {
    id: 'project-portfolio',
    section: 'project',
    title: 'AI Portfolio with RAG Chat',
    source: 'Projects / Micro Projects',
    tags: ['project', 'portfolio', 'rag chat', 'react', 'typescript', 'vite', 'tailwind css', 'node.js'],
    content:
      'Micro project: AI Portfolio with RAG Chat. A personal portfolio with a RAG chat assistant for exploring Pegah Salehi\'s projects, publications, experience, and skills through interactive AI conversation. Tech tags: React, TypeScript, Vite, Tailwind CSS, Node.js. GitHub: https://github.com/pegahsalehi/pegah.no.',
  },
  {
    id: 'project-min-sone-website',
    section: 'project',
    title: 'Min Sone Website',
    source: 'Projects / Micro Projects',
    tags: ['project', 'min sone', 'wordpress', 'elementor', 'website'],
    content:
      'Micro project: Min Sone Website. An AI-focused business website built to present digital services, product vision, and user-facing information through a clean modern web experience. Tech tags: WordPress and Elementor. Demo: https://minsone.com/.',
  },
  {
    id: 'publication-stats',
    section: 'publication',
    title: 'Publication and citation snapshot',
    source: 'Publications',
    tags: ['publications', 'citations', 'h-index', 'google scholar', 'research'],
    content:
      'The portfolio publication snapshot lists 20 publications, 780 citations, h-index 12, and i10-index 12. Google Scholar profile: https://scholar.google.com/citations?user=0Y4lkuwAAAAJ.',
  },
  {
    id: 'publication-vr-training',
    section: 'publication',
    title: 'A Theoretical and Empirical Analysis of 2D and 3D Virtual Environments in Training for Child Interview Skills',
    source: 'Publications',
    tags: ['publication', 'ieee access', 'vr', 'child interview', 'training', '2024'],
    content:
      'Publication: "A Theoretical and Empirical Analysis of 2D and 3D Virtual Environments in Training for Child Interview Skills" by P Salehi, SZ Hassan, GA Baugerud, M Powell, MS Johnson, D Johansen, and others. Venue: IEEE Access. Year: 2024. Description: a comparative analysis of virtual training environments for improving child interview skills. URL: https://ieeexplore.ieee.org/abstract/document/10634162.',
  },
  {
    id: 'publication-audio-features',
    section: 'publication',
    title: 'Comparative Analysis of Audio Feature Extraction for Real-Time Talking Portrait Synthesis',
    source: 'Publications',
    tags: ['publication', 'audio feature extraction', 'talking portrait', 'arxiv', '2024'],
    content:
      'Publication: "Comparative Analysis of Audio Feature Extraction for Real-Time Talking Portrait Synthesis" by P Salehi, SA Sheshkal, V Thambawita, S Gautam, SS Sabet, D Johansen, and others. Venue listed on the portfolio: arXiv preprint arXiv:2411.13209. Year: 2024. Description: a study of audio features for real-time talking portrait generation and synthesis quality. URL: https://www.mdpi.com/2504-2289/9/3/59.',
  },
  {
    id: 'publication-emotional-avatars',
    section: 'publication',
    title: 'Multimodal Integration Challenges in Emotionally Expressive Child Avatars for Training Applications',
    source: 'Publications',
    tags: ['publication', 'emotionally expressive avatars', 'nordic machine intelligence', '2025'],
    content:
      'Publication: "Multimodal Integration Challenges in Emotionally Expressive Child Avatars for Training Applications" by P Salehi, SA Sheshkal, V Thambawita, MA Riegler, and P Halvorsen. Venue: Nordic Machine Intelligence 5, 29-46. Year: 2025. Description: published 19 Nov 2025. URL: https://journals.uio.no/NMI/article/view/12537.',
  },
  {
    id: 'publication-singan',
    section: 'publication',
    title: 'SinGAN-Seg: Synthetic training data generation for medical image segmentation',
    source: 'Publications',
    tags: ['publication', 'singan-seg', 'medical image segmentation', 'plos one', '2022'],
    content:
      'Publication: "SinGAN-Seg: Synthetic training data generation for medical image segmentation" by V Thambawita, P Salehi, SA Sheshkal, SA Hicks, HL Hammer, S Parasa, and others. Venue: PLOS ONE 17 (5), e0267976. Year: 2022. Description: synthetic data generation for robust medical image segmentation workflows. URL: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0267976.',
  },
  {
    id: 'publication-talking-child-avatar',
    section: 'publication',
    title: 'Synthesizing a Talking Child Avatar to Train Interviewers Working with Maltreated Children',
    source: 'Publications',
    tags: ['publication', 'talking child avatar', 'interviewer training', 'big data and cognitive computing', '2022'],
    content:
      'Publication: "Synthesizing a Talking Child Avatar to Train Interviewers Working with Maltreated Children" by P Salehi, SZ Hassan, M Lammerse, SS Sabet, I Riiser, RK Roed, and others. Venue: Big Data and Cognitive Computing 6 (2), 62. Year: 2022. Description: a talking avatar system designed for interviewer training in sensitive child welfare contexts. URL: https://www.mdpi.com/2504-2289/6/2/62.',
  },
  {
    id: 'publication-pix2pix',
    section: 'publication',
    title: 'Pix2Pix-based Stain-to-Stain Translation: A Solution for Robust Stain Normalization in Histopathology Images Analysis',
    source: 'Publications',
    tags: ['publication', 'pix2pix', 'stain-to-stain translation', 'histopathology', 'mvip', '2020'],
    content:
      'Publication: "Pix2Pix-based Stain-to-Stain Translation: A Solution for Robust Stain Normalization in Histopathology Images Analysis" by P Salehi and C Abdolah. Venue: 2020 International Conference on Machine Vision and Image Processing (MVIP), 1-7. Year: 2020. Description: a cGAN-based approach to histopathology stain normalization for image analysis. URL: https://arxiv.org/abs/2002.00647.',
  },
  {
    id: 'collaboration',
    section: 'collaboration',
    title: 'Contact and collaboration',
    source: 'Contact',
    tags: ['collaboration', 'freelance', 'project', 'contact', 'email'],
    content:
      'Pegah Salehi is open to collaborations and interesting projects. The contact form includes collaboration, freelance, and project inquiry options. If a question needs details that are not available in the portfolio context, the assistant should suggest contacting Pegah at pghsalehi@gmail.com.',
  },
];
