{% extends type + '/layout.tpl' %}

{% block body %}
{% if metadata.childs %}
{% for post in metadata.childs %}

    <item>
      <title>{{post.title}}</title>
      <description>{{post.description}}</description>
      <link>{{conf.baseURL}}{{post.path}}{{post.name}}.html</link>
      <pubDate>{{ post.published }}</pubDate>
    </item>

{% endfor %}
{% endif %}
{% endblock %}

