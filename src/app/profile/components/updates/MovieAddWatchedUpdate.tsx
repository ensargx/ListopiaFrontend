import React from "react";
import { UserAcitivity } from "@/types/user/useractivity";

interface MovieAddWatchedUpdateProps {
  activity: Extract<UserAcitivity, { type: "MOVIE_ADD_WATCHED" }>;
}

const MovieAddWatchedUpdate: React.FC<MovieAddWatchedUpdateProps> = ({ activity }) => {
  const content = activity.content;

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-100">
      <p className="text-gray-800">
        <strong>{content.title}</strong> izledi.
      </p>
      <p className="text-sm text-gray-500">
        {new Date(activity.time).toLocaleString()}
      </p>
    </div>
  );
};

export default MovieAddWatchedUpdate;
