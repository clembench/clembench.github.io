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

The paper introduces the clem-bench framework, which is designed to evaluate the performance of chat-optimized LLMs (cLLMs) as conversational agents in interactive game-like settings. The clem-bench framework includes a set of games that are designed to test different aspects of conversational ability, such as understanding and generating natural language responses. It also introduces a leaderboard that tracks the performance of different cLLMs on these games, and discuss the potential applications of the framework.

The paper describes the design and implementation of the clem-bench framework in detail, including the development of the games and the methods used to evaluate the performance of the cLLMs. It also provides a thorough analysis of the results of experiments that evaluate the performance of several cLLMs on the games included in the clem-bench framework.

The experiments reveal that the cLLMs perform well on some tasks, such as image description and question answering, but struggle with others, such as engaging in open-ended conversation. The results of the experiments reveal areas where the cLLMs could be improved, such as their ability to generate more diverse and contextually appropriate responses.

The paper concludes by discussing the potential implications of the clem-bench framework for the development of conversational agents. The authors argue that the framework has the potential to help improve the quality and effectiveness of conversational agents, and to promote transparency and accountability in their development. They also suggest several important next steps for the development of conversational agents, including testing the models' abilities to handle more complex and nuanced dialogue.

# CLEMS

{% include_relative _posts/output_markdowns/models.md %}

The evaluated models with the details about
number of parameters in billions, trained data size
(tokens) in billions, and whether they were instruction tuned. Y: yes, n/a: publicly not available.

# Interaction Settings

{% include_relative _posts/output_markdowns/interaction_settings.md %}

