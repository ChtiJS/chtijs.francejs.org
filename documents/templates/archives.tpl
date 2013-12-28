{% extends 'layout.tpl' %}

{% block body %}
{{ content | safe }}
<section class="main-articles">
  {% for post in posts %}
  <article class="main-articles__article">
    <h2>
      <a href="{{post.href}}" title="{{post.title}}">{{post.title}}</a>
    </h2>
    <p>{{post.description}}</p>
  </article>
  {% endfor %}
</section>
{% endblock %}
