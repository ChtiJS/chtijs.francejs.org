# Site ChtiJS

> **Avant de commencer à travailler sur le projet lisez, s'il vous plaît, [le guide pour contribuer](CONTRIBUTING.md)**

## Installer le projet

Vous devez avoir nodeJS installé sur votre machine ;)

Entrez les commandes suivante dans un terminal :
- `git clone git@github.com:ChtiJS/chtijs.francejs.org.git` : cloner le dépôt git;
- `cd chtijs.francejs.org` : aller dans le répertoire créé.
- Si vous n'avez jamais utilisé grunt avant, entrez :
`npm install -g grunt-cli` ou `su npm install -g grunt-cli` (celà dépend de votre système et de la manière dont node.js est installé).
- `npm install` : installe les dépendances.

## Pour travailler dessus :

Placez vous dans le répertoire du projet et entrez : `grunt dev`.

Celà lancera un petit serveur et ouvrira votre navigateur sur l'accueil du site.

Toutes les modifications que vous ferez dans le code ou le contenu du site, une fois sauvegardées seront prises en comptes et votre navigateur se reachargera tout seul.

## Éditer le site :

### Contenu

Le contenu du site est dans le répertoire `/documents/contents/`.

Les pages sont matérialisées par les fichiers écrits dans le format markdown (.md).

Ainsi, le fichier `/documents/contenu/archives/index.md` est transformé en url "http://127.0.0.1:9001/archives/" dans votre navigateur.

Ces fichiers markdown peuvent comporter des metadatas, qui seront transformées en données disponibles pour les templates.

Par défaut les fichiers markdown sont rendus via la template `/documents/templates/index.tpl`. Vous pouvez y associer une autre template via ces metadatas.


### Architecture

Les templates utilisées pour générer les pages webs du site sont dans le répertoire `/documents/templates/`

Le langage utilisé est nunjucks (doc: http://jlongster.github.io/nunjucks/templating.html ).

Les CSS sont dans... `/documents/css/`et `documents/less/` (pour les CSS générées par le plugin grunt d'icônes de nicolas).

### Génération du site

Actuellement nous utilisons [Grunt](http://gruntjs.com/). 

Nous sommes également en train d'étudier un autre système : [Glup](http://gulpjs.com/) qui pourrait présenter [divers avantages face à Grunt](http://www.insertafter.com/articles-gulp_vs_grunt.html). 

#### Organisation du gruntfile :

Le gruntfile ne contient juste qu'un chargeur de tâches et de config.

Les tâches et la configuration sont découpés en modules qui sont rangés dans une arbo de répertoires :

```
grunt-config
├── base_config.js
├── base_tasks.js
├── dev-mode
│   └── config.js
├── icons
│   ├── config.js
│   └── icons2fonts-tasks.js
├── optim
│   └── config.js
└── website_build
    ├── build_content-config.js
    ├── build_content-tasks.js
    ├── build_front-config.js
    ├── build_front-tasks.js
    ├── environment-config.js
    ├── environment-tasks.js
    ├── publish-config.js
    └── publish-tasks.js
```

Voici les "glob patterns" qui sélectionnent les fichiers de config, et les fichiers de tâches :

```js
//we have 1 base config, and possibly many specific config
  var configLocations = [
    './grunt-config/base_config.js',
    './grunt-config/**/config.js',
    './grunt-config/**/*-config.js'
  ];

  //we have 1 base tasks definition, and possibly many specific tasks
  var tasksLocations = [
    './grunt-config/base_tasks.js',
    './grunt-config/**/tasks.js',
    './grunt-config/**/*-tasks.js'
  ];
```

Les fichiers contenant de la config sont mergés en un gros objet JS, tandis que les fichiers contenant des tâches sont simplement exécutés (ils retournent une fonction qui fait un appel à grunt.registerTask()).

C'est uniquement le nommage des fichiers (voir ci-dessous) qui détermine s'ils contiennent de la configuration ou des tâches.
la sous-arborescence du répertoire grunt-config a juste un rôle de classement thématique, pour les devs. Aucun rôle ou effet technique.


