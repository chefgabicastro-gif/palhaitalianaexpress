import { useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

type NotificationType = 'success' | 'info' | 'warning' | 'content';

interface CreateNotificationParams {
  title: string;
  message: string;
  type?: NotificationType;
}

export function useNotifications() {
  const { user } = useAuth();

  const createNotification = useCallback(async ({
    title,
    message,
    type = 'info'
  }: CreateNotificationParams) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: user.id,
        title,
        message,
        type,
        read: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data;
  }, [user]);

  const notifyAppInstalled = useCallback(() => {
    return createNotification({
      title: '🎉 App Instalado!',
      message: 'Agora você pode acessar suas receitas e vendas diretamente da tela inicial.',
      type: 'success'
    });
  }, [createNotification]);

  const notifyNewContent = useCallback((contentTitle: string) => {
    return createNotification({
      title: '✨ Novo Conteúdo!',
      message: `${contentTitle} está disponível para você!`,
      type: 'content'
    });
  }, [createNotification]);

  const notifyNewLesson = useCallback((lessonTitle: string, moduleName: string) => {
    return createNotification({
      title: '📚 Nova Aula Disponível!',
      message: `"${lessonTitle}" foi adicionada ao módulo ${moduleName}.`,
      type: 'content'
    });
  }, [createNotification]);

  const notifyNewRecipe = useCallback((recipeName: string) => {
    return createNotification({
      title: '🍫 Nova Receita!',
      message: `A receita "${recipeName}" foi adicionada. Confira agora!`,
      type: 'content'
    });
  }, [createNotification]);

  const notifyAchievement = useCallback((achievementName: string, xpReward: number) => {
    return createNotification({
      title: '🏆 Conquista Desbloqueada!',
      message: `Você conquistou "${achievementName}" e ganhou ${xpReward} XP!`,
      type: 'success'
    });
  }, [createNotification]);

  return {
    createNotification,
    notifyAppInstalled,
    notifyNewContent,
    notifyNewLesson,
    notifyNewRecipe,
    notifyAchievement
  };
}
