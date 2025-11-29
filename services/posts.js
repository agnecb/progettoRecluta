import { apiFetch } from "../lib/api";

// ========== POSTS API ==========

// GET /posts  → Lista post --> funziona (feed)
export async function getPosts(userId) {
    const query = userId ? `?user_id=${userId}` : "";
    const data = await apiFetch(`/posts${query}`);

    return data.items.map(post => ({
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author: post.users ? {
            id: post.users.id,
            username: post.users.username
        } : undefined,
        likes: 0,                     // placeholder
        comments: 0                   // placeholder
    }));
}


// GET /posts/{id} → Post singolo --> funziona
export async function getPost(id) {
    const post = await apiFetch(`/posts/${id}`);

    return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        created_at: post.created_at,
        author: post.users ? {
            id: post.users.id,
            username: post.users.username
        } : undefined
    };
}

// GET /posts --> lista filtrata per user_id --> funziona
export async function getUserPosts(user_id) {
    const res = await apiFetch(`/posts?user_id=${user_id}`);
    return res.items.map(post => ({
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author: post.users ? {
            id: post.users.id,
            username: post.users.username
        } : undefined,
        likes: 0,                     // placeholder
        comments: 0                   // placeholder
    }));
}

// GET /posts --> conteggio filtrato per user_id
export async function getUserPostsCount(user_id) {
    const data = await apiFetch(`/posts?user_id=${user_id}&count=true`);
    return data.count;
}


// POST /posts → Creazione nuovo post
export async function createPost(postData) {
    const post = await apiFetch('/posts', {
        method: 'POST',
        body: JSON.stringify({
            content: postData.content,
            user_id: postData.user_id
        })
    });

    return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author: post.user ? {
            id: post.user.id,
            username: post.user.username
        } : undefined
    };
}

// versione con token --> helper che effettua richiesta HTTP post
/*
export function createPost(postData, token) {
    return apiFetch('/posts', {
        method: 'POST',
        body: JSON.stringify({
            user_id: postData.user_id,
            content:postData.content
        }),
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
*/



// PATCH /posts/{id} → Aggiornamento post
export async function updatePost(id, content) {
    const post = await apiFetch(`/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content })
    });

    return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author: post.user ? {
            id: post.user.id,
            username: post.user.username
        } : undefined
    };
}

// DELETE /posts/{id}
export async function deletePost(id) {
    return apiFetch(`/posts/${id}`, {
        method: "DELETE"
    });
}

// creo un helper per mappare il post correttamente
function mapPost(post) {
    return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        author: post.users ? {
            id: post.users.id,
            username: post.users.username
        } : undefined
    };
}

// creo un helper centralizzato per caricare i post dal backend

