{% extends 'layout.tpl' %}

{% block body %}
{{ content | safe }}{% if not metadata.parent.childs %}
<p>Pas de posts actuellement !</p>
{% else %}
<section class="main-articles">
  {% for post in metadata.parent.childs %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.index.path}}{{post.index.name}}.html"
        title="{{post.index.title}}">
        {{post.index.title}}
      </a>
    </h2>
    <p>{{post.index.description}}</p>
  </article>
  {% endfor %}
</section>
{% endif %}
{% endblock %}
