import React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import PageLayout from "../comps/pageLayout";
import ItemCarousel from "../comps/itemCarousel";
import ItemCard from "../comps/itemCard";

import HeroImage from "../public/hero-background.jpg";

const MenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-grow bg-dark-brown text-white mx-3 p-3 w-full rounded text-center">
      {children}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <div id="hero">
          <Image src={HeroImage} alt="image of coffee" />
        </div>

        <div className="px-3 py-2">
          <div id="welcome" className="bg-deep-brown p-4 text-white rounded">
            <h3 className="text-lg font-semibold">Welcome to Online Cafe.</h3>
            <p className="">
              Grab a coffee and a bite to eat. Now straight to your door step!
            </p>
          </div>

          <div id="menu" className="my-4">
            <h4 className="text-lg font-bold">Menu</h4>
            <div className="flex flex-row mt-2">
              <MenuItem>
                <Link href="/menu?category=drinks">
                  <a>Drinks</a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/menu?category=meals">
                  <a>Meals</a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/menu?category=desserts">
                  <a>Desserts</a>
                </Link>
              </MenuItem>
            </div>
          </div>

          <div id="top-selling" className="my-4">
            <h4 className="text-lg font-bold">Top selling</h4>
            <ItemCarousel>
              <ItemCard
                name="Item name 1"
                category="Cold Drink"
                price="$48"
                itemId="1"
              />
              <ItemCard
                name="Item name 2"
                category="Hot Drink"
                price="$48"
                itemId="2"
              />
              <ItemCard
                name="Item name 3"
                category="Alcoholic Drink"
                price="$48"
                itemId="3"
              />
              <ItemCard
                name="Item name 4"
                category="Breakfast"
                price="$48"
                itemId="1"
              />
              <ItemCard
                name="Item name 5"
                category="Lunch"
                price="$48"
                itemId="1"
              />
            </ItemCarousel>
          </div>

          <div id="new-arrivals" className="my-4">
            <h4 className="text-lg font-bold">New arrivals</h4>
            <ItemCarousel>
              <ItemCard
                name="Item name 1"
                category="Cold Drink"
                price="$48"
                itemId="1"
                isNew
              />
              <ItemCard
                name="Item name 2"
                category="Hot Drink"
                price="$48"
                itemId="1"
                isNew
              />
              <ItemCard
                name="Item name 3"
                category="Alcoholic Drink"
                price="$48"
                itemId="1"
                isNew
              />
              <ItemCard
                name="Item name 4"
                category="Breakfast"
                price="$48"
                itemId="1"
                isNew
              />
              <ItemCard
                name="Item name 5"
                category="Lunch"
                price="$48"
                itemId="1"
                isNew
              />
            </ItemCarousel>
          </div>

          <div className="flex justify-center my-4">
            <Link href="/menu/items">
              <a>
                <div className="text-accent-color font-medium p-2">
                  View all products <span className="ml-2">&gt;</span>
                </div>
              </a>
            </Link>
          </div>

          <div id="about" className="bg-deep-brown p-4 text-white rounded my-2">
            <h3 className="text-lg font-semibold">About heading</h3>
            <p>Company story...</p>
            <div className="flex justify-end">
              <Link href="/about">
                <a>
                  <div className="text-accent-color bg-white p-1 rounded">
                    Learn more
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Home;
