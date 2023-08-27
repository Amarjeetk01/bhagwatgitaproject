# Bhagavad Gita Blog App

This is a React application that displays chapters and verses from the Bhagavad Gita, along with their translations and summaries. Users can navigate through the chapters and verses and share them on social media.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Custom Hooks](#custom-hooks)
- [Folder Structure](#folder-structure)

## Description

The Bhagavad Gita Blog App is built using React and features two main components: `SlokList` and `Blog`. The `SlokList` component displays individual verses of the Bhagavad Gita with their translations and allows users to navigate through chapters and verses. The `Blog` component provides detailed information about each chapter, including its name, meaning, and summary.

## Features

- Display individual verses and translations from the Bhagavad Gita.
- Navigate through chapters and verses using arrow buttons.
- Share verses on Twitter using the built-in sharing feature.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Amarjeetk01/bhagwatgitaproject.git
```
2. Navigate to the project directory:
```bash
cd bhagwatgitaproject
```
3. Install dependencies:
```bash
npm install
```
## Usage
Follow these steps to run the Bhagavad Gita Blog App:

### Run the application:
Start the application using the following command:
```bash
npm start
```
### Access the App
Open your web browser and go to http://localhost:3000 to view the app.
## Custom Hooks
The useFetchData hook is used to fetch data for the SlokList and Blog components. It handles fetching data for both individual verses and chapter details.

## Folder Structure
The project's folder structure is organized as follows:

```lua
src/
|-- components/
|   |-- Handler.js
|   |-- Spinner.js
|   |-- ...
|-- Data/
|   |-- chapters/
|   |   |-- index.json
|    |-- [sloka]/
|        |-- index.json
|-- page/
|   |-- chapter/
|   |   |-- Blog.js
|   |-- slok/
|       |-- Slok.js
|-- slokCompoent/
|   |-- Transaltion.js
|-- useFetchData.js
|-- App.js
|-- index.js
|-- Home.js
|-- ...