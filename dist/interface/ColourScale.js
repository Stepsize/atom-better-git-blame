'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NodeColorGradient from 'node-color-gradient';
import * as GitData from '../data/GitData';
import * as ConfigManager from '../ConfigManager';
let editors = {};
let datePromises = {};
let scalePromises = {};
export function colorScale(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectDir = yield GitData.getRepoRootPath(editor.getPath());
        if (!scalePromises[projectDir]) {
            scalePromises[projectDir] = getScaleForEditor(editor);
        }
        return yield scalePromises[projectDir];
    });
}
function getScaleForEditor(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectDir = yield GitData.getRepoRootPath(editor.getPath());
        let firstCommitDate = yield datePromises[projectDir];
        const totalDays = Math.floor((Date.now() - firstCommitDate.getTime()) / 1000 / 3600 / 24);
        const gradient = calculateScale(totalDays);
        // Hack to fix color scale calculation coming up short with steps
        const lengthDifference = totalDays - gradient.length;
        if (lengthDifference > 0) {
            for (let i = 0; i < lengthDifference; i++) {
                gradient.push(gradient[gradient.length - 1]);
            }
        }
        return gradient;
    });
}
export function setEditor(editor) {
    return GitData.getRepoRootPath(editor.getPath()).then(projectDir => {
        if (editors[projectDir]) {
            return;
        }
        editors[projectDir] = editor;
        datePromises[projectDir] = GitData.getFirstCommitDateForRepo(editor.getPath());
    });
}
export const scales = {
    RoyalPomegranate: [
        [63, 116, 212],
        [60, 125, 199],
        [55, 136, 228],
        [78, 161, 216],
        [83, 175, 202],
        [96, 202, 197],
        [127, 225, 221],
        [167, 239, 236],
        [203, 248, 247],
        [255, 255, 255],
        [253, 245, 234],
        [251, 231, 204],
        [246, 208, 158],
        [243, 179, 99],
        [240, 159, 96],
        [240, 141, 89],
        [239, 128, 88],
        [238, 115, 73],
        [237, 98, 59],
        [235, 62, 37],
    ],
    ChocolateMint: [
        [140, 81, 10],
        [191, 129, 45],
        [223, 194, 125],
        [246, 232, 195],
        [245, 245, 245],
        [199, 234, 229],
        [128, 205, 193],
        [53, 151, 143],
        [1, 102, 94],
    ],
    VioletApple: [
        [197, 27, 125],
        [222, 119, 174],
        [241, 182, 218],
        [253, 224, 239],
        [247, 247, 247],
        [230, 245, 208],
        [184, 225, 134],
        [127, 188, 65],
        [77, 146, 33],
    ],
    AffairGoblin: [
        [118, 42, 131],
        [153, 112, 171],
        [194, 165, 207],
        [231, 212, 232],
        [247, 247, 247],
        [217, 240, 211],
        [166, 219, 160],
        [90, 174, 97],
        [27, 120, 55],
    ],
    GoldDaisy: [
        [179, 88, 6],
        [224, 130, 20],
        [253, 184, 99],
        [254, 224, 182],
        [247, 247, 247],
        [216, 218, 235],
        [178, 171, 210],
        [128, 115, 172],
        [84, 39, 136],
    ],
    PoppyLochmara: [
        [235, 62, 37],
        [214, 96, 77],
        [244, 165, 130],
        [253, 219, 199],
        [247, 247, 247],
        [209, 229, 240],
        [146, 197, 222],
        [67, 147, 195],
        [33, 102, 172],
    ],
    PersianSteel: [
        [215, 48, 39],
        [244, 109, 67],
        [253, 174, 97],
        [254, 224, 144],
        [255, 255, 191],
        [224, 243, 248],
        [171, 217, 233],
        [116, 173, 209],
        [69, 117, 180],
    ],
};
function calculateScale(steps) {
    const scale = ConfigManager.get('colorScale');
    return new NodeColorGradient(scales[scale]).getGradient(steps);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3VyU2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvaW50ZXJmYWNlL0NvbG91clNjYWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBSVosT0FBTyxpQkFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEtBQUssT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsSUFBSSxPQUFPLEdBQWdDLEVBQUUsQ0FBQztBQUM5QyxJQUFJLFlBQVksR0FBc0MsRUFBRSxDQUFDO0FBQ3pELElBQUksYUFBYSxHQUE0QyxFQUFFLENBQUM7QUFFaEUsTUFBTSxxQkFBMkIsTUFBZTs7UUFDOUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQUE7QUFFRCwyQkFBaUMsTUFBZTs7UUFDOUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksZUFBZSxHQUFTLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxRixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsaUVBQWlFO1FBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUFBO0FBRUQsTUFBTSxvQkFBb0IsTUFBZTtJQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM3QixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBd0M7SUFDekQsZ0JBQWdCLEVBQUU7UUFDaEIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNkLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZCxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNkLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZCxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNiLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDZDtJQUNELGFBQWEsRUFBRTtRQUNiLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDYixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztLQUNiO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDWixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7S0FDZDtJQUNELFNBQVMsRUFBRTtRQUNULENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDWixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztLQUNkO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNiLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDYixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZCxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0tBQ2Y7SUFDRCxZQUFZLEVBQUU7UUFDWixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNmLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDZjtDQUNGLENBQUM7QUFFRix3QkFBd0IsS0FBYTtJQUNuQyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IGFsbG93VW5zYWZlRXZhbCwgYWxsb3dVbnNhZmVOZXdGdW5jdGlvbiB9IGZyb20gJ2xvb3Bob2xlJztcbmltcG9ydCBJRWRpdG9yID0gQXRvbUNvcmUuSUVkaXRvcjtcbmltcG9ydCBOb2RlQ29sb3JHcmFkaWVudCBmcm9tICdub2RlLWNvbG9yLWdyYWRpZW50JztcbmltcG9ydCAqIGFzIEdpdERhdGEgZnJvbSAnLi4vZGF0YS9HaXREYXRhJztcbmltcG9ydCAqIGFzIENvbmZpZ01hbmFnZXIgZnJvbSAnLi4vQ29uZmlnTWFuYWdlcic7XG5cbmxldCBlZGl0b3JzOiB7IFtwcm9wOiBzdHJpbmddOiBJRWRpdG9yIH0gPSB7fTtcbmxldCBkYXRlUHJvbWlzZXM6IHsgW3Byb3A6IHN0cmluZ106IFByb21pc2U8RGF0ZT4gfSA9IHt9O1xubGV0IHNjYWxlUHJvbWlzZXM6IHsgW3Byb3A6IHN0cmluZ106IFByb21pc2U8QXJyYXk8YW55Pj4gfSA9IHt9O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29sb3JTY2FsZShlZGl0b3I6IElFZGl0b3IpIHtcbiAgY29uc3QgcHJvamVjdERpciA9IGF3YWl0IEdpdERhdGEuZ2V0UmVwb1Jvb3RQYXRoKGVkaXRvci5nZXRQYXRoKCkpO1xuICBpZiAoIXNjYWxlUHJvbWlzZXNbcHJvamVjdERpcl0pIHtcbiAgICBzY2FsZVByb21pc2VzW3Byb2plY3REaXJdID0gZ2V0U2NhbGVGb3JFZGl0b3IoZWRpdG9yKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgc2NhbGVQcm9taXNlc1twcm9qZWN0RGlyXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2NhbGVGb3JFZGl0b3IoZWRpdG9yOiBJRWRpdG9yKSB7XG4gIGNvbnN0IHByb2plY3REaXIgPSBhd2FpdCBHaXREYXRhLmdldFJlcG9Sb290UGF0aChlZGl0b3IuZ2V0UGF0aCgpKTtcbiAgbGV0IGZpcnN0Q29tbWl0RGF0ZTogRGF0ZSA9IGF3YWl0IGRhdGVQcm9taXNlc1twcm9qZWN0RGlyXTtcbiAgY29uc3QgdG90YWxEYXlzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGZpcnN0Q29tbWl0RGF0ZS5nZXRUaW1lKCkpIC8gMTAwMCAvIDM2MDAgLyAyNCk7XG4gIGNvbnN0IGdyYWRpZW50ID0gY2FsY3VsYXRlU2NhbGUodG90YWxEYXlzKTtcblxuICAvLyBIYWNrIHRvIGZpeCBjb2xvciBzY2FsZSBjYWxjdWxhdGlvbiBjb21pbmcgdXAgc2hvcnQgd2l0aCBzdGVwc1xuICBjb25zdCBsZW5ndGhEaWZmZXJlbmNlID0gdG90YWxEYXlzIC0gZ3JhZGllbnQubGVuZ3RoO1xuICBpZiAobGVuZ3RoRGlmZmVyZW5jZSA+IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aERpZmZlcmVuY2U7IGkrKykge1xuICAgICAgZ3JhZGllbnQucHVzaChncmFkaWVudFtncmFkaWVudC5sZW5ndGggLSAxXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdyYWRpZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RWRpdG9yKGVkaXRvcjogSUVkaXRvcikge1xuICByZXR1cm4gR2l0RGF0YS5nZXRSZXBvUm9vdFBhdGgoZWRpdG9yLmdldFBhdGgoKSkudGhlbihwcm9qZWN0RGlyID0+IHtcbiAgICBpZiAoZWRpdG9yc1twcm9qZWN0RGlyXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlZGl0b3JzW3Byb2plY3REaXJdID0gZWRpdG9yO1xuICAgIGRhdGVQcm9taXNlc1twcm9qZWN0RGlyXSA9IEdpdERhdGEuZ2V0Rmlyc3RDb21taXREYXRlRm9yUmVwbyhlZGl0b3IuZ2V0UGF0aCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzY2FsZXM6IHsgW25hbWU6IHN0cmluZ106IEFycmF5PG51bWJlcltdPiB9ID0ge1xuICBSb3lhbFBvbWVncmFuYXRlOiBbXG4gICAgWzYzLCAxMTYsIDIxMl0sXG4gICAgWzYwLCAxMjUsIDE5OV0sXG4gICAgWzU1LCAxMzYsIDIyOF0sXG4gICAgWzc4LCAxNjEsIDIxNl0sXG4gICAgWzgzLCAxNzUsIDIwMl0sXG4gICAgWzk2LCAyMDIsIDE5N10sXG4gICAgWzEyNywgMjI1LCAyMjFdLFxuICAgIFsxNjcsIDIzOSwgMjM2XSxcbiAgICBbMjAzLCAyNDgsIDI0N10sXG4gICAgWzI1NSwgMjU1LCAyNTVdLFxuICAgIFsyNTMsIDI0NSwgMjM0XSxcbiAgICBbMjUxLCAyMzEsIDIwNF0sXG4gICAgWzI0NiwgMjA4LCAxNThdLFxuICAgIFsyNDMsIDE3OSwgOTldLFxuICAgIFsyNDAsIDE1OSwgOTZdLFxuICAgIFsyNDAsIDE0MSwgODldLFxuICAgIFsyMzksIDEyOCwgODhdLFxuICAgIFsyMzgsIDExNSwgNzNdLFxuICAgIFsyMzcsIDk4LCA1OV0sXG4gICAgWzIzNSwgNjIsIDM3XSxcbiAgXSxcbiAgQ2hvY29sYXRlTWludDogW1xuICAgIFsxNDAsIDgxLCAxMF0sXG4gICAgWzE5MSwgMTI5LCA0NV0sXG4gICAgWzIyMywgMTk0LCAxMjVdLFxuICAgIFsyNDYsIDIzMiwgMTk1XSxcbiAgICBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgWzE5OSwgMjM0LCAyMjldLFxuICAgIFsxMjgsIDIwNSwgMTkzXSxcbiAgICBbNTMsIDE1MSwgMTQzXSxcbiAgICBbMSwgMTAyLCA5NF0sXG4gIF0sXG4gIFZpb2xldEFwcGxlOiBbXG4gICAgWzE5NywgMjcsIDEyNV0sXG4gICAgWzIyMiwgMTE5LCAxNzRdLFxuICAgIFsyNDEsIDE4MiwgMjE4XSxcbiAgICBbMjUzLCAyMjQsIDIzOV0sXG4gICAgWzI0NywgMjQ3LCAyNDddLFxuICAgIFsyMzAsIDI0NSwgMjA4XSxcbiAgICBbMTg0LCAyMjUsIDEzNF0sXG4gICAgWzEyNywgMTg4LCA2NV0sXG4gICAgWzc3LCAxNDYsIDMzXSxcbiAgXSxcbiAgQWZmYWlyR29ibGluOiBbXG4gICAgWzExOCwgNDIsIDEzMV0sXG4gICAgWzE1MywgMTEyLCAxNzFdLFxuICAgIFsxOTQsIDE2NSwgMjA3XSxcbiAgICBbMjMxLCAyMTIsIDIzMl0sXG4gICAgWzI0NywgMjQ3LCAyNDddLFxuICAgIFsyMTcsIDI0MCwgMjExXSxcbiAgICBbMTY2LCAyMTksIDE2MF0sXG4gICAgWzkwLCAxNzQsIDk3XSxcbiAgICBbMjcsIDEyMCwgNTVdLFxuICBdLFxuICBHb2xkRGFpc3k6IFtcbiAgICBbMTc5LCA4OCwgNl0sXG4gICAgWzIyNCwgMTMwLCAyMF0sXG4gICAgWzI1MywgMTg0LCA5OV0sXG4gICAgWzI1NCwgMjI0LCAxODJdLFxuICAgIFsyNDcsIDI0NywgMjQ3XSxcbiAgICBbMjE2LCAyMTgsIDIzNV0sXG4gICAgWzE3OCwgMTcxLCAyMTBdLFxuICAgIFsxMjgsIDExNSwgMTcyXSxcbiAgICBbODQsIDM5LCAxMzZdLFxuICBdLFxuICBQb3BweUxvY2htYXJhOiBbXG4gICAgWzIzNSwgNjIsIDM3XSxcbiAgICBbMjE0LCA5NiwgNzddLFxuICAgIFsyNDQsIDE2NSwgMTMwXSxcbiAgICBbMjUzLCAyMTksIDE5OV0sXG4gICAgWzI0NywgMjQ3LCAyNDddLFxuICAgIFsyMDksIDIyOSwgMjQwXSxcbiAgICBbMTQ2LCAxOTcsIDIyMl0sXG4gICAgWzY3LCAxNDcsIDE5NV0sXG4gICAgWzMzLCAxMDIsIDE3Ml0sXG4gIF0sXG4gIFBlcnNpYW5TdGVlbDogW1xuICAgIFsyMTUsIDQ4LCAzOV0sXG4gICAgWzI0NCwgMTA5LCA2N10sXG4gICAgWzI1MywgMTc0LCA5N10sXG4gICAgWzI1NCwgMjI0LCAxNDRdLFxuICAgIFsyNTUsIDI1NSwgMTkxXSxcbiAgICBbMjI0LCAyNDMsIDI0OF0sXG4gICAgWzE3MSwgMjE3LCAyMzNdLFxuICAgIFsxMTYsIDE3MywgMjA5XSxcbiAgICBbNjksIDExNywgMTgwXSxcbiAgXSxcbn07XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjYWxlKHN0ZXBzOiBudW1iZXIpIHtcbiAgY29uc3Qgc2NhbGUgPSBDb25maWdNYW5hZ2VyLmdldCgnY29sb3JTY2FsZScpO1xuICByZXR1cm4gbmV3IE5vZGVDb2xvckdyYWRpZW50KHNjYWxlc1tzY2FsZV0pLmdldEdyYWRpZW50KHN0ZXBzKTtcbn1cbiJdfQ==