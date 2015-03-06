/**
 * Expression Statement Processor for the InqScript Parser
 */

var parserUtils = require("js-parser-utils"),
    validators = parserUtils.validators;

validators = validators.extend({

    isIncludeOrUse: function(state) {
        return state.token && state.token.type == "identifier" && (state.token.data == "include" || state.token.data == "use")
    },

    isLookaheadStringLiteralOrIdentifier: function(state) {
        var lookahead = state.lookahead();
        return lookahead && (
            (lookahead.type == "literal" && lookahead.subtype == "string") ||
            (lookahead.type == "identifier"));
    },

    isLookaheadIdentifier: function(state) {
        var lookahead = state.lookahead();
        return lookahead && lookahead.type == "identifier"
    }

});

/// public interface ///
module.exports = {

    methods: {
        canProcess: function (state) {
            if (validators.isIncludeOrUse(state) && validators.isLookaheadStringLiteralOrIdentifier(state)) return false;
            var lookahead = state.lookahead();
            if((state.token && state.token.type == "identifier" && state.token.data == "cell") &&
               (lookahead && lookahead.type == "{")) return false;
            if((state.token && state.token.type == "identifier" && state.token.data == "listen")) return false;
        }
    }

};