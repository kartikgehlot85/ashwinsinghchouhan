import List "mo:core/List";
import Types "../types/contact";
import Common "../types/common";

module {
  public func submitContact(
    contacts : List.List<Types.ContactSubmission>,
    nextId : Nat,
    req : Types.ContactRequest,
    now : Common.Timestamp,
  ) : Types.ContactSubmission {
    let submission : Types.ContactSubmission = {
      id = nextId;
      name = req.name;
      email = req.email;
      subject = req.subject;
      message = req.message;
      submittedAt = now;
    };
    contacts.add(submission);
    submission;
  };

  public func getContacts(
    contacts : List.List<Types.ContactSubmission>,
  ) : [Types.ContactSubmission] {
    contacts.toArray();
  };
};
