/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "mocha";
import * as assert from "power-assert";

import { HandlerContext } from "@atomist/automation-client/Handlers";

import { guid } from "@atomist/automation-client/internal/util/string";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import { SearchStackOverflow } from "../../src/commands/SearchStackOverflow";

describe("SearchStackOverflow", () => {

    const searchSo = new SearchStackOverflow();
    const teamId = "T79TH";

    it("should response with a properly formatted search results", done => {
        executeSearchAndVerify("Atomist", msg => {
            assert(msg.attachments.length > 0);
        }, done);
    });

    it("should response with a hint for no search results", done => {
        executeSearchAndVerify("wöagljkarslödlbghksdöaofäp#aklsgöd", msg => {
            assert(msg.text === "No results found");
        }, done);
    });

    function executeSearchAndVerify(q: string, callback: (msg: SlackMessage) => void, done: any) {
        const ctx = {
            messageClient: {
                respond(msg: string | SlackMessage, options?: MessageOptions): Promise<any> {
                    const sm = msg as SlackMessage;
                    callback(sm);
                    return Promise.resolve();
                },
            },
            teamId,
            invocationId: guid(),
            correlationId: guid(),
        };

        searchSo.q = q;

        const promise = searchSo.handle(ctx as HandlerContext);
        promise.then(result => {
            assert(result.code === 0);
            done();
        }).catch(done);
    }
});
