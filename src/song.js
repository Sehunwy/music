import React from "react";
import {render}from "react-dom";
import SongView from "./SongView.js"

let url='http://localhost:8888/SelectSong';
render(
    <SongView url = {url}></SongView>,
    document.getElementById("app-song")
)