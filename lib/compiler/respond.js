/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "respond";
    },

    process: function(leaf, state) {

        var isNumber = false, level = leaf.expression;
        while(level.items.length == 1) {
            level = level.items[0];
            if(level.type == "literal" && level.subtype == "number") {
                isNumber = true;
                break;
            }
        }

        if(isNumber) state.print("res.sendStatus(");
        else state.print("res.send(");

        if (leaf.expression) {
            state.processor.leaf(leaf.expression, state);
        }
        if(leaf.isExpression) state.print(')');
        else state.println(");")
    }

};