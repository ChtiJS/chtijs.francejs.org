<nav class="main-nav">
	  <ul class="main-nav__body">{% for item in menu %}
        <li class="main-nav__{{item.name}}">
            <a href="{{item.href}}"
              title="{{item.title}}"{% if item.selected %}
              class="selected"{% endif %}>{{item.link}}</a>
        </li>{% endfor %}
    </ul>
</nav>

