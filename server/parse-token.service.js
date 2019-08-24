module.exports = {
    getTokenByRequest: function(req) {
        if (!(req && req.headers && req.headers.authorization)) {
            return null;
        }
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                return credentials;
            }
        }
    }
}
