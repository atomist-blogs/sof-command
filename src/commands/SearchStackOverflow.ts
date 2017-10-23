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

import {
    CommandHandler,
    Parameter,
    Tags,
} from "@atomist/automation-client/decorators";
import {
    failure,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client/Handlers";
import {
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages/SlackMessages";
import axios, {
    AxiosResponse,
} from "axios";

const apiSearchUrl =
    `http://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&sort=relevance&site=stackoverflow&q=`;
const webSearchUrl = `http://stackoverflow.com/search?order=desc&sort=relevance&q=`;
const thumbUrl = "https://slack-imgs.com/?c=1&o1=wi75.he75&url=https%3A%2F%2Fcdn.sstatic.net" +
    "%2FSites%2Fstackoverflow%2Fimg%2Fapple-touch-icon%402.png%3Fv%3D73d79a89bded";

@CommandHandler("Query Stack Overflow", "search so")
@Tags("stack-overflow")
export class SearchStackOverflow implements HandleCommand {

    @Parameter({ description: "your search query", pattern: /^.*$/ })
    public q: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return axios.get(`${apiSearchUrl}${encodeURIComponent(this.q)}`)
            .then(res => this.handleResult(res, this.q))
            .then(msg => ctx.messageClient.respond(msg))
            .then(() => Success)
            .catch(error => failure(error));
    }

    private handleResult(result: AxiosResponse, query: string): SlackMessage {
        const data = result.data;
        const msg: SlackMessage = {};
        msg.attachments = (data.items.map((i: any) => {
            const attachment: Attachment = {
                fallback: i.title,
                author_name: i.owner.display_name,
                author_link: i.owner.link,
                author_icon: i.owner.profile_image,
                title: i.title,
                title_link: i.link,
                thumb_url: thumbUrl,
                footer: i.tags.join(", "),
                ts: i.last_activity_date,
            };
            return attachment;
        }));

        if (data.items === null || data.items.length === 0) {
            msg.text = "No results found";
        } else {
            msg.attachments.push({
                fallback: "Show more...",
                title: "Show more...",
                title_link: `${webSearchUrl}${encodeURIComponent(query)}`,
            });
        }
        return msg;
    }
}
