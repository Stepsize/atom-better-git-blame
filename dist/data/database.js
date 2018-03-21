'use babel';
import low from 'lowdb';
import fs from 'fs';
import Memory from 'lowdb/adapters/Memory';
const adapter = new Memory();
const db = low(adapter);
db
    .defaults({
    commitMessages: {},
    blames: [],
    fileCommits: [],
    rootPaths: {},
    startDates: {},
    repoMetadata: {},
    pullRequests: [],
    pullRequestsCommitsPivot: {},
    issues: [],
})
    .write();
window.layerCacheDump = function (path = __dirname) {
    let savePath = `${path}/layer-${Date.now()}.json`;
    fs.writeFileSync(savePath, JSON.stringify(db));
    console.log('Cache dumped to', savePath);
};
export default db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZGF0YS9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7QUFFWixPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXBCLE9BQU8sTUFBTSxNQUFNLHVCQUF1QixDQUFDO0FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFN0IsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXhCLEVBQUU7S0FDQyxRQUFRLENBQUM7SUFDUixjQUFjLEVBQUUsRUFBRTtJQUNsQixNQUFNLEVBQUUsRUFBRTtJQUNWLFdBQVcsRUFBRSxFQUFFO0lBQ2YsU0FBUyxFQUFFLEVBQUU7SUFDYixVQUFVLEVBQUUsRUFBRTtJQUNkLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLHdCQUF3QixFQUFFLEVBQUU7SUFDNUIsTUFBTSxFQUFFLEVBQUU7Q0FDWCxDQUFDO0tBQ0QsS0FBSyxFQUFFLENBQUM7QUFFWCxNQUFNLENBQUMsY0FBYyxHQUFHLFVBQVMsT0FBZSxTQUFTO0lBQ3ZELElBQUksUUFBUSxHQUFHLEdBQUcsSUFBSSxVQUFVLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0lBQ2xELEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUVGLGVBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBsb3cgZnJvbSAnbG93ZGInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IE1lbW9yeSBmcm9tICdsb3dkYi9hZGFwdGVycy9NZW1vcnknO1xuY29uc3QgYWRhcHRlciA9IG5ldyBNZW1vcnkoKTtcblxuY29uc3QgZGIgPSBsb3coYWRhcHRlcik7XG5cbmRiXG4gIC5kZWZhdWx0cyh7XG4gICAgY29tbWl0TWVzc2FnZXM6IHt9LFxuICAgIGJsYW1lczogW10sXG4gICAgZmlsZUNvbW1pdHM6IFtdLFxuICAgIHJvb3RQYXRoczoge30sXG4gICAgc3RhcnREYXRlczoge30sXG4gICAgcmVwb01ldGFkYXRhOiB7fSxcbiAgICBwdWxsUmVxdWVzdHM6IFtdLFxuICAgIHB1bGxSZXF1ZXN0c0NvbW1pdHNQaXZvdDoge30sXG4gICAgaXNzdWVzOiBbXSxcbiAgfSlcbiAgLndyaXRlKCk7XG5cbndpbmRvdy5sYXllckNhY2hlRHVtcCA9IGZ1bmN0aW9uKHBhdGg6IHN0cmluZyA9IF9fZGlybmFtZSkge1xuICBsZXQgc2F2ZVBhdGggPSBgJHtwYXRofS9sYXllci0ke0RhdGUubm93KCl9Lmpzb25gO1xuICBmcy53cml0ZUZpbGVTeW5jKHNhdmVQYXRoLCBKU09OLnN0cmluZ2lmeShkYikpO1xuICBjb25zb2xlLmxvZygnQ2FjaGUgZHVtcGVkIHRvJywgc2F2ZVBhdGgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7XG4iXX0=