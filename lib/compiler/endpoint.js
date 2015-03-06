/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "endpoint";
    },

    process: function(leaf, state) {
        state.print("app.");
        state.print(leaf.subtype);
        state.print("(");
        state.processor.leaf(leaf.expression, state);
        state.print(", ");
        if(leaf.authorize) {
            state.print("authentication.authorize, ");
        }
        state.print("function");
        if(leaf.generator) state.print("* ");
        state.print("(req, ");
        state.print("res, ");
        state.print("next) ");
        state.println("{");
        state.levelDown();

            if(leaf.async) {
                state.println("inq(function* () {");
                state.levelDown();
            }

            state.processor.level(leaf.items, state);

            if(leaf.async) {
                state.levelUp();
                state.println("}).error(next);");
            }

        state.levelUp();
        state.println("});");
        state.println("");
    }

};