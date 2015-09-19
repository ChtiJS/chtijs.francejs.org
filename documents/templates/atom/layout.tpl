<?xml version="1.0" encoding="utf-8"?>

<feed xmlns="http://www.w3.org/2005/Atom">

  <id>{{conf.baseURL}}{{metadata.path}}{{metadata.name}}.html</id>
  <title>{{conf.name}}{% if metadata.title %} : {{ metadata.title }}{% endif %}</title>
  <subtitle>{% if metadata.description %}{{ metadata.description }}{% else %}{{conf.description}}{% endif %}</subtitle>
  <link href="{{conf.baseURL}}{{metadata.path}}{{metadata.name}}.atom" rel="self" type="application/atom+xml" />
  <link href="{{conf.baseURL}}{{metadata.path}}{{metadata.name}}.html" rel="alternate" type="text/html" />
  <updated>{% if metadata.published %}{{ metadata.published }}{% else %}{{ conf.build.created }}{% endif %}</updated>

  {% block body %}{% endblock %}

</feed>
