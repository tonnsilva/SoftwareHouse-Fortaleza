import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Play, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const courses = [
  {
    id: 1,
    title: 'Desenvolvimento Web Fullstack',
    progress: 65,
    instructor: 'Lucas Silva',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
    lessons: 24,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    progress: 30,
    instructor: 'Ana Costa',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=400',
    lessons: 18,
  },
];

export function MeusCursos() {
  return (
    <Layout title="Meus Cursos">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-white text-xs font-medium bg-emerald-600 px-2 py-1 rounded">
                  <Play size={12} fill="currentColor" />
                  Continuar assistindo
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-zinc-500 text-sm mb-4">Instrutor: {course.instructor}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Progresso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                  <BookOpen size={14} />
                  {course.lessons} aulas
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                  <Clock size={14} />
                  12h total
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
