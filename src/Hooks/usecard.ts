import { CardData } from '@/Types/card';
import { useEffect, useRef, useCallback, useReducer } from 'react';
import { getCards } from '@/services/getdata';
type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: CardData[]; limit: number }
    | { type: 'FETCH_ERROR' };
const initialState: CardData = {
    visibleData: [],
    loading: true,
    hasMore: true,
    id: '',
    title: '',
    location: '',
    price: 0,
    condition: '',
    image: ''
};
function reducer(state: CardData, action: Action): CardData {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                visibleData: [...state.visibleData, ...action.payload],
                hasMore: action.payload.length === action.limit,
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false, hasMore: false };
        default:
            return state;
    }
}
const useCard = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const loaderRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 21;
    const fetchNextBatch = useCallback(async (currentVisibleCount: number) => {
        if (state.loading || !state.hasMore) return;
        dispatch({ type: 'FETCH_START' });
        await new Promise(resolve => setTimeout(resolve, 800));
        try {
            const newData = await getCards(currentVisibleCount, itemsPerPage);
            dispatch({ type: 'FETCH_SUCCESS', payload: newData, limit: itemsPerPage });
        } catch {
            dispatch({ type: 'FETCH_ERROR' });
        }
    }, [state.loading, state.hasMore]);
    useEffect(() => {
        const initialFetch = async () => {
            try {
                const data = await getCards(0, itemsPerPage);
                dispatch({ type: 'FETCH_SUCCESS', payload: data, limit: itemsPerPage });
            } catch {
                dispatch({ type: 'FETCH_ERROR' });
            }
        };
        initialFetch();
    }, []);
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