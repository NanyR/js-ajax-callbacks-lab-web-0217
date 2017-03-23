function handlebarsSetup() {
  // put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
  $('#searchName').click(function(){
    event.preventDefault();
    const search= $('#searchTerms').val();
    searchRepositories(search);
  });// end ready function
})


  function searchRepositories(){
    const searchT= document.getElementById("searchTerms").value 
    const url=`https://api.github.com/search/repositories?q=${searchT}`
    $.get(url, showRepositories).fail(displayError)
    //end searchRepositories
  }

    function showRepositories(response){
      const src= $('#repository-template').html()
      const template= Handlebars.compile(src)
      const repoList=template(response)
      $("#results").html(repoList)
    }

    function getCommits(){
      const seeCommits=document.getElementById('commits');
      const owner= seeCommits.dataset.repo
      const repo= seeCommits.dataset.name
      const commitsUrl=`https://api.github.com/repos/${owner}/${repo}/commits`
      $.get(commitsUrl, showCommits).fail(displayError)
    }

    function showCommits(data){
      debugger
      const srcCommit=$('#commits-template').html()
      const templateCommit= Handlebars.compile(srcCommit)
      const commitsDetails=templateCommit(data)
      $('#details').html(commitsDetails)
    }

    function displayError(error){
      const srcErr= $('#error-template').html()
      const template=Handlebars.compile(srcErr)
      const errorMess=template(error)
      $("#errors").html(errorMess)
    }
