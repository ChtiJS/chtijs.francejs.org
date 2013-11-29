# Site ChtiJs

## Pour installer le site chez vous :

Vous devez avoir nodeJS installé sur votre machine ;)

Entrez les commandes suivante dans un terminal :
- `git clone git@github.com:ChtiJS/chtijs.francejs.org.git` : cloner le dépôt git;
- `cd chtijs.francejs.org` : aller dans le répertoire créé.
- Si vous n'avez jamais utilisé grunt avant, entrez :  
`npm install -g grunt-cli` ou `su npm install -g grunt-cli` (celà dépend de votre système et de la manière dont node.js est installé).
- `npm install` : installe les dépendances.

## Pour travailler dessus :

Placez vous dans le répertoire du projet et entrez : `grunt-dev`.

Celà lancera un petit serveur et ouvrira votre navigateur sur l'accueil du site.

Toutes les modifications que vous ferez dans le code ou le contenu du site, une fois sauvegardées seront prises en comptes et votre navigateur se reachargera tout seul.

## Editer le site :

### Contenu :

Le contenu du site est dans le répertoire `/documents/contenu/`.

Les pages sont matérialisées par les fichiers écrits dans le format markdown (.md).

Ainsi, le fichier `/documents/contenu/archives/index.md` est transformé en url "http://127.0.0.1:9001/archives/" dans votre navigateur.

Ces fichiers markdown peuvent comporter des metadatas, qui seront transformées en données disponibles pour les templates. 

Par défaut les fichiers markdown sont rendus via la template `/documents/templates/index.tpl`. Vous pouvez y associer une autre template via ces metadata.


### Forme du site :

Les templates sont dans le répertoire `/documents/templates/`

Le langage utilisé pour l'instant est nunjucks (doc: http://jlongster.github.io/nunjucks/templating.html ).

Les CSS sont dans... `/documents/css/`et `documents/less/` (pour les CSS générées par le plugin grunt d'icônes de nicolas).


### Construction du site :

TODO.


----


# ChtiJS Website

## To participate
Type the following in a shell :
- `git clone git@github.com:ChtiJS/chtijs.francejs.org.git` Clone the repository
- `cd chtijs.francejs.org` Go into the new directory.
- If you have never used grunt before : `npm install -g grunt-cli` or `su npm install -g grunt-cli` (It depends on how node.js was installed on your system).
- `npm install` Install the tools of work

## Grunt tasks

Develop with `grunt dev` or `grunt dev&`. It launches a livereload server and your browser.

Type `grunt dist` to build the website ready for production.

## How to contribure

### Start a new feature

`git checkout -b feature/my_awesome_feature`
Create a new branch and switch on it


### Save & update

* on macOS `gitx  refs #XXXX: add-commenting`

* on Linux `gitg  refs #XXXX: add-commenting`

* `git push origin`

Go to github & ask for a  pull request

When the review is done don't forget to squash your commit

### Rebase

* `git log`
  List all your previous commit

* `git rebase -i 4d7ca3bb`
  Select the commit you want to rebase from. Generaly its the commit before your first.

  /!\ `git rebase --abort` Can save your life

      pick bf3e3a2 rename assets
      squash f98622e add logo
      squash d3bcb44 update module footer

  You can found a guide for the keywords [pick, squash, fixup](https://help.github.com/articles/interactive-rebase)

  /!\ When you are on vi mode

  `dd` delete line
  `i` insert a good commit message
  `echap :x` For save the file

* `git push -f` Be careful on this, you tell to the server "You are wrong, i am the boss!"


### Merge

* `git co develop`

* `git pull --rebase`

  `git pull --no-ff origin my_awesome_feature`

* `git push`
