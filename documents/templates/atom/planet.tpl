{% extends type + '/layout.tpl' %}

{% block body %}
{% if metadata.childs %}
{% for post in metadata.childs %}

    <entry>
      <id>{{conf.baseURL}}{{post.path}}{{post.name}}.html</id>
      <title>{{post.title}}</title>
      <link href="{{conf.baseURL}}{{post.path}}{{post.name}}.html" rel="alternate" type="text/html" />
      <updated>{% if post.published %}{{ post.published }}{% else %}{{ conf.build.created }}{% endif %}</updated>
      <published>{% if post.published %}{{ post.published }}{% else %}{{ conf.build.created }}{% endif %}</published>
      <summary>{{post.description}}</summary>
    </entry>

{% endfor %}
{% endif %}
{% endblock %}

