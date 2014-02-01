<!-- varstream
title=La communauté JavaScript du Nord
description=ChtiJS est un groupe de développeurs JavaScript passionnés qui \
échangent régulièrement découvertes et bonnes pratiques autour d'une bière dans \
une ambiance décontractée.
keywords.+=JavaScript
keywords.+=groupe
keywords.+=Nord
keywords.+=Pas-de-Calais
-->
# Annuaire de nos membres
<script type="text/javascript">
  var sc, id = "member-list";
  function getMembers(members) {
    var i, sc;
    for (i = 0; i < members.data.length; i++) {
      window["cb_" + members.data[i].id] = function(usr) {
       console.log(usr.name); 
      };
      sc = document.createElement("script");
      sc.src = "http://osrc.dfm.io/" + members.data[i].login + ".json?callback=cb_" + members.data[i].id;
      sc.type = "text/javascript";
      document.head.appendChild(sc);
    }
  };
  sc = document.createElement("script");
  sc.src = "https://api.github.com/orgs/chtijs/public_members?callback=getMembers";
  sc.type = "text/javascript";
  document.head.appendChild(sc);
</script>
