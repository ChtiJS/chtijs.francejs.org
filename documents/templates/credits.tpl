{% extends 'layout.tpl' %}

{% block body %}
<section class="main-members">
  <h1 class="main-members__title">{{metadata.title}}</h1>
  <p class="main-members__intro">{{metadata.description}}</p>
  <p class="main-members__content"{{ content | safe }}</div>
  {% for contributor in metadata.contributors %}
  <article class="main-members__member">
    <h2>
      <a href="{{ contributor.html_url }}" target="__blank">
        <img class="pict" src="{{ contributor.avatar_url }}"/>
        {{ contributor.name }} alias {{ contributor.login }}
      </a>
    </h2>
    <p>
      {{ contributor.contributions }} contributions.{% if contributor.bio %}
      <br />{{ contributor.bio }}{% endif %}
    </p>
  </article>
  {% endfor %}
</section>
{% endblock %}

