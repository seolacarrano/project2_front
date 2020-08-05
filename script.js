const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";
const $titleEditInput = $("#titleeditinput");
const $noteEditInput = $("#noteeditinput");
const $editButton = $("#editbutton");

//const $ul = $("ul");
//const $button = $("#createbutton");
const $images = $(".images")
const $newnote = $(".newnote")
const $allnotes = $(".allnotes")
const $submit = $('#submit')
const $save = $('#save')
const editSubmit = $('#submit-edit')

//get images from api and populate selector input
const getImage = async () => {
    const response = await fetch ('http://localhost:3000/image')
    const data = await response.json()

    //populate selector with retrieved data
    data.forEach((image) => {
      const imageNode = document.createElement('img')
      imageNode.setAttribute('src', image.url)
      //imageNode.classList.add('image')
      
      $images.append(imageNode)
      //delete
    $images.append($("<button>").addClass("deletebutton").text("delete").attr("id", image._id).on("click", deleteImage))
    })
};

//get notes from api and populate selector input
const getNote = async () => {
  const response = await fetch ('http://localhost:3000/note')
  const data = await response.json()
  console.log(data);

  //populate DOM with notes
  data.forEach((note) => {
    //console.log(note)
    const $notecontainer = $("<div>")
    const $title = $("<div>").text(`${note.title}`)
    const $note = $("<div>").text(`${note.note}`)
    $notecontainer.append($title, $note)
    if (note.image[0]) {
      const $image = $("<img>").attr("src", `${note.image[0].url}`) 
      $notecontainer.append($image)
    } 
    
    //update
    $notecontainer.append($("<button>").addClass("editnotebt").text("edit").on("click", (event) => {
      $titleEditInput.val(note.title)
      $noteEditInput.val(note.note)
      $editButton.attr("id", note._id)
    }))
    

    //delete
    $notecontainer.append($("<button>").addClass("deletenotebt").text("delete").attr("id", note._id).on("click", deleteNote))
    $allnotes.append($notecontainer)
  })

}

//add a new image
$submit.on('click', (e) => {
    // submits the post request to create a new picture
    const newImage = {
        title : $('#imagetitle').val(),
          url : $('#url').val()
    }
  
    fetch('http://localhost:3000/image', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImage)
      })
      .then(resp => resp.json())
      //.then(resp => {addImage(resp)})
      $images.empty()
      getImage()
    
  })

  //add a new note
    $save.on('click', (e) => {
      // submits the post request to create a new picture
      const newNote = {
          title : $('#title').val(),
          note : $('#note').val(),
          //image : $('#savedimage'),
      }
      
      fetch('http://localhost:3000/note', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNote)
        })
        .then(resp => resp.json())
        
        $allnotes.empty()
        getNote()
    })
 

//delete a note
const deleteNote = async (event) => {
  const response = await fetch(`${URL}/note/${event.target.id}`, {
  method: "delete"
  })
  //update the dom
  $allnotes.empty()
  getNote()
}

//delete an image
const deleteImage = async (event) => {
  const response = await fetch(`${URL}/image/${event.target.id}`, {
  method: "delete"
  })
  $images.empty()
  getImage()
   }


//Update a note
const updateNote = async (event) => {
  //Logging the event object
  console.log(event)
  //Create Updated Rat Object
  const updatedNote = {
    title: $titleEditInput.val(),
    note: $noteEditInput.val()
  }
  //make our put request
  const response = await fetch(`${URL}/note/${event.target.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedNote)
  })
  //update the dom
  $allnotes.empty();
  getNote();
}



getImage()
getNote()


//add update function to edit submit button
$editButton.on("click", updateNote)




//hamburger icon 
const $hamburger = $('.hamburger');
const $links = $('.link');
let show = false;
  
const showMenu = (event) => {
 if (show){
 $links.each(function(index){
  $(this).css('display','none')
  })
  show = false
  }else{
   $links.each(function(index){
   $(this).css('display','block')
   })
  show = true
  }
}
$hamburger.on('click', showMenu)