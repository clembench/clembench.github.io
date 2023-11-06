---
layout: default
title: Reference
excerpt_separator: <!--end_excerpt-->
---

<style>
    table {
        margin-left: auto;
        margin-right: auto;
    }
</style>
# Drawing Instruction Giving and Following: reference

Each instance of this game includes three grids where one is the target and the remaining two are distractor grids, which Player A (Instruction Giver) needs to generate a referring expression that describes only the target grid and Player B (Instruction Follower) takes into account the given referring expression and expected to guess which of the given three grids is the target grid.

<!--end_excerpt-->

The Game Master selects a target and two distractor grids and instructs the Player A to generate a referring expression that uniquely describes the target grid and differentiates it from the distractors. There is a history of work on referring expression generation and the topic has recently received new attention in the context of neural learners. The Game Master then provides the same three grids and the referring expression from Player A to Player B. The three grids are numbered such as *first*, *second*, and *third* and the order of grids are randomly shuffled for Player B. Player B generates a single expression that should refer to the number of the target grid that matches the given expression. The game is played for a single turn.

# Leaderboard

{% include_relative output_markdowns/ref.md %}

Detailed results for each model on each experiment for the reference game

# Plots

<b> METRIC - Aborted </b>

![Plots](plots/referencegame_Aborted.jpg)

<b> METRIC - Lose </b>

![Plots](plots/referencegame_Lose.jpg)

<b> METRIC - Main Score </b>

![Plots](plots/referencegame_Main Score.jpg)

<b> METRIC - Played </b>

![Plots](plots/referencegame_Played.jpg)

<b> METRIC - Success </b>

![Plots](plots/referencegame_Success.jpg)
