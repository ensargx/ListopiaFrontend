const BASE = "https://api.ensargok.com/api/v1";
// ─── AUTH APIs ────────────────────────────────────────────────────────────────
export async function signUp(email, password, firstName, lastName, username) {
    const res = await fetch(`${BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, username }),
        credentials: "include"
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to sign up");
    }
    return res.json();
}
export async function signIn(email, password) {
    const res = await fetch(`${BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to log in");
    }
    return res.json();
}
export async function signOut() {
    const res = await fetch(`${BASE}/auth/signout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to log out");
    }
    return res.json();
}
// ─── USER DATA APIs ───────────────────────────────────────────────────────────
export async function fetchUserByUsername(username) {
    const res = await fetch(`${BASE}/user/${encodeURIComponent(username)}`);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch user");
    }
    return res.json();
}
export async function fetchFriendsByUUID(uuid) {
    const res = await fetch(`${BASE}/user/${encodeURIComponent(uuid)}/friends`);
    if (!res.ok)
        throw new Error('Arkadaş listesi alınamadı');
    const data = await res.json();
    console.log('[fetchFriendsByUUID] raw data:', data);
    // Backend "{ friends: User[] }" döndürüyorsa:
    if (Array.isArray(data)) {
        // doğrudan dizi dönüyor
        return data;
    }
    else if (Array.isArray(data.friends)) {
        // { friends: [...] } formatını düzleştir
        return data.friends;
    }
    // beklenmeyen format
    throw new Error('Geçersiz arkadaş listesi formatı');
}
export async function fetchUserMe() {
    const res = await fetch(`${BASE}/user/me`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch user");
    }
    return res.json();
}
export async function addFriend(userUuid, friendUuid) {
    const res = await fetch(`${BASE}/user/${encodeURIComponent(userUuid)}/friends`, {
        method: "POST",
        body: JSON.stringify({ friendUuid }),
    });
    if (!res.ok)
        throw new Error("Failed to add friend");
}
export async function removeFriend(userUuid, friendUuid) {
    const res = await fetch(`${BASE}/user/${encodeURIComponent(userUuid)}/friends/${encodeURIComponent(friendUuid)}`, {
        method: "DELETE",
    });
    if (!res.ok)
        throw new Error("Failed to remove friend");
}
