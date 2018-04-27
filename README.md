# @atomist/sof-command

This repository contains the StackOverflow search example described
in [Extending your Slack Bot — Part 1: Commands][blog].  This example
demonstrates use of the [Atomist][atomist] API via
the [`@atomist/automation-client`][client] node module.

[blog]: https://the-composition.com/extending-your-slack-bot-part-1-commands-aaa4dbd47933
[client]: https://github.com/atomist/automation-client-ts (@atomist/automation-client Node Module)

## Prerequisites

### Enroll the Atomist bot in your Slack team

<p align="center">
  <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
</p>

### Node.js

You will need to have [Node.js][node] installed.  To verify that the
right versions are installed, please run:

```
$ node -v
v9.5.0
$ npm -v
5.6.0
```

[node]: https://nodejs.org/ (Node.js)

### Cloning the repository and installing dependencies

To get started run the following commands to clone the project,
install its dependencies, and build the project:

```
$ git clone git@github.com:atomist-blogs/sof-command.git
$ cd sof-command
$ npm install
$ npm run build
```

### Handy command line

Installing the client globally will give you quick access to useful shortcuts.

npm install -g @atomist/automation-client

### Configuring your environment

If this is the first time you will be running an Atomist API client locally, you should first configure your system using the atomist script:

```
$ atomist config
```

```
$ `npm bin`/atomist config
```

The script does two things: records what Slack team you want your
automations running in and creates
a [GitHub personal access token][token] with "read:org" scope.

You must run the automations in a Slack team of which you are a
member.  You can get your Slack team ID by typing `team` in a DM to
the Atomist Bot.  If you do not supply the Slack team ID on the
command line, the script will prompt you to enter it.

The `config` script will prompt you for your GitHub
credentials.  It needs them to create the GitHub personal access
token.  Atomist does not store your credentials and only writes the
token to your local machine.

The Atomist API client sends GitHub personal access token when
connecting to the Atomist API.  The Atomist API will use the token to
confirm you are who you say you are and are in a GitHub org connected
to the Slack team in which you are running the automations.

If you prefer, you can also [configure manually][manual] with environment variables.

[manual]: https://github.com/atomist/welcome/blob/master/manualConfiguration.md
[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)

## Starting up the automation-client

To start the client, run the following command:

```
$ atomist start
```

## Invoking a command handler from Slack

This project contains the code to create and respond to a simple
`search so` bot command.  The code that defines the bot command and
implements responding to the command, i.e., the _command handler_, can
be found in [`SearchStackOverflow.ts`][search].  Once you have your local
automation client running (the previous step in this guide), you can
invoke the command handler by sending the Atomist bot the command in
any channel of your Slack team:

```
@atomist search so q="<some query>"
```

Once you've submitted the command in Slack, you'll see the incoming
and outgoing messages show up in the logs of your locally running
automation-client.  Ultimately, you should see the response from the
bot in Slack.

[search]: https://github.com/atomist-blogs/sof-command/blob/master/src/commands/SearchStackOverflow.ts (SearchStackOverflow Command Handler)

Feel free to modify the code in the `SearchStackOverflow` command handler,
restart your local automation client, and see what happens!

## Support

General support questions should be discussed in the `#support`
channel in our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist/sof-command/issues

## Development

You will need to install [node][] to build and test this project.

### Build and Test

Command | Reason
------- | ------
`npm install` | to install all the required packages
`npm start` | to start the Atomist automation client
`npm run autostart` | run the client, refreshing when files change
`npm run lint` | to run tslint against the TypeScript
`npm run compile` | to compile all TypeScript into JavaScript
`npm test` | to run tests and ensure everything is working
`npm run autotest` | run tests continuously
`npm run clean` | remove stray compiled JavaScript files and build directory

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com
