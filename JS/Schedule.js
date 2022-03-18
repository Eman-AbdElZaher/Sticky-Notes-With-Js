var input = document.getElementById('input'),
cr=document.getElementById('create'),
clr=document.getElementById('clear'),
stickyparent= document.getElementById('stickyNotes'),
stickycolor=document.querySelectorAll('.stickcolor'),
remove = document.getElementsByClassName("remove"),
radio=document.getElementsByName('radio');
add=document.getElementById('add'),
del =document.getElementById("deleteAll"),
modal = document.getElementById("myModal"),
col=(setColor()==="undefined")?"#F7E98D":setColor(),
task={};
const pattern=/^[a-zA-z0-9]{3,}(.|\n)*$/;
//declare variables of local storage
let stickyArray = localStorage.getItem('list')
? JSON.parse(localStorage.getItem('list'))
: [];

localStorage.setItem('list', JSON.stringify(stickyArray))
const data = JSON.parse(localStorage.getItem('list'));
window.addEventListener('load',function(){
   if(stickyArray!=[])
   {
      for(var i=0;i<data.length;i++)
      {
         task={text:data[i].text,color:data[i].color};
          createSticky(task);
      }
   }
  input.focus();
});

function displayRadioValue() {    
  
    for(i = 0; i < radio.length; i++) { 
       if(radio[i].checked)
         return radio[i].value;
    } 
} 
function setColor(){
  var radiocolor=displayRadioValue();
  if(radiocolor ==="undefined")
   {
        col="#F7E98D";
   }
   else {
      col=radiocolor;  
   }
   return col;
}
   
cr.addEventListener('click',function(){
  
    if(pattern.test(input.value))
    {
       task={text:input.value,color:col};
        addSticky(task);
    }
    else {
        alert("some thing Wrong!");
    }
});

input.addEventListener("keypress", addStickyAfterKeypress);
del.addEventListener('click',function(){
  var response=confirm('Are you sure Delete  All Sticky');
  if(response)
  {
     localStorage.removeItem('list');
     while (stickyparent.firstChild) {
      stickyparent.removeChild(stickyparent.firstChild);
    }

  }
})

clr.addEventListener('click',function(){
    clear();
});

function createSticky(item)
{
  var  s={text:item.text,color:item.color};
    var sticky=document.createElement('div');
    var stickycontent=document.createTextNode(s.text);
    sticky.appendChild(stickycontent);
    var span = document.createElement("span");
     span.classList.add("remove","fas", "fa-trash-alt");
     sticky.appendChild(span);
    sticky.classList.add('sticky');
    sticky.style.backgroundColor=s.color;
    stickyparent.appendChild(sticky);
    console.log(item);
}
function addSticky(task){
    task={text:input.value,color:col};
      stickyArray.push(task);
       localStorage.setItem('list', JSON.stringify(stickyArray));
       createSticky(task);  
       input.value = '';
}

function addStickyAfterKeypress(event) 
 { 
   if (pattern.test(input.value) && (event.which === 13 || event.keyCode === 13)) 
  {
       task={text:input.value,color:col};
       addSticky(task);
  }
 }

function clear(){
    input.value="";
    input.focus();
}

document.addEventListener('click', function (e) {

  if (e.target.classList.contains('remove')) {
     var elem;
     var div = e.target.parentElement;
       div.remove();
      elem=stickyArray.findIndex(function(val){
       return val.text=== div.textContent;
  });
  if(elem > -1)
  {
       stickyArray.splice(elem, 1);
       localStorage.setItem('list', JSON.stringify(stickyArray));  
  }
     
  }
  else if(e.target.name ==="radio")
  {
       var elem=e.target;
          elem.checked=true;
          // console.log(elem);
          // console.log(elem.value);
          displayRadioValue();
          setColor();
          col=(setColor()==="undefined")?"#F7E98D":setColor()
  }
});
//remove sticky note
add.onclick = function() {
  modal.style.display = "block";
}
modal.ondblclick=function(){

       this.style.display = "none";
}