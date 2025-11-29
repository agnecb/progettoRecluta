import { apiFetch } from "../lib/api";

// ------------------------------------------------------------
// GET /comments  → lista commenti filtrabile per post_id
// ------------------------------------------------------------
export async function getComments(postId) {
    const query = postId ? `?post_id=${postId}` : "";
    const data = await apiFetch(`/comments${query}`);
    return {
        items: data.items.map(c => ({
            id: c.id,
            post_id: c.post_id,
            user_id: c.user_id,
            content: c.content,
            created_at: c.created_at,
            author: c.users ? {
                id: c.users.id,
                username: c.users.username
            } : undefined
        })),
        count: data.count || 0
    };
}

// GET /comments --> conteggio filtrato per post_id
export async function getCommentsCount(postId) {
    const query = `?post_id=${postId}&count=true`;
    const data = await apiFetch(`/comments${query}`);
    return data.count || 0;
}

// GET /comments --> conteggio filtrato per user_id --> !!!! NON funziona perchè lo swagger mostra che si può filtrare per post_id non user...
export async function getUserCommentsCount(user_id) {
    const data = await apiFetch(`/comments?id=${user_id}&count=true`);
    return data.count;
}

// PROVO A PRENDERE I COMMENTI DI UNO USER
export async function getCommentsByUser(user_id) {
  const data = await apiFetch(`/comments`); // recupera TUTTI i commenti
  const userComments = data.items.filter(c => c.user_id === user_id);
  return userComments;
}


// GET /comments/{id} → dettaglio di un singolo commento (id del commento)
export async function getComment(id) {
    const c = await apiFetch(`/comments/${id}`);
    return {
        id: c.id,
        post_id: c.post_id,
        user_id: c.user_id,
        content: c.content,
        created_at: c.created_at,
        user: c.users ? {
            id: c.users.id,
            username: c.users.username
        } : null,
    }
}

// ------------------------------------------------------------
// POST /comments  → crea nuovo commento (autenticato)
// body: { post_id, content }
// ------------------------------------------------------------
export async function createComment(postId, content, token) {
    return apiFetch("/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            post_id: postId,
            content
        })
    });
}

// ------------------------------------------------------------
// PATCH /comments/{id}  → aggiorna commento (owner-only)
// ------------------------------------------------------------
export async function updateComment(id, content, token) {
    return apiFetch(`/comments/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    });
}

// ------------------------------------------------------------
// DELETE /comments/{id} → elimina commento (owner-only)
// ------------------------------------------------------------
export async function deleteComment(id, token) {
    return apiFetch(`/comments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
