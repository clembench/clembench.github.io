# Aggregated results

The two aggregate tables behind the reported numbers. These are the versions used for the paper and
the leaderboard, not a fresh export — regenerate them only if you have re-run games.

| File | Contents |
| --- | --- |
| `combined_results.csv` | one row per language, model and game: `language, model, game, played, quality, clemscore` (3,771 rows = 30 languages × 9 models × 14 games, minus Chinese Wordle) |
| `cost_by_language.csv` | one row per model and language: `model_folder, model_label, language, input_tokens, output_tokens, total_cost` (270 rows) |
