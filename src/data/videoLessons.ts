import aula01Thumb from '@/assets/thumbnails/aula-01.jpg';
import aula02Thumb from '@/assets/thumbnails/aula-02.jpg';
import aula03Thumb from '@/assets/thumbnails/aula-03.jpg';
import aula04Thumb from '@/assets/thumbnails/aula-04.jpg';
import aulaBonus01Thumb from '@/assets/thumbnails/aula-bonus-01.jpg';
import aulaBonus02Thumb from '@/assets/thumbnails/aula-bonus-02.jpg';
import aulaMarketing01Thumb from '@/assets/thumbnails/aula-marketing-01.jpg';
import aulaMarketing02Thumb from '@/assets/thumbnails/aula-marketing-02.jpg';

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  xpReward: number;
  isBonus?: boolean;
  isMarketing?: boolean;
  author?: string;
  order: number;
  materialUrl?: string;
  materialName?: string;
}

export const videoLessons: VideoLesson[] = [
  {
    id: 'aula-01',
    title: 'Palha Italiana de Leite Ninho com Oreo',
    description: 'Aprenda a fazer a famosa Palha Italiana de Ninho com Oreo que vende muito!',
    youtubeId: 'Jei2xOwyO30',
    thumbnail: aula01Thumb,
    duration: '15 min',
    xpReward: 75,
    order: 1,
    materialUrl: '/materials/aula-01-material.pdf',
    materialName: 'Guia Completo - Palha Italiana Lucrativa'
  },
  {
    id: 'aula-02',
    title: 'Comece a Faturar Agora - 3 Bases em 1',
    description: 'Uma base, três finalizações diferentes! Comece a faturar hoje mesmo!',
    youtubeId: 'iYdH_yjYG4k',
    thumbnail: aula02Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 2,
    materialUrl: '/materials/aula-02-material.pdf',
    materialName: 'Apostila - 3 Bases em 1'
  },
  {
    id: 'aula-03',
    title: 'Palha Italiana Crocantella',
    description: 'Crocante por fora, cremosa por dentro! Uma receita irresistível!',
    youtubeId: '2YoqvSSkrI0',
    thumbnail: aula03Thumb,
    duration: '14 min',
    xpReward: 75,
    order: 3
  },
  {
    id: 'aula-04',
    title: 'Palha Italiana Bombom de Ninho com Oreo',
    description: 'Versão bombom da famosa Palha de Ninho! Perfeita para presentes!',
    youtubeId: 'kJQX1yQCj2U',
    thumbnail: aula04Thumb,
    duration: '16 min',
    xpReward: 100,
    order: 4,
    materialUrl: '/materials/aula-04-material.pdf',
    materialName: 'Masterclass - Bombom Ninho Oreo Lucrativo'
  },
  {
    id: 'aula-bonus-01',
    title: 'Sucesso de Vendas - Cones Recheados',
    description: 'Fácil de fazer, prático e muito lucrativo!',
    youtubeId: '64vy-I0Wgj8',
    thumbnail: aulaBonus01Thumb,
    duration: '15 min',
    xpReward: 125,
    isBonus: true,
    order: 10
  },
  {
    id: 'aula-bonus-02',
    title: 'Nove Sabores de Cones Diferentes',
    description: 'Super prático: apenas UM recheio! Super lucrativos!',
    youtubeId: '7IdT7aCyOX4',
    thumbnail: aulaBonus02Thumb,
    duration: '22 min',
    xpReward: 150,
    isBonus: true,
    order: 11
  },
  {
    id: 'aula-marketing-01',
    title: 'Como fazer uma tabela de preços poderosa no Canva',
    description: 'Aprenda a criar tabelas de preços profissionais que vendem!',
    youtubeId: '9R7SDFiMc2s',
    thumbnail: aulaMarketing01Thumb,
    duration: '15 min',
    xpReward: 100,
    isMarketing: true,
    author: 'Tarso Freire',
    order: 12
  },
  {
    id: 'aula-marketing-02',
    title: 'Como criar seu logotipo',
    description: 'Crie uma identidade visual profissional para seu negócio!',
    youtubeId: 'aJ9GiT_1JKs',
    thumbnail: aulaMarketing02Thumb,
    duration: '20 min',
    xpReward: 100,
    isMarketing: true,
    author: 'Tarso Freire',
    order: 13
  }
];

// Keep for backwards compatibility, but prefer using lesson.thumbnail
export const getYoutubeThumbnail = (youtubeId: string, quality: 'default' | 'hq' | 'maxres' = 'maxres') => {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`;
};
