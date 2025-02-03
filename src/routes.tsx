import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "@components/layouts/Index";
import ErrorPage from "@pages/ErrorPage";
//Main
import MainPage from "@pages/Main/MainPage";
//Minihome
import MiniHomeMain from "@pages/Minihome/MiniHomeMain";
import MinihomeAdorn from "@pages/Minihome/Adorn/MinihomeAdorn";
import MinihomeItemBook from "@pages/Minihome/Header/MinihomeItemBook";
//Explore
import ExploreMain from "@pages/Explore/ExploreMain";
//Gacha
import GachaMain from "@pages/Gacha/GachaMain";
//Market
import MarketMain from "@pages/Market/MarketMain";
import MarketEnroll from "@pages/Market/Enroll/MarketEnroll";
import MarketMySellingList from "@pages/Market/Sell/MarketMySellingList";
//User
import UserLogin from "@pages/User/UserLogin";
import UserJoin from "@pages/User/UserJoin";
import OAuth from "@pages/OAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          //Main
          {
            path: "main",
            element: <MainPage />,
          },
          //Minihome
          {
            path: "minihome/:nickname",
            element: <MiniHomeMain />,
          },
          {
            path: "minihome/adorn",
            element: <MinihomeAdorn />,
          },
          {
            path: "minihome/itembook",
            element: <MinihomeItemBook />,
          },
          //Gacha
          {
            path: "gacha",
            element: <GachaMain />,
          },
          //Explore
          {
            path: "explore",
            element: <ExploreMain />,
          },
          //Market
          {
            path: "market",
            element: <MarketMain />,
          },
          {
            path: "market/enroll",
            element: <MarketEnroll />,
          },
          {
            path: "market/mysellingitem",
            element: <MarketMySellingList />,
          },
          //User
          {
            path: "login",
            element: <UserLogin />,
          },
          {
            path: "join",
            element: <UserJoin />,
          },
          {
            path: "auth",
            element: <OAuth />,
          },
        ],
      },
    ],
  },
]);
