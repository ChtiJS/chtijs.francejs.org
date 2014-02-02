{% extends 'layout.tpl' %}

{% block body %}
{{ content | safe }}
<section class="main-members">
  {% for member in members %}
    <article class="main-members__member">
      <h2>
	<a href="{{member.html_url}}" target="__blank">
          <img src="{{member.avatar_url}}" />
          {{member.login}}
        </a>
      </h2>
    </article>
  {% endfor %}
</section>
{% endblock %}
