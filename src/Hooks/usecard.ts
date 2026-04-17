import { CardData } from '@/Types/card';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getCards } from '@/services/getdata';
const useCard = () => {
    const [visibleData, setVisibleData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 21;
    const fetchNextBatch = useCallback(async (currentVisibleCount: number) => {
        if (loading || !hasMore) return;
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const newData = await getCards(currentVisibleCount, itemsPerPage);
        if (newData.length > 0) {
            setVisibleData(prev => [...prev, ...newData]);
            if (newData.length < itemsPerPage) {
                setHasMore(false);
            }
        } else {
            setHasMore(false);
        }
        setLoading(false);
    }, [loading, hasMore]);
    useEffect(() => {
        const initialFetch = async () => {
            setLoading(true);
            const data = await getCards(0, itemsPerPage);
            setVisibleData(data);
            if (data.length < itemsPerPage) {
                setHasMore(false);
            }
            setLoading(false);
        };
        initialFetch();
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    fetchNextBatch(visibleData.length);
                }
            },
            { threshold: 0.1 }
        );
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [loading, hasMore, fetchNextBatch, visibleData.length]);
    return { visibleData, loading, hasMore, loaderRef };
};
export default useCard;