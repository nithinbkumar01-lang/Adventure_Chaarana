import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CommunityImage, Trek } from '../../shared/types/trek';

interface SiteData {
  treks: Trek[];
  communityImages: CommunityImage[];
  isLoading: boolean;
  error: string | null;
}

const SiteDataContext = createContext<SiteData | null>(null);

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [treks, setTreks] = useState<Trek[]>([]);
  const [communityImages, setCommunityImages] = useState<CommunityImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchJson<Trek[]>('/api/treks', controller.signal)
      .then(setTreks)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError(requestError instanceof Error ? requestError.message : 'Unable to load site content');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    // The gallery is below the fold and should never hold up the trek list.
    fetchJson<CommunityImage[]>('/api/community-images', controller.signal)
      .then(setCommunityImages)
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === 'AbortError')) {
          console.error('Unable to load community images', requestError);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <SiteDataContext.Provider value={{ treks, communityImages, isLoading, error }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used inside SiteDataProvider');
  }
  return context;
}
