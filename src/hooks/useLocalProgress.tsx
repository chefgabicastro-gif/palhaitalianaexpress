import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "palha-progress";
const SALES_KEY = "palha-sales";

interface ProgressData {
  watchedLessons: string[];
  completedRecipes: string[];
  xp: number;
}

interface LocalSale {
  id: string;
  date: string;
  quantity: number;
  total: number;
  unit_price: number;
}

const getDefaultProgress = (): ProgressData => ({
  watchedLessons: [],
  completedRecipes: [],
  xp: 0,
});

export function useLocalProgress() {
  const [progress, setProgress] = useState<ProgressData>(getDefaultProgress);
  const [sales, setSales] = useState<LocalSale[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(JSON.parse(stored));
      const storedSales = localStorage.getItem(SALES_KEY);
      if (storedSales) setSales(JSON.parse(storedSales));
    } catch {}
  }, []);

  const save = useCallback((data: ProgressData) => {
    setProgress(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const markLessonWatched = useCallback(
    (lessonId: string, xpReward: number) => {
      setProgress((prev) => {
        if (prev.watchedLessons.includes(lessonId)) return prev;
        const updated = {
          ...prev,
          watchedLessons: [...prev.watchedLessons, lessonId],
          xp: prev.xp + xpReward,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const markRecipeCompleted = useCallback(
    (recipeId: string, xpReward: number) => {
      setProgress((prev) => {
        if (prev.completedRecipes.includes(recipeId)) return prev;
        const updated = {
          ...prev,
          completedRecipes: [...prev.completedRecipes, recipeId],
          xp: prev.xp + xpReward,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const isLessonWatched = useCallback(
    (lessonId: string) => progress.watchedLessons.includes(lessonId),
    [progress.watchedLessons]
  );

  const isRecipeCompleted = useCallback(
    (recipeId: string) => progress.completedRecipes.includes(recipeId),
    [progress.completedRecipes]
  );

  const addSale = useCallback(
    (sale: Omit<LocalSale, "id">) => {
      setSales((prev) => {
        const updated = [...prev, { ...sale, id: crypto.randomUUID() }];
        localStorage.setItem(SALES_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const getLevelFromXP = (xp: number) => {
    if (xp >= 5000) return "Mestre";
    if (xp >= 2500) return "Expert";
    if (xp >= 1000) return "Avançado";
    if (xp >= 500) return "Intermediário";
    return "Iniciante";
  };

  return {
    xp: progress.xp,
    level: getLevelFromXP(progress.xp),
    watchedLessons: progress.watchedLessons,
    completedRecipes: progress.completedRecipes,
    totalLessonsWatched: progress.watchedLessons.length,
    totalRecipesCompleted: progress.completedRecipes.length,
    markLessonWatched,
    markRecipeCompleted,
    isLessonWatched,
    isRecipeCompleted,
    sales,
    addSale,
  };
}
