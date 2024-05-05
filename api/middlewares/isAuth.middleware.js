
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next 
 */
export const isAuthenticated = (req, res, next) => {
    const Authorization = req.headers.Authorization;

    if (!Authorization) {
        throw new Error('You must be authenticated')
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next 
 */
export const validSensor = (req, res, next) => {
    const code = req.header.DeviceId;

     if (!code) {
        return res.status(401).json({error: 'You not allowed to post'})
    }

    next();

}