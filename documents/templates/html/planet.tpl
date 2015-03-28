{% extends type + '/layout.tpl' %}

{% block body %}
<section class="main-articles">
  <h1 class="main-articles__title">{{metadata.title}}</h1>
  <p class="main-articles__intro">{{metadata.description}}</p>
  <p class="main-articles__content"{{ content | safe }}</div>
  {% if not metadata.entries %}
  <p>Pas de posts actuellement !</p>
  {% else %}
    {% for post in metadata.entries %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.link}}"
        title="{{post.title}}">
        {{post.title}}
      </a>
    </h2>
    <p>{% if post.summary %}
      {{post.summary}}<br />{% endif %}
      <a href="{{post.blog.url}}" title="Voir le blog de l'auteur">
        {{post.blog.author}}
      </a>
    </p>
  </article>
    {% endfor %}
  {% endif %}
</section>
{% endblock %}

