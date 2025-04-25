// src/app/api_/userapi.ts
import { User } from "@/types/user";
import {PaginatedResponse} from "@/types/friends"

const BASE = "https://api.ensargok.com/api/v1";

export default interface APIResponse {
    message: string,
    success: boolean
}
// ─── AUTH APIs ────────────────────────────────────────────────────────────────

export async function signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
): Promise<APIResponse> {
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

export async function signIn(
    email: string,
    password: string
): Promise<APIResponse> {
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

export async function signOut(): Promise<APIResponse> {
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

export async function fetchUserByUsername(
    username: string
): Promise<User> {
    const res = await fetch(
        `${BASE}/user/${encodeURIComponent(username)}`
    );
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch user");
    }
    return res.json();
}


export async function fetchFriendsByUUID(
    uuid: string
): Promise<PaginatedResponse<User>> {
    const res = await fetch(`${BASE}/user/${encodeURIComponent(uuid)}/friends`);
    if (!res.ok) throw new Error('Arkadaş listesi alınamadı');
    return res.json();
}


export async function fetchUserMe(): Promise<User>{
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

export async function addFriend(
    userUuid: string,
    friendUuid: string
): Promise<void> {
    const res = await fetch(
        `${BASE}/user/${encodeURIComponent(userUuid)}/friends`,
        {
            method: "POST",
            body: JSON.stringify({ friendUuid }),
        }
    );
    if (!res.ok) throw new Error("Failed to add friend");
}

export async function removeFriend(
    userUuid: string,
    friendUuid: string
): Promise<void> {
    const res = await fetch(
        `${BASE}/user/${encodeURIComponent(userUuid)}/friends/${encodeURIComponent(friendUuid)}`,
        { 
            method: "DELETE",
        }
    );
    if (!res.ok) throw new Error("Failed to remove friend");
}
