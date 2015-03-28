{% extends type + '/layout.tpl' %}

{% block body %}
{{ content | safe }}{% if not metadata.childs %}
<p>Pas de posts actuellement !</p>
{% else %}
<section class="main-articles">
  {% for post in metadata.childs %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.path}}{{post.name}}.html"
        title="{{post.title}}">
        {{post.title}}
      </a>
    </h2>
    <p>{{post.description}}</p>
    <p>{{post.published | date(metadata.lang)}}</p>
  </article>
  {% endfor %}
</section>
{% endif %}
{% endblock %}
