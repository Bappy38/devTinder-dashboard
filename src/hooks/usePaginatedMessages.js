import { useState, useCallback, useEffect } from 'react';
import { ENDPOINTS } from '../constants/endpoints';
import axios from 'axios';

const usePaginatedMessages = (connectionId, scrollContainerRef) => {
    const [persistedMessages, setPersistedMessages] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMessages = useCallback(async (initial = false) => {
        if (loading || (!hasMore && !initial)) return;
        setLoading(true);
        try {
            const response = await axios.get(ENDPOINTS.GET_MESSAGES(connectionId, 5, cursor), {
                withCredentials: true
            });
            if (initial) {
                setPersistedMessages(response.data.messages);
            } else {
                setPersistedMessages((prev) => [...response.data.messages, ...prev]);
            }
            setCursor(response.data.nextCursor);
            setHasMore(!!response.data.nextCursor);
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    }, [connectionId, cursor, loading, hasMore]);

    useEffect(() => {
        fetchMessages(true);
        // eslint-disable-next-line
    }, [connectionId]);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            if (scrollContainerRef.current.scrollTop === 0 && hasMore && !loading) {
                fetchMessages();
            }
        };
        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [fetchMessages, hasMore, loading, scrollContainerRef]);

    return { persistedMessages, loading, hasMore };
};

export default usePaginatedMessages;
