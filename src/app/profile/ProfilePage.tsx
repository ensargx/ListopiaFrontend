import React, { useEffect, useState } from 'react';
import {Link, redirect, useParams } from 'react-router-dom';
import './ProfilePage.css';
import { User } from '@/types/user';
import APIResponse, {
    fetchUserByUsername,
    fetchUserMe,
    fetchFriendsByUUID,
    addFriend,
    removeFriend,
} from '@/api/userapi';
import { useAuth } from '@/components/AuthContext';
import { CardSlider } from '@/components/CardSlider';

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [friends, setFriends] = useState<User[]>([]);
    const [newFriendUsername, setNewFriendUsername] = useState('');
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(30);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const auth = useAuth();

    const userMe = auth.user;
    document.title = `${username} - Listopia`;

    useEffect(() => {
        console.log('ProfilePage mounted with username:', username);

        if (!username) {
            console.log('No username provided, exiting early');
            redirect("/"); // @TODO: TEST!
            return;
        }

        fetchUserByUsername(username).then((value) => {
            setUser(value);
            setLoading(false);
        }).catch((err: Error) => {
            console.error("hata geldi: ", err.message);
            setError(JSON.parse(err.message).message);
            setLoading(false);
        })

    }, [username]);

    const handleAddFriend = async () => {
        if (!user || !userMe) return;

        try {
            let res = await addFriend(user.uuid);
            if(res.success){
                const updated = await fetchFriendsByUUID(user.uuid, pageNumber, pageSize);
                console.log('Updated friends list:', updated);
                setFriends(friends => [...friends, ...updated.content]);
                setNewFriendUsername('');
            }else{
                console.error('Failed to add friend:', res.message)
                alert(res.message || 'Failed to add friend:');
            }
        } catch (err: any) {
            console.error('Error in handleAddFriend:', err);
            alert(err.message || 'Failed to add friend:');
        }
    };

    const handleRemoveFriend = async (friendUuid: string) => {
        console.log('Attempting to remove friend with UUID:', friendUuid);
        if (!user) return;

        try {
            await removeFriend(user.uuid, friendUuid);
            setFriends((prev) => prev.filter((f) => f.uuid !== friendUuid));
            console.log('Friend removed, remaining friends:', friends);
        } catch (err: any) {
            console.error('Error in handleRemoveFriend:', err);
            alert(err.message || 'Arkadaş kaldırılamadı');
        }
    };

    if (loading) return <div className="status">Yükleniyor...</div>;
    if (error) return <div className="status error">Hata: {error}</div>;
    if (!user) return <div className="status">kullanıcı yok...</div>;

    const isOwnProfile = userMe?.uuid === user.uuid;

    return (
        <main className="home-page">
            {/* --- Hero + Sidebar Row --- */}
            <div className="profile-container">
                <div className="profile-header">
                    <img
                        src={'/placeholder-profile.jpg'}
                        alt="Avatar"
                        className="avatar"
                    />
                    <div className="profile-info">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p className="username">@{user.username}</p>
                    </div>
                </div>

                {!isOwnProfile && (
                    <div className="add-friend-form">
                        <button className="button" onClick={handleAddFriend}>
                            Arkadaş Ekle
                        </button>
                    </div>
                )}

                <h2>Arkadaşlar ({friends.length})</h2>
                {friends.length === 0 ? (
                    <p>Henüz arkadaşınız yok.</p>
                ) : (
                    <ul className="friends-list">
                        {friends.map((f) => (
                            <li key={f.uuid} className="friend-item">
                                <section className="section">
                                    <h2>Friends</h2>
                                    <CardSlider
                                        items={friends}
                                        renderItem={m => (
                                            <Link to={`/profile/${f.username}`} className="slider-card">
                                                <div className="slider-poster">
                                                    <img
                                                        src={'/default-avatar.png'}
                                                        alt="Avatar"
                                                        className="avatar-small"
                                                    />
                                                </div>
                                            </Link>
                                        )}
                                    />
                                </section>

                                {isOwnProfile && (
                                    <button
                                        className="button remove"
                                        onClick={() => handleRemoveFriend(f.uuid)}
                                    >
                                        Kaldır
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* --- Aşağıdaki iki slider --- */}

        </main>


    );
};

export default ProfilePage;
