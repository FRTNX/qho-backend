import { RepeatOneSharp } from '@material-ui/icons';
import Translation from '../models/translation.model';
import User from '../models/user.model';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (request, response, next) => {
    const translation = new Translation(request.body);

    try { 
        const savedTranslation = await translation.save();
        const translator = await User.findById(savedTranslation.translatedBy);
        const result = { ...savedTranslation._doc, translatedBy: { _id: translator._id, name: translator.name }};
            
        return response.status(200).json(result)
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const list = async (request, response, next) => {
    try {
        let translations = await Translation.find()
            .populate('translatedBy', '_id, name')
            .populate('downvotes', '_id name')
            .populate('upvotes', '_id name')
            .exec();
            
        response.json(translations);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const translationById = async (request, response, next, id) => {
    try {
        console.log('Translation fetch triggered')
        let translation = await Translation.findById(id);
        if (!translation) {
            return response.status(400).json({
                error: 'Translation not found'
            });
        }

        request.translation = translation;
        next();
    } catch (error) {
        return response.status(400).json({
            error: 'Could not fetch translation'
        });
    }
};

const listByTranslator = async (request, response, next) => {
    try {
        const result = await Translation.find({ translatedBy: request.profile._id })
            .populate('translatedBy', '_id name')
            .sort('-created')
            .limit(10)
            .exec();

        response.json(result);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
};

const countTranslationsByUser = async (request, response, next) => {
    try {
        const result = await Translation.find({ translatedBy: request.profile._id }, '_id');
        console.log('Translation count for user: ', result.length)
        return response.status(200).json({ count: result.length });
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const update = async (request, response, next) => {
    try {
        console.log('Beginning translation update')
        const translation = await Translation.findOne({ _id: request.body._id });
        console.log('Found existing translations: ', translation);

        if (translation.locked) {
            return response.status(403).json({
                error: 'Cannot update locked translation'
            });
        }
    
        translation.translations.push(request.body.translation);
        translation.updated = Date.now();
    
        await translation.save();
        console.log('Document updated: ', updatedTranslation);
    
        response.status(200).json({
            message: 'Translation updated'
        });
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const remove = async (request, response, next) => {
    try {
        console.log('Running in target')
        const translation = request.translation;
        console.log('Found existing translations: ', translation);

        await translation.remove();

        return response.status(200).json({
            message: 'Translation deleted'
        });
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};


const upvote = async (request, response, next) => {
    try {
        console.log('Running in server target: ', request.body)
        let result = await Translation.findByIdAndUpdate(request.body.translationId,
            { $push: { upvotes: request.body.userId }},
            { new: true });
    
        response.json(result);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};
  
  const removeUpvote = async (request, response) => {
    try {
        let result = await Translation.findByIdAndUpdate(request.body.translationId,
            { $pull: { upvotes: request.body.userId }},
            { new: true });

        response.json(result)
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const downvote = async (request, response, next) => {
    try {
        let result = await Translation.findByIdAndUpdate(request.body.translationId,
            { $push: { downvotes: request.body.userId }},
            { new: true });
    
        response.json(result);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};
  
  const removeDownvote = async (request, response) => {
    try {
        let result = await Translation.findByIdAndUpdate(request.body.translationId,
            { $pull: { downvotes: request.body.userId }},
            { new: true });

        response.json(result)
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

export default {
    create,
    list,
    update,
    remove,
    translationById,
    listByTranslator,
    upvote,
    removeUpvote,
    downvote,
    removeDownvote,
    countTranslationsByUser
};
