{% extends 'layout.tpl' %}

{% block body %}
<article class="main-text">
  {{ content | safe }}
</article>
{% endblock %}
