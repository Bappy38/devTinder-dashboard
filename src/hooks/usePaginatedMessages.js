import { useState, useCallback, useEffect } from 'react';
import { ENDPOINTS } from '../constants/endpoints';
import { MESSAGE_BATCH_SIZE } from '../constants/constants';
import { NOTIFICATION_TYPE } from '../constants/notificationType';
import devTinderAPI from '../interceptors/errorHandlingInterceptor';

const usePaginatedMessages = (connectionId, scrollContainerRef) => {
    const [persistedMessages, setPersistedMessages] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMessages = useCallback(async (initial = false) => {
        if (loading || (!hasMore && !initial)) return;
        setLoading(true);
        try {
            const response = await devTinderAPI.get(ENDPOINTS.GET_MESSAGES(connectionId, MESSAGE_BATCH_SIZE, cursor), {
                withCredentials: true
            });
            const { messages, nextCursor } = response.data.data;
            if (initial) {
                setPersistedMessages(messages);
            } else {
                setPersistedMessages((prev) => [...messages, ...prev]);
            }
            setCursor(nextCursor);
            setHasMore(!!nextCursor);
        } catch (err) {
            console.error('Error fetching messages:', err);
            window.showNotification(crypto.randomUUID(), err.response.data.error, NOTIFICATION_TYPE.ERROR);
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
