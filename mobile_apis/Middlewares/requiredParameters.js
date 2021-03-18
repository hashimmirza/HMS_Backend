module.exports = (requiredParameters = [], where = 'body') =>  (req, res, next) => {
    // eslint-disable-next-line consistent-return
    const messingParams = [];
    requiredParameters.forEach(requiredParam => {
        if (req[where][requiredParam] === undefined) {
            messingParams.push(requiredParam);
        }
    });
    // update staus code form 400 <Bad Request> to 422 <Unprocessable Entity>
    return messingParams.length === 0 ? next() : res.status(422).json({
        success: false,
        message: `required parameters: ${messingParams.join(', ')}`,
    });
};

