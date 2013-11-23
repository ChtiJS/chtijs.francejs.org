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
