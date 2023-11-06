# Python script to get max values of tables to mark them in bold for the frontend

import pandas as pd
import numpy as np
import re
from tabulate import tabulate

df = pd.read_csv('results_eval/results_eval/results_eval/episode-level/tables/bench-paper-table.csv')
# Save original copy as str
df_save = df.astype(str)

# Define a function to clean the values and convert to numeric
def clean_and_convert(val):
    if isinstance(val, str):
        clean_val = re.sub(r'\([^)]*\)', '', val)  # Remove values within parentheses
        clean_val = clean_val.strip()  # Remove leading and trailing whitespaces
        if clean_val in ['nan', '/']:  # Ignore specific values
            return pd.NA
        return pd.to_numeric(clean_val, errors='coerce')
    return val

# Clean and convert the values in the DataFrame
for col in df.columns[2:]:
    df[col] = df[col].apply(clean_and_convert)

# Create separate dataframes for each metric
metric_dataframes = {}
for metric in df['metric'].unique():
    metric_dataframes[metric] = df[df['metric'] == metric]

# Find indices of all max values for each metric
max_indices = []
for metric, metric_df in metric_dataframes.items():
    for col in metric_df.columns[2:]:
        max_val = metric_df[col].max()
        indices = list(zip(np.where(metric_df[col] == max_val)[0], [col] * len(np.where(metric_df[col] == max_val)[0])))
        # Correct the indices w.r.t the original dataframe
        indices_corrected = [(metric_df.index[idx], col_name) for idx, col_name in indices]
        max_indices.extend([(metric, idx[0], idx[1]) for idx in indices_corrected])

df_indices = pd.DataFrame(max_indices, columns=['Metric', 'Row_Index', 'Column_Name'])

# Use saved df
df = df_save
# Remove the index column
df = df.loc[:, 'model':]
# Replacing every second value in 'model' column with blank
for i in range(1, len(df), 2):
    df.loc[i, 'model'] = " "

# Mark cells as bold
def add_bold(value):
    if '(' in value and ')' in value:
        parts = value.split('(')
        return f'**{parts[0].strip()}**(' + ''.join(parts[1:])
    else:
        return f'**{value.strip()}**'

for index, row in df_indices.iterrows():
    df.loc[row['Row_Index'], row['Column_Name']] = add_bold(df.loc[row['Row_Index'], row['Column_Name']])

# Convert dataframe to markdown
md = df.to_markdown(index=False)
print(md)

file_name = "_posts/output_markdowns/main_leaderboard.md"
with open(file_name, "w") as file:
    file.write(md)

# print(f"Markdown content saved to {file_name}")