# Vector-Embeddings-Retrieval-in-Node.js
Simple demo of how Vector Embeddings and Retrieval work in AI powered applications. 

🚀 You can check out a working demo here: [DEMO](https://bculleec.up.railway.app/)

# What
Vector Embeddings are crucial to the way AI Systems remember things. You'll see in this demo how the computer is able to convert plain text into semantic groupings and find sections by ideas!

# Why
The powerful building blocks of AI retrieval systems are simple, transparent and open to anyone. You should be aware of how these systems work and not be a blind user!

# Setup
Clone this repo and find out how it works under the hood.

### Clone the repo
```bash
git clone https://github.com/bculleec/Vector-Embeddings-Retrieval-in-Node.js
cd Vector-Embeddings-Retrieval-in-Node.js
```

### Install dependencies
```bash
npm install
```

### Add your text
Drop any `.txt` file inside the `data/` directory.  
The included example uses *Alice in Wonderland*, but you can replace it with anything you like.

### Build vectors
```bash
node main.js
```
This runs your pipeline to chunk the text and create:
- `chunks.json` → all the text chunks  
- `vectors.json` → vector representations of those chunks

### Run the server
```bash
npm start
```
or
```bash
node server.js
```
This serves both the backend API and the frontend demo at [http://localhost:3000](http://localhost:3000).

