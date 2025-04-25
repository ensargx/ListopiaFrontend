import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';
import { fetchUserByUsername, fetchUserMe, fetchFriendsByUUID, addFriend, removeFriend, } from '@/app/api_/userapi';
const ProfilePage = () => {
    const { username } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [newFriendUsername, setNewFriendUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log('ProfilePage mounted with username:', username);
        if (!username) {
            console.log('No username provided, exiting early');
            setLoading(false);
            return;
        }
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Fetching current user data...');
                const me = await fetchUserMe();
                console.log('Current user data:', me);
                setCurrentUser(me);
                console.log('Fetching profile user data for:', username);
                const profileUser = await fetchUserByUsername(username);
                console.log('Profile user data:', profileUser);
                setUser(profileUser);
                console.log('Fetching friends for user:', profileUser.uuid);
                const list = await fetchFriendsByUUID(profileUser.uuid);
                console.log('Friends data:', list);
                setFriends(list);
            }
            catch (err) {
                console.error('Error in loadData:', err);
                setError(err.message || 'Yüklenirken bir hata oluştu');
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, [username]);
    const handleAddFriend = async () => {
        console.log('Attempting to add friend:', newFriendUsername);
        if (!user || !newFriendUsername.trim())
            return;
        try {
            const friend = await fetchUserByUsername(newFriendUsername.trim());
            console.log('Adding friend with UUID:', friend.uuid);
            await addFriend(user.uuid, friend.uuid);
            const updated = await fetchFriendsByUUID(user.uuid);
            console.log('Updated friends list:', updated);
            setFriends(updated);
            setNewFriendUsername('');
        }
        catch (err) {
            console.error('Error in handleAddFriend:', err);
            alert(err.message || 'Arkadaş eklenemedi');
        }
    };
    const handleRemoveFriend = async (friendUuid) => {
        console.log('Attempting to remove friend with UUID:', friendUuid);
        if (!user)
            return;
        try {
            await removeFriend(user.uuid, friendUuid);
            setFriends((prev) => prev.filter((f) => f.uuid !== friendUuid));
            console.log('Friend removed, remaining friends:', friends);
        }
        catch (err) {
            console.error('Error in handleRemoveFriend:', err);
            alert(err.message || 'Arkadaş kaldırılamadı');
        }
    };
    if (loading)
        return _jsx("div", { className: "status", children: "Y\u00FCkleniyor..." });
    if (error)
        return _jsxs("div", { className: "status error", children: ["Hata: ", error] });
    if (!user)
        return _jsx("div", { className: "status", children: "Kullan\u0131c\u0131 bulunamad\u0131." });
    const isOwnProfile = currentUser?.uuid === user.uuid;
    return (_jsxs("div", { className: "profile-container", children: [_jsxs("div", { className: "profile-header", children: [_jsx("img", { src: '/default-avatar.png', alt: "Avatar", className: "avatar" }), _jsxs("div", { className: "profile-info", children: [_jsxs("h1", { children: [user.firstName, " ", user.lastName] }), _jsxs("p", { className: "username", children: ["@", user.username] })] })] }), !isOwnProfile && (_jsxs("div", { className: "add-friend-form", children: [_jsx("input", { type: "text", placeholder: "Arkada\u015F eklemek i\u00E7in kullan\u0131c\u0131 ad\u0131", value: newFriendUsername, onChange: (e) => setNewFriendUsername(e.target.value) }), _jsx("button", { className: "button", onClick: handleAddFriend, children: "Arkada\u015F Ekle" })] })), _jsxs("h2", { children: ["Arkada\u015Flar (", friends.length, ")"] })] }));
};
export default ProfilePage;
