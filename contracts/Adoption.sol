pragma solidity >= 0.5.0 < 0.7.0;

contract Adoption {
  address[16] public adopters;
  constructor() public {}
  function getAdopters()  public view returns(address[16] memory){
    return adopters;
  }

  function adopt(uint petId) public returns(uint){
    require(petId>=0 && petId<16, "Invalid petId");
    adopters[petId] = msg.sender;
    return petId;
  }

}
