App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if(typeof web3 !== undefined){
      App.web3Provider = web3.currentProvider;
    }else{
      App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Adoption.json", function(data){
      var adoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(adoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    App.contracts.Adoption.deployed().then(instance=>{
      return instance.getAdopters.call();
    }).then(adopters=>{
      for (let i = 0; i < adopters.length; i++) {
        if(!web3.toBigNumber(adopters[i]).isZero()){
          $('.panel-pet').eq(i).find("button").text("success").attr("disable", true);
        }
      }
    }).catch(e=>{
      console.log(e.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    web3.eth.getAccounts(async function(error, accounts){
      if(error){
        console.log(error);
      }
      App.contracts.Adoption.deployed().then(instance=>{
        return instance.adopt.sendTransaction(petId, {from:accounts[0]});
      }).then(function(result){
        return App.markAdopted();
      }).catch(e=>{
        console.log(e.message);
      })
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
