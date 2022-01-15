import mongoose from 'mongoose';
import englishJSON from './../words_dictionary';

const VALID_ENGLISH_WORDS = Object.keys(englishJSON);

/**
 * @property {String} english The english translation. 
 * @property {Boolean} locked Defines whether a document can be updated further.
 * @property {Array} translations User submitted translations for the word.
 */
const TranslationSchema = new mongoose.Schema({
    ndebele: {
        type: String,
        trim: true,
        required: 'Ndebele translation is required',
        unique: 'This translation already exists'
    },
    english: {
        type: String,
        trim: true,
        required: 'English translation is required'
    },
    translatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    upvotes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    verified: {
        type: Boolean,
        default: false
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

TranslationSchema.path('english').validate(function (englishTranslation) {
    englishTranslation.split(' ').map((value) => {
        if (!VALID_ENGLISH_WORDS.some(word => word === value)) {
            this.invalidate('english', `English word not recognized: '${value}'`);
        }
    });   
}, null);

export default mongoose.model('Translation', TranslationSchema);
