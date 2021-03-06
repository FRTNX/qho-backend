/**
 * These functions are used to get readable error messages from MongoDB.
 */
const getUniqueErrorMessage = (err) => {
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    }
    catch (exception) {
        return 'Unique field already exists';
    }
};
const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;
};
export default { getErrorMessage };
