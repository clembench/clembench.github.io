import pandas as pd
import numpy as np
import os
import re

# Image Game with columns to keep and mark bold in markdown
image_scores_path = "results_eval/results_eval/imagegame/results_eval/episode-level/tables/imagegameimagegame-overview-table.csv"
image_keep_cols = ["Models", "Experiment", "Played", "Aborted", "Success", "Lose", "F1"]
image_mark_cols = ["Success", "F1", "Played"]

#Reference Game
ref_scores_path = "results_eval/results_eval/referencegame/results_eval/episode-level/tables/referencegamereferencegame-overview-table.csv"
ref_keep_cols = ["Models", "Experiment", "Played", "Aborted", "Success", "Lose", "Main Score"]
ref_mark_cols = ["Success", "Played", "Main Score"]

#Taboo
taboo_scores_path = "results_eval/results_eval/taboo/results_eval/episode-level/tables/tabootaboo-overview-table.csv"
taboo_keep_cols = ["Models", "Experiment", "Played", "Aborted", "Success", "Lose", "Main Score"]
taboo_mark_cols = ["Success", "Played", "Main Score"]

# Wordle all three variants
wordle_scores_path = "results_eval/results_eval/wordle/results_eval/episode-level/tables/wordlewordle-overview-table.csv"
wordle_clue_scores_path = "results_eval/results_eval/wordle_withclue/results_eval/episode-level/tables/wordle_withcluewordle_withclue-overview-table.csv"
wordle_crit_scores_path = "results_eval/results_eval/wordle_withcritic/results_eval/episode-level/tables/wordle_withcriticwordle_withcritic-overview-table.csv"
wordle_keep_cols = ["Models", "Experiment", "Played", "Aborted", "Success", "Lose", "Main Score"]
wordle_mark_cols = ["Success", "Played", "Main Score"]

#Private/Shared 
pvsh_scores_path = "results_eval/results_eval/privateshared/results_eval/episode-level/tables/privatesharedprivateshared-overview-table.csv"
pvsh_keep_cols = ["Models", "Experiment", "Played", "Main Score", "Success", "Kappa", "Middle-Accuracy", "Slot-Filling-Accuracy"]
pvsh_mark_cols = ["Main Score"]

# Add more interaction settings
##############################################################################################################

# Define a function to clean the values and convert to numeric
def clean_and_convert(val):
    if isinstance(val, str):
        clean_val = re.sub(r'\([^)]*\)', '', val)  # Remove values within parentheses
        clean_val = clean_val.strip()  # Remove leading and trailing whitespaces
        if clean_val in ['nan', '/']:  # Ignore specific values
            return pd.NA
        return pd.to_numeric(clean_val, errors='coerce')
    elif np.isnan(val):
        return pd.NA
    return val


# Mark cells as bold
def add_bold(value):
    if isinstance(value, str) and '(' in value and ')' in value:
        parts = value.split('(')
        return f'**{parts[0].strip()}**(' + ''.join(parts[1:])
    elif isinstance(value, str):
        return f'**{value.strip()}**'
    elif isinstance(value, (int, float)):
        return f'**{value}**'
    else:
        return ''



def common_scores(path, keep_cols, mark_cols):
    df = pd.read_csv(path)
    # Replace Unnamed values with models and experiments
    df = df.rename(columns={'Unnamed: 0': 'Models', 'Unnamed: 1': 'Experiment'})
    cols = list(df.columns)
    rm_cols = list(set(cols) - set(keep_cols))
    df = df.drop(columns=rm_cols)
    # Clean and convert the values in the DataFrame
    for col in df.columns[2:]:
        df[col] = df[col].apply(clean_and_convert)

    print(df)

    # Create separate dataframes for each Experiment
    skip_len = len(df['Experiment'].unique())
    exp_dataframes = {}
    for exp in df['Experiment'].unique():
        exp_dataframes[exp] = df[df['Experiment'] == exp]

    # Find indices of all max values for each metric
    max_indices = []
    for exp, exp_df in exp_dataframes.items():
        for col in mark_cols:
            max_val = exp_df[col].max()
            indices = list(zip(np.where(exp_df[col] == max_val)[0], [col] * len(np.where(exp_df[col] == max_val)[0])))
            # Correct the indices w.r.t the original dataframe
            indices_corrected = [(exp_df.index[idx], col_name) for idx, col_name in indices]
            max_indices.extend([(exp, idx[0], idx[1]) for idx in indices_corrected])

    df_indices = pd.DataFrame(max_indices, columns=['Metric', 'Row_Index', 'Column_Name'])
    print(df_indices)

    # Remove the index column
    df = df.loc[:, 'Models':]
    # Replacing every second value in 'model' column with blank
    for i in range(1, len(df)):
        if i%skip_len!=0:
            df.loc[i, 'Models'] = " "


    for index, row in df_indices.iterrows():
        df.loc[row['Row_Index'], row['Column_Name']] = add_bold(df.loc[row['Row_Index'], row['Column_Name']])

    # Convert dataframe to markdown
    md = df.to_markdown(index=False)
    return md


mds = [common_scores(pvsh_scores_path, pvsh_keep_cols, pvsh_mark_cols),
       common_scores(image_scores_path, image_keep_cols, image_mark_cols),
       common_scores(ref_scores_path, ref_keep_cols, ref_mark_cols),
       common_scores(wordle_scores_path, wordle_keep_cols, wordle_mark_cols),
       common_scores(wordle_clue_scores_path, wordle_keep_cols, wordle_mark_cols),
       common_scores(wordle_crit_scores_path, wordle_keep_cols, wordle_mark_cols),
       common_scores(taboo_scores_path, taboo_keep_cols, taboo_mark_cols)]

paths = ["_posts/output_markdowns/pvsh.md",
         "_posts/output_markdowns/image.md",
        "_posts/output_markdowns/ref.md",
        "_posts/output_markdowns/wordle.md",
        "_posts/output_markdowns/wordle_clue.md",
        "_posts/output_markdowns/wordle_crit.md",
        "_posts/output_markdowns/taboo.md"]

for i in range(len(paths)):
    with open(paths[i], "w", encoding="utf-8") as file:
        file.write(mds[i])