Start debugging
    `npm start`
or
Build project
    `npm run build`
then in file **/build/index.html** move the ***<script>...</script>*** tag along with its contents between tags ***</body>*** and ***</html>***

and then run
    `gulp`


## To swith to login page
in file **/public/data.json** set 
    "state": "LOGIN"

## To switch to other pages
in file **/public/data.json** set
    "state": "OK"
