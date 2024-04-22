import pandas as pd
interaction_settings = [['taboo', "A game where one player tries to get the other player to guess a word without using certain 'taboo' words in their clues.", 'incremental learning/processing', 'language model/world model'], 
                        ['wordle', 'A game where one player thinks of a word and the other player tries to guess it by suggesting words that are similar or related.', 'incremental learning/processing', 'language model/world model'], 
                        ['wordle_withclue', 'A variant of Wordle where the guesser is given a clue to help them guess the target word.', 'incremental learning/processing', 'language model/world model'], 
                        ['wordle_withcritic', "A variant of Wordle where the guesser's suggestions are evaluated by a third player, who provides feedback on their accuracy.", 'incremental learning/processing', 'language model/world model'], 
                        ['imagegame', 'A game where one player draws a picture and the other player tries to guess what it represents.', 'multimodal grounding', 'situation model'], 
                        ['referencegame', 'A game where one player describes an object and the other player tries to identify it based on the description.', 'multimodal grounding', 'situation model'], 
                        ['privateshared', 'A game where two players are given different pieces of information and must work together to solve a problem.', 'conversational grounding', 'discourse model']]

games = []
descriptions = []
ap = []
rd = []
for interaction in interaction_settings:
    games.append(interaction[0])
    descriptions.append(interaction[1])
    ap.append(interaction[2])
    rd.append(interaction[3])

data = {

    "interaction setting": games,
    "description": descriptions,
    "anchoring process": ap,
    "representational domain": rd
}

df = pd.DataFrame(data)

# Convert dataframe to markdown
md = df.to_markdown(index=False)
ht = df.to_html(index=False)
# md = tabulate(md, headers='keys', tablefmt='pipe', stralign='center', numalign='center')
print(md)

file_name = "_posts/output_markdowns/interaction_settings.md"
with open(file_name, "w") as file:
    file.write(md)

file_name = "_posts/output_markdowns/interaction_settings.html"
with open(file_name, "w") as file:
    file.write(ht)

# print(f"Markdown content saved to {file_name}")