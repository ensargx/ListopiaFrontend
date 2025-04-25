import { PaginatedResponse } from '@/types/friends';
import { User } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FriendsList: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [friends, setFriends] = useState<User[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(30);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!uuid) return;

        const fetchFriends = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `/api/v1/user/${encodeURIComponent(uuid)}/friends` +
                    `?pageNumber=${pageNumber}&pageSize=${pageSize}`
                );
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                const data: PaginatedResponse<User> = await res.json();
                setFriends(data.content);
                setTotalPages(data.totalPages);
            } catch (err: any) {
                setError(err.message || 'Beklenmeyen bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [uuid, pageNumber, pageSize]);

    const handlePrev = () => setPageNumber((n) => Math.max(n - 1, 0));
    const handleNext = () => setPageNumber((n) => Math.min(n + 1, totalPages - 1));

    return (
        <div>
            <h2>Arkadaş Listesi</h2>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Yükleniyor…</div>}

            {!loading && !error && friends.length === 0 && (
                <div>Arkadaş bulunamadı.</div>
            )}

            {!loading && friends.length > 0 && (
                <>
                    <ul>
                        {friends.map((u) => (
                            <li key={u.uuid}>
                                {u.firstName} {u.lastName} (@{u.username})
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: 16 }}>
                        <button onClick={handlePrev} disabled={pageNumber === 0}>
                            Önceki
                        </button>
                        <span style={{ margin: '0 8px' }}>
              {pageNumber + 1} / {totalPages}
            </span>
                        <button onClick={handleNext} disabled={pageNumber + 1 >= totalPages}>
                            Sonraki
                        </button>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <label>
                            Sayfa boyutu:{' '}
                            <input
                                type="number"
                                value={pageSize}
                                min={1}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value) || 1);
                                    setPageNumber(0);
                                }}
                            />
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default FriendsList;