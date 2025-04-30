import React from "react";
import { UserAcitivity } from "@/types/user/useractivity";

interface BecomeFriendUpdateProps {
  activity: Extract<UserAcitivity, { type: "BECOME_FRIENDS" }>;
}

const BecomeFriendUpdate: React.FC<BecomeFriendUpdateProps> = ({ activity }) => {
  const user = activity.content;

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-100">
      <p className="text-gray-800">
        <strong>{user.username}</strong> ile arkadaş oldunuz.
      </p>
      <div className="profile-friend-avatar">
                            <img

                                src={user.profilePicture}
                                alt={user.username}
                                onError={e => {
                                    (e.target as HTMLImageElement).src =
                                        '/placeholder.svg?height=150&width=100';
                                }}
                            />
                        </div>
      <p className="text-sm text-gray-500">
        {new Date(activity.time).toLocaleString()}
      </p>
    </div>
  );
};

export default BecomeFriendUpdate;
