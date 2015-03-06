/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "include";
    },

    process: function(leaf, state) {
        if(leaf.folder) {
            state.print("require('fs').readdirSync(cell.path+");
            state.print('"/'+leaf.kind+'/"');
            state.print(").forEach(function(file){if(file.match(/.+\.js/g)!==null)this[file.replace('.js','')]=require(cell.path+");
            state.print('"/'+leaf.kind+'/"');
            state.println("+file)},cell.components);");
        }
        else {
            if(!leaf.silent) {
                state.print("var");
                state.meaningfulSpace();
                state.print(leaf.name || leaf.kind);
                state.print(" = ");
                state.print("cell.components.");
                state.print(leaf.name || leaf.kind);
            }

            if (leaf.use) {
                state.println(";");
            }
            else {
                if(!leaf.silent) {
                    state.print(" = ");
                    state.print("cell.components.");
                    state.print(leaf.name || leaf.kind);
                    state.print(" || ");
                }
                state.print("require(cell.path+'/");
                state.print(leaf.kind);
                state.println("').call({}, cell);");
            }
        }
    }

};