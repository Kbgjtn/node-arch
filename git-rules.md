# Git Flow Branches

master
dev
test
staging (optional)

- Temporary Branches

feature (temporary branchesjo)
feature/name-of-the-feature
example: `feature/support_jws`

bugfix
example: `bugfix/more-gray-shades`

hotfix  
 hotfix/hotfix-description
example: `hotfix/disable-endpoint-contacts`

Release
release/1.2.3
example: `release/myapp-1.01.123`

reference: https://dev.to/couchcamote/git-branching-name-convention-cch

Reflection:
You also can sort or prefix the branch list

    `git branch --list 'your-branch-name/*'`

example: `git branch --list 'feature/*'`

# Git Naming Rules

- Cannot include a `.` at the beginning of the branch path component (e.g `at the beginning of the branch path component ()`feature/.myfeature`)
- Cannot end with `.lock`
- Cannot have consecutive dots. (`..`) `feature/my...feature`
- Cannot contain any ASCII control charancters, like space, tilde, caret, or colo
- Cannot have a `?`, "\*", or "[" anywhere in the name of branch
- Cannot begin or end with a `.`
- Cannot contain the sequence `@{`
- Cannot contain the single charancter `@`
- Cannot contain a '\'

Reflection:
Use command for check your naming is valid or not:

    `git check-ref-format --branch <your-branch-name>`

examples:
`git check-ref-format --branch feautre/something` // output: feature/something
`git check-ref-format --branch /feautre/something` // output: fatal: `/feature/something` is not a valid branch name
