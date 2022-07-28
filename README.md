# Webcamapp 

Ce projet est le frontend d'une application qui permet à l'utilisteur de connaitre la célébrité à laquelle il ressemble.
De plus, elle lui permet de faire une video "deepfake" en remplaçant son visage par celui de la célébrité.

<img src="/public/capture.jpg">



https://user-images.githubusercontent.com/66624222/181518042-d66286d3-95e7-48f1-8862-1b6785345423.mp4


https://user-images.githubusercontent.com/66624222/181516871-91143b07-bf6e-4138-a09c-94742febd97c.mp4



https://user-images.githubusercontent.com/66624222/181517594-72a5afa6-7a12-4dad-9ae4-025c80ea6d9b.mp4



## Téchnologies 

Ce projet est développé par ReactJs. Du coup, si vous voulez le faire tourner après l'importation il suffit d'executer les commandes suivantes:

```
$ cd webcamapp
$ npm install
$ npm start 
```

Ensuite, vous pouvez ouvrir le navigateur http://localhost:3000/ .

## Docker 

Pour lancer le projet en utilisant le Dockerfile, il suffit d'executer les commandes suivantes:

```
$ sudo service docker start
$ docker build -t webcamapp:dev . 
$ docker run     -it     --rm     -v ${PWD}:/app     -v /app/node_modules     -p 3000:3000     -e CHOKIDAR_USEPOLLING=true     webcamapp:dev
```

Ensuite, vous pouvez ouvrir le navigateur http://localhost:3000/ .

