"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const ProtectedGitRepo_1 = require("./../ProtectedGitRepo");
describe('ProtectedGitRepo', () => {
    let availablePaths = new Map();
    availablePaths.set('path1', 'path/to/path1');
    let repo = new ProtectedGitRepo_1.ProtectedGitRepo(availablePaths);
    it('isAvailable()', () => {
        assert.ok(repo.isAvailable('path1'));
    });
    it('getAvailablePaths()', () => {
        assert.equal(1, repo.getAvailablePaths().size);
    });
    it('getRepo()', () => {
        let git = repo.getRepo('path1');
        assert.ok(typeof git.branch === 'function');
    });
});
//# sourceMappingURL=ProtectedGitRepo.js.map