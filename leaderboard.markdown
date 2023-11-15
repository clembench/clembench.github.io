---
layout: default
title: Leaderboard
---

<style>
    body, html {
        margin: 0;
        padding: 0;
        margin-left: -500px;
    }

    table {
        margin-left: -200px;
        margin-right: auto;
    }

    body gradio-app {
        display: flex;
        width: 75vw; /* Make it 100% of the viewport width */
        max-width: 1920px; /* Set maximum width to 1920 pixels */
        margin: 0 auto; /* Center the module horizontally */
    }
</style>



<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/4.1.2/gradio.js"
></script>

<gradio-app src="https://koshti10-clem-leaderboard.hf.space"></gradio-app>
