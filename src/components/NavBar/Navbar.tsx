"use client";

import { loadingCityAtom, placeAtom } from "@/app/atom";
import axios from "axios";
import * as dotenv from "dotenv";
import { useAtom } from "jotai";
import React, { useState } from "react";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import SuggestionBox from "../SuggestionBox";
import NavIcons from "./NavIcons";
dotenv.config({ path: "../../../.env" });

type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/data/${process.env.NEXT_PUBLIC_APP_VERSION}/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggenstionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location Not Found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/data/${process.env.NEXT_PUBLIC_APP_VERSION}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white ">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <Logo />
          <div className="flex gap-2 items-center justify-between">
            <NavIcons location={location} onClick={handleCurrentLocation} />
            <div className="relative hidden md:flex">
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                error={error}
                handleSuggestionClick={handleSuggenstionClick}
                showSuggestions={showSuggestions}
                suggestions={suggestions}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
