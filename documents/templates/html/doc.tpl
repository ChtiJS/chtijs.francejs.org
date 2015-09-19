{% extends type + '/layout.tpl' %}

{% block body %}{% if metadata.childs %}
<ul class="main-docs">
  {% for doc in metadata.childs %}
  <li class="main-docs__child">
    <a href="{{doc.path}}{{doc.name}}.html"
      title="{{doc.title}}">
      {{doc.title}}
    </a>
  </li>
  {% endfor %}
</ul>{% if metadata.parent %}
<p>
  <a href="{{metadata.parent.path}}{{metadata.parent.name}}.html"
    title="{{metadata.parent.title}}">
    &lt; {{metadata.parent.shortTitle}}
  </a>
</p>{% endif %}
{% endif %}
{{ content | safe }}
{% endblock %}
