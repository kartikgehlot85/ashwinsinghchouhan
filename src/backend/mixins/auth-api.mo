import Common "../types/common";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (state : Common.AdminState) {
  public func adminLogin(password : Text) : async AuthTypes.LoginResult {
    let result = AuthLib.login(password, state.adminToken);
    switch (result) {
      case (#ok(token)) {
        state.adminToken := ?token;
        #ok(token);
      };
      case (#err(msg)) { #err(msg) };
    };
  };

  public query func verifyToken(token : AuthTypes.Token) : async Bool {
    AuthLib.verifyToken(state.adminToken, token);
  };
};
