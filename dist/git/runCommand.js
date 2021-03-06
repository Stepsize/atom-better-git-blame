'use babel';
import * as childProcess from 'child_process';
import os from 'os';
function runGitCommand(repoPath, command, shell = false) {
    return new Promise((resolve, reject) => {
        const args = command.split(' ');
        let child;
        if (os.platform() === 'win32') {
            args.unshift('git');
            child = childProcess.spawn('powershell.exe', args, { cwd: repoPath, shell: false });
        }
        else {
            child = childProcess.spawn('git', args, { cwd: repoPath, shell });
        }
        child.on('error', error => {
            console.error(command);
            return reject(error);
        });
        // This does weird things on Windows so disabled for now
        if (os.platform() !== 'win32') {
            child.on('exit', exitCode => {
                if (exitCode !== 0 && exitCode !== 128) {
                    console.error(repoPath, exitCode, command);
                    return reject(new Error(`Git exited with unexpected code: ${exitCode}`));
                }
            });
        }
        let stdOutPromise = new Promise((resolve, reject) => {
            let stdOut = '';
            child.stdout.on('data', data => (stdOut += data));
            child.stdout.on('end', () => resolve(stdOut));
            child.stdout.on('error', error => reject(error));
        });
        let stdErrPromise = new Promise((resolve, reject) => {
            let stdErr = '';
            child.stderr.on('data', data => (stdErr += data));
            child.stderr.on('end', () => resolve(stdErr));
            child.stderr.on('error', error => reject(error));
        });
        Promise.all([stdOutPromise, stdErrPromise])
            .then(results => {
            const stdOut = results[0];
            const stdErr = results[1];
            if (stdErr !== '') {
                return reject(new Error(stdErr));
            }
            return resolve(stdOut);
        })
            .catch(err => {
            reject(err);
        });
    });
}
export default runGitCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9naXQvcnVuQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7QUFFWixPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFcEIsdUJBQXVCLFFBQWdCLEVBQUUsT0FBZSxFQUFFLFFBQWlCLEtBQUs7SUFDOUUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLENBQUM7UUFDVixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsd0RBQXdEO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLFFBQVEsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0NBQW9DLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksYUFBYSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM5QyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksYUFBYSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM5QyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0ICogYXMgY2hpbGRQcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuZnVuY3Rpb24gcnVuR2l0Q29tbWFuZChyZXBvUGF0aDogc3RyaW5nLCBjb21tYW5kOiBzdHJpbmcsIHNoZWxsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBhcmdzID0gY29tbWFuZC5zcGxpdCgnICcpO1xuICAgIGxldCBjaGlsZDtcbiAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ3dpbjMyJykge1xuICAgICAgYXJncy51bnNoaWZ0KCdnaXQnKTtcbiAgICAgIGNoaWxkID0gY2hpbGRQcm9jZXNzLnNwYXduKCdwb3dlcnNoZWxsLmV4ZScsIGFyZ3MsIHsgY3dkOiByZXBvUGF0aCwgc2hlbGw6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bignZ2l0JywgYXJncywgeyBjd2Q6IHJlcG9QYXRoLCBzaGVsbCB9KTtcbiAgICB9XG5cbiAgICBjaGlsZC5vbignZXJyb3InLCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGNvbW1hbmQpO1xuICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIGRvZXMgd2VpcmQgdGhpbmdzIG9uIFdpbmRvd3Mgc28gZGlzYWJsZWQgZm9yIG5vd1xuICAgIGlmIChvcy5wbGF0Zm9ybSgpICE9PSAnd2luMzInKSB7XG4gICAgICBjaGlsZC5vbignZXhpdCcsIGV4aXRDb2RlID0+IHtcbiAgICAgICAgaWYgKGV4aXRDb2RlICE9PSAwICYmIGV4aXRDb2RlICE9PSAxMjgpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlcG9QYXRoLCBleGl0Q29kZSwgY29tbWFuZCk7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoYEdpdCBleGl0ZWQgd2l0aCB1bmV4cGVjdGVkIGNvZGU6ICR7ZXhpdENvZGV9YCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgc3RkT3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBzdGRPdXQgPSAnJztcbiAgICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gKHN0ZE91dCArPSBkYXRhKSk7XG4gICAgICBjaGlsZC5zdGRvdXQub24oJ2VuZCcsICgpID0+IHJlc29sdmUoc3RkT3V0KSk7XG4gICAgICBjaGlsZC5zdGRvdXQub24oJ2Vycm9yJywgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc3RkRXJyUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBzdGRFcnIgPSAnJztcbiAgICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIGRhdGEgPT4gKHN0ZEVyciArPSBkYXRhKSk7XG4gICAgICBjaGlsZC5zdGRlcnIub24oJ2VuZCcsICgpID0+IHJlc29sdmUoc3RkRXJyKSk7XG4gICAgICBjaGlsZC5zdGRlcnIub24oJ2Vycm9yJywgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbChbc3RkT3V0UHJvbWlzZSwgc3RkRXJyUHJvbWlzZV0pXG4gICAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgY29uc3Qgc3RkT3V0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgY29uc3Qgc3RkRXJyID0gcmVzdWx0c1sxXTtcbiAgICAgICAgaWYgKHN0ZEVyciAhPT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihzdGRFcnIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZShzdGRPdXQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcnVuR2l0Q29tbWFuZDtcbiJdfQ==