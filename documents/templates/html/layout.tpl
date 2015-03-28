<!DOCTYPE html>
<html class="no-js" lang="{% if metadata.lang %}{{metadata.lang}}{% else %}{{conf.lang}}{% endif %}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <title>{{conf.name}}{% if metadata.title %} : {{ metadata.title }}{% endif %}</title>
    <meta name="description" content="{% if metadata.description %}{{ metadata.description }}{% else %}{{conf.description}}{% endif %}">
    <link rel="icon" type="image/png" href="/images/favicon.png" />
    <meta name="robots" content="index,follow">
    <!--[if lte IE 8]><link rel="stylesheet" href="{{conf.baseURL}}/css/main-ie.css"><![endif]-->
    <!--[if gt IE 8]><!--><link rel="stylesheet" href="{{conf.baseURL}}/css/main.css"><!--<![endif]-->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-39130596-3', 'francejs.org');
      ga('send', 'pageview');

    </script>
</head>
<body>
    <!--[if lt IE 7]>
    <script>document.location.href=http://browsehappy.com;</script>
    <![endif]-->
    <header>
        <a class="main-logo" href="{{tree.path}}{{tree.name}}.html" title="{{tree.shortDesc}}">
          <img src="/images/chtijs.svg" alt="ChtiJS" />
        </a>
        <nav class="main-nav">
        	  <ul class="main-nav__body">
                <li class="main-nav__{{tree.name}}">
                    <a href="{{tree.path}}{{tree.name}}.html"
                      title="{% if tree.shortDesc %}{{tree.shortDesc}}{% else %}{{tree.title}}{% endif %}"{% if tree == metadata  %}
                      class="selected"{% endif %}>{{tree.shortTitle}}</a>
                </li>{% for item in tree.childs %}
                <li class="main-nav__{{item.name}}">
                    <a href="{{item.path}}{{item.name}}.html"
                      title="{% if item.shortDesc %}{{item.shortDesc}}{% else %}{{item.title}}{% endif %}"{% if item == metadata or item == metadata.parent or item == metadata.parent.parent %}
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
            <li class="main-footer__feed">
                <a href="/archives/index.atom"
                  title="S'abonner à notre flux de syndication">RSS</a>
            </li>
        </ul>
    </footer>
    <script src="{{conf.baseURL}}/js/script.js"></script>{% if not prod %}
    <script src="{{conf.baseURL}}/js/vendors/livereload.js?host={{conf.ip}}"></script>{% endif %}
</body>
</html>

