async function blogRoutes(app, options) {
    app.get('/blogapi', async ( request, reply ) => {
        const client = await app.mysql.getConnection();
        const [rows, fields] = await client.query(
            'SELECT id, title, category, content, created_at FROM blog_posts', [],
        );
        client.release();
        return reply.send(rows);
    });

    app.get('/blog', ( request, reply ) => {
        return reply.view('blog');
    });

    app.get('/blogapi/:id', async ( request, reply ) => {
        const client = await app.mysql.getConnection();

        const id = request.params.id.toString();

        if (!(/\d/.test(id))) { return reply.send('invalid id. stop...') }

        const [rows, fields] = await client.query(
            'SELECT id, title, category, content, created_at FROM blog_posts where id=?', [ id ],
        );
        client.release();
        return reply.send(rows.length ? rows[0] : {});
    });

    app.get('/blog/:id', async ( request, reply ) => {
        const id = request.params.id.toString();
        if (!(/\d/.test(id))) { return reply.send('invalid id. stop...') }
        return reply.view('blog-post', { id });
    });

    app.post('/blogapi/create', async ( request, reply ) => {

        const title = request.body.title;
        const category = request.body.category;
        const content = request.body.content;
        const createdAt = request.body.createdAt;
        const apiToken = request.body.apiToken;

        if (apiToken !== process.env.BLOG_API_KEY) { return reply.send('Invalid api token...'); }

        if (typeof title !== 'string' || typeof category !== 'string' || typeof content !== 'string') {
            return reply.send('invalid body. stop...')
        }

        const createdAtDate = new Date(createdAt);
        
        const client = await app.mysql.getConnection();

        const [rows] = await client.query(
            'INSERT INTO blog_posts (title, category, content, created_at) VALUES (?, ?, ?, ?)',
            [title, category, content, createdAtDate]
        );

        return reply.send(rows);
    });

    app.get('/create-blog-post', ( request, reply ) => {
        reply.view('create-blog-post', {apiToken: process.env.BLOG_API_KEY});
    });
}

export { blogRoutes };
