import List "mo:core/List";
import Time "mo:core/Time";
import ContactTypes "../types/contact";
import Common "../types/common";
import AuthTypes "../types/auth";
import ContactLib "../lib/contact";
import AuthLib "../lib/auth";

mixin (
  contacts : List.List<ContactTypes.ContactSubmission>,
  state : Common.AdminState,
) {
  public func submitContact(req : ContactTypes.ContactRequest) : async Common.Result<ContactTypes.ContactSubmission, Text> {
    let now = Time.now();
    let submission = ContactLib.submitContact(contacts, state.nextContactId, req, now);
    state.nextContactId += 1;
    #ok(submission);
  };

  public func getContacts(token : AuthTypes.Token) : async Common.Result<[ContactTypes.ContactSubmission], Text> {
    if (not AuthLib.verifyToken(state.adminToken, token)) {
      return #err("Unauthorized");
    };
    #ok(ContactLib.getContacts(contacts));
  };
};
