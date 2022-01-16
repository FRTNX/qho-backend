import * as mongoose from 'mongoose';
const LineSchema = new mongoose.Schema({
    index: {
        type: Number
    },
    words: [{ text: String }]
});
const Line = mongoose.model('Line', LineSchema);
const ChunkSchema = new mongoose.Schema({
    text_type: {
        type: String
    },
    summary: {
        type: String
    },
    lines: [Line]
});
const Chunk = mongoose.model('Chunk', ChunkSchema);
const SceneSchema = new mongoose.Schema({
    text_type: {
        type: String
    },
    title: {
        type: String
    },
    summary: {
        type: String
    },
    chunks: [Chunk]
});
const Scene = mongoose.model('Scene', SceneSchema);
const ActSchema = new mongoose.Schema({
    text_type: {
        type: String
    },
    title: {
        type: String
    },
    summary: {
        type: String
    },
    scenes: [Scene]
});
const Act = mongoose.model('Act', ActSchema);
const PlaySchema = new mongoose.Schema({
    text_type: {
        type: String
    },
    name: {
        type: String
    },
    characters: [String],
    summary: {
        type: String
    },
    acts: [Act],
    updated: Date
});
const Play = mongoose.model('Play', PlaySchema);
export { Play, Act, Scene, Chunk, Line };
// graphql
// endpoint: email -> user
// endpoint: add text
// endpoint: fetch king lear
// make glosess includable in play fetch
// crud on graphql
// put: for paragraphs at a time
