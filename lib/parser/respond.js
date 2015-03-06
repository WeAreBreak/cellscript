/**
 * Return Statement Processor for the CellScript Parser
 */

var parserUtils = require("js-parser-utils"),
    validators = parserUtils.validators,
    constants = parserUtils.constants,
    utils = parserUtils.utils;

/// methods ///
utils = utils.extend({

    respond_: function(state) {
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

    isRespond: function(state) {
        return state.token && state.token.type == "keyword" && state.token.data == "respond"
    }

});

/// public interface ///
module.exports = {

    name: "cell/respond.js",
    tokenType: "keyword/respond",

    canProcess: function(state) {
        return validators.isRespond(state);
    },

    process: function(state) {
        if(!state.hasScope("endpoint")) return state.error("Unexpected respond statement.");

        state.leaf();
        state.item.type = "respond";

        utils.respond_(state);

        if(!utils.semicolon(state, true)) {
            utils.expression(state);
            utils.semicolonNonTerminal(state);
        }
    }

};