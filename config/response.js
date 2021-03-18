
let successResponse = (res, data) => {
    data.response = 200;
    res.json(data);
};
let failResponse = (res, data) => {
    data.response = 100;
    res.json(data);
};

module.exports = {
    successResponse,
    failResponse
};
