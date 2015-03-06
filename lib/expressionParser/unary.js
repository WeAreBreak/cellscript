/**
 * Function Declaration Processor for the CellScript Parser
 */

/// constants ///
var constants = {
    prefixKeywords: [ "respond" ]
};

/// methods ///
var utils = {

    expression: function(state) {
        state.item.expression = {};
        state.prepareLeaf(state.item.expression);
        if(!state.expressionProcessor.token(state, ["expression"])) return false;
        state.clearLeaf();

        return true;
    },

    unaryRespond: function(state) {
        if(!state.hasScope("endpoint")) return state.error("Unexpected respond statement.");

        state.item.type = "respond";
        state.item.isExpression = true;
        return utils.expression(state);
    }


};

/// public interface ///
module.exports = {

    constants: {
        prefixKeywords: constants.prefixKeywords
    },

    methods: {
        'respond': utils.unaryRespond
    }

};