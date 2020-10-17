export default (func) => (req, res, next) => func(req, res, next).catch(next);
