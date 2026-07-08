const express = require('express');
const { marked } = require('marked');
const app = express();
app.use(express.json());

const posts = {};
let idCounter = 1;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

app.get('/', (req, res) => {
  const postList = Object.values(posts).reverse().map(p =>
    `<article style="margin-bottom:20px">
      <h2><a href="/${p.slug}">${p.title}</a></h2>
      <p>${new Date(p.published_at || p.created_at).toLocaleDateString()}</p>
    </article>`
  ).join('') || '<p>No posts yet.</p>';

  res.send(`<!DOCTYPE html>
<html>
<head><title>Cloud Links Ghost</title>
<style>body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:20px}
h1{color:#15171a}a{color:#ff0095}</style>
</head>
<body>
<h1>Cloud Links Ghost</h1>
<p>Cloud authority content on Ghost.</p>
${postList}
</body></html>`);
});

app.get('/:slug', (req, res) => {
  const post = Object.values(posts).find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).send('Not found');
  const html = marked(post.mobiledoc || post.html || post.content || '');
  res.send(`<!DOCTYPE html>
<html><head><title>${post.title}</title></head>
<body><h1>${post.title}</h1><div>${html}</div></body></html>`);
});

// Ghost Admin API compatibility
app.post('/ghost/api/admin/posts/', (req, res) => {
  const postData = req.body.posts?.[0] || req.body;
  const id = String(idCounter++);
  const title = postData.title || 'Untitled';
  const slug = postData.slug || slugify(title) + '-' + id;
  const post = {
    id, slug, title,
    html: postData.html || '',
    mobiledoc: postData.mobiledoc || '',
    status: postData.status || 'published',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    url: `/${slug}`
  };
  posts[slug] = post;
  res.status(201).json({ posts: [post] });
});

app.get('/ghost/api/admin/posts/', (req, res) => {
  res.json({ posts: Object.values(posts) });
});

app.get('/ghost/api/admin/site/', (req, res) => {
  res.json({ site: { title: 'Cloud Links Ghost', version: '5.0.0' } });
});

const PORT = process.env.PORT || 2368;
app.listen(PORT, () => console.log('Cloud Links Ghost running on port', PORT));
