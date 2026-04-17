import Common "common";

module {
  public type ContactSubmission = {
    id : Common.ContactId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    submittedAt : Common.Timestamp;
  };

  public type ContactRequest = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };
};
