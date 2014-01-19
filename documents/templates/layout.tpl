<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <title>ChtiJS{% if metadata.title %} : {{ metadata.title }}{% endif %}</title>
    <meta name="description" content="{% if metadata.title %}{{ metadata.title }}{% else %}Communauté des développeurs JavaScript du Nord de la France{% endif %}">
    <meta name="robots" content="index,follow">
    <!--[if IE 8]><link rel="stylesheet" href="{{conf.baseURL}}/css/main.ie.css"><![endif]-->
    <!--[if gt IE 8]><!--><link rel="stylesheet" href="{{conf.baseURL}}/css/main.css"><!--<![endif]-->
</head>
<body>
    <!--[if lt IE 7]>
    <script>document.location.href=http://browsehappy.com;</script>
    <![endif]-->
    <header>
        <a class="main-logo" href="/">
          <img src="/images/chtijs.svg" alt="ChtiJS" />
        </a>
        <nav class="main-nav">
        	  <ul class="main-nav__body">
                <li class="main-nav__{{tree.name}}">
                    <a href="{{tree.path}}{{tree.name}}.html"
                      title="{{tree.title}}"{% if tree == metadata  %}
                      class="selected"{% endif %}>{{tree.shortTitle}}</a>
                </li>{% for item in tree.childs %}
                <li class="main-nav__{{item.name}}">
                    <a href="{{item.path}}{{item.name}}.html"
                      title="{{item.title}}"{% if item == metadata or item == metadata.parent or item == metadata.parent.parent %}
                      class="selected"{% endif %}>{{item.shortTitle}}</a>
                </li>{% endfor %}
            </ul>
        </nav>
    </header>

    <section class="main-container">
        <a class="menu-button">⇶ Menu</a>
        {% block body %}{% endblock %}
    </section>

    <footer class="main-footer">
        <ul class="main-footer__body">
            <li class="main-footer__twitter">
                <a href="http://twitter.com/ChtiJS"
                  title="Suivre ChtiJS sur Twitter">ChtiJS sur Twitter</a>
            </li>
            <li class="main-footer__github">
                <a href="https://github.com/ChtiJS/"
                  title="Voir le compte GitHub de ChtiJS">ChtiJS sur GitHub</a>
            </li>
            <li class="main-footer__gg-group">
                <a href="https://groups.google.com/forum/#!forum/chtijs"
                  title="S'abonner à notre liste de diffusion">Google Group ChtiJS</a>
            </li>
        </ul>
    </footer>
    <script src="{{conf.baseURL}}/js/script.js"></script>{% if not prod %}
    <script src="{{conf.baseURL}}/js/vendors/livereload.js?host={{conf.ip}}"></script>{% endif %}
</body>
</html>
