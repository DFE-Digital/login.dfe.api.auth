const assert = require("assert");

const jwt = require("./Authorization/JwtAuthorization");
const aad = require("./Authorization/AadAuthorisation");

module.exports = (app, config) => {
  assert(config, "Config must be supplied");
  assert(config.auth, "The auth section of the config must be supplied");

  if (config.auth.type.toLowerCase() === "secret") {
    return jwt(config.auth.secret);
  }

  if (config.auth.type.toLowerCase() === "aad") {
    assert(config.auth.clientID, "clientId must be set for aad auth");
    assert(
      config.auth.identityMetadata,
      "identityMetadata must be set for aad auth",
    );

    const options = {
      identityMetadata: config.auth.identityMetadata,
      clientID: config.auth.clientID,
      validateIssuer: true,
      loggingLevel: "error",
      passReqToCallback: false,
    };

    return aad(app, options);
  }

  throw new Error("no supported auth strategy defined!");
};
