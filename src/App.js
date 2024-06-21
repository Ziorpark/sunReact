import logo from './logo.svg';
import './App.css';
import BasicExample from './components/layouts/Navigation/BootstarpTest';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/LoginComponent'; //사이트 접속시
import MainPage from './components/MainPage';
import ChipPage from './components/ChipPage';
import GraphPage from './components/GraphPage';
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function SunProject() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Main' element={<MainPage />} />
        <Route path='/Chip' element={<ChipPage />} />
        <Route path='/Graph/:chipId' element={<GraphPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function BootTest() {
  return (
    <>
      <BasicExample />

      <div>
        <h1> Hello world! </h1>
      </div>

    </>
  );
}


export default SunProject;
