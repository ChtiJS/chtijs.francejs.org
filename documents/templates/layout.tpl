<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="fr"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <title>ChtiJS{% if metadata.title %} : {{ metadata.title }}{% endif %}</title>
    <meta name="description" content="{% if metadata.title %}{{ metadata.title }}{% else %}Communauté des développeurs JavaScript du Nord de la France{% endif %}">
    <meta name="robots" content="index,follow">
    <link rel="stylesheet" href="{{metadata_site.base_url}}/css/main.css">
    {% if metadata.stylesheet %}<link rel="stylesheet" href="{{ metadata.stylesheet }}">{% endif %}
</head>
<body>
    <!--[if lt IE 7]>
    <script>document.location.href=http://browsehappy.com;</script>
    <![endif]-->
    <header>
        <nav class="main-nav">
        	  <ul class="main-nav__body">{% for item in menu %}
                <li class="main-nav__{{item.name}}">
                    <a href="{{item.href}}"
                      title="{{item.title}}"{% if item.selected %}
                      selected="selected"{% endif %}>{{item.link}}</a>
                </li>{% endfor %}
            </ul>
        </nav>
    </header>

    <section class="main-container">
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

    <script src="javascript/script.js"></script>
</body>
</html>
