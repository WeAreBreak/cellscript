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

    component_: function(state) {
        state.next(); //Skip cell keyword.
    }

});

/// public interface ///
module.exports = {

    name: "cell/component.js",
    tokenType: "keyword/component",

    canProcess: function(state) {
        return state.token && state.token.type == "keyword" && state.token.data == "component"
    },

    process: function(state) {
        if(!first) return state.error("Only one component can be defined per file."); //TODO: Is it works when compiling folders?

        state.leaf();
        state.item.type = "component";

        utils.component_(state);
        utils.block(state);

        first = false;
    }

};