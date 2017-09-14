'use babel';

import StepsizeHelper from '../StepsizeHelper';
import * as GitData from './GitData';
import db from './database';
import _ from 'lodash';
import GitHelper from '../GitHelper';

let pendingRequests = {};

export async function getIntegrationDataForFile(filePath: string) {
  const metadata = await GitData.getRepoMetadata(await GitData.getRepoRootPath(filePath));
  const blame = await GitData.getBlameForFile(filePath);
  if (pendingRequests[filePath]) {
    const response = await pendingRequests[filePath];
    delete pendingRequests[filePath];
    return response;
  }
  pendingRequests[filePath] = StepsizeHelper.fetchIntegrationData(
    metadata,
    GitHelper.getHashesFromBlame(blame.lines)
  ).then(response => {
    return processIntegrationData(response.data);
  });
  const response = await pendingRequests[filePath];
  delete pendingRequests[filePath];
  return response;
}

async function processIntegrationData(data) {
  const pullRequests = data.pullRequests;
  const jiraIssues = data.relatedJiraIssues;
  const githubIssues = data.relatedGitHubIssues;
  db
    .get('githubIssues')
    .merge(_.toArray(githubIssues))
    .uniqBy('number')
    .write();
  db
    .get('jiraIssues')
    .merge(_.toArray(jiraIssues))
    .uniqBy('key')
    .write();
  pullRequestsCommitsPivot(pullRequests);
  for (const i in pullRequests) {
    const pullRequest = pullRequests[i];
    if (
      db
        .get('pullRequests')
        .find({ number: pullRequest.number })
        .value()
    ) {
      continue;
    }
    let toWrite = pullRequest;
    delete toWrite.commits;
    db
      .get('pullRequests')
      .push(toWrite)
      .write();
  }
  return db.get('pullRequests').value();
}

function pullRequestsCommitsPivot(pullRequests) {
  const pivot = _.reduce(
    pullRequests,
    (acc: Array<{ number: number; hashes: string[] }>, pullRequest, key) => {
      acc[key] = _.map(pullRequest.commits, 'commitHash');
      return acc;
    },
    {}
  );
  db
    .get('pullRequestsCommitsPivot')
    .merge(pivot)
    .uniq()
    .write();
  return db.get('pullRequestsCommitsPivot').value();
}

export async function getPullRequestsForCommit(filePath, commitHash) {
  if (pendingRequests[filePath]) {
    await pendingRequests[filePath];
  }
  const results = db
    .get('pullRequestsCommitsPivot')
    .reduce((acc, hashes, prNumber) => {
      if (hashes.includes(commitHash)) {
        acc.push(prNumber);
      }
      return acc;
    }, [])
    .value();
  return results.map(number => {
    return db
      .get('pullRequests')
      .find({ number: parseInt(number) })
      .value();
  });
}

export async function getIssue(filePath, issueKey) {
  if (pendingRequests[filePath]) {
    await pendingRequests[filePath];
  }

  issueKey = issueKey.toString();

  // Assume its a Jira issue if its got a hyphen
  if (issueKey.includes('-')) {
    return db
      .get('jiraIssues')
      .find({ key: issueKey })
      .value();
  }

  return db
    .get('githubIssues')
    .find({ number: parseInt(issueKey) })
    .value();
}