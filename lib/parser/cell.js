/**
 * While Statement Processor for the CellScript Parser
 */

var parserUtils = require("js-parser-utils"),
    validators = parserUtils.validators,
    constants = parserUtils.constants,
    utils = parserUtils.utils;

var first = true;

/// methods ///
utils = utils.extend({

    cell_: function(state) {
        state.next(); //Skip cell keyword.
    }

});

/// public interface ///
module.exports = {

    name: "cell/cell.js",

    canProcess: function(state) {
        var lookahead = state.lookahead();
        return (state.token && state.token.type == "identifier" && state.token.data == "cell") &&
               (lookahead && lookahead.type == "{");
    },

    process: function(state) {
        if(!first) return state.error("Only one component can be defined per file."); //TODO: Is it works when compiling folders?

        state.leaf();
        state.item.type = "cell";

        utils.cell_(state);
        utils.block(state);

        first = false;
    }

};