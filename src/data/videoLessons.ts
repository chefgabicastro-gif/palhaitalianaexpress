import aula01Thumb from '@/assets/thumbnails/aula-01.jpg';
import aula02Thumb from '@/assets/thumbnails/aula-02.jpg';
import aula03Thumb from '@/assets/thumbnails/aula-03.jpg';
import aula04Thumb from '@/assets/thumbnails/aula-04.jpg';
import aula05Thumb from '@/assets/thumbnails/aula-05.jpg';
import aula06Thumb from '@/assets/thumbnails/aula-06.jpg';
import aula07Thumb from '@/assets/thumbnails/aula-07.jpg';
import aula08Thumb from '@/assets/thumbnails/aula-08.jpg';
import aula09Thumb from '@/assets/thumbnails/aula-09.jpg';
import aula10Thumb from '@/assets/thumbnails/aula-10.jpg';
import aula11Thumb from '@/assets/thumbnails/aula-11.jpg';
import aula12Thumb from '@/assets/thumbnails/aula-12.jpg';
import aula13Thumb from '@/assets/thumbnails/aula-13.jpg';
import aula14Thumb from '@/assets/thumbnails/aula-14.jpg';
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
    id: 'aula-05',
    title: 'Palha Italiana - Ninho e Oreo - Igor Rocha',
    description: 'Aprenda a técnica do Igor Rocha para a clássica Palha de Ninho com Oreo!',
    youtubeId: 'dVJNe3UXKHo',
    thumbnail: aula05Thumb,
    duration: '12 min',
    xpReward: 75,
    order: 5
  },
  {
    id: 'aula-06',
    title: 'Palha Italiana de Ninho com Oreo da Propaganda',
    description: 'A receita que viralizou nas propagandas! Sucesso garantido!',
    youtubeId: 's-Wrc1DiTrc',
    thumbnail: aula06Thumb,
    duration: '10 min',
    xpReward: 75,
    order: 6
  },
  {
    id: 'aula-07',
    title: 'Da Receita à Renda com Palha Italiana',
    description: 'Transforme suas receitas em um negócio lucrativo!',
    youtubeId: 'xJ209cRsQbc',
    thumbnail: aula07Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 7
  },
  {
    id: 'aula-08',
    title: 'BomBom Ninho com Oreo',
    description: 'Aprenda a fazer o irresistível BomBom de Ninho com Oreo!',
    youtubeId: 'uR_ppRvKfkM',
    thumbnail: aula08Thumb,
    duration: '12 min',
    xpReward: 75,
    order: 8,
    materialUrl: '/materials/aula-08-material.pdf',
    materialName: 'Palha Italiana Gourmet'
  },
  {
    id: 'aula-09',
    title: 'Palha Italiana 3 Sabores - Churros, Morango e Limão',
    description: 'Três sabores incríveis em uma só aula! Diversifique suas vendas!',
    youtubeId: 'YqXn180VFH4',
    thumbnail: aula09Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 9,
    materialUrl: '/materials/aula-09-material.pdf',
    materialName: 'Receitas Virais - Chef Tommy'
  },
  {
    id: 'aula-10',
    title: 'Palha Italiana para o Mozão',
    description: 'Receita especial para presentear quem você ama! Perfeita para datas especiais!',
    youtubeId: 'jz42C0OEdtk',
    thumbnail: aula10Thumb,
    duration: '14 min',
    xpReward: 100,
    order: 10,
    materialUrl: '/materials/aula-10-material.pdf',
    materialName: 'A Arte da Palha Italiana - Chef Medeiros'
  },
  {
    id: 'aula-11',
    title: 'Palha Italiana Maracujá com Oreo',
    description: 'Uma combinação tropical irresistível! Maracujá e Oreo juntos!',
    youtubeId: '7rwE0ZzN4yU',
    thumbnail: aula11Thumb,
    duration: '14 min',
    xpReward: 100,
    order: 11,
    materialUrl: '/materials/aula-11-material.pdf',
    materialName: 'Red Fruit Palha - Case Study'
  },
  {
    id: 'aula-12',
    title: 'Palha Italiana Tradicional',
    description: 'A clássica receita que todo mundo ama! Aprenda o básico perfeito!',
    youtubeId: 'v7zAabrUc7U',
    thumbnail: aula12Thumb,
    duration: '12 min',
    xpReward: 75,
    order: 12,
    materialUrl: '/materials/aula-12-material.pdf',
    materialName: 'Palha Italiana Tradicional - Receita Completa'
  },
  {
    id: 'aula-13',
    title: 'Recheios de Sucesso',
    description: 'Domine os recheios que mais vendem e aumente seus lucros!',
    youtubeId: 'FBh5EdSBz9I',
    thumbnail: aula13Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 13,
    materialUrl: '/materials/aula-13-material.pdf',
    materialName: 'Recheios de Sucesso - Guia Completo'
  },
  {
    id: 'aula-14',
    title: 'Aula Bônus - Cozinha Caseira',
    description: 'Dicas práticas para montar sua produção em casa com sucesso!',
    youtubeId: '7DYsCigTino',
    thumbnail: aula14Thumb,
    duration: '20 min',
    xpReward: 125,
    order: 14,
    materialUrl: '/materials/aula-14-material.pdf',
    materialName: 'Cozinha Caseira - Guia Prático'
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
    order: 15
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
