<script type="text/javascript">
    var allText =[];
    var allTextLines = [];
    var Lines = [];

    var csvFile = new XMLHttpRequest();
    csvFile.open("GET", "file://C:\wamp64\www\visualization_bar_graph/Marriage.csv", true);
    csvFile.onreadystatechange = function()
    {
        allText = csvFile.responseText;
        allTextLines = allText.split(/\r\n|\n/);
    };

    document.write(allTextLines);<br>
    document.write(allText);<br>
    document.write(txtFile);<br>
</script>