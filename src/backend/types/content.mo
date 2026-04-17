import Common "common";

module {
  public type ContentType = Text; // "research" | "article" | "publication" | "note"

  public type ContentItem = {
    id : Common.ItemId;
    contentType : ContentType;
    title : Text;
    description : Text;
    date : Text;
    fileUrl : ?Text;     // URL from object-storage upload
    externalUrl : ?Text; // external link provided by admin (e.g. Google Drive, journal)
    tags : [Text];
    createdAt : Common.Timestamp;
  };

  public type AddItemRequest = {
    contentType : ContentType;
    title : Text;
    description : Text;
    date : Text;
    fileUrl : ?Text;     // set when admin uploads a file via object-storage
    externalUrl : ?Text; // set when admin provides an external URL
    tags : [Text];
  };

  public type UpdateItemRequest = {
    id : Common.ItemId;
    contentType : ContentType;
    title : Text;
    description : Text;
    date : Text;
    fileUrl : ?Text;     // set when admin uploads a file via object-storage
    externalUrl : ?Text; // set when admin provides an external URL
    tags : [Text];
  };
};
