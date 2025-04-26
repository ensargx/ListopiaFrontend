import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './style/ProfilePage.css';
import { User } from '@/types/user';
import {
    fetchUserByUsername,
    fetchFriendsByUUID,
    addFriend,
    removeFriend,
} from '@/api/userapi';
import { useAuth } from '../auth/hooks/AuthContext';
import { CardSlider } from '../home/components/CardSlider';

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const auth = useAuth();
    const userMe = auth.user;
    const navigate = useNavigate();

    document.title = username ? `${username} - Listopia` : 'Listopia';

    useEffect(() => {
        if (!username) {
            navigate('/');
            return;
        }
        const loadProfile = async () => {
            try {
                setLoading(true);
                const profileUser = await fetchUserByUsername(username);
                setUser(profileUser);
                const friendsRes = await fetchFriendsByUUID(profileUser.uuid, 0, 30);
                setFriends(friendsRes.content);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [username, navigate]);

    const handleAddFriend = async () => {
        if (!user || !userMe) return;
        try {
            const res = await addFriend(user.uuid);
            if (res.success) {
                const updated = await fetchFriendsByUUID(user.uuid, 0, 30);
                setFriends(updated.content);
            } else {
                alert(res.message || 'Arkadaş eklenemedi');
            }
        } catch (err: any) {
            alert(err.message || 'Arkadaş eklenirken hata oluştu');
        }
    };

    const handleRemoveFriend = async (friendUuid: string) => {
        if (!user) return;
        try {
            await removeFriend(user.uuid, friendUuid);
            setFriends(prev => prev.filter(f => f.uuid !== friendUuid));
        } catch (err: any) {
            alert(err.message || 'Arkadaş kaldırılamadı');
        }
    };

    if (loading) return <div className="status">Yükleniyor...</div>;
    if (error) return <div className="status error">Hata: {error}</div>;
    if (!user) return <div className="status">Kullanıcı bulunamadı</div>;

    const isOwnProfile = userMe?.uuid === user.uuid;

    return (
        <main className="profile-page">
            <div className="profile-header">
                <img
                    src="/default-avatar.png"
                    alt="Avatar"
                    className="avatar"
                />
                <div className="profile-info">
                    <h1>{user.firstName} {user.lastName}</h1>
                    <p className="username">@{user.username}</p>
                    {!isOwnProfile && (
                        <button className="button" onClick={handleAddFriend}>
                            Arkadaş Ekle
                        </button>
                    )}
                </div>
            </div>

            <section className="friends-section">
                <h2>Arkadaşlar ({friends.length})</h2>
                {friends.length > 0 ? (
                    <CardSlider
                        items={friends}
                        renderItem={f => (
                            <div key={f.uuid} className="slider-card">
                                <Link to={`/profile/${f.username}`}>
                                    <img
                                        src="/default-avatar.png"
                                        alt={`${f.username} avatar"`}
                                        className="avatar-small"
                                    />
                                    <p>{f.firstName} {f.lastName}</p>
                                </Link>
                                {isOwnProfile && (
                                    <button
                                        className="button remove"
                                        onClick={() => handleRemoveFriend(f.uuid)}
                                    >
                                        Kaldır
                                    </button>
                                )}
                            </div>
                        )}
                    />
                ) : (
                    <p>Henüz arkadaşınız yok.</p>
                )}
            </section>
        </main>
    );
};

export default ProfilePage;
