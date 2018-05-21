'use babel';

import React from 'preact-compat';
import moment from 'moment';
import TooltipContainer from './TooltipContainer';
import BuildStatus from './BuildStatus';
import BlameTooltip from './BlameTooltip';
import * as GitData from '../data/GitData';
import * as IntegrationData from '../data/IntegrationData';
import * as ConfigManager from '../ConfigManager';
import * as Analytics from '../stepsize/Analytics';
import * as IntegrationNotification from '../interface/IntegrationNotification';

interface IGutterItemProps {
  commit: any;
  emitter: any;
  inidcatorColor: string;
  firstCommitDate: Date;
  commitDay: number;
}

interface IGutterItemState {
  commit: any;
  pullRequests: any;
  issues: Array<any>;
}

class GutterItem extends React.Component<IGutterItemProps, any> {

  constructor(...props){
    super(...props);
    this.state = {
      commit: {},
      pullRequests: [],
      issues: [],
      metadata: {},
    }
  }

  componentWillMount(){
    this.setState({commit: this.props.commit});
    if(this.props.commit.commitHash.substr(0,6) !== '000000'){
      this.fetchCommitData();
      GitData.getRepoMetadata(this.props.commit.repoPath)
        .then((metadata) => {
          this.setState({
            ...this.state,
            metadata
          });
        });
    }
  }

  componentDidMount(){
    if(this.props.commit.commitHash.substr(0,6) !== '000000') {
      IntegrationData
        .getPullRequestsForCommit(
          `${this.state.commit.repoPath}`,
          this.state.commit.commitHash
        )
        .then((pullRequests) => {
          this.setState({
            ...this.state,
            pullRequests: pullRequests
          });
          pullRequests.map(this.getIssuesForPullRequest.bind(this));
          // Refresh the commit data
          this.fetchCommitData();
        });
    }
  }

  fetchCommitData(){
    if(this.props.commit.commitHash.substr(0,6) !== '000000'){
      GitData.getCommit(this.props.commit.repoPath, this.props.commit.commitHash)
        .then((commit) => {
          this.setState({
            ...this.state,
            commit : {
              ...this.state.commit,
              ...commit
            }
          });
        });
    }
  }

  async getIssuesForPullRequest(pullRequest) {
    if (pullRequest) {
      const issues = await Promise.all(pullRequest.relatedIssueKeys.map(
        issueKey => IntegrationData.getIssue(this.state.commit.repoPath, issueKey)
      ));
      this.setState({ ...this.state, issues });
    } else {
      this.setState({ ...this.state, issues: [] })
    }
  }

  tooltip(){
    return (
      <BlameTooltip
        emitter={this.props.emitter}
        commit={this.state.commit}
        commitDay={this.props.commitDay}
        firstCommitDate={this.props.firstCommitDate}
        pullRequests={this.state.pullRequests}
        issues={this.state.issues}
        metadata={this.state.metadata}
      />
    )
  }

  formattedText() {
    const commit = this.props.commit;
    const date = commit.commitedAt;
    const formattedDate = moment(date).format(ConfigManager.get('gutterDateFormat'));
    let author = commit.author;
    if (author == 'Not Committed Yet')
      return `${author}`
    if(ConfigManager.get('truncateGutterNames')){
      const splitAuthor = author.split(' ');
      if(splitAuthor.length > 1){
        const lastName = splitAuthor.pop();
        const initials = splitAuthor.map((part) => {
          return part[0].toUpperCase()
        }).join(' ');
        author = `${initials}. ${lastName}`;
      }
    }
    return `${formattedDate} ${author}`
  }

  render() {
    if(this.state.commit.commitHash.substr(0,6) === '000000'){
      return (
        <div className="gutter-text">
          {this.formattedText()}
        </div>
      );
    }
    return (
      <div>
        <TooltipContainer
          className="gutter-text"
          tooltipContent={this.tooltip.bind(this)}
        >
          {this.formattedText()}
        </TooltipContainer>
        <TooltipContainer
          style={{background: this.props.inidcatorColor}}
          className="gutter-age"
        />
      </div>
    );
  }

}

export default GutterItem;
