# Mini Kanban Board

## Setup

1. Install dependencies.

```bash
npm install
```

2. Run the dev server.

```bash
npm dev
```

## Features

- Add, Edit, and Delete tasks.
- Set Title, Description, and Due Date for each task.
- Categorize tasks into _To Do_, _In Progress_, and _Done_.
- Drag and Drop tasks between columns.
- Persist data between page refreshes.

## Assumptions

- There are only three columns (categories) - _To Do_, _In Progress_, and _Done_.
- Columns cannot be reordered.
- Since methods of filtering are unspecified, users can filter by keywords that match titles and descriptions of tasks.
- Categories are displayed as a single column in a grid layout.
- There is no need for form library.
