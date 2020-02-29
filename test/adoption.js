const Adoption = artifacts.require("Adoption");

contract("Adoption", function(accounts) {
  describe('Adoption testing', () => {
    let instance;
    before('pre requests for tests',async() => {
      instance = await Adoption.deployed()
    });
    it('add adoption', async() => {
      await instance.adopt.sendTransaction(5, {from: accounts[1]});
      let adopter = await instance.adopters.call(5);
      assert.equal(adopter, accounts[1], "invalid adopter");
    });
    it('check getAdopters',async () => {
      let adopter = await instance.getAdopters.call();
      assert.equal(adopter[5], accounts[1], "invalid adopter");
    });
    it('invalid petId', async() => {
      try{
      await instance.adopt.sendTransaction(16, {from: accounts[4]})
      }catch(e){
        assert.equal(String(e), "revert", "invalid error");
      }
    });
  });
});
