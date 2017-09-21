'use babel';
import { createSocket } from 'dgram';
import fs from 'fs';
import StepsizeHelper from './StepsizeHelper';
class StepsizeOutgoing {
    constructor() {
        this.readyTries = 1;
        // sendError - sends error message to Stepsize
        this.sendError = data => {
            let editor = atom.workspace.getActiveTextEditor();
            if (!editor) {
                return;
            }
            let event = {
                source: 'atom',
                action: 'error',
                filename: fs.realpathSync(editor.getPath()),
                selected: JSON.stringify(data),
                plugin_id: this.pluginId,
            };
            this.send(event);
        };
        this.pluginId = 'atom_v0.0.2';
        this.DEBUG = false;
        this.UDP_HOST = '127.0.0.1';
        this.UDP_PORT = 49369;
        this.OUTGOING_SOCK = createSocket('udp4');
        this.layerReady = false;
        this.OUTGOING_SOCK.on('message', msg => {
            const parsedMessage = JSON.parse(msg);
            if (parsedMessage.type === 'ready' &&
                parsedMessage.source.name === 'Layer') {
                this.layerReady = true;
                if (this.cachedMessage) {
                    this.send(this.cachedMessage);
                }
                clearInterval(this.readyInterval);
            }
        });
    }
    checkLayerIsReady() {
        if (this.layerReady) {
            return;
        }
        this.sendReady();
        this.readyCheckTimer();
    }
    readyCheckTimer() {
        this.readyRetryTimer = 3 * (Math.pow(this.readyTries / 10, 2) + 1);
        this.readyInterval = setTimeout(() => {
            this.readyTries++;
            this.sendReady();
            this.readyCheckTimer();
        }, this.readyRetryTimer * 1000);
    }
    send(event, callback) {
        if (!this.layerReady && event.type !== 'ready') {
            this.checkLayerIsReady();
            this.cachedMessage = event;
            if (callback) {
                callback();
            }
            return;
        }
        let msg = JSON.stringify(event);
        this.OUTGOING_SOCK.send(msg, 0, msg.length, this.UDP_PORT, this.UDP_HOST, callback);
    }
    sendReady() {
        const event = {
            type: 'ready',
            source: { name: 'BetterGitBlame', version: '0.1.0' },
        };
        this.send(event);
    }
    buildSelectionEvent(editor) {
        const ranges = editor.selections.map(selection => {
            return selection.getBufferRange();
        });
        return this.buildEvent(editor, ranges, 'selection');
    }
    buildEvent(editor, ranges, action, shouldPerformSearch = false) {
        const selectedLineNumbers = StepsizeHelper.rangesToSelectedLineNumbers(ranges);
        return {
            source: 'atom',
            action: action,
            filename: editor.getPath() || null,
            plugin_id: this.pluginId,
            selectedLineNumbers,
            shouldPerformSearch: shouldPerformSearch,
        };
    }
}
export default StepsizeOutgoing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcHNpemVPdXRnb2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zdGVwc2l6ZS9TdGVwc2l6ZU91dGdvaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQztBQUVaLE9BQU8sRUFBVSxZQUFZLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBRzlDO0lBWUU7UUFKUSxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBdUUvQiw4Q0FBOEM7UUFDOUMsY0FBUyxHQUFHLElBQUk7WUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLEtBQUssR0FBRztnQkFDVixNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsT0FBTztnQkFDZixRQUFRLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzNDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDOUIsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3pCLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQWhGQSxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FB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VUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsR0FBRyxLQUFLO1FBQzVELE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLDJCQUEyQixDQUNwRSxNQUFNLENBQ1AsQ0FBQztRQUNGLE1BQU0sQ0FBQztZQUNMLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUk7WUFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3hCLG1CQUFtQjtZQUNuQixtQkFBbUIsRUFBRSxtQkFBbUI7U0FDekMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGVBQWUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHsgU29ja2V0LCBjcmVhdGVTb2NrZXQgfSBmcm9tICdkZ3JhbSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IFN0ZXBzaXplSGVscGVyIGZyb20gJy4vU3RlcHNpemVIZWxwZXInO1xuaW1wb3J0IFRpbWVyID0gTm9kZUpTLlRpbWVyO1xuXG5jbGFzcyBTdGVwc2l6ZU91dGdvaW5nIHtcbiAgcHJpdmF0ZSBwbHVnaW5JZDtcbiAgcHJpdmF0ZSBERUJVRzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBVRFBfSE9TVDogc3RyaW5nO1xuICBwcml2YXRlIFVEUF9QT1JUOiBudW1iZXI7XG4gIHByaXZhdGUgT1VUR09JTkdfU09DSzogU29ja2V0O1xuICBwcml2YXRlIGxheWVyUmVhZHk6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZHlJbnRlcnZhbDogVGltZXI7XG4gIHByaXZhdGUgcmVhZHlUcmllczogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSByZWFkeVJldHJ5VGltZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSBjYWNoZWRNZXNzYWdlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wbHVnaW5JZCA9ICdhdG9tX3YwLjAuMic7XG4gICAgdGhpcy5ERUJVRyA9IGZhbHNlO1xuICAgIHRoaXMuVURQX0hPU1QgPSAnMTI3LjAuMC4xJztcbiAgICB0aGlzLlVEUF9QT1JUID0gNDkzNjk7XG4gICAgdGhpcy5PVVRHT0lOR19TT0NLID0gY3JlYXRlU29ja2V0KCd1ZHA0Jyk7XG4gICAgdGhpcy5sYXllclJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5PVVRHT0lOR19TT0NLLm9uKCdtZXNzYWdlJywgbXNnID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlZE1lc3NhZ2UgPSBKU09OLnBhcnNlKG1zZyk7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcnNlZE1lc3NhZ2UudHlwZSA9PT0gJ3JlYWR5JyAmJlxuICAgICAgICBwYXJzZWRNZXNzYWdlLnNvdXJjZS5uYW1lID09PSAnTGF5ZXInXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sYXllclJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkTWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2VuZCh0aGlzLmNhY2hlZE1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWFkeUludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tMYXllcklzUmVhZHkoKSB7XG4gICAgaWYgKHRoaXMubGF5ZXJSZWFkeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNlbmRSZWFkeSgpO1xuICAgIHRoaXMucmVhZHlDaGVja1RpbWVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWR5Q2hlY2tUaW1lcigpIHtcbiAgICB0aGlzLnJlYWR5UmV0cnlUaW1lciA9IDMgKiAoTWF0aC5wb3codGhpcy5yZWFkeVRyaWVzIC8gMTAsIDIpICsgMSk7XG4gICAgdGhpcy5yZWFkeUludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlYWR5VHJpZXMrKztcbiAgICAgIHRoaXMuc2VuZFJlYWR5KCk7XG4gICAgICB0aGlzLnJlYWR5Q2hlY2tUaW1lcigpO1xuICAgIH0sIHRoaXMucmVhZHlSZXRyeVRpbWVyICogMTAwMCk7XG4gIH1cblxuICBwdWJsaWMgc2VuZChldmVudCwgY2FsbGJhY2s/KSB7XG4gICAgaWYgKCF0aGlzLmxheWVyUmVhZHkgJiYgZXZlbnQudHlwZSAhPT0gJ3JlYWR5Jykge1xuICAgICAgdGhpcy5jaGVja0xheWVySXNSZWFkeSgpO1xuICAgICAgdGhpcy5jYWNoZWRNZXNzYWdlID0gZXZlbnQ7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG1zZyA9IEpTT04uc3RyaW5naWZ5KGV2ZW50KTtcbiAgICB0aGlzLk9VVEdPSU5HX1NPQ0suc2VuZChcbiAgICAgIG1zZyxcbiAgICAgIDAsXG4gICAgICBtc2cubGVuZ3RoLFxuICAgICAgdGhpcy5VRFBfUE9SVCxcbiAgICAgIHRoaXMuVURQX0hPU1QsXG4gICAgICBjYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBzZW5kUmVhZHkoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICB0eXBlOiAncmVhZHknLFxuICAgICAgc291cmNlOiB7IG5hbWU6ICdCZXR0ZXJHaXRCbGFtZScsIHZlcnNpb246ICcwLjEuMCcgfSxcbiAgICB9O1xuICAgIHRoaXMuc2VuZChldmVudCk7XG4gIH1cblxuICAvLyBzZW5kRXJyb3IgLSBzZW5kcyBlcnJvciBtZXNzYWdlIHRvIFN0ZXBzaXplXG4gIHNlbmRFcnJvciA9IGRhdGEgPT4ge1xuICAgIGxldCBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk7XG4gICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGV2ZW50ID0ge1xuICAgICAgc291cmNlOiAnYXRvbScsXG4gICAgICBhY3Rpb246ICdlcnJvcicsXG4gICAgICBmaWxlbmFtZTogZnMucmVhbHBhdGhTeW5jKGVkaXRvci5nZXRQYXRoKCkpLFxuICAgICAgc2VsZWN0ZWQ6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgcGx1Z2luX2lkOiB0aGlzLnBsdWdpbklkLFxuICAgIH07XG4gICAgdGhpcy5zZW5kKGV2ZW50KTtcbiAgfTtcblxuICBidWlsZFNlbGVjdGlvbkV2ZW50KGVkaXRvcikge1xuICAgIGNvbnN0IHJhbmdlcyA9IGVkaXRvci5zZWxlY3Rpb25zLm1hcChzZWxlY3Rpb24gPT4ge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbi5nZXRCdWZmZXJSYW5nZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmJ1aWxkRXZlbnQoZWRpdG9yLCByYW5nZXMsICdzZWxlY3Rpb24nKTtcbiAgfVxuXG4gIGJ1aWxkRXZlbnQoZWRpdG9yLCByYW5nZXMsIGFjdGlvbiwgc2hvdWxkUGVyZm9ybVNlYXJjaCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRMaW5lTnVtYmVycyA9IFN0ZXBzaXplSGVscGVyLnJhbmdlc1RvU2VsZWN0ZWRMaW5lTnVtYmVycyhcbiAgICAgIHJhbmdlc1xuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNvdXJjZTogJ2F0b20nLFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICBmaWxlbmFtZTogZWRpdG9yLmdldFBhdGgoKSB8fCBudWxsLFxuICAgICAgcGx1Z2luX2lkOiB0aGlzLnBsdWdpbklkLFxuICAgICAgc2VsZWN0ZWRMaW5lTnVtYmVycyxcbiAgICAgIHNob3VsZFBlcmZvcm1TZWFyY2g6IHNob3VsZFBlcmZvcm1TZWFyY2gsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGVwc2l6ZU91dGdvaW5nO1xuIl19