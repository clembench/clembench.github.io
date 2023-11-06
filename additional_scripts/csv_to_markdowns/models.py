import pandas as pd
from tabulate import tabulate


# FORMAT - 0:shortname, 1:fullname, 2:version, 3:parameters, 4:traineddatasize, 5:instructiontuned 
models = [['lm', 'luminous-supreme', '2023-01', '70', '588', 'Y'], 
          ['cl', 'claude', 'v1.3', '52', '1.4k', 'Y'], 
          ['ko', 'koala13-b', '2023-06', '13', 'n/a', 'Y'], 
          ['flc', 'falcon-40b-instruct', '2023-06', '40', '600', 'Y'], 
          ['ost', 'open-assistant-12b', '2023-06', '12', '400', 'Y'], 
          ['vcn', 'vicuna-13b', '2023-06', '13', '1.4k', 'Y'], 
          ['3', 'text-davinci', '003', '175', '300', 'Y'], 
          ['3.5', 'gpt-3.5-turbo', '0301', 'n/a', 'n/a', 'Y'], 
          ['4', 'gpt-4', '0314', 'n/a', 'n/a', 'Y']]


short = []
long = []
ver = []
p = []
t = []
i = []
for model_list in models:
    short.append(model_list[0])
    long.append(model_list[1])
    ver.append(model_list[2])
    p.append(model_list[3])
    t.append(model_list[4])
    i.append(model_list[5])

data = {
    "model": long,
    "here": short,
    "version": ver,
    "parameters": p,
    "train datasize": t,
    "instruction tuned": i
}

df = pd.DataFrame(data)

# Convert dataframe to markdown
md = df.to_markdown(index=False)
# md = tabulate(md, headers='keys', tablefmt='pipe', stralign='center', numalign='center')
print(md)

file_name = "_posts/output_markdowns/models.md"
with open(file_name, "w") as file:
    file.write(md)

# print(f"Markdown content saved to {file_name}")