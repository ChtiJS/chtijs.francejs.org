{% extends 'layout.tpl' %}

{% block body %}
<h1>{{metadata.title}}</h1>
<p>{{metadata.description}}</p>
{{ content | safe }}{% if not metadata.entries %}
<p>Pas de posts actuellement !</p>
{% else %}
<section class="main-articles">
  {% for post in metadata.entries %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.id[0]}}"
        title="{{post.title[0]}}">
        {{post.title[0]}}
      </a>
    </h2>
    <p>
      {{post.summary[0]}} par
      <a href="{{post.blog.url}}" title="Voir le blog de l'auteur">
        {{post.blog.author}}
      </a>
    </p>
  </article>
  {% endfor %}
</section>
{% endif %}
{% endblock %}
