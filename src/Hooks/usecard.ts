import { CardData } from '@/Types/card';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getCards } from '@/services/getdata';
const useCard = () => {
    const [allData, setAllData] = useState<CardData[]>([]);
    const [visibleData, setVisibleData] = useState<CardData[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 20;
    const loadMore = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const nextBatchStart = page * itemsPerPage;
            const nextBatchEnd = (page + 1) * itemsPerPage;
            const nextBatch = allData.slice(nextBatchStart, nextBatchEnd);
            setVisibleData(prev => [...prev, ...nextBatch]);
            setPage(prev => prev + 1);
            setHasMore(allData.length > nextBatchEnd);
            setLoading(false);
        }, 800);
    }, [page, allData]);
    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            const data = await getCards();
            setAllData(data);
            setVisibleData(data.slice(0, itemsPerPage));
            setHasMore(data.length > itemsPerPage);
            setLoading(false);
        };
        fetchCards();
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [loading, hasMore, loadMore]);
    return { visibleData, loading, hasMore, loaderRef };
};
export default useCard;