// Основное содержимое страницы
import './Main.css';
import React, { useRef } from 'react';
import { Promo } from './Promo/Promo';
import { Techs } from './Techs/Techs';
import { AboutMe } from './AboutMe/AboutMe';
import { Portfolio } from './Portfolio/Portfolio';
import { AboutProject } from './AboutProject/AboutProject';

export function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {  // Передаются функции из App.js
const scrollToRef = useRef();

  return (
    <main className="content">
      <Promo scrollToRef={scrollToRef} />
      <AboutProject scrollToRef={scrollToRef} />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
};
