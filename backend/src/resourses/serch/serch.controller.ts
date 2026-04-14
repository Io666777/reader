import type { Context } from "hono";

export const searchExternal = async (c: Context) => {
  const title = c.req.query('title');
  const author = c.req.query('author');

  if (!title && !author) {
    return c.json({ error: 'Нужен хотя бы один параметр: title или author' }, 400);
  }

  try {
    // Формируем запрос: можно искать по title, по author или по обоим
    let url = `https://openlibrary.org/search.json?limit=20`;
    if (title) url += `&title=${encodeURIComponent(title)}`;
    if (author) url += `&author=${encodeURIComponent(author)}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.docs.map((doc: any) => ({
      isbn: doc.isbn?.[0] || doc.edition_key?.[0] || 'no-id',
      title: doc.title,
      author: doc.author_name?.[0] || 'Неизвестный автор',
      year: doc.first_publish_year || '—',
      cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null
    }));

    return c.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return c.json({ error: 'Ошибка внешнего поиска' }, 500);
  }
};