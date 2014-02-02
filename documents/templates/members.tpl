{% extends 'layout.tpl' %}

{% block body %}
{{ content | safe }}
<section class="main-members">
  {% for member in members %}
    <article class="main-members__member">
      <h2>
        {{member.login}}
      </h2>
    </article>
  {% endfor %}
</section>
{% endblock %}
