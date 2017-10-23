# @atomist/sof-command

This repository contains the StackOverflow search example described
in [Extending your Slack Bot — Part 1: Commands][blog].  This example
demonstrates use of the [Atomist][atomist] API via
the [`@atomist/automation-client`][client] node module.

[blog]: https://the-composition.com/extending-your-slack-bot-part-1-commands-aaa4dbd47933
[client]: https://github.com/atomist/automation-client-ts (@atomist/automation-client Node Module)

## Prerequisites

### Enroll the Atomist bot in your Slack team

<a href="https://atm.st/2wiDlUe">![](https://platform.slack-edge.com/img/add_to_slack@2x.png)</a>

### Node.js

You will need to have [Node.js][node] installed.  To verify that the
right versions are installed, please run:

```
$ node -v
v8.4.0
$ npm -v
5.4.1
```

[node]: https://nodejs.org/ (Node.js)

### Cloning the repository and installing dependencies

To get started run the following commands:

```
$ git clone git@github.com:atomist-blogs/sof-command.git
$ cd sof-command
$ npm install
```

### Configuring your environment

If this is the first time you will be running an Atomist API client
locally, you should first configure your system using the
`atomist-config` script:

```
$ `npm bin`/atomist-config [SLACK_TEAM_ID]
```

The script does two things: records what Slack team you want your
automations running in and creates
a [GitHub personal access token][token] with "read:org" scope.

You must run the automations in a Slack team of which you are a
member.  You can get your Slack team ID by typing `team` in a DM to
the Atomist Bot.  If you do not supply the Slack team ID on the
command line, the script will prompt you to enter it.

The `atomist-config` script will prompt you for your GitHub
credentials.  It needs them to create the GitHub personal access
token.  Atomist does not store your credentials and only writes the
token to your local machine.

The Atomist API client sends GitHub personal access token when
connecting to the Atomist API.  The Atomist API will use the token to
confirm you are who you say you are and are in a GitHub org connected
to the Slack team in which you are running the automations.  In
addition, the Atomist API only allows members of the GitHub team
`atomist-automation` to authenticate and register a new client.  You
will have to create a team in your GitHub organization named
`atomist-automation` and add the users who want to create and register
automations to it.

[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)

## Starting up the automation-client

To start the client, run the following command:

```
$ npm run autostart
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

## Dashboard and GraphQL data explorer

When the automation client has successfully established a connection
to the Atomist API server, the Dashboard (work-in-progress) and
GraphQL data explorer will be available.

*   Dashboard: http://localhost:2866
*   GraphQL Data Explorer: http://localhost:2866/graphql

## Support

General support questions should be discussed in the `#support`
channel in our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist/automation-seed-ts/issues

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

### Release

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  The version in
the package.json is replaced by the build and is totally ignored!  For
example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
$ git push --tags
```

The Travis CI build (see badge at the top of this page) will publish
the NPM module and automatically create a GitHub release using the tag
name for the release and the comment provided on the annotated tag as
the contents of the release notes.

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com
