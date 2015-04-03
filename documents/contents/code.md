<!--VarStream
title=Conventions de code
description=Conventions de code pour les projets de ChtiJS.
shortTitle=Conventions
shortDesc=Voir nos conventions
keywords.+=JavaScript
keywords.+=Guideline
lang=fr
location=FR
-->

# Conventions de code

Message à l'attention de la communauté rédigé par le bureau des conventions
 hystériques ([@kdisneur](https://twitter.com/kdisneur) et
 [@_flexbox](https://twitter.com/_flexbox)).

## Pourquoi c'est important ?

* Garder un code source cohérent, facilement maintenable et lisible
* Avoir un format universel est indispensable pour garder un projet évolutif

## Les règles

[Les règles de Google](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
 pour le JavaScript sont communément admises. Celles-ci se recoupent avec les
 règles les plus
 [couramment utilisées](http://sideeffect.kr/popularconvention#javascript)
 pour JavaScript sur GitHub.

## Personnaliser son éditeur

Vous trouverez ci dessous les préférences de différents éditeurs de texte
 utilisés par la communauté.

### Sublime Text

Ouvrir les préférences avec `cmd` + `,`

    {
      "detect_indentation": true,
      "tab_size": 2,
      "translate_tabs_to_spaces": true,
      "trim_automatic_white_space": true,
      "trim_trailing_white_space_on_save": true
    }

### Vim

Éditez votre fichier .vimrc :

    set autoindent
    set smartindent
    set tabstop=2
    set softtabstop=2
    set expandtab
    autocmd BufWritePre *.js %s/\s\+$//ge

