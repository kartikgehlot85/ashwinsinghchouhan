import List "mo:core/List";
import ContentTypes "types/content";
import ContactTypes "types/contact";
import Common "types/common";
import ContentApi "mixins/content-api";
import ContactApi "mixins/contact-api";
import AuthApi "mixins/auth-api";



actor {
  let state : Common.AdminState = {
    var adminToken = null;
    var nextItemId = 0;
    var nextContactId = 0;
  };

  let items = List.empty<ContentTypes.ContentItem>();
  let contacts = List.empty<ContactTypes.ContactSubmission>();

  include AuthApi(state);
  include ContentApi(items, state);
  include ContactApi(contacts, state);
};
