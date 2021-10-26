const { Octokit } = require("@octokit/core");
const { paginateRest } = require("@octokit/plugin-paginate-rest");

const core = require('@actions/core');
const github = require('@actions/github');

const { parse } = require('json2csv');

const fs = require('fs');
const { context } = require("@actions/github/lib/utils");

const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({
    auth: core.getInput('github_token'),
    baseUrl: 'https://api.github.com'
});



const fields = ['number', 'created_at', 'html_url', 'state', 'dismissed_by', 'dismissed_reason', 'rule', 'tool'];

const opts = { fields };

async function getCodeScanning() {

    try {
        const result = await octokit.paginate('GET /repos/{owner}/{repo}/code-scanning/alerts', {
            owner: core.getInput('repo_owner'),
            repo: core.getInput('repository_name'),
            per_page: 100,
        });

        const csv = parse(result, opts);

        fs.writeFile('result.csv', csv, function(err) {
            if (err) {
                console.log(err);
            }
        });

    } catch (error) {
        console.log(error);
    };

};

getCodeScanning();