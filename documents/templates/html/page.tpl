{% extends type + '/layout.tpl' %}

{% block body %}
<article class="main-text">
  {{ content | safe }}
</article>{% if metadata.parent %}
<p>
  <a href="{{metadata.parent.path}}{{metadata.parent.name}}.html"
    title="{{metadata.parent.title}}">
    &lt; {{metadata.parent.shortTitle}}
  </a>
</p>{% endif %}
{% endblock %}
