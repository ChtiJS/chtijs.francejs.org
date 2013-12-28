# Comment contribuer ?

La version de production se trouve sur la [branche master](https://github.com/ChtiJS/chtijs.francejs.org/tree/master/).
La version de test est sur develop.

## Communiquer

Avant de commencer la mise en oeuvre de nouvelles fonctionnalités, cela nous aidera de [créer une issue](https://github.com/ChtiJS/chtijs.francejs.org/issues) et discuter de votre intention.

Il est possible que quelqu'un d'autre travaille déjà sur votre fonctionnalité / contenu, et nous n'aimons pas jetter le travail réalisé par nos contributeurs.

## 1. Commencer une nouvelle fonctionnalité

Créer une nouvelle branche et basculer dessus

    git checkout -b feature/my_awesome_feature

## 2. Sauvegarder votre travail

* sur macOS avec le logiciel [GitX](http://gitx.frim.nl/)

* sur Linux avec le logiciel [GitG](http://idealogeek.fr/2013/gitg/)

* Une fois votre travail terminé

    git push origin

Aller sur gihub et demandez une pull request.
La comunauté très active analysera votre code, et relira votre contenu.

Quand la revue est terminée n'oubliez pas de `squash` vos `commit`.

## 3. Rebase

* Lister vos derniers commit

    git log

* Sélectionnez le CHA de votre commit pour commencer le `rebase`. Généralement c'est l'identifiant précédent votre premier commit.

    git rebase -i 6f3f0eb9a91bfb0bc2171dfed915f094399c746f`

  /!\ `git rebase --abort` Peut vous sauver la vie

      pick bf3e3a2 rename assets
      squash f98622e add logo
      squash d3bcb44 update module footer

  Vous pouvez trouver un guide pour les mots-clés [pick, squash, fixup](https://help.github.com/articles/interactive-rebase)

  /!\ Lorsque vous êtes en mode vi

  `dd` supprimmer une ligne
  `i` insérer un bon message de commit
  `echap :x` pour sauvegarder

* `git push -f` Attention avec cette commande, vous dites au serveur "Vous avez tort, je suis le patron!"


## 4. Merge

* `git checkout develop`

* `git pull --rebase`

  `git pull --no-ff origin my_awesome_feature`

* `git push origin`
