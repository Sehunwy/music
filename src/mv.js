import React from "react";
import {render}from "react-dom";
import MVViews from "./MVViews.js"

let url='http://localhost:8888/SelectMv';
render(
    <MVViews url = {url}></MVViews>,
    document.getElementById("app-mv")
)