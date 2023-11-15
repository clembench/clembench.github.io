# CONVERT PDF TO JPG

from pdf2image import convert_from_path
import os
 

# Initialize paths with overall plot
main_path = ["results_eval/results_eval/results_eval/episode-level/plots/lines.pdf"]

#game = "imagegame", "prvateshared", "referencegame", "taboo", "wordle", "wordle_withclue", "wordle_withcritic" 
#metrics = "Kappa", "Aborted", "Lose", "Main Score", "Success", "Played"

plot_definitions = {
    "imagegame": ["Played", "Aborted", "Success", "Lose", "F1"],
    "privateshared": ["Played", "Main Score", "Success", "Kappa", "Middle-Accuracy", "Slot-Filling-Accuracy"],
    "referencegame": ["Played", "Aborted", "Success", "Lose", "Main Score"],
    "taboo": ["Played", "Aborted", "Success", "Lose", "Main Score"],
    "wordle": ["Played", "Aborted", "Success", "Lose", "Main Score"],
    "wordle_withclue": ["Played", "Aborted", "Success", "Lose", "Main Score"],
    "wordle_withcritic": ["Played", "Aborted", "Success", "Lose", "Main Score"]
}

#Lines
def get_pdf_paths_lines(game, metric):
    path = os.path.join("results_eval", "results_eval", str(game), "results_eval", "episode-level", "plots", str(game) + "_overview-lines_" + str(metric) +".pdf")
    return path

#Without Lines
def get_pdf_paths(game, metric):
    path = os.path.join("results_eval", "results_eval", str(game), "results_eval", "episode-level", "plots", str(game) + "_overview_" + str(metric) +".pdf")
    return path

#Get plot for main leaderboard
images = convert_from_path(main_path[0])
images[0].save(os.path.join("plots/lines.jpg"), 'JPEG')

# Get individual Plots
game_keys = list(plot_definitions.keys())
for game in game_keys:
    metric_list = plot_definitions[game]
    for metric in metric_list:
        path = get_pdf_paths_lines(game, metric)
        images = convert_from_path(path)
        images[0].save(os.path.join("2023", "06", "01", "plots", str(game) + "_" + str(metric) + ".jpg"), 'JPEG')
