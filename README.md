### Hexlet tests and linter status:
[![Actions Status](https://github.com/xenia513/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/xenia513/qa-auto-engineer-javascript-project-87/actions)

[![CI](https://github.com/xenia513/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/xenia513/qa-auto-engineer-javascript-project-87/actions)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=xenia513_qa-auto-engineer-javascript-project-87)](https://sonarcloud.io/summary/new_code?id=xenia513_qa-auto-engineer-javascript-project-87)

## Description:
This utility shows the difference between two files. The output can be shown in different formats.
<br></br>
**List of supported extensions:**

• JSON (```.json``` file extension)

• YML/YAML (```.yml```or ```.yaml``` file extensions)
<br></br>
**List of output formats:**

• ```stylish``` standart format shows the difference between files using ```+``` and ```-``` signs.

• ```plain``` human-readable variant with string-like output of each line, that has any changes. 

• ```json``` similar to *stylish*. Instead of ```+``` and ```-``` shows AST-tree-like system with statuses of *keys* and their *types*.

## Installation:

```sh

# Step 1 — clone this repository
$ git clone https://github.com/xenia513/qa-auto-engineer-javascript-project-87.git

# Step 2 — install the dependencies
$ make install

# Step 3 — install the packages
$ sudo npm link
```
## List of commands in terminal:

**Important note** — in order to use this utility correctly, you should move to ***__fixtures__*** folder in terminal, where you can upload and use your files. 

```sh
# Help window
gendiff -h

# All commands below should run from __fixtures__ folder!

# Show difference with standart (stylish) format
gendiff file1.json file2.json

# Show difference with stylish format
gendiff --format stylish file1.json file2.json

# Show difference with plain format
gendiff --format plain file1.json file2.json

# Show difference with json format
gendiff --format json file1.json file2.json
```

## Difference between two flat JSON files:
[![asciicast](https://asciinema.org/a/nHKg7nocGWwtztv3.svg)](https://asciinema.org/a/nHKg7nocGWwtztv3)

## Difference between two flat YML / YAML files:
[![asciicast](https://asciinema.org/a/F0T8dJuxvf8QtasG.svg)](https://asciinema.org/a/F0T8dJuxvf8QtasG)

## Difference between two nested files (stylish format):
[![asciicast](https://asciinema.org/a/zB9SC9dpnI4buRLe.svg)](https://asciinema.org/a/zB9SC9dpnI4buRLe)

## Difference between two nested files (plain format):
[![asciicast](https://asciinema.org/a/CeOI2eLWvwScNGl9.svg)](https://asciinema.org/a/CeOI2eLWvwScNGl9)

## Difference between two nested files (json format):
[![asciicast](https://asciinema.org/a/vYYhcmUjRBSfV7ld.svg)](https://asciinema.org/a/vYYhcmUjRBSfV7ld)
