import List "mo:core/List";
import Int "mo:core/Int";
import Types "../types/content";
import Common "../types/common";

module {
  public func addItem(
    items : List.List<Types.ContentItem>,
    nextId : Nat,
    req : Types.AddItemRequest,
    now : Common.Timestamp,
  ) : Types.ContentItem {
    let item : Types.ContentItem = {
      id = nextId;
      contentType = req.contentType;
      title = req.title;
      description = req.description;
      date = req.date;
      fileUrl = req.fileUrl;
      externalUrl = req.externalUrl;
      tags = req.tags;
      createdAt = now;
    };
    items.add(item);
    item;
  };

  public func updateItem(
    items : List.List<Types.ContentItem>,
    req : Types.UpdateItemRequest,
  ) : Bool {
    var found = false;
    items.mapInPlace(
      func(item) {
        if (item.id == req.id) {
          found := true;
          {
            item with
            contentType = req.contentType;
            title = req.title;
            description = req.description;
            date = req.date;
            fileUrl = req.fileUrl;
            externalUrl = req.externalUrl;
            tags = req.tags;
          };
        } else {
          item;
        };
      }
    );
    found;
  };

  public func deleteItem(
    items : List.List<Types.ContentItem>,
    id : Common.ItemId,
  ) : Bool {
    let sizeBefore = items.size();
    let filtered = items.filter(func(item) { item.id != id });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      items.clear();
      items.append(filtered);
      true;
    } else {
      false;
    };
  };

  public func getItemsByType(
    items : List.List<Types.ContentItem>,
    contentType : Types.ContentType,
  ) : [Types.ContentItem] {
    let filtered = items.filter(func(item) { item.contentType == contentType });
    let arr = filtered.toArray();
    // Sort by createdAt descending
    arr.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  public func getItem(
    items : List.List<Types.ContentItem>,
    id : Common.ItemId,
  ) : ?Types.ContentItem {
    items.find(func(item) { item.id == id });
  };
};
