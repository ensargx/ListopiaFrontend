import { FrontMovie } from "../front";
import { Comment } from "../movie";
import { User } from "../user";

export interface UserActivityResponse {
    id: number;
    type: string;
    content: string;
    time: number;
};

export type UserActivity<T extends string, C> = {
  id: number;
  type: T;
  content: C;
  time: number;
};

// Türler
export type UserAcitivityBecomeFriends = UserActivity<"BECOME_FRIENDS", User>["content"];
export type UserAcitivityMovieAddToWatchlist = UserActivity<"MOVIE_ADD_WATCHLIST", FrontMovie>["content"];
export type UserAcitivityMovieAddToWatched = UserActivity<"MOVIE_ADD_WATCHED", FrontMovie>["content"];
export type UserAcitivityMovieLiked = UserActivity<"MOVIE_LIKED", FrontMovie>["content"];
export type UserAcitivityMovieCommented = UserActivity<"MOVIE_COMMENT", Comment>["content"];

export type UserAcitivity =
  | {
      id: number;
      type: "BECOME_FRIENDS";
      content: UserAcitivityBecomeFriends;
      time: number;
    }
  | {
      id: number;
      type: "MOVIE_ADD_WATCHLIST";
      content: UserAcitivityMovieAddToWatchlist;
      time: number;
    }
  | {
      id: number;
      type: "MOVIE_ADD_WATCHED";
      content: UserAcitivityMovieAddToWatched;
      time: number;
    }
  | {
      id: number;
      type: "MOVIE_LIKED";
      content: UserAcitivityMovieLiked;
      time: number;
    }
  | {
      id: number;
      type: "MOVIE_COMMENT";
      content: UserAcitivityMovieCommented;
      time: number;   
    };