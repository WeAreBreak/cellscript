/**
 * While Statement Processor for the CellScript Parser
 */

var parserUtils = require("js-parser-utils"),
    validators = parserUtils.validators,
    constants = parserUtils.constants,
    utils = parserUtils.utils;

validators = validators.extend({

    isAsync: function(state) {
        return state.token && state.token.type == "keyword" && state.token.data == "async"
    },

    isEndpoint: function(state) {
        return state.token && state.token.type == "keyword" && state.token.data == "endpoint"
    },

    isGet: function(state) {
        return state.token && state.token.type == "identifier" && state.token.data == "get"
    },

    isPost: function(state) {
        return state.token && state.token.type == "identifier" && state.token.data == "post"
    },

    isPut: function(state) {
        return state.token && state.token.type == "identifier" && state.token.data == "put"
    },

    isAuthorize: function(state) {
        return state.token && state.token.type == "identifier" && state.token.data == "authorize"
    },

    isDelete: function(state) {
        return state.token && state.token.type == "keyword" && state.token.data == "delete"
    }

});

/// methods ///
utils = utils.extend({

    endpoint_: function(state) {
        if(!validators.isEndpoint(state)) return state.error(constants.unexpectedToken);
        state.next(); //Skip endpoint keyword.
    },

    async_: function(state) {
        state.item.async = validators.isAsync(state);
        if(state.item.async) state.next(); //Skip endpoint keyword.
    },

    kind: function(state) {
        if(validators.isGet(state)) state.item.subtype = "get";
        else if(validators.isPost(state)) state.item.subtype = "post";
        else if(validators.isPut(state)) state.item.subtype = "put";
        else if(validators.isDelete(state)) state.item.subtype = "delete";
        else return state.error(constants.unexpectedToken);
        state.next(); //Skip kind.
    },

    authorize: function(state) {
        state.item.authorize = false;
        if(validators.isAuthorize(state)) {
            state.item.authorize = true;
            state.next(); //Skip kind.
        }
    },

    expression: function(state) {
        var item = state.item;

        state.item.expression = {};
        state.levelDown();
        state.prepareLeaf(state.item.expression);
        state.expressionProcessor.token(state, "primary"); //TODO: Can it be lefthandside?
        state.clearLeaf();
        state.levelUp();

        state.item = item;
    },

    block: function (state) {
        if(!validators.isBlockStart(state)) return state.error("Missing block start.");
        state.next(); //Skip block start.

        var item = state.item;

        state.levelDown("function");
        state.levelDown("endpoint");
        utils.statementsInBlock(state);
        state.levelUp();
        state.levelUp();

        state.item = item;

        state.next(); //Skip block end.
    }

});

/// public interface ///
module.exports = {

    name: "cell/endpoint.js",
    tokenType: "keyword/endpoint",

    canProcess: function(state) {
        return validators.isEndpoint(state);
    },

    process: function(state) {
        state.leaf();
        state.item.type = "endpoint";

        utils.endpoint_(state);
        utils.async_(state);
        utils.kind(state);
        utils.expression(state);
        utils.authorize(state);
        utils.block(state);
    }

};