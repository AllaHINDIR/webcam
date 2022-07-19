# Webcamapp 

Ce projet est le frontend d'une application qui permet à l'utilisteur de connaitre la célébrité à laquelle il ressemble.
De plus, elle lui permet de faire une video "deepfake" en remplaçant son visage par celui de la célébrité.

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

