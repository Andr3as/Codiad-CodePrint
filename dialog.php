<!--
    Copyright (c) Codiad & Andr3as, distributed
    as-is and without warranty under the MIT License. 
    See http://opensource.org/licenses/MIT for more information. 
    This information must remain intact.
-->
<form id="print_form">
    <input type="checkbox" id="displayLines" checked><p>Display line numbers</p><br>
    <button onclick="codiad.modal.unload(); return false;">Close</button>
    <button onclick="codiad.CodePrint.openToPrint(); return false;">Print</button>
</form>