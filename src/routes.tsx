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
import MarketSell from "@pages/Market/MarketSell";
import MarketMyList from "@pages/Market/MarketMyList";
//User
import UserLogin from "@pages/User/UserLogin";
import UserJoin from "@pages/User/UserJoin";
import OAuth from "@pages/OAuth";

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />,
        children: [
          {
            index: true,
            element: <MainPage />
          },
          //Main
          {
            path: 'main',
            element: <MainPage />
          },
          //Minihome
          {
            path: 'minihome',
            element: <MiniHomeMain />
          },
          {
            path: 'minihome/adorn',
            element: <MinihomeAdorn />
          },
          {
            path: 'minihome/itembook',
            element: <MinihomeItemBook />
          },
          //Gacha
          {
            path: 'gacha',
            element: <GachaMain />
          },
          //Explore
          {
            path: 'explore',
            element: <ExploreMain />
          },
          //Market
          {
            path: 'market',
            element: <MarketMain />
          },
          {
            path: 'market/sell',
            element: <MarketSell />
          },
          {
            path: 'market/myitem',
            element: <MarketMyList />
          },
          //User
          {
            path: 'login',
            element: <UserLogin />
          },
          {
            path: 'join',
            element: <UserJoin />
          },
          {
            path: 'auth/kakao',
            element: <OAuth />,
          },
        ]
      }
    ]
  }
])