document.addEventListener('DOMContentLoaded', function() {
    
    header = document.querySelector('body > header');
    [].forEach.call(document.querySelectorAll('.menu-button'), function(button) {
        button.addEventListener('click', function() {
            header.classList.toggle('display');
        })
    })
    document.addEventListener('click', function(evt) {
        var elt = evt.target;
        while(elt != document) {
          if(elt == header || elt.classList.contains('menu-button')) {
            return;
          }
          elt = elt.parentNode;
        }
        header.classList.remove('display');
    })
});
