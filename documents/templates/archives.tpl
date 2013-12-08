{% extends 'layout.tpl' %}

{% block body %}
  {{ content | safe }}
  {% for post in posts %}
  <article class="main-article__{{posts.name}}">
    <h2>
      <a href="{{post.href}}" title="{{post.title}}">{{post.title}}</a>
    </h2>
    <p>{{post.description}}</p>
  </article>
  <hr />{% endfor %}
{% endblock %}
