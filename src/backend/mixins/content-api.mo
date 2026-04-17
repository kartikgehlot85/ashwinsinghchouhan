import List "mo:core/List";
import Time "mo:core/Time";
import ContentTypes "../types/content";
import Common "../types/common";
import AuthTypes "../types/auth";
import ContentLib "../lib/content";
import AuthLib "../lib/auth";

mixin (
  items : List.List<ContentTypes.ContentItem>,
  state : Common.AdminState,
) {
  public func addItem(token : AuthTypes.Token, req : ContentTypes.AddItemRequest) : async Common.Result<ContentTypes.ContentItem, Text> {
    if (not AuthLib.verifyToken(state.adminToken, token)) {
      return #err("Unauthorized");
    };
    let now = Time.now();
    let item = ContentLib.addItem(items, state.nextItemId, req, now);
    state.nextItemId += 1;
    #ok(item);
  };

  public func updateItem(token : AuthTypes.Token, req : ContentTypes.UpdateItemRequest) : async Common.Result<Bool, Text> {
    if (not AuthLib.verifyToken(state.adminToken, token)) {
      return #err("Unauthorized");
    };
    let updated = ContentLib.updateItem(items, req);
    if (updated) { #ok(true) } else { #err("Item not found") };
  };

  public func deleteItem(token : AuthTypes.Token, id : Common.ItemId) : async Common.Result<Bool, Text> {
    if (not AuthLib.verifyToken(state.adminToken, token)) {
      return #err("Unauthorized");
    };
    let deleted = ContentLib.deleteItem(items, id);
    if (deleted) { #ok(true) } else { #err("Item not found") };
  };

  public query func getItemsByType(contentType : ContentTypes.ContentType) : async [ContentTypes.ContentItem] {
    ContentLib.getItemsByType(items, contentType);
  };

  public query func getItem(id : Common.ItemId) : async ?ContentTypes.ContentItem {
    ContentLib.getItem(items, id);
  };
};
