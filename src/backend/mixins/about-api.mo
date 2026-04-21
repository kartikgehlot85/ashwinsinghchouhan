import ContentTypes "../types/content";
import Common "../types/common";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (
  aboutBio : { var val : Text },
  aboutTimeline : { var val : [ContentTypes.TimelineEntry] },
  state : Common.AdminState,
) {
  public query func getAbout() : async ContentTypes.AboutData {
    { bio = aboutBio.val; timeline = aboutTimeline.val };
  };

  public func updateAbout(token : AuthTypes.Token, data : ContentTypes.AboutData) : async Common.Result<(), Text> {
    if (not AuthLib.verifyToken(state.adminToken, token)) {
      return #err("Unauthorized");
    };
    aboutBio.val := data.bio;
    aboutTimeline.val := data.timeline;
    #ok(());
  };
};
