# Getting Started Client Side

## Git Commit

- Commits will not pass if formatted improperly.
- Commit messages should be formatted in this manner:
  - `feat: lower-case-message`

### Conventional Commits

The commit message formatting you are referring to is commonly known as Conventional Commits. This convention provides a set of rules for creating an explicit commit history, which makes it easier to write automated tools on top of.

### Common Prefixes (Types)

Here are some common prefixes (types) used in Conventional Commits:

- **feat**: A new feature for the user.
- **fix**: A bug fix for the user.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests or correcting existing tests.
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **chore**: Other changes that don't modify src or test files.
- **revert**: Reverts a previous commit.

### Example Commit Messages

- `feat: add user login functionality`
- `fix: correct typo in readme`
- `docs: update api documentation`
- `style: format code with prettier`
- `refactor: simplify user authentication logic`
- `perf: improve database query performance`
- `test: add unit tests for user service`
- `build: update npm dependencies`
- `ci: configure github actions`
- `chore: update project dependencies`
- `revert: revert 'add user login functionality'`

### Benefits

Using Conventional Commits helps in:

- Automatically generating CHANGELOGs.
- Automatically determining a semantic version bump (based on the types of commits).
- Communicating the nature of changes to teammates and stakeholders.
- Making it easier to write automated tools on top of the commit history.

By following this convention, you ensure that your commit messages are structured and meaningful, which can greatly improve the maintainability and readability of your project's history.
