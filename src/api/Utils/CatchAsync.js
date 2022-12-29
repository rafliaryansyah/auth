exports.catchAsync = (func) => (request, response, next) => {
    Promise.resolve(func(request, response, next)).catch(
        (error) => {
            if (error.isJoi == true) error.status = 400;
            console.log('This Error : ', error);
            next(error);
        }
    );
};