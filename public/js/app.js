const submit = document.getElementById('submit')
const codeinput = document.getElementById('codeinput')

submit.addEventListener('click', () =>{
    const code = codeinput.value
    console.log(code)
    axios.post('/create', {
        'code': code
      })
      .then(function (response) {
        console.log(response.data.id);
        window.location.replace("http://localhost:2003/"+ response.data.id);

      })
      .catch(function (error) {
        console.log(error);
      });
    // fetch('/create', {
    //     method: 'post',
    //     body: {
    //         'code': 'aasass',
    //       }
    //   }).then(function(response) {
    //     console.log(response.json())
 
    //   })
})