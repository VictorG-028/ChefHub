

<!-- ![Showcase](ChefHub-Showcase-Gif-1.gif) -->
<!-- ![Showcase](ChefHub-Showcase-Gif-2.gif) -->
<!-- <img class="gif" src="ChefHub-Showcase-Gif-1.gif" alt="Showcase gif" /> -->
<img 
  width=512 
  height=288 
  src="ChefHub-Showcase-Gif-2.gif" 
  alt="Showcase gif" 
/>

## Description
ChefHub is a recipe creation app using gpt-3.5-turbo and Bing Image Creation AI.

This is a 5 members' group project made in UFRPE.

## Features

- Create ingredients
- Create recipes with selected ingredients and selected preferences (guide the desired output recipe)
- See created recipes in detail (ingredients and steps to cook)
- Share a created recipe with a description text and an auto AI-generated image.
- See others shared recipes images and details on the home page

## Repositories

This mono repo includes the below repositories:

- Backend: server made with NodeJS + Typescript + Express + Supabase
- Frontend Web: client made with React
- Frontend Mobile: client made with Flluter

## Maintainer notes

Two leftovers from the old working copies. (1) Branch `wip/openai-v4-bump` holds an unfinished dependency update: `openai` from `^3.3.0` to `^4.52.0`, plus regenerated `package-lock.json` and `pubspec.lock`. It is not merged because the backend still calls the v3 API (`Configuration`, `OpenAIApi` and `createChatCompletion` in `Backend/src/utils/consume_GPT_API.ts`, and the `ChatCompletionRequestMessage` type in `Backend/src/utils/promptCreator.ts`), which v4 removed. To finish it: merge the branch, replace those calls with `new OpenAI({ apiKey })` and `openai.chat.completions.create(...)`, then run the backend tests. To drop it: delete the branch. (2) An old local stash (`WIP on main`, 2023-10-27) existed in a second copy of this repo. It only renamed `ChefHub Showcase Gif 1.gif` to `ChefHub-Showcase-Gif-1.gif`, which `main` already contains, so there is nothing to apply.
