function spread(count){
  document.getElementById('folder-checkbox-' + count).checked =
  !document.getElementById('folder-checkbox-' + count).checked
  document.getElementById('spread-icon-' + count).style.content =
  document.getElementById('spread-icon-' + count).style.content == '\f077' ?
  '\f078' : '\f077'
}