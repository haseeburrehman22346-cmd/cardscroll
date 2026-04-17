import { useEffect, useRef, useCallback, useReducer } from 'react';
import { getCards } from '@/services/getdata';
import reducer, { initialState } from '@/reducer/reducer';
const useCard = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const loaderRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 21;
    const isFetching = useRef(false);
    const fetchNextBatch = useCallback(async (currentVisibleCount: number) => {
        if (state.loading || !state.hasMore || isFetching.current) return;
        isFetching.current = true;
        dispatch({ type: 'FETCH_START' });
        await new Promise(resolve => setTimeout(resolve, 800));
        try {
            const newData = await getCards(currentVisibleCount, itemsPerPage);
            dispatch({ type: 'FETCH_SUCCESS', payload: newData, limit: itemsPerPage });
        } catch {
            dispatch({ type: 'FETCH_ERROR' });
        } finally {
            isFetching.current = false;
        }
    }, [state.loading, state.hasMore]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !state.loading && state.hasMore) {
                    fetchNextBatch(state.visibleData.length);
                }
            },
            { threshold: 0.1 }
        );
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [state.loading, state.hasMore, fetchNextBatch, state.visibleData.length]);
    return {
        visibleData: state.visibleData,
        loading: state.loading,
        hasMore: state.hasMore,
        loaderRef
    };
};
export default useCard;