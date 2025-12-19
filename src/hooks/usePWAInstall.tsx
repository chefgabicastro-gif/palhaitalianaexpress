import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isStandalone: boolean;
  browserName: string;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [state, setState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
    browserName: 'unknown'
  });

  useEffect(() => {
    // Detect device and browser
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edg/.test(userAgent);
    const isSamsung = /samsungbrowser/.test(userAgent);

    let browserName = 'unknown';
    if (isSamsung) browserName = 'Samsung Internet';
    else if (isEdge) browserName = 'Edge';
    else if (isChrome) browserName = 'Chrome';
    else if (isFirefox) browserName = 'Firefox';
    else if (isSafari) browserName = 'Safari';

    // Check if running in standalone mode (already installed)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    // Check localStorage for installation status
    const wasInstalled = localStorage.getItem('pwa-installed') === 'true';

    setState(prev => ({
      ...prev,
      isIOS,
      isAndroid,
      isStandalone,
      isInstalled: isStandalone || wasInstalled,
      browserName,
      // iOS Safari doesn't support beforeinstallprompt but can still install
      isInstallable: isIOS ? !isStandalone : false
    }));

    // Listen for the beforeinstallprompt event (Chrome, Edge, Samsung, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setState(prev => ({ ...prev, isInstallable: true }));
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      localStorage.setItem('pwa-installed', 'true');
      setState(prev => ({ 
        ...prev, 
        isInstalled: true, 
        isInstallable: false 
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true');
        setState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
        setDeferredPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error prompting install:', error);
      return false;
    }
  }, [deferredPrompt]);

  const getInstallInstructions = useCallback(() => {
    if (state.isIOS) {
      return {
        title: 'Instalar no iPhone/iPad',
        steps: [
          'Toque no botão de compartilhar (ícone de quadrado com seta para cima)',
          'Role para baixo e toque em "Adicionar à Tela de Início"',
          'Toque em "Adicionar" no canto superior direito'
        ],
        icon: 'share'
      };
    }

    if (state.isAndroid) {
      if (state.browserName === 'Chrome') {
        return {
          title: 'Instalar no Android (Chrome)',
          steps: [
            'Toque no menu (três pontos no canto superior direito)',
            'Toque em "Adicionar à tela inicial" ou "Instalar app"',
            'Confirme tocando em "Adicionar"'
          ],
          icon: 'menu'
        };
      }
      if (state.browserName === 'Samsung Internet') {
        return {
          title: 'Instalar no Android (Samsung)',
          steps: [
            'Toque no menu (três linhas)',
            'Toque em "Adicionar página a"',
            'Selecione "Tela inicial"'
          ],
          icon: 'menu'
        };
      }
      if (state.browserName === 'Firefox') {
        return {
          title: 'Instalar no Android (Firefox)',
          steps: [
            'Toque no menu (três pontos)',
            'Toque em "Instalar"',
            'Confirme a instalação'
          ],
          icon: 'menu'
        };
      }
    }

    return {
      title: 'Instalar o App',
      steps: [
        'Abra o menu do seu navegador',
        'Procure por "Instalar" ou "Adicionar à tela inicial"',
        'Confirme a instalação'
      ],
      icon: 'menu'
    };
  }, [state.isIOS, state.isAndroid, state.browserName]);

  return {
    ...state,
    promptInstall,
    canPromptInstall: !!deferredPrompt,
    getInstallInstructions
  };
}
