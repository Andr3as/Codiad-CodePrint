/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information. 
 * This information must remain intact.
 */

(function(global, $){
    
    var codiad  = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path    = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';
    var highlight   = ace.require('ace/ext/static_highlight');

    $(function() {
        codiad.CodePrint.init();
    });

    codiad.CodePrint = {
        
        path: curpath,
        module: null,
        file: "",
        printed: true,
        lines: true,
        
        init: function() {
            var _this = this;
            ace.require("ace/config").loadModule("ace/ext/static_highlight", function(module){
                _this.module = module;
            });
            $('#workspace').after('<div id="print-area"></div>');
            $('#print-area').after('<link href="'+this.path+'print.css" media="print" rel="stylesheet" />');
            amplify.subscribe("active.onFocus", function(path){
                if (_this.printed === false && _this.file === path) {
                    _this.print();
                }
            });
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Show dialog
		//
		//  Parameters:
		//
		//  path - {String} - File path
		//
		//////////////////////////////////////////////////////////
        showDialog: function(path) {
            this.file = path;
            codiad.modal.load(220, this.path+"dialog.php");
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Open File to print
        //
		//////////////////////////////////////////////////////////
        openToPrint: function() {
            if ($('#displayLines').attr("checked") == "checked") {
                this.lines = true;
            } else {
                this.lines = false;
            }
            this.printed = false;
            codiad.filemanager.openFile(this.file);
            codiad.modal.unload();
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Print file
        //
		//////////////////////////////////////////////////////////
        print: function() {
            this.printed = true;
            var editor = codiad.editor.getActive();
            var result = this.module.renderSync(editor.getValue(), editor.getSession().getMode(), editor.renderer.theme);
            $('#print-area').html(result.html);
            if (!this.lines) {
                $('#print-area .ace_gutter').css("display", "none");
            }
            ace.require("ace/lib/dom").importCssString(result.css);
            setTimeout(function(){
                var title = document.title;
                document.title = codiad.active.getPath();
                window.print();
                document.title = title;
            }, 0);
        }
    };
})(this, jQuery);