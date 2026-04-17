import List "mo:core/List";
import NewContentTypes "types/content";
import NewContactTypes "types/contact";
import Common "types/common";

module {
  // Old ContentItem — same as new but without externalUrl
  type OldContentItem = {
    id : Common.ItemId;
    contentType : Text;
    title : Text;
    description : Text;
    date : Text;
    fileUrl : ?Text;
    tags : [Text];
    createdAt : Common.Timestamp;
  };

  type OldActor = {
    state : Common.AdminState;
    items : List.List<OldContentItem>;
    contacts : List.List<NewContactTypes.ContactSubmission>;
  };

  type NewActor = {
    state : Common.AdminState;
    items : List.List<NewContentTypes.ContentItem>;
    contacts : List.List<NewContactTypes.ContactSubmission>;
  };

  public func run(old : OldActor) : NewActor {
    let items = old.items.map<OldContentItem, NewContentTypes.ContentItem>(
      func(item) { { item with externalUrl = null } }
    );
    { state = old.state; items; contacts = old.contacts };
  };
};
