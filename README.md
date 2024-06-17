Page preview: https://himikat123.github.io/Web-Interface-BIM/

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


## Public to gihub-pages
in file **/package.json** replace **homepage_** with **homepage**
in file **/App.tsx** get data from file instead server
`npm run deploy`