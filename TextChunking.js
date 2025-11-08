import { writeFile } from 'fs/promises';

function chunkText(text, charactersPerChunk) {
    // Returns the chunks as an array with id and chunk
    const chunkArray = [];

    for (let i = 0; i < text.length; i += charactersPerChunk) {
        const chunk = text.slice(i, i + charactersPerChunk);
        chunkArray.push({
            id: chunkArray.length + 1,
            chunk: chunk
        });
    }

    return chunkArray;
}

async function saveChunks(chunks, fileLocation) {
    await writeFile(fileLocation, JSON.stringify(chunks), 'utf8')
}

export { chunkText, saveChunks };
