import { pipeline } from "@xenova/transformers";
import { writeFile } from "fs/promises";


const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

async function embedChunks(chunks) {
    // Returns a matching vector array from the chunks

    const vectors = [];

    for (const chunk of chunks) {
        const embedded = await embedString(chunk.chunk);
        const vector = { id: chunk.id, vector: embedded};
        vectors.push(vector);
    }

    return vectors;
}

async function embedString(str) {
    return await embedder(str, { pooling: 'mean' });  // setting the pooling to 'mean' is very important. I lost so much time on this!
}

async function saveVectors(vectors, fileLocation) {
    await writeFile(fileLocation, JSON.stringify(vectors), 'utf8')
}

export { embedChunks, saveVectors, embedString };
