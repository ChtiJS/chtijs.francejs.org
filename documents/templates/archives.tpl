{% extends 'layout.tpl' %}

{% block body %}
<section class="main-articles">
  {{ content | safe }}
  <hr />{% for post in posts %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.href}}" title="{{post.title}}">{{post.title}}</a>
    </h2>
    <p>{{post.description}}</p>
  </article>
  <hr />{% endfor %}
</section>
{% endblock %}
