import create from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { useEffect, useState } from 'react';

const zustandStorage = {
  getItem: async (name) => {
    console.log(name, 'has been retrieved');
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    console.log(name, 'with value', value, 'has been saved');
    await set(name, value);
  },
  removeItem: async (name) => {
    console.log(name, 'has been deleted');
    await del(name);
  },
};

export const usePersistAppContextStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addFish: () => set({ fishes: get().fishes + 1 }),
      clearFish: () => set({ fishes: 0 }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'app-storage',
      getStorage: () => zustandStorage,
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      }
    },
  ),
);

// useHydration hook from zustand docs https://github.com/pmndrs/zustand/blob/main/docs/persisting-store-data.md#how-can-i-check-if-my-store-has-been-hydrated
export const useHydration = () => {
  const [hydrated, setHydrated] = useState(usePersistAppContextStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = usePersistAppContextStore.persist.onHydrate(() => setHydrated(false));
    const unsubFinishHydration = usePersistAppContextStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(usePersistAppContextStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  console.log(hydrated)

  return hydrated;
};
