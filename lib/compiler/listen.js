/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "listen";
    },

    process: function(leaf, state) {

        state.print("!function ");
        state.print("(port) ");
        state.println("{");
        state.levelDown();
        state.println("cell.components.server = app.listen(port);");
        state.print("console.log('Cell listening on port', ");
        state.println("port);");
        state.levelUp();
        state.print("}(");
        if (leaf.expression) {
            state.processor.leaf(leaf.expression, state);
        }
        else state.print("80");
        state.println(");");
        state.println("var server = cell.components.server;");
    }

};