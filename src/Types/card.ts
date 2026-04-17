export interface CardData {
    id: string;
    title: string;
    location: string;
    price: number;
    condition: string;
    image: string;
}
export interface State {
    visibleData: CardData[];
    loading: boolean;
    hasMore: boolean;
}