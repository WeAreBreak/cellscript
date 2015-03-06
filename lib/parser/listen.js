/**
 * Return Statement Processor for the CellScript Parser
 */

var parserUtils = require("js-parser-utils"),
    validators = parserUtils.validators,
    constants = parserUtils.constants,
    utils = parserUtils.utils;

/// methods ///
utils = utils.extend({

    listen_: function(state) {
        state.next(); // Skip return keyword.
    },

    expression: function(state) {
        state.item.expression = {};
        state.prepareLeaf(state.item.expression);
        state.expressionProcessor.token(state, ["expression"]);
        state.clearLeaf();
    }

});

validators = validators.extend({

    isListen: function(state) {
        return state.token && state.token.type == "identifier" && state.token.data == "listen"
    }

});

/// public interface ///
module.exports = {

    tokenType: "keyword/listen",

    canProcess: function(state) {
        return validators.isListen(state);
    },

    process: function(state) {
        state.leaf();
        state.item.type = "listen";

        utils.listen_(state);

        if(!utils.semicolon(state, true)) {
            utils.expression(state);
            utils.semicolonNonTerminal(state);
        }
    }

};