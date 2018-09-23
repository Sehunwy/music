import React from "react";
import {render}from "react-dom";
import AlbumView from "./AlbumView.js"

render(
    <AlbumView list = {list1}></AlbumView>,
    document.getElementById("app-album")
)