{% extends type + '/layout.tpl' %}

{% block body %}
<section class="main-members">
  <h1 class="main-members__title">{{metadata.title}}</h1>
  <p class="main-members__intro">{{metadata.description}}</p>
  <p class="main-members__content"{{ content | safe }}</div>
  {% for member in metadata.members %}
  <article class="main-members__member">
    <h2>
      <a href="{{metadata.path}}{{member.login}}/index.html">
        <img class="pict" src="{{ member.avatar_url }}"/>
        {{ member.name }} alias {{ member.login }}
      </a>
    </h2>
    <p>{% if member.bio %}
      {{ member.bio }} <br />{% endif %}
      <a href="{{ member.html_url }}" class="main-members__github">
        Profil GitHub
      </a>
    </p>
  </article>
  {% endfor %}
</section>
{% endblock %}

