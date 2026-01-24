import aula01Thumb from '@/assets/thumbnails/aula-01.jpg';
import aula02Thumb from '@/assets/thumbnails/aula-02.jpg';
import aula03Thumb from '@/assets/thumbnails/aula-03.jpg';
import aula04Thumb from '@/assets/thumbnails/aula-04.jpg';
import aula05Thumb from '@/assets/thumbnails/aula-05.jpg';
import aula06Thumb from '@/assets/thumbnails/aula-06.jpg';
import aula07Thumb from '@/assets/thumbnails/aula-07.jpg';
import aula08Thumb from '@/assets/thumbnails/aula-08.jpg';
import aula09Thumb from '@/assets/thumbnails/aula-09.jpg';
import aulaBonus01Thumb from '@/assets/thumbnails/aula-bonus-01.jpg';
import aulaBonus02Thumb from '@/assets/thumbnails/aula-bonus-02.jpg';

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  xpReward: number;
  isBonus?: boolean;
  order: number;
}

export const videoLessons: VideoLesson[] = [
  {
    id: 'aula-01',
    title: 'Comece a Faturar Agora com Essa Palha Italiana!',
    description: 'Deliciosa e prática! 1 base, 3 finalizações!',
    youtubeId: 'gx-FSY9qWQc',
    thumbnail: aula01Thumb,
    duration: '15 min',
    xpReward: 75,
    order: 1
  },
  {
    id: 'aula-02',
    title: 'Palha Italiana de Ninho com Oreo',
    description: 'A melhor Palha do Mundo! Barata e rápida! Faça e Venda MUITO!',
    youtubeId: 'eObNXK6W6SY',
    thumbnail: aula02Thumb,
    duration: '12 min',
    xpReward: 75,
    order: 2
  },
  {
    id: 'aula-03',
    title: 'Três Sabores de Palha Italiana',
    description: 'Faça hoje mesmo! Deliciosas e super lucrativas!',
    youtubeId: 'vQR6lYc0LaA',
    thumbnail: aula03Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 3
  },
  {
    id: 'aula-04',
    title: 'Palha Italiana Crocantella',
    description: 'Com Oreo e Nutella! Incrível, cremosa e crocante!',
    youtubeId: '64vy-I0Wgj8',
    thumbnail: aula04Thumb,
    duration: '14 min',
    xpReward: 75,
    order: 4
  },
  {
    id: 'aula-05',
    title: 'Palha Italiana Tradicional e Branca',
    description: 'Deliciosas receitas com preparo simples!',
    youtubeId: 'BzsKP4rEXSA',
    thumbnail: aula05Thumb,
    duration: '16 min',
    xpReward: 75,
    order: 5
  },
  {
    id: 'aula-06',
    title: 'Palha Italiana Recheada',
    description: 'De Prestígio e Amendoim! A melhor que eu já fiz! Cremosa e deliciosa!',
    youtubeId: 'XHPp4SWBldk',
    thumbnail: aula06Thumb,
    duration: '20 min',
    xpReward: 100,
    order: 6
  },
  {
    id: 'aula-07',
    title: 'Palha Italiana - Ninho e Oreo',
    description: 'Receita especial do Igor Rocha! Cremosa e irresistível!',
    youtubeId: 'dVJNe3UXKHo',
    thumbnail: aula07Thumb,
    duration: '15 min',
    xpReward: 75,
    order: 7
  },
  {
    id: 'aula-08',
    title: 'Palha Italiana de Ninho com Oreo da Propaganda',
    description: 'A famosa receita que viralizou! Aprenda o segredo!',
    youtubeId: 's-Wrc1DiTrc',
    thumbnail: aula08Thumb,
    duration: '18 min',
    xpReward: 100,
    order: 8
  },
  {
    id: 'aula-09',
    title: 'Da Receitas a Renda com Palha Italiana',
    description: 'Transforme suas receitas em um negócio lucrativo!',
    youtubeId: 'xJ209cRsQbc',
    thumbnail: aula09Thumb,
    duration: '25 min',
    xpReward: 150,
    order: 9
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
