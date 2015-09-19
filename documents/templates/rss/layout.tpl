<?xml version="1.0" encoding="UTF-8" ?>

<rss version="2.0">
  <channel>
    <title>{{conf.name}}{% if metadata.title %} : {{ metadata.title }}{% endif %}</title>
    <description>{% if metadata.description %}{{ metadata.description }}{% else %}{{conf.description}}{% endif %}</description>
    <link>{{conf.baseURL}}{{metadata.path}}{{metadata.name}}.html</link>
    <lastBuildDate>{{ conf.build.created }}</lastBuildDate>
    <pubDate>{% if metadata.published %}{{ metadata.published }}{% else %}{{ conf.build.created }}{% endif %}</pubDate>
    <ttl>1800</ttl>

    {% block body %}{% endblock %}

  </channel>
</rss>
