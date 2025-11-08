// Welcome to the Vector Embeddings and Retrieval demo!

// The goal is for us to be able to search the file semantically and get the relevant sections.
// I'm personally using Alice in Wonderland because it fits the theme but you can use any document!

// First, we'll need to load the text data and split it into chunks.
import { readFile } from 'fs/promises';
import { chunkText, saveChunks } from './TextChunking.js';

const fileLocation = './data/alice-in-wonderland.txt';
const fileText = await readFile(fileLocation, { encoding: 'utf-8' } );

const chunkSize = 300;
const textChunks = chunkText(fileText, chunkSize);

await saveChunks(textChunks, './data/chunks.json');

// Now we have our chunks of 300 characters, each associated with an ID.
// Next, we will want to embed and store these chunks as vectors.
// This step can take a while to run depending on the chunk size you set earlier.
import { embedChunks, saveVectors } from './VectorCreation.js';
const vectors = await embedChunks(textChunks);

// Let's write that to a file since that took so long.
await saveVectors(vectors, './data/vectors.json');

// Now go over to server.js to see how we build the similarity search index.

