export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
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
    duration: '15 min',
    xpReward: 75,
    order: 1
  },
  {
    id: 'aula-02',
    title: 'Palha Italiana de Ninho com Oreo',
    description: 'A melhor Palha do Mundo! Barata e rápida! Faça e Venda MUITO!',
    youtubeId: 'eObNXK6W6SY',
    duration: '12 min',
    xpReward: 75,
    order: 2
  },
  {
    id: 'aula-03',
    title: 'Três Sabores de Palha Italiana',
    description: 'Faça hoje mesmo! Deliciosas e super lucrativas!',
    youtubeId: 'vQR6lYc0LaA',
    duration: '18 min',
    xpReward: 100,
    order: 3
  },
  {
    id: 'aula-04',
    title: 'Palha Italiana Crocantella',
    description: 'Com Oreo e Nutella! Incrível, cremosa e crocante!',
    youtubeId: '64vy-I0Wgj8',
    duration: '14 min',
    xpReward: 75,
    order: 4
  },
  {
    id: 'aula-05',
    title: 'Palha Italiana Tradicional e Branca',
    description: 'Deliciosas receitas com preparo simples!',
    youtubeId: 'BzsKP4rEXSA',
    duration: '16 min',
    xpReward: 75,
    order: 5
  },
  {
    id: 'aula-06',
    title: 'Palha Italiana Recheada',
    description: 'De Prestígio e Amendoim! A melhor que eu já fiz! Cremosa e deliciosa!',
    youtubeId: 'XHPp4SWBldk',
    duration: '20 min',
    xpReward: 100,
    order: 6
  },
  {
    id: 'aula-bonus-01',
    title: 'Sucesso de Vendas - Cones Recheados',
    description: 'Fácil de fazer, prático e muito lucrativo!',
    youtubeId: '64vy-I0Wgj8',
    duration: '15 min',
    xpReward: 125,
    isBonus: true,
    order: 7
  },
  {
    id: 'aula-bonus-02',
    title: 'Nove Sabores de Cones Diferentes',
    description: 'Super prático: apenas UM recheio! Super lucrativos!',
    youtubeId: '7IdT7aCyOX4',
    duration: '22 min',
    xpReward: 150,
    isBonus: true,
    order: 8
  }
];

export const getYoutubeThumbnail = (youtubeId: string, quality: 'default' | 'hq' | 'maxres' = 'maxres') => {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`;
};
