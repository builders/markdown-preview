/*--------------------------------*/
/* Markdown Previewer             */
/*--------------------------------*/
/* by Stephen Bau                 */
/*--------------------------------*/

var panel = document.getElementById("panel");
var editor = document.getElementById('editor');
var markdown = editor.value;
var preview = document.getElementById('preview');
var buttons = document.getElementsByClassName("button");

var mode = "both";

init();

function init() {
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.addEventListener("click", function( event ) {
      switchMode(this);
    });
  }
  // keyboard();
  updatePreview(markdown);
  editorInput();
}

function switchMode(button) {
  var selected = button.innerText.toLowerCase();
  switch (mode) {
    case "both":
      mode = selected;
      break;
    case "markdown":
      if (selected == mode) {
        mode = "both";
      } else {
        mode = "preview";
      }
      break;
    case "preview":
      if (selected == mode) {
        mode = "both";
      } else {
        mode = "markdown";
      }
  }
  selectButton(mode);
  panel.className = mode;
}

function selectButton(mode) {
  resetButtons();
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText.toLowerCase() == mode) {
      buttons[i].classList.add("select");
    }
  }
}

function resetButtons() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("select");
  }
}

function keyboard() {
  keyboardEvents("keyup");
}

function keyboardEvents(keyEvent) {
  document.addEventListener(keyEvent, function (event) {
    if (event.defaultPrevented) {
      return;
    }
    var key = event.key || event.keyCode;

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (button.dataset.key == key) {
        switchMode(button);
      }
    }
  });
}

function editorInput() {
  if (editor.addEventListener) {
    editor.addEventListener('input', function() {
      updatePreview(editor.value);
    }, false);
  }
}

function updatePreview(markdown) {
  // Create reference instance
  var markedOptions = marked;

  // Set options
  markedOptions.setOptions({
    renderer: new markedOptions.Renderer(),
    highlight: null,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });

  preview.innerHTML = markedOptions(markdown);

}
