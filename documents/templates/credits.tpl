{% extends 'layout.tpl' %}

{% block body %}
<section class="main-members">
  <h1 class="main-members__title">{{metadata.title}}</h1>
  <p class="main-members__intro">{{metadata.description}}</p>
  <p class="main-members__content"{{ content | safe }}</div>
  {% for contributor in metadata.contributors %}
  <article class="main-members__member">
    <p>
      <a href="{{ contributor.html_url }}" target="__blank">
        <img class="pict" src="{{ contributor.avatar_url }}"/>
        {{ contributor.name }} ({{ contributor.login }}
        - ({{ contributor.contributions }} contributions)
      </a>
    </p>
  </article>
  {% endfor %}
</section>
{% endblock %}

