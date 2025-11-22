# SOEN342_PROJECT

Section II

Team members

1. Aninnda Kumar Datta 40298954 (Team Leader)
2. Duc Vinh Lam 40282959

## Demo Video

You can view a 5 minute video demonstration of our app here: [https://youtu.be/B_bDgeERgyk](https://youtu.be/B_bDgeERgyk).

## Documentation
Finalized documentation, such as Use Case Models, Sequence Diagrams, and Domain Models can be found under [documentation/all-final](https://github.com/aninnda/SOEN342_PROJECT/blob/main/documentation/all-final/).

If you wish to view documentation created by iteration, see subfolders under [documentation](https://github.com/aninnda/SOEN342_PROJECT/blob/main/documentation/all-final/).

## Running instructions

This project is best run on **VSCode** using **bun.js** and the "Local Development" launch configuration.
Nonetheless, it's possible to run it using other popular package managers like **npm**, and a Java IDE like **Intellij Idea**.

### Using npm

1. Download **npm** (bundled with **node.js**, [installation steps](https://nodejs.org/en/download))
2. Set directory to `frontend/` by running `cd frontend`. Install dependencies by running `npm install`.
3. Download and configure a JDK compatible with JDK 21.

> Continue to either "VSCode" or "Intellij Idea".

### Using bun.js (preferred)

1. Download **bun**: [installation steps](https://bun.com/docs/installation)
2. Install dependencies by running `bun install`. You'll need to do this when a package is added/removed by another contributor.
3. Download and configure a JDK compatible with JDK 21.

> Continue to either "VSCode" or "Intellij Idea".


### VSCode

4. If using VSCode, you can use the launch configurations. "Local Development" runs both the frontend and the backend.
5. Access the frontend at http://localhost:5173

### IntelliJ Idea

4. If using Intellij, you'll want to run the backend by running the MainApplication.java file, found at `\backend\src\main\java\soen342\project\controller\MainApplication.java`
5. Use the terminal to run `bun run dev` (if bun is installed) or `cd frontend && npm run dev` (if npm is installed) to run the frontend.
6. Access the frontend at http://localhost:5173
