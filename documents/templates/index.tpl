{% extends 'layout.tpl' %}

{% block body %}
<article class="main-text">
  {{ content | safe }}
</article>
<p>{% if metadata.parent.index == metadata %}
  <a href="{{metadata.parent.parent.index.path}}{{metadata.parent.parent.index.name}}.html"
    title="{{metadata.parent.parent.index.title}}">
    &lt; {{metadata.parent.parent.index.shortTitle}}
  </a>
{% else %}
  <a href="{{metadata.parent.index.path}}{{metadata.parent.index.name}}.html"
    title="{{metadata.parent.index.title}}">
    &lt; {{metadata.parent.index.shortTitle}}
  </a>
{% endif %}
</p>
{% endblock %}
