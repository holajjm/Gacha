export interface AdornDataItem {
  imageUrl: string;
  subId: number;
  x: number;
  y: number;
}

export interface Followers {
  userId: number;
  nickname: string;
  profileId: number;
  isFollowing: boolean;
  isRemovable: boolean;
  isCurrentUser: boolean;
}
export interface Followings {
  isCurrentUser: boolean;
  isFollowing: boolean;
  nickname: string;
  profileId: number;
  userId: number;
}
export interface MiniHomeMainData {
  followersCnt: number;
  followingCnt: number;
  isFollowing: boolean;
  isOwner: boolean;
  layout: null;
  nickname: string;
  profileId: number;
  score: number;
  totalVisitorCnt: number;
}
export interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
}
export interface ReplySendData {
  content: string;
}
export interface ReplyData {
  content: string;
  createAt: string;
  guestbookId: number;
  isAuthor: boolean;
  nickname: string;
}

export interface ReplyItemData {
  content: string;
  createAt: string;
  guestbookId: number;
  isAuthor: boolean;
  nickname: string;
  profileId: number;
}
export interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}

export interface AdornItemData {
  imageUrl: string;
  itemGrade: string;
  itemId: number;
  subId: number;
}
export interface AdornItem {
  itemId: number;
  subId: number;
  x: number;
  y: number;
}
export interface AdornFetchData {
  backgroundId: number;
  items: AdornItem[];
}
export interface Position {
  x: number;
  y: number;
}
export interface AdornPageData {
  background: {
    backgroundId: number;
    imageUrl: string;
  };
  items: [
    {
      imageUrl: string;
      itemId: number;
      subId: number;
      x: number;
      y: number;
    },
  ];
}
export interface NewData {
  imageUrl: string;
  itemId: number;
  subId: number;
  x: number;
  y: number;
}
export interface newData {
  imageUrl?: string;
  itemGrade?: string;
  itemId?: number;
  subId?: number;
  x?: number;
  y?: number;
}
export interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}