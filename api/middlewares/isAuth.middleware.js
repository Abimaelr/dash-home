
const isAuthenticated = (req, res, next) => {
    const Authorization = req.headers.Authorization;

    if (!Authorization) {
        throw new Error('You must be authenticated')
    }

}