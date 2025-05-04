import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { User } from '@/types/user';
import { SearchCategory, searchUsersMovies } from '@/api/searchapi';
import { PaginatedResponse } from '@/types/friends';
import { adminUpdateUserByUuid, adminDeleteUserByUuid } from '@/api/adminapi'; // Gerçek API fonksiyonları

const AdminUserEditor: React.FC = () => {
    const [nameInput, setNameInput] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchRes, setSearchRes] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null); // Kullanıcı düzenleme state'i
    const [saving, setSaving] = useState(false); // Save butonunu devre dışı bırakmak için
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Silme onayı state'i

    // URL ile profil fotoğrafı değişimi
    const handleProfilePictureUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                profilePicture: e.target.value, // URL ile fotoğrafı güncelle
            });
        }
    };

    // Kullanıcıları arama
    const fetchUser = async () => {
        if (!nameInput) return;
        setLoading(true);
        setSelectedUser(null);
        setSearchRes([]);
        try {
            searchUsersMovies(nameInput, SearchCategory.USERS)
                .then((res) => {
                    const userRes = res as { results: { users: PaginatedResponse<User> } };
                    setSearchRes(userRes.results.users.content);
                });
            toast.success('Veri kaynaktan çekildi');
        } catch (e) {
            alert((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Kullanıcıyı seçme
    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setEditedUser({ ...user }); // Düzenleme formu için seçilen kullanıcıyı yüklüyoruz
    };

    // Kullanıcı düzenleme input değişikliklerini yönetme
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    // Kullanıcıyı güncelleme
    const handleSaveChanges = async () => {
        if (editedUser) {
            setSaving(true); // Kaydetme işlemi başladığında state'i true yap
            try {
                // Kullanıcıyı API üzerinden güncelleme
                await adminUpdateUserByUuid(editedUser.uuid, editedUser); // API çağrısı burada yapılacak
                console.log("user new: ", editedUser);
                toast.success('Kullanıcı başarıyla güncellendi');
                setEditedUser(null);
                setSelectedUser(null);
                fetchUser(); // Güncellenen verileri tekrar al
            } catch (e) {
                toast.error('Kullanıcı güncellenirken hata oluştu');
            } finally {
                setSaving(false); // Kaydetme işlemi tamamlandığında state'i false yap
            }
        }
    };

    // Kullanıcıyı silme
    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await adminDeleteUserByUuid(selectedUser.uuid); // Kullanıcıyı API üzerinden sil
                toast.success('Kullanıcı başarıyla silindi');
                setEditedUser(null);
                setSelectedUser(null);
                fetchUser(); // Kullanıcı silindiği için kullanıcı listesi tekrar alınacak
            } catch (e) {
                toast.error('Kullanıcı silinirken hata oluştu');
            }
        }
    };

    // Silme onayı işlemi
    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(true); // Silme onayı ekranını göster
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false); // Silme onayı ekranını kapat
    };

    return (
        <div className="admin-user-editor">
            <h2>Manage Users</h2>

            <div className="controls">
                <input
                    type="text"
                    placeholder="Search User"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <button onClick={fetchUser} disabled={loading}>
                    {loading ? 'Yükleniyor…' : 'Search'}
                </button>
            </div>

            {searchRes.length > 0 && (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {searchRes.map((user) => (
                        <li
                            key={user.uuid}
                            onClick={() => handleUserSelect(user)}
                            style={{
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor:
                                    selectedUser?.uuid === user.uuid ? '#a0c4ff' : 'transparent',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={user.profilePicture}
                                    alt={user.username}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                    }}
                                />
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p style={{ margin: 0, color: '#888' }}>{user.username}</p>
                                    <p style={{ margin: 0 }}>
                                        {user.biography || 'No biography available'}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selectedUser && !editedUser && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Biography:</strong> {selectedUser.biography || 'No biography available'}</p>
                    <p><strong>Last Online:</strong> {new Date(selectedUser.lastOnline).toLocaleString()}</p>
                    <img
                        src={selectedUser.profilePicture}
                        alt={selectedUser.username}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            marginTop: '10px',
                        }}
                    />
                    <button onClick={() => setEditedUser({ ...selectedUser })}>
                        Edit User
                    </button>
                    <button onClick={handleDeleteConfirm} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                        Delete User
                    </button>
                </div>
            )}

            {editedUser && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Edit User: {editedUser.firstName} {editedUser.lastName}</h3>

                    {/* Username */}
                    <div>
                        <label>Username: </label>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label>First Name: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={editedUser.firstName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label>Last Name: </label>
                        <input
                            type="text"
                            name="lastName"
                            value={editedUser.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Biography */}
                    <div>
                        <label>Biography: </label>
                        <textarea
                            name="biography"
                            value={editedUser.biography || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label>Role: </label>
                        <input
                            type="text"
                            name="role"
                            value={editedUser.role || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Profil Fotoğrafı (URL ile) */}
                    <div>
                        <label>Profile Picture (Enter URL): </label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={editedUser.profilePicture || ''}
                            onChange={handleProfilePictureUrlChange}
                        />
                    </div>

                    {/* Kaydetme ve iptal butonları */}
                    <div>
                        <button onClick={handleSaveChanges} disabled={saving}>
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                        <br />
                        <button onClick={() => setEditedUser(null)}>Cancel</button>
                    </div>

                    {/* Silme butonu */}
                    <div>
                        <button
                            onClick={handleDeleteConfirm}
                            style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
                        >
                            Delete User
                        </button>
                    </div>

                    {/* Silme onayı */}
                    {showDeleteConfirm && (
                        <div style={{ marginTop: '10px', color: 'red' }}>
                            <p>Are you sure you want to delete this user?</p>
                            <button
                                onClick={handleDeleteUser}
                                style={{ marginRight: '10px', backgroundColor: 'red', color: 'white' }}
                            >
                                Yes, Delete
                            </button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminUserEditor;
