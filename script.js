
var after = ''

//fetchMemes()
//1.Change Color of memebtn
//2. Create new div with id memes
//3. fetch memes from subreddit memes
//4. for each meme, a div will be created which will hold the meme and the caption
function fetchMemes(){
  color()

  if (document.getElementById('memes')) {
    document.getElementById('memes').remove();
  }

  let parentdiv = document.createElement('div');
  parentdiv.id = 'memes'
  fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
  //.then response turned into response.json turned into body
    .then(response => response.json())
    .then(body => {
      //body.data returns a string that is after, after is used for pagination
      //necessary to make new parentdiv;adds new memes
      after = body.data.after
      // children is array of objects, each object has data object
      // This provides title of the post, author name, post_hint: "image"
      // url_overdriven_by_dest: link of the image
      console.log(after)
      for (let index=0; index<body.data.children.length; index++) {
        //run a for loop for children so that every post will be the body of data.children[index]
        if (body.data.children[index].data.post_hint === 'image') {
          let div = document.createElement('div')
          let h4 = document.createElement('h4')
          let image = document.createElement('img')
          image.src = body.data.children[index].data.url_overridden_by_dest
          h4.textContent = body.data.children[index].data.title
          // append elements
          div.appendChild(h4)
          div.appendChild(image)
          parentdiv.appendChild(div)
        }
      }
      //once for loop is done, we append parentdiv to the body
      document.body.appendChild(parentdiv);
    }
   );
}