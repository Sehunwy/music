import React from "react";
import {render}from "react-dom";
import PlaylistView from "./PlaylistView.js"

render(
    <PlaylistView list = {list}></PlaylistView>,
    document.getElementById("app-Playlist")
)