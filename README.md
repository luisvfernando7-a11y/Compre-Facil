# Compre Facil

Compre Facil is a mobile shopping list app built with Expo and React Native. The idea is simple: make a grocery trip easier by organizing products by store section, tracking quantities, and showing what has already been picked up.

I built this project as part of my learning journey with mobile development, React state management, and practical UI flows in React Native. Instead of only creating static screens, I wanted to build something that behaves like a real everyday tool.

## Features

- Add products through a fixed input at the bottom of the screen.
- Automatically send items to a section based on simple keyword rules.
- Browse products by shopping section.
- Increase or decrease item quantity.
- Remove an item automatically when its quantity reaches zero.
- Mark products as already picked up.
- View a general purchase summary grouped by section.
- Track total progress based on picked and remaining quantities.

## Tech Stack

- JavaScript
- React
- React Native
- Expo
- npm

## Project Structure

```text
compre-facil/
|-- App.js
|-- app.json
|-- index.js
|-- package.json
|-- README.md
|-- .gitignore
|-- assets/
|   |-- adaptive-icon.png
|   |-- favicon.png
|   |-- icon.png
|   |-- snack-icon.png
|   `-- splash-icon.png
`-- components/
    `-- AssetExample.js
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed. To run the app on a physical device, install Expo Go on your phone.

### Installation

```bash
git clone https://github.com/luisvfernando7-a11y/Compre-Facil.git
cd Compre-Facil
npm install
```

### Running the App

Start the Expo development server:

```bash
npm start
```

Then scan the QR Code with Expo Go.

You can also run the platform-specific scripts:

```bash
npm run android
npm run ios
npm run web
```

## What I Learned

- How to structure a React Native app using Expo.
- How to manage screen flow with local React state.
- How to work with lists using `FlatList`.
- How to handle text input and form submission on mobile.
- How to update arrays immutably when adding, checking, and changing item quantities.
- How to create a simple rule-based classification system for user input.
- How to keep the interface usable with `SafeAreaView` and `KeyboardAvoidingView`.

## Next Steps

- Save the shopping list locally so the data is not lost after closing the app.
- Finish the actions for adding and editing custom sections.
- Add a direct delete action for products.
- Review the source file encoding so accented text and icons render correctly in code.
- Remove unused declared dependencies or integrate them into the interface.
- Add basic tests for item classification and quantity updates.
- Improve the visual polish with a more consistent component structure.

## License

This project uses the `0BSD` license, as declared in `package.json`.

## Author

Luis Fernando

- Portfolio: [Coming soon](https://luisgalvani.vercel.app/)
- LinkedIn: www.linkedin.com/in/luisfernandovieira
- GitHub: [luisvfernando7-a11y](https://github.com/luisvfernando7-a11y)
- Email: [luisvfernando7@gmail.com](mailto:luisgalvanivzk@gmail.com)
