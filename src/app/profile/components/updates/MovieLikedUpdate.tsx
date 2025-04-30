import React from "react";
import { UserAcitivity } from "@/types/user/useractivity";

interface MovieLikedUpdateProps {
  activity: Extract<UserAcitivity, { type: "MOVIE_LIKED" }>;
}

const MovieLikedUpdate: React.FC<MovieLikedUpdateProps> = ({ activity }) => {
  const content = activity.content;

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-100">
      <p className="text-gray-800">
        <strong>{content.title}</strong> beğendi.
      </p>
      <p className="text-sm text-gray-500">
        {new Date(activity.time).toLocaleString()}
      </p>
    </div>
  );
};

export default MovieLikedUpdate;
