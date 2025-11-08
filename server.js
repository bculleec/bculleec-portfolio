// Go to main.js to see how we build our vectors.
import { readFile } from 'fs/promises';

const vectors = JSON.parse(await readFile('./data/vectors.json', { encoding: 'utf-8'}));
const chunks = JSON.parse(await readFile('./data/chunks.json', { encoding: 'utf-8'}));

// Now that we have our vectors, we need to build a similarity search index.
// We are organizing each vector spatially, kind of like a proximity map of ideas!

import faiss from 'faiss-node';

const dimension = vectors[0].vector.size;
const index = new faiss.IndexFlatL2(dimension);

const matrix = [];

vectors.forEach(( vector ) => {
    matrix.push(Array.from(Object.values(vector.vector.data)));  
});

matrix.forEach(( m ) => {
    index.add(m);
});

import { embedString } from './VectorCreation.js';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';

const app = fastify({ logger: true });

const __dirname = import.meta.dirname;
app.register(cors);
app.register(fastifyStatic, {
    root: path.join(__dirname, 'public')
})

app.post('/query', async ( request, reply ) => {
    const q = request.body.q;

    const v = await embedString(q);

    const searchArray = Array.from(v.data);
    const k = 3;
    const results = index.search(searchArray, k);
    console.log(results.labels); 
    console.log(results.distances); 

    // return the chunks that match the labels
    const response = {results: []};
    results.labels.forEach(( label, i ) => {
        response.results.push({text : chunks[label].chunk, distance: results.distances[i]});
    });

    return response;

});

app.listen({ port: 3000, host: '0.0.0.0' }, ( err, address ) => {
    if (err) console.error(err);
})
