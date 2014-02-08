# Site ChtiJS [![Build status](https://api.travis-ci.org/ChtiJS/chtijs.francejs.org.png)](https://travis-ci.org/ChtiJS/chtijs.francejs.org)

> **Avant de commencer à travailler sur le projet pouvez vous lire [le guide
 pour contribuer](CONTRIBUTING.md)**

## Installer le projet

Vous devez avoir nodeJS installé sur votre machine ;)

Entrez les commandes suivante dans un terminal :
- `git clone git@github.com:ChtiJS/chtijs.francejs.org.git` : cloner le dépôt git;
- `cd chtijs.francejs.org` : aller dans le répertoire créé.
- Si vous n'avez jamais utilisé gulp avant, entrez :
`npm install -g gulp` ou `su npm install -g gulp` (celà dépend de votre système
 et de la manière dont node.js est installé).
- `npm install` : installe les dépendances.

## Pour travailler dessus :

Placez vous dans le répertoire du projet et entrez : `gulp`.

Celà lancera un petit serveur et ouvrira votre navigateur sur l'accueil du site.

Toutes les modifications que vous ferez dans le code ou le contenu du site,
 une fois sauvegardées seront prises en comptes et votre navigateur se
 reachargera tout seul.

En ajoutant --prod, vous créez le site en mode production. L'argument --net
 lancera le serveur de développement sur une adresse IP joignable sur votre
 réseau local par d'autre machines.

## Editer le site :

### Contenu

Le contenu du site est dans le répertoire `/documents/contents/`.

Les pages sont matérialisées par les fichiers écrits dans le format markdown (.md).

Ainsi, le fichier `/documents/contenu/archives/index.md` est transformé en url
 "http://127.0.0.1:9001/archives/" dans votre navigateur.

Ces fichiers markdown peuvent comporter des metadatas, qui seront transformées
 en données disponibles pour les templates.

Par défaut les fichiers markdown sont rendus via la template
 `/documents/templates/index.tpl`. Vous pouvez y associer une autre template
 via ces metadata.


### Architecture

Les templates sont dans le répertoire `/documents/templates/`.Le langage utilisé
 est nunjucks (doc: http://jlongster.github.io/nunjucks/templating.html ).

Les CSS sont générées depuis les sources Less située dans `documents/less/`.

### Génération du site

ChtiJS est un site statique généré de façon automatique via la tâche Gulp
 `build_html`. La génération se fait de la manière suivante :

* création d'un arbre représentant la structure du site :
* * tout d'abord, on récupère les documents markdown  situés dans
 `/documents/content`. Ajouter une fichier Markdown dans ce dossier (ou un
 sous dossier) crée une nouvelle page dans le site.
* * ensuite, on génère certaines pages à l'aide d'un plugin car certaines données
 doivent être récupérées depuis le réseau. Ces plugins se trouvent dans le
 dossier `gulpplugins`. Les pages membres, contributeurs et planète sont
 générées de cette manière.
* une fois l'arbre généré, on reprend chaque document un par un et on génère
 la page HTML correspondante grâce au template qui lui est associé.

Et voilà, le site de ChtiJS n'a plus de secret pour vous ;).

