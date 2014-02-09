{% extends 'layout.tpl' %}

{% block body %}
<section class="main-members">
  <h1 class="main-members__title">{{metadata.title}}</h1>
  <p class="main-members__intro">{{metadata.description}}</p>
  <p class="main-members__content"{{ content | safe }}</div>
  {% for member in metadata.members %}
  <article class="main-members__member">
    <p>
      <a href="{{ member.html_url }}" target="__blank">
        <img class="pict" src="{{ member.avatar_url }}"/>
        {{ member.login }}&nbsp;&nbsp;-&nbsp;&nbsp; {{ member.name }}
      </a>
      {{ member.bio }}
    </p>
  </article>
  {% endfor %}
</section>
{% endblock %}

