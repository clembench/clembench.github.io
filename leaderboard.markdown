---
layout: default
title: Leaderboard
---

<style>
    body, html {
        margin: 0;
        padding: 0;
    }

    table {
        margin-left: --25vw;
        margin-right: auto;
    }

    body gradio-app {
        display: flex;
        width: 90vw; /* Make it 100% of the viewport width */
        max-width: 90vw; /* Set maximum width to 1920 pixels */
        min-width: 90vw;
        margin: 0 auto; /* Center the module horizontally */
        margin-left: -25vw;
    }
</style>



<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/4.1.2/gradio.js"
></script>

<gradio-app src="https://koshti10-clem-leaderboard.hf.space"></gradio-app>
