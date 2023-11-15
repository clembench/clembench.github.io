---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<!-- ---
layout: post
title:  "Welcome to Jekyll!"
date:   2023-11-02 18:00:23 +0100
categories: jekyll update -->

# clembench: A Framework for the Systematic Evaluation of Chat-Optimized Language Models as Conversational Agents

> Chalamalasetti, K., Götze, J., Hakimov, S., Madureira, B., Sadler, P., & Schlangen, D. (2023). clembench: Using Game Play to Evaluate Chat-Optimized Language Models as Conversational Agents. [PDF](https://doi.org/10.48550/arXiv.2305.13455)

Recent work has proposed a methodology for
the systematic evaluation of “Situated Language Understanding Agents”—agents that
operate in rich linguistic and non-linguistic
contexts—through testing them in carefully
constructed interactive settings. Other recent
work has argued that Large Language Models
(LLMs), if suitably set up, can be understood
as (simulators of) such agents. A connection
suggests itself, which this paper explores: Can
LLMs be evaluated meaningfully by exposing
them to constrained game-like settings that are
built to challenge specific capabilities?

 As a
proof of concept, this paper investigates five
interaction settings, showing that current cLLMs (chat-optimized Large Language Models, "clems") are, 
to an extent, capable of
following game-play instructions. Both this
capability and the quality of the game play,
measured by how well the objectives of the
different games are met, follows the development cycle, with newer models generally performing better. 
The metrics even for the comparatively simple example games are far from
being saturated, suggesting that the proposed
instrument will remain to have diagnostic value.

# CLEMS

{% include_relative _posts/output_markdowns/models.md %}

The evaluated models with the details about
number of parameters in billions, trained data size
(tokens) in billions, and whether they were instruction tuned. Y: yes, n/a: publicly not available.

# Interaction Settings

{% include_relative _posts/output_markdowns/interaction_settings.md %}

