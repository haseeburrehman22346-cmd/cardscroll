import { CardData } from '@/Types/card';
import { State } from '@/Types/card';
export type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: CardData[]; limit: number }
    | { type: 'FETCH_ERROR' };
export const initialState: State = {
    visibleData: [],
    loading: false,
    hasMore: true,
};
export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                visibleData: [...state.visibleData, ...action.payload.filter(
                    newItem => !state.visibleData.some(existingItem => existingItem.id === newItem.id)
                )],
                hasMore: action.payload.length === action.limit,
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false, hasMore: false };
        default:
            return state;
    }
}
export default reducer;