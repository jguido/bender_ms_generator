clone project
inside the project:

```npm install```

and then
 
```npm install -g```

Great the generator is installed globally.

Now the usage

1. go the the directory where you want to create the project
2. run ```nbender```
3. Answer question
4. You can go to the project and ```npm install for installing basic dependencies```
5. Where do i add the process of the micro service?

Easy, inside the server.js file at the end, you will see that :

```
app.post('/service', (req, res, next) => {
    
});
```

Inside the req you can access the data sent by the api with:

```req.body.news```

Example : the api send a body like this ```{"type":"shoes"}```
You can access the types parameter with ```req.body.news.types```
