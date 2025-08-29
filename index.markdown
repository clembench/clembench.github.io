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


# clembench: Systematic Evaluation of Chat-Optimized Language Models as Conversational Agents

> Chalamalasetti, K., Götze, J., Hakimov, S., Madureira, B., Sadler, P., & Schlangen, D. (2023). clembench: Using Game Play to Evaluate Chat-Optimized Language Models as Conversational Agents. In Proceedings of EMNLP 2023. [PDF](https://aclanthology.org/2023.emnlp-main.689.pdf) DOI: [10.18653/v1/2023.emnlp-main.689](https://www.doi.org/10.18653/v1/2023.emnlp-main.689)

> Hakimov, S., Abdullayeva, Y., Koshti, K., Schmidt, A., Weiser, Y., Beyer, A., & Schlangen. D. (2025). Using Game Play to Investigate Multimodal and Conversational Grounding in Large Multimodal Models. In Proceedings of COLING 2025. [arXiv preprint arXiv:2406.14035](https://arxiv.org/abs/2406.14035)

> Jordan, J., Hakimov, S., Schlangen, D. (2025). Plant in Cupboard, Orange on Rably, Inat Aphone. Benchmarking Incremental Learning of Situation and Language Model using a Text-Simulated Situated Environment. In: Text, Speech, and Dialogue. TSD 2025. Lecture Notes in Computer Science(), vol 16030. Springer, Cham. [PDF](https://arxiv.org/pdf/2502.11733) DOI:[10.1007/978-3-032-02551-7_6](https://doi.org/10.1007/978-3-032-02551-7_6) 


> Hakimov, S., Pfennigschmidt, L., and Schlangen, D. 2025. Ad-hoc Concept Forming in the Game Codenames as a Means for Evaluating Large Language Models. In Proceedings of the Fourth Workshop on Generation, Evaluation and Metrics (GEM²), pages 728–740, Vienna, Austria and virtual meeting. Association for Computational Linguistics. [PDF](https://aclanthology.org/2025.gem-1.63.pdf)

> Beyer, A., Chalamalasetti, K., Hakimov, S., Madureira, B., Sadler, P., & Schlangen, D. (2024). clembench-2024: A Challenging, Dynamic, Complementary, Multilingual Benchmark and Underlying Flexible Framework for LLMs as Multi-Action Agents. [arXiv preprint arXiv:2405.20859](https://arxiv.org/abs/2405.20859)

> Bhavsar, N., Jordan, J., Hakimov, S., & Schlangen. D. (2024). How Many Parameters Does it Take to Change a Light Bulb? Evaluating Performance in Self-Play of Conversational Games as a Function of Model Characteristics [arXiv preprint arXiv:2406.14051](https://arxiv.org/abs/2406.14051)

<div class='iframe-video'>
    <iframe 
        src="https://videoup.uni-potsdam.de/Panopto/Pages/Embed.aspx?id=e33235a9-32fe-4cd0-9775-b0c2009135d0&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=true&interactivity=all" 
        style="border: 1px solid #464646;" 
        allowfullscreen 
        allow="autoplay">
    </iframe>
</div>


There are currently two main paradigms for evaluating LLMs: *reference-based* evaluation looks at the performance at well-defined single-shot tasks like question answering or summarisation; while *preference-based* evaluation asks users to interact with such two such models (each interfaced as a potentially multi-turn chatbot) in parallel and to judge which one "performs better".

We propose **a complementary way of evaluating LLMs** which combines the control (and reproducibility that comes from automation) that reference-based evaluation offers with the interactivity challenged in chatbot-type preferential evaluation. This is achieved **through *gameplay* in well-defined conversational / dialogue games**. We have implemented a set of games (such as Wordle or Taboo, or games where one player must formulate descriptions of what to do to another player) which current models can play *in self-play*. These games come with metrics that measure the quality of the game play. Together, across the set of games, we can calculate an overal score per model (what we call the *clemscore*) which serves as an indicator of how well the model can follow fine-grained instructions and how well it can simulate goal-directed conversational behaviour.

The framework for implementing such games and for running the overall benchmark [is described in the code repo](https://github.com/clembench/clembench). The implemented games that form the current version of the *clembench* are described in the paper. Here, you can find the results of running the collection of games that forms the current version of the *clembench* against the list of models shown below. 

We are continuously updating the leaderboard with new models; and, less often, the benchmark with additional games. Check back often to see the latest version.


<!--
# CLEMs (Chat-Optimized LLMs) Evaluated

{% include_relative _posts/output_markdowns/models.md %}

The evaluated models with the details about
number of parameters in billions, trained data size
(tokens) in billions (to the extent that this is known).
-->



# Interaction Settings in the Current Version
<div class="table-container">
  <table>
    <thead>
      <tr style="text-align: center;">
        <th colspan="4">Text Based</th>
      </tr>
      <tr style="text-align: center;">
        <th>Interaction Setting</th>
        <th>Description</th>
        <th>Anchoring Process</th>
        <th>Representational Domain</th>
      </tr>
    </thead>
    <tbody>
      <tr style="text-align: center;">
        <td>taboo</td>
        <td>A game where one player tries to get the other player to guess a word without using certain 'taboo' words in their clues.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
      <tr style="text-align: center;">
        <td>wordle</td>
        <td>A game where one player thinks of a word and the other player tries to guess it by suggesting words that are similar or related.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
      <tr style="text-align: center;">
        <td>wordle_withclue</td>
        <td>A variant of Wordle where the guesser is given a clue to help them guess the target word.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
      <tr style="text-align: center;">
        <td>wordle_withcritic</td>
        <td>A variant of Wordle where the guesser's suggestions are evaluated by a third player, who provides feedback on their accuracy.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
	<tr style="text-align: center;">
        <td>private-shared</td>
        <td>A two player game where one player acts as an agent for booking some service and the other player gives their preferences.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
      <tr style="text-align: center;">
        <td>imagegame</td>
        <td>A game where one player draws a picture and the other player tries to guess what it represents.</td>
        <td>multimodal grounding</td>
        <td>situation model</td>
      </tr>
      <tr style="text-align: center;">
        <td>referencegame</td>
        <td>A game where one player describes an object and the other player tries to identify it based on the description.</td>
        <td>multimodal grounding</td>
        <td>situation model</td>
      </tr>
      <tr style="text-align: center;">
        <td>text mapworld</td>
        <td>A single-player exploration game where the player navigates a map based on given directions and room descriptions.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
	<tr style="text-align: center;">
        <td>text mapworld-graph-reasoning</td>
        <td>A single-player exploration game where the player navigates a map based on given directions and in every turn is asked to produce the graph of the entire map up to that point.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
	<tr style="text-align: center;">
        <td>text mapworld-specific-room</td>
        <td>A single-player exploration game where the player navigates a map and expected to find the specific room that fits the given description of it.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
	<tr style="text-align: center;">
        <td>codenames</td>
        <td>A two-playergame where one player gives a clue that targets words and the other player tries to guess the words using the clue.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
	<tr style="text-align: center;">
        <td>adventuregame</td>
        <td>A single player exploration game where the player is given a task in a typical home environment and is expected to perform that task by navigating the rooms, interacting with the objects.</td>
        <td>incremental learning/processing</td>
        <td>language model/world model</td>
      </tr>
	<tr style="text-align: center;">
        <td>matchit-ascii</td>
        <td>A game where players identify whether two images (in ASCII format) are the same or different through dialogue.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation/agent model</td>
      </tr>
	<tr style="text-align: center;">
        <td>guess-what</td>
        <td>A two-player game word guessing game where one player picks a word out of eight options and the second player tries to guess the word by asking questions that lead to Yes/No answers.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation/agent model</td>
      </tr>
    </tbody>
  </table>
  
  <table>
    <thead>
      <tr style="text-align: center;">
        <th colspan="4">Multimodal</th>
      </tr>
      <tr style="text-align: center;">
        <th>Interaction Setting</th>
        <th>Description</th>
        <th>Anchoring Process</th>
        <th>Representational Domain</th>
      </tr>
    </thead>
    <tbody>
      <tr style="text-align: center;">
        <td>matchit</td>
        <td>A game where players identify whether two images are the same or different through dialogue.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation/agent model</td>
      </tr>
      <tr style="text-align: center;">
        <td>multimodal reference game</td>
        <td>A game where one player describes an object and the other player tries to identify it based on the description using multiple modalities.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
      <tr style="text-align: center;">
        <td>multimodal mapworld</td>
        <td>A single-player exploration game in which the player navigates a map using multimodal inputs.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
<tr style="text-align: center;">
        <td>multimodal mapworld-specific-room</td>
        <td>A single-player exploration game where the player navigates a map and expected to find the specific room that fits the given description of it.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
<tr style="text-align: center;">
        <td>multimodal mapworld-graph-reasoning</td>
        <td>A single-player exploration game where the player navigates a map based on given directions and in every turn is asked to produce the graph of the entire map up to that point.</td>
        <td>multimodal/conversational grounding</td>
        <td>situation model</td>
      </tr>
    </tbody>
  </table>
</div>

