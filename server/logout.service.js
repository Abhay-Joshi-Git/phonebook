const _ = require("lodash");
const revokedTokens = [];

module.exports = {
    logout: function(token) {
        if (!revokedTokens.includes(token)) {
            revokedTokens.push(token);
        }
    },

    isRevokedToken: function(token) {
        return revokedTokens.includes(token);
    }
}