{% extends 'layout.tpl' %}

{% block body %}
{{ content | safe }}
<section class="main-credits">
  {% for contributor in contributors %}
    <article class="main-credits__contributor">
      <img class="pict" src="{{ member.avatar_url }}"/>
      <div class="link">
        <a href="{{ contributor.html_url }}" target="__blank">{{ contributor.login }}{% if contributor.name %}&nbsp;&nbsp;-&nbsp;&nbsp;{{ contributor.name }}{% endif %}</a>
      </div>
      <div class="clr"></div>
    </article>
  {% endfor %}
</section>
{% endblock %}
