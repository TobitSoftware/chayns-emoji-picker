import create from 'zustand';

type State = {
    currentIndex: number;
    update: (newCategory: number) => void;
};

export const useCategoryTracker = create<State>((set) => ({
    currentIndex: 0,
    update: (newCategory) => set({ currentIndex: newCategory }),
}));
