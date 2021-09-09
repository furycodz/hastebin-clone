const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const {nanoid} = require('nanoid')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const uri = "mongodb+srv://furycodz:azerty@hastebin.exxio.mongodb.net/hastebin?retryWrites=true&w=majority";
const Paste = require('./models/Paste')



mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log('Connected to Database...')
})


// app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}));

const db = {


}
app.get('/isUp', (req,res)=>{
    res.send({
        'message':'Up and running !'
    })
})

app.get('/', (req,res) =>{
    text = `# Haste

Sharing code is a good thing, and it should be _really_ easy to do it.
A lot of times, I want to show you something I'm seeing - and that's where we
use pastebins.
    
Haste is the prettiest, easiest to use pastebin ever made.
    
## Basic Usage
    
Type what you want me to see, click "Save", and then copy the URL.  Send that
URL to someone and they'll see what you see.
    
To make a new entry, click "New" (or type 'control + n')
    
## From the Console
    
Most of the time I want to show you some text, it's coming from my current
console session.  We should make it really easy to take code from the console
and send it to people.
    
\`cat something | haste\` # http://hastebin.com/1238193
    
You can even take this a step further, and cut out the last step of copying the
URL with:
    
* osx: \`cat something | haste | pbcopy\`
* linux: \`cat something | haste | xsel\`
* windows: check out [WinHaste](https://github.com/ajryan/WinHaste)
    
After running that, the STDOUT output of \`cat something\` will show up at a URL
which has been conveniently copied to your clipboard.
    
That's all there is to that, and you can install it with \`gem install haste\`
right now.
  * osx: you will need to have an up to date version of Xcode
  * linux: you will need to have rubygems and ruby-devel installed
    
## Duration
    
Pastes will stay for 30 days from their last view.  They may be removed earlier
and without notice.
    
## Privacy
    
While the contents of hastebin.com are not directly crawled by any search robot
that obeys "robots.txt", there should be no great expectation of privacy.  Post
things at your own risk. Not responsible for any loss of data or removed
pastes.
    
## Open Source
    
Haste can easily be installed behind your network, and it's all open source!
    
* [haste-client](https://github.com/seejohnrun/haste-client)
* [haste-server](https://github.com/seejohnrun/haste-server)
    
## Author
    
Code by John Crepezzi <john.crepezzi@gmail.com>
Key Design by Brian Dawson <bridawson@gmail.com>`
    
    res.render('code', {code: text, number: text.split('\n').length})
})

app.get('/new', (req,res) =>{
    res.render('new')
})

app.post('/create', async(req,res) =>{
    // console.log('request received')
    const id = nanoid(7).toLowerCase()
    try {
        const newPaste = new Paste({
            url: id,
            code: req.body.code
        })  
        const result = await newPaste.save()
    } catch (error) {
        console.log(error.message);
    }
    //  const code = req.body.code;
    //  const id = nanoid(7).toLowerCase()
    //  const newPaste = new Paste({
    //      url: id,
    //      code: code
    //  })
    //  db[id] = code
    // console.log(id)
    // console.log(req.body)
    // console.log(code)
    res.json({
        'id': id,
    })
    //  res.redirect('/'+id)
    //res.render('code', {"code":code, "number":code.split('\n').length})
    

})
app.get('/:id', async(req,res) =>{
    const {id} = req.params;

    try {
        const element = await Paste.findOne({url: id})

         
         res.render('code',{'code': element.code, 'number':element.code.split('\n').length})
    } catch (error) {
        
    }

    let code = db[id];
    
    if(code == undefined){
        code = `This page doesn't exist`
    }
    const number = code.split('\n').length
    // res.json({id:code})
    res.render("code",{"code":code, "number": number})
})



const PORT = process.env.PORT || 2003
app.listen(PORT, () =>{console.log(`Server running on port: ${PORT}`)})