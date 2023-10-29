## Description

Sample project using NestJS with Prisma

## Postgres Container

```bash
$ docker run --name mydb -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5440:5432 -d postgres
```

## Installation

```bash
$ npm i -g @nestjs/cli

$ nest new nestjs-api

$ yarn add prisma

$ yarn prisma init
```

## Miscellaneous

1. Install the Prisma Plugin

2. Go to VSCode Settings and add the snippet below:

```bash
"[prisma]": {
  "editor.defaultFormatter": "Prisma.prisma",
  "editor.formatOnSave": true
}
```

3. Create the models and run the command to create all tables:

```bash
$ yarn prisma migrate dev
```

4. (Optional) Prisma Studio (to see the DB using an IDE):

```bash
$ yarn prisma studio
```

5. Generate the modules automatically:

```bash
$ nest g resource {module-name}
```
