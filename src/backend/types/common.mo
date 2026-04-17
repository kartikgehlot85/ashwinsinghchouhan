module {
  public type Timestamp = Int;
  public type ItemId = Nat;
  public type ContactId = Nat;

  public type Result<T, E> = { #ok : T; #err : E };

  public type AdminState = {
    var adminToken : ?Text;
    var nextItemId : Nat;
    var nextContactId : Nat;
  };
};
