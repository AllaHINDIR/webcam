# Webcamapp 

Ce projet est le frontend d'une application qui permet à l'utilisteur de connaitre la célébrité à laquelle il ressemble.
De plus, elle lui permet de faire une video "deepfake" en remplaçant son visage par celui de la célébrité.

<img src="/public/capture.jpg">


## Test avec image

https://user-images.githubusercontent.com/66624222/181551589-f2d4eb99-5c59-4c5a-8f86-dcf6ab9cc986.mp4



https://user-images.githubusercontent.com/66624222/181560621-e5ae70eb-8e62-4bee-a605-b79c094f576b.mp4



https://user-images.githubusercontent.com/66624222/181564460-ac548284-e2ab-44a1-8466-09c9788e39f0.mp4

## Test avec vidéo

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

