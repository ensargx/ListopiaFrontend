import { UserNotification, UserNotificationBecomeFriends, UserNotificationFriendRequest, UserNotificationNewMessage, UserNotificationResponse } from "@/types/user/usernotification";

export function parseUserNotification(raw: UserNotificationResponse): UserNotification {
    switch (raw.type) {
      case "NEW_MESSAGE":
        return {
          ...raw,
          type: "NEW_MESSAGE",
          content: JSON.parse(raw.content) as UserNotificationNewMessage,
        };
      case "FRIEND_REQUEST":
        return {
          ...raw,
          type: "FRIEND_REQUEST",
          content: JSON.parse(raw.content) as UserNotificationFriendRequest,
        };
      case "BECOME_FRIENDS":
        return {
          ...raw,
          type: "BECOME_FRIENDS",
          content: JSON.parse(raw.content) as UserNotificationBecomeFriends,
        };
      default:
        throw new Error(`Unknown notification type: ${raw.type}`);
    }
  }