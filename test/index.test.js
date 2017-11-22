
jest.mock('./../src/Authorization/AadAuthorisation');

const authIndex = require('../src/index');


describe('When initialising the authorisation strategy', () => {

  describe('then if the config is not valid', () => {

    it('an error is returned for no config passed', () =>{
      try{
        authIndex(undefined,undefined);
      }catch (e){
        expect(e.message).toBe('Config must be supplied');
      }
    });
    it('an error is returned if the auth section is not populated', () => {
      try{
        authIndex({},{})
      }catch (e){
        expect(e.message).toBe('The auth section of the config must be supplied')
      }
    })
  });
  describe('then if the auth type is not recognised', () => {
    it('an error is returned saying it is not supported', () => {
      try{
        authIndex({},{auth:{type:'test'}});
      }catch (e){
        expect(e.message).toBe('no supported auth strategy defined!');
      }
    })
  });
  describe('then if the config is valid and the auth type is set to secret', () => {
    it('then the JwtAuthorization type is returned', () => {
      const actual = authIndex({},{auth:{type:'secret'}});

      expect(actual.length).toBe(3);
    })
  });
  describe('then if the config type is set to AAD', () => {
    it('an error is returned if the ClientId is not set', () => {
      try{
        authIndex({},{auth:{type:'aad'}});
      }catch (e){
        expect(e.message).toBe('clientId must be set for aad auth');
      }
    });
    it('an error is returned if the identityMetadata is not set', () => {
      try{
        authIndex({},{auth:{type:'aad',clientID:'test'}});
      }catch (e){
        expect(e.message).toBe('identityMetadata must be set for aad auth');
      }
    });
    it('then the AzureAD type is returned when the config is valid', () => {
      const authIndexProxy = require('./../src/Authorization/AadAuthorisation');
      let aadStub = jest.fn().mockImplementation(() => ({  }));
      authIndexProxy.mockImplementation(aadStub);

      authIndex({},{auth:{type:'aad',clientID:'test', identityMetadata: 'test'}});

      expect(aadStub.mock.calls.length).toBe(1);
    });
  });

});