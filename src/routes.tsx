import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "@components/layouts/Index";
//Main
export const MainPage = React.lazy(() => import("@pages/Main/MainPage"));
//Minihome
export const MiniHomeMain = React.lazy(() => import("@pages/Minihome/MiniHomeMain"));
export const MinihomeAdorn = React.lazy(() => import("@pages/Minihome/Adorn/MinihomeAdorn"));
export const MinihomeItemBook = React.lazy(() => import("@pages/Minihome/ItemBook/MinihomeItemBook"));
//Explore
export const ExploreMain = React.lazy(() => import("@pages/Explore/ExploreMain"));
//Gacha
export const GachaMain = React.lazy(() => import("@pages/Gacha/GachaMain"));
//Market
export const MarketMain = React.lazy(() => import("@pages/Market/MarketMain"));
export const MarketEnroll = React.lazy(() => import("@pages/Market/Enroll/MarketEnroll"));
export const MarketMySellingList = React.lazy(() => import("@pages/Market/Sell/MarketMySellingList"));
//User
export const UserLogin = React.lazy(() => import("@pages/User/UserLogin"));
export const UserJoin = React.lazy(() => import("@pages/User/UserJoin"));
export const UserEdit = React.lazy(() => import("@pages/User/UserEdit"));
export const ErrorPage = React.lazy(() => import("@pages/ErrorPage"));
export const OAuth = React.lazy(() => import("@pages/OAuth"));

import WithSuspense from "@components/layouts/WithSuspense";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: WithSuspense(<ErrorPage />),
    children: [
      {
        path: "/",
        element: <Index />,
        children: [
          {
            index: true,
            element: WithSuspense(<MainPage />),
          },
          //Main
          {
            path: "main",
            element: WithSuspense(<MainPage />),
          },
          //Minihome
          {
            path: "minihome/:nickname",
            element: WithSuspense(<MiniHomeMain />),
          },
          {
            path: "minihome/adorn",
            element: WithSuspense(<MinihomeAdorn />),
          },
          {
            path: "minihome/itembook",
            element: WithSuspense(<MinihomeItemBook />),
          },
          //Gacha
          {
            path: "gacha",
            element: WithSuspense(<GachaMain />),
          },
          //Explore
          {
            path: "explore",
            element: WithSuspense(<ExploreMain />),
          },
          //Market
          {
            path: "market",
            element: WithSuspense(<MarketMain />),
          },
          {
            path: "market/enroll",
            element: WithSuspense(<MarketEnroll />),
          },
          {
            path: "market/mysellingitem",
            element: WithSuspense(<MarketMySellingList />),
          },
          //User
          {
            path: "login",
            element: WithSuspense(<UserLogin />),
          },
          {
            path: "join",
            element: WithSuspense(<UserJoin />),
          },
          {
            path: "edit",
            element: WithSuspense(<UserEdit />),
          },
          {
            path: "auth",
            element: WithSuspense(<OAuth />),
          },
        ],
      },
    ],
  },
]);
