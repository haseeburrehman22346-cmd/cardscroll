export interface CardData {
    id: string;
    title: string;
    location: string;
    price: number;
    condition: string;
    image: string;
    loading: boolean;
    hasMore: boolean;
    visibleData: CardData[]
}
