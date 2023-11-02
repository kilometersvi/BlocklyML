# BlocklyML Setup Instructions

Welcome to the documentation for BlocklyML! This document will guide you through the steps to test and run the source code.

## Prerequisites

Before you get started, ensure you have the following installed on your local machine:

- Git: [Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- A web browser (e.g., Chrome, Firefox, or Safari)

## Getting Started

1. **Fork and Clone the Repository**

   Click the "Fork" button on the top-right corner of this repository to create your own copy. Then, clone it to your local machine using the following command:

   ```bash
   git clone https://github.com/elawrie/BlocklyML.git
   ```

2. **Open `index.html` in your Browser**

   Navigate to the project directory and open the `src/index.html` file in your preferred web browser.

   ```bash
   cd BlocklyML/src
   open index.html
   ```

3. **Edit Blocks in `custom_blocks.js**

   Use your preferred code editor to open the `custom_blocks.js` file and make any desired changes to the blocks. This file contains the logic for custom blocks in the application.

4. **Preview Changes**

   After making changes in `custom_blocks.js`, refresh the browser tab where `index.html` is open. Your changes will be reflected in the application.

5. **Create a New Branch**

   Create a new Git branch to work on your changes by running the following command:

   ```bash
   git checkout -b feature/my-new-feature
   ```

6. **Post Changes to Branch**

   Commit your changes to the new branch:

   ```bash
   git add custom_blocks.js
   git commit -m "Add my new feature"
   ```

7. **Submit a Pull Request**

   Push your branch to your forked repository and submit a pull request to the original repository to propose your changes. Make sure to describe your changes in the pull request.

## Enjoy Your Project!

Explore and test your project with the new changes you've made to the custom blocks.
