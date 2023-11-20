# clembench.github.io

## Initial Steps

- Install Ruby and Bundler as indicated [here](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll and intialize the repository with `.github.io`

- Run `jekyll new --skip-bundle .` to create  jekyll site.

- Add index.markdown, leaderboard.markdown and contributors.markdown

- To test locally, run `bundle exec jekyll serve` from the root directory (should contain the gemfile)

- To make additional changes in frontend(html/css/js) locate the targeted file in the tree structure of [jekyll minima theme](https://github.com/jekyll/minima) and create the same file in this repo. Example if footer needs to be changed, create `_includes/footer.html`

- Add posts (to show on index page) in `_posts/YYYY-MM-DD-name.md`. [Documentation](https://jekyllrb.com/docs/posts/)
## Usage

1) Convert CSVs to markdowns for each table on the index page:

Definition of Interaction Settings (Add definitions of additional interaction settings here)
```
python3 additional_scripts/csv_to_markdowns/games.py
```

Models Information (Add information of additional models here)
```
python3 additional_scripts/csv_to_markdowns/models.py
```

2) Main leaderboard and plots :

Refer to the Huggingface Space application code [here](https://huggingface.co/spaces/colab-potsdam/clem-leaderboard/tree/main)
