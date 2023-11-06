# temp2.github.io

## Initial Steps

- Install Ruby and Bundler as indicated [here](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll and intialize the repository with `.github.io`

- Run `jekyll new --skip-bundle .` to create  jekyll site.

## Usage

Requires - the following directory structure

    .
    ├── ...
    ├── _posts                              #Individual leaderboard pages
    │   ├── output_markdowns                #Save markdowns from csvs
    │   ├── 2023-06-01-image.md            
    │   ├── 2023-06-01-pvsh.md         
    │   └...
    ├── 2023/06/01/plots                    # Save the converted plots (from pdf to jpg) for individual posts
    │   ├── imagegame_Aborted.jpg         
    │   ├── imagegame_F1.jpg
    │   └...
    ├── additional_scripts                  # Save the converted plots (from pdf to jpg)
    │   ├── csvs_to_markdowns               # Python Scripts to convert the csvs in results_eval/.... to markdowns 
    │   ├── pdfimg.py                       # Convert PDF plots to JPG plots
    ├── results_eval                        # Main Results Folder
    │   ├── _MACOSX                             
    │   ├── results_eval                    # Sub results folder
    │       ├── results_eval                # Contains overall Results 
    │           ├── episode_level           # Contains CSVs and Plot PDFs for all Interaction Settings by Episode
    │           ├── turn_level              # Contains CSVs and Plot PDFs for all Interaction Settings by Turn
    │       ├── imagegame               
    │           ├── results_eval            # Contains overall Results for the imagegame
    │               ├── episode_level       # Contains CSVs and Plot PDFs for all Interaction Settings by Episode
    │               ├── turn_level          # Contains CSVs and Plot PDFs for all Interaction Settings by Turn
    |               ├── clem-clem           # Results of each clem pair for the imagegame
    |               ├── ...
    │       ├── privateshared
    │       ├── ... 
    

1) Convert CSVs to markdowns for each table:

Definition of Interaction Settings
```
python3 games.py
```

Individual Leaderboards for each Interaction Setting
```
python3 interaction_settings.py
```

Main Leaderboard
```
python3 main_leaderboard.py
```

Models Information
```
python3 models.py
```

2) Get plots :

Set `games` and `metrics` depending upon which plots to use
```
python3 pdfimg.py
```
3) Test Locally

```
bundle exec jekyll serve
```
