function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''
    let basicToken
    if (!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({ error: 'Missing basic token' })
        console.log('requireAuth')
        console.log(req.get('Authorization'))
        next()
    }

    module.exports = {
        requireAuth,
    }