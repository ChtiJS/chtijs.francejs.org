<nav class="main-nav">
	<ul class="main-nav__body">{% for name, item in menu %}
		<li class="main-nav__{{item.name}}">
			<a href="{{item.href}}" title="{{item.title}}">{{item.link}}</a>
		</li>
  {% endfor %}
	</ul>
</nav>
