import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Nat "mo:core/Nat";
import Types "../types/auth";

module {
  // Simple deterministic hash: djb2-style fold over chars
  public func hashPassword(password : Text) : Text {
    var hash : Nat = 5381;
    for (c in password.toIter()) {
      let code = c.toNat32().toNat();
      hash := (hash * 33 + code) % 4294967296;
    };
    hash.toText();
  };

  public func login(
    password : Text,
    _currentToken : ?Types.Token,
  ) : Types.LoginResult {
    let hash = hashPassword(password);
    if (hash == hashPassword("ashwin@chouhan")) {
      let token = "admin-" # hash # "-session";
      #ok(token);
    } else {
      #err("Invalid password");
    };
  };

  public func verifyToken(
    currentToken : ?Types.Token,
    token : Types.Token,
  ) : Bool {
    switch (currentToken) {
      case (?stored) { stored == token };
      case null { false };
    };
  };
};
